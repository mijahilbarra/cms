<script setup lang="ts">
import { computed } from "vue";
import type { CmsFieldSchema, CmsNestedFieldSchema } from "../../types/contentSchema";

defineOptions({ name: "CmsNestedValueEditor" });

type SchemaNode = CmsNestedFieldSchema & Partial<Pick<CmsFieldSchema, "key" | "label">>;

const props = withDefaults(
 defineProps<{
 schema: SchemaNode;
 modelValue: unknown;
 disabled?: boolean;
 }>(),
 {
 disabled: false
 }
);

const emit = defineEmits<{
 (event: "update:modelValue", value: unknown): void;
}>();

const mapFields = computed<CmsFieldSchema[]>(() =>
 Array.isArray(props.schema.mapFields) ? props.schema.mapFields : []
);

const arrayItemSchema = computed<CmsNestedFieldSchema>(() => {
 if (props.schema.itemSchema && typeof props.schema.itemSchema === "object") {
 return props.schema.itemSchema;
 }
 return { type: "text" };
});

const mapValue = computed<Record<string, unknown>>(() => toRecord(props.modelValue));
const arrayValue = computed<unknown[]>(() => (Array.isArray(props.modelValue) ? props.modelValue : []));
const dynamicMapEntries = computed(() => Object.entries(mapValue.value));

function toRecord(value: unknown): Record<string, unknown> {
 return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function defaultValueForSchema(schema: CmsNestedFieldSchema): unknown {
 if (schema.type === "array") {
 return [];
 }
 if (schema.type === "map") {
 return {};
 }
 if (schema.type === "boolean") {
 return false;
 }
 if (schema.type === "date") {
 return "";
 }
 if (schema.type === "numeric" || schema.type === "id") {
 return null;
 }
 return "";
}

function updateMapField(key: string, value: unknown): void {
 emit("update:modelValue", {
 ...mapValue.value,
 [key]: value
 });
}

function addArrayItem(): void {
 emit("update:modelValue", [...arrayValue.value, defaultValueForSchema(arrayItemSchema.value)]);
}

function removeArrayItem(index: number): void {
 const next = [...arrayValue.value];
 next.splice(index, 1);
 emit("update:modelValue", next);
}

function updateArrayItem(index: number, value: unknown): void {
 const next = [...arrayValue.value];
 next[index] = value;
 emit("update:modelValue", next);
}

function onPrimitiveInput(value: string): void {
 emit("update:modelValue", value);
}

function onBooleanInput(value: boolean): void {
 emit("update:modelValue", value);
}

function onNumericInput(raw: string): void {
 if (!raw.trim()) {
 emit("update:modelValue", null);
 return;
 }

 const parsed = Number(raw);
 emit("update:modelValue", Number.isFinite(parsed) ? parsed : null);
}

function numericInputValue(value: unknown): string {
 if (typeof value === "number" && Number.isFinite(value)) {
 return String(value);
 }
 if (typeof value === "string") {
 const trimmed = value.trim();
 if (!trimmed) {
 return "";
 }
 const parsed = Number(trimmed);
 if (Number.isFinite(parsed)) {
 return String(parsed);
 }
 }
 return "";
}

function onDateInput(raw: string): void {
 emit("update:modelValue", normalizeDateInput(raw));
}

function dateInputValue(value: unknown): string {
 return normalizeDateInput(value);
}

function addMapEntry(): void {
 const current = mapValue.value;
 let index = 1;
 let candidate = `campo_${index}`;
 while (candidate in current) {
 index += 1;
 candidate = `campo_${index}`;
 }

 emit("update:modelValue", {
 ...current,
 [candidate]: ""
 });
}

function removeMapEntry(key: string): void {
 const next = { ...mapValue.value };
 delete next[key];
 emit("update:modelValue", next);
}

function renameMapEntry(oldKey: string, nextKeyRaw: string): void {
 const nextKey = nextKeyRaw.trim();
 if (!nextKey || nextKey === oldKey) {
 return;
 }

 const next = { ...mapValue.value };
 const value = next[oldKey];
 delete next[oldKey];
 next[nextKey] = value;
 emit("update:modelValue", next);
}

function updateDynamicMapValue(key: string, raw: string): void {
 const next = { ...mapValue.value };
 next[key] = parseDynamicInput(raw);
 emit("update:modelValue", next);
}

function stringifyDynamicValue(value: unknown): string {
 if (typeof value === "string") {
 return value;
 }
 if (value === undefined || value === null) {
 return "";
 }
 try {
 return JSON.stringify(value);
 } catch {
 return String(value);
 }
}

function parseDynamicInput(raw: string): unknown {
 const trimmed = raw.trim();
 if (!trimmed) {
 return "";
 }

 if ((trimmed.startsWith("{") && trimmed.endsWith("}")) || (trimmed.startsWith("[") && trimmed.endsWith("]"))) {
 try {
 return JSON.parse(trimmed);
 } catch {
 return raw;
 }
 }

 return raw;
}

function normalizeDateInput(value: unknown): string {
 if (typeof value === "string") {
 const trimmed = value.trim();
 if (!trimmed) {
 return "";
 }
 const fromInput = parseDateFromInput(trimmed);
 if (fromInput) {
 return formatDateAsInput(fromInput);
 }
 const parsed = new Date(trimmed);
 if (!Number.isNaN(parsed.getTime())) {
 return formatDateAsInput(parsed);
 }
 return "";
 }

 if (value instanceof Date && !Number.isNaN(value.getTime())) {
 return formatDateAsInput(value);
 }

 if (
 value &&
 typeof value === "object" &&
 "toDate" in value &&
 typeof (value as { toDate?: () => Date }).toDate === "function"
 ) {
 const asDate = (value as { toDate: () => Date }).toDate();
 if (asDate instanceof Date && !Number.isNaN(asDate.getTime())) {
 return formatDateAsInput(asDate);
 }
 }

 return "";
}

function parseDateFromInput(value: string): Date | null {
 const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
 if (!match) {
 return null;
 }
 const year = Number(match[1]);
 const month = Number(match[2]);
 const day = Number(match[3]);
 const parsed = new Date(Date.UTC(year, month - 1, day));
 if (
 parsed.getUTCFullYear() !== year ||
 parsed.getUTCMonth() + 1 !== month ||
 parsed.getUTCDate() !== day
 ) {
 return null;
 }
 return parsed;
}

function formatDateAsInput(date: Date): string {
 const year = String(date.getUTCFullYear()).padStart(4, "0");
 const month = String(date.getUTCMonth() + 1).padStart(2, "0");
 const day = String(date.getUTCDate()).padStart(2, "0");
 return `${year}-${month}-${day}`;
}
</script>

<template>
 <div class="space-y-2">
 <section
 v-if="schema.type === 'map'"
 class="space-y-3 rounded-md border p-3"
 >
 <article
 v-for="field in mapFields"
 :key="field.key"
 class="space-y-1 rounded-md border p-3"
 >
 <label class="block text-xs font-semibold uppercase tracking-wide ">{{ field.label }}</label>
 <p v-if="field.helpText" class="text-xs ">{{ field.helpText }}</p>
 <CmsNestedValueEditor
 :schema="field"
 :model-value="mapValue[field.key]"
 :disabled="disabled"
 @update:model-value="updateMapField(field.key, $event)"
 />
 </article>
 <div v-if="!mapFields.length" class="space-y-2">
 <article
 v-for="[entryKey, entryValue] in dynamicMapEntries"
 :key="entryKey"
 class="grid gap-2 rounded-md border p-3 md:grid-cols-[180px,1fr,auto]"
 >
 <input
 :value="entryKey"
 type="text"
 class="rounded-md border px-2 py-1 text-xs outline-none "
 :disabled="disabled"
 @change="renameMapEntry(entryKey, ($event.target as HTMLInputElement).value)"
 />
 <input
 :value="stringifyDynamicValue(entryValue)"
 type="text"
 class="rounded-md border px-2 py-1 text-xs outline-none "
 :disabled="disabled"
 @input="updateDynamicMapValue(entryKey, ($event.target as HTMLInputElement).value)"
 />
 <button
 type="button"
 class="rounded-md border px-2 py-1 text-xs font-semibold "
 :disabled="disabled"
 @click="removeMapEntry(entryKey)"
 >
 Quitar
 </button>
 </article>

 <button
 type="button"
 class="rounded-md border px-3 py-1.5 text-xs font-semibold disabled:opacity-60"
 :disabled="disabled"
 @click="addMapEntry"
 >
 Agregar item
 </button>
 <p class="text-xs ">
 Puedes escribir JSON en el valor para guardar objetos o arreglos.
 </p>
 </div>
 </section>

 <section
 v-else-if="schema.type === 'array'"
 class="space-y-3 rounded-md border p-3"
 >
 <article
 v-for="(item, index) in arrayValue"
 :key="index"
 class="space-y-2 rounded-md border p-3"
 >
 <div class="flex items-center justify-between">
 <p class="text-xs font-semibold uppercase tracking-wide ">Item {{ index + 1 }}</p>
 <button
 type="button"
 class="rounded-md border px-2 py-1 text-xs font-semibold "
 :disabled="disabled"
 @click="removeArrayItem(index)"
 >
 Quitar
 </button>
 </div>
 <CmsNestedValueEditor
 :schema="arrayItemSchema"
 :model-value="item"
 :disabled="disabled"
 @update:model-value="updateArrayItem(index, $event)"
 />
 </article>

 <button
 type="button"
 class="rounded-md border px-3 py-1.5 text-xs font-semibold disabled:opacity-60"
 :disabled="disabled"
 @click="addArrayItem"
 >
 Agregar item
 </button>
 </section>

 <label
 v-else-if="schema.type === 'boolean'"
 class="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm "
 >
 <input
 type="checkbox"
 :checked="Boolean(modelValue)"
 :disabled="disabled"
 @change="onBooleanInput(($event.target as HTMLInputElement).checked)"
 />
 Activo
 </label>

 <textarea
 v-else-if="schema.type === 'textarea' || schema.type === 'richtext'"
 :value="typeof modelValue === 'string' ? modelValue : ''"
 rows="4"
 :placeholder="schema.placeholder || ''"
 :disabled="disabled"
 class="w-full rounded-md border px-3 py-2 text-sm outline-none "
 @input="onPrimitiveInput(($event.target as HTMLTextAreaElement).value)"
 ></textarea>

 <select
 v-else-if="schema.type === 'select'"
 :value="typeof modelValue === 'string' ? modelValue : ''"
 :disabled="disabled"
 class="w-full rounded-md border px-3 py-2 text-sm outline-none "
 @change="onPrimitiveInput(($event.target as HTMLSelectElement).value)"
 >
 <option value="">Selecciona una opción</option>
 <option v-for="option in schema.options || []" :key="option" :value="option">{{ option }}</option>
 </select>

 <input
 v-else-if="schema.type === 'date'"
 :value="dateInputValue(modelValue)"
 type="date"
 :placeholder="schema.placeholder || ''"
 :disabled="disabled"
 class="w-full rounded-md border px-3 py-2 text-sm outline-none "
 @input="onDateInput(($event.target as HTMLInputElement).value)"
 />

 <input
 v-else-if="schema.type === 'numeric' || schema.type === 'id'"
 :value="numericInputValue(modelValue)"
 type="number"
 :step="schema.type === 'id' ? '1' : 'any'"
 :placeholder="schema.placeholder || ''"
 :disabled="disabled"
 class="w-full rounded-md border px-3 py-2 text-sm outline-none "
 @input="onNumericInput(($event.target as HTMLInputElement).value)"
 />

 <input
 v-else
 :value="typeof modelValue === 'string' ? modelValue : ''"
 type="text"
 :placeholder="schema.placeholder || ''"
 :disabled="disabled"
 class="w-full rounded-md border px-3 py-2 text-sm outline-none "
 @input="onPrimitiveInput(($event.target as HTMLInputElement).value)"
 />
 </div>
</template>
