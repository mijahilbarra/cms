<script setup lang="ts">
import type { CmsFieldSchema, CmsFieldType, CmsNestedFieldSchema } from "../../types/contentSchema";

defineOptions({ name: "CmsSchemaFieldEditor" });

type EditableSchemaNode = CmsNestedFieldSchema & Partial<Pick<CmsFieldSchema, "key" | "label">>;

const FIELD_TYPE_OPTIONS: Array<{ label: string; value: CmsFieldType }> = [
  { label: "Texto", value: "text" },
  { label: "Fecha", value: "date" },
  { label: "Numérico", value: "numeric" },
  { label: "ID autonumérico", value: "id" },
  { label: "Textarea", value: "textarea" },
  { label: "Editor enriquecido", value: "richtext" },
  { label: "Imagen", value: "image" },
  { label: "Select", value: "select" },
  { label: "Documento (relación)", value: "document" },
  { label: "Boolean", value: "boolean" },
  { label: "Array", value: "array" },
  { label: "Map", value: "map" }
];

const props = withDefaults(
  defineProps<{
    modelValue: EditableSchemaNode;
    withIdentity?: boolean;
    disabled?: boolean;
    canRemove?: boolean;
    title?: string;
  }>(),
  {
    withIdentity: true,
    disabled: false,
    canRemove: false,
    title: ""
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: EditableSchemaNode): void;
  (event: "remove"): void;
}>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function resolveFieldType(value: unknown): CmsFieldType {
  if (
    value === "date" ||
    value === "numeric" ||
    value === "id" ||
    value === "textarea" ||
    value === "richtext" ||
    value === "image" ||
    value === "select" ||
    value === "document" ||
    value === "boolean" ||
    value === "array" ||
    value === "map"
  ) {
    return value;
  }
  return "text";
}

function sanitizeText(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function normalizeOptions(value: unknown): string[] {
  return Array.isArray(value) ? value.map((entry) => String(entry).trim()).filter(Boolean) : [];
}

function createDefaultNestedNode(): EditableSchemaNode {
  return {
    type: "text",
    required: false,
    placeholder: "",
    helpText: "",
    options: []
  };
}

function createDefaultFieldNode(): CmsFieldSchema {
  return {
    ...createDefaultNestedNode(),
    key: "",
    label: ""
  };
}

function normalizeNestedNode(value: unknown): EditableSchemaNode {
  const source = isRecord(value) ? value : {};
  const type = resolveFieldType(source.type);

  const node: EditableSchemaNode = {
    type,
    required: Boolean(source.required),
    placeholder: sanitizeText(source.placeholder),
    helpText: sanitizeText(source.helpText),
    options: type === "select" ? normalizeOptions(source.options) : [],
    documentSchemaId: type === "document" ? sanitizeText(source.documentSchemaId) : "",
    documentLabelField: type === "document" ? sanitizeText(source.documentLabelField) : ""
  };

  if (type === "map") {
    node.mapFields = Array.isArray(source.mapFields) ? source.mapFields.map((entry) => normalizeFieldNode(entry)) : [];
  }

  if (type === "array") {
    node.itemSchema = normalizeNestedNode(source.itemSchema);
  }

  return node;
}

function normalizeFieldNode(value: unknown): CmsFieldSchema {
  const source = isRecord(value) ? value : {};
  const nested = normalizeNestedNode(source);
  return {
    ...nested,
    key: sanitizeText(source.key),
    label: sanitizeText(source.label)
  };
}

function currentNode(): EditableSchemaNode {
  const normalized = normalizeNestedNode(props.modelValue);
  if (props.withIdentity) {
    const asField = normalizeFieldNode(props.modelValue);
    normalized.key = asField.key;
    normalized.label = asField.label;
  }
  return normalized;
}

function toOutputNode(raw: EditableSchemaNode, withIdentity: boolean): EditableSchemaNode {
  const normalized = normalizeNestedNode(raw);
  const output: EditableSchemaNode = {
    type: normalized.type,
    required: Boolean(normalized.required),
    placeholder: sanitizeText(normalized.placeholder),
    helpText: sanitizeText(normalized.helpText),
    options: normalized.type === "select" ? normalizeOptions(normalized.options) : [],
    documentSchemaId:
      normalized.type === "document" ? sanitizeText(normalized.documentSchemaId) : "",
    documentLabelField:
      normalized.type === "document" ? sanitizeText(normalized.documentLabelField) : ""
  };

  if (normalized.type === "map") {
    output.mapFields = (normalized.mapFields ?? []).map((entry) => normalizeFieldNode(entry));
  }

  if (normalized.type === "array") {
    output.itemSchema = toOutputNode(normalized.itemSchema ?? createDefaultNestedNode(), false) as CmsNestedFieldSchema;
  }

  if (withIdentity) {
    const asField = normalizeFieldNode(raw);
    output.key = asField.key;
    output.label = asField.label;
  }

  return output;
}

function emitNode(next: EditableSchemaNode): void {
  emit("update:modelValue", toOutputNode(next, props.withIdentity));
}

function setIdentity(prop: "key" | "label", value: string): void {
  const next = currentNode();
  next[prop] = value;
  emitNode(next);
}

function setType(value: string): void {
  const next = currentNode();
  const type = resolveFieldType(value);
  next.type = type;

  if (type !== "select") {
    next.options = [];
  }
  if (type !== "document") {
    next.documentSchemaId = "";
    next.documentLabelField = "";
  }

  if (type === "map") {
    next.mapFields = Array.isArray(next.mapFields) ? next.mapFields.map((entry) => normalizeFieldNode(entry)) : [];
    delete next.itemSchema;
  } else if (type === "array") {
    next.itemSchema = normalizeNestedNode(next.itemSchema ?? createDefaultNestedNode());
    delete next.mapFields;
  } else {
    delete next.mapFields;
    delete next.itemSchema;
  }

  emitNode(next);
}

function setRequired(value: boolean): void {
  const next = currentNode();
  next.required = value;
  emitNode(next);
}

function setPlaceholder(value: string): void {
  const next = currentNode();
  next.placeholder = value;
  emitNode(next);
}

function setHelpText(value: string): void {
  const next = currentNode();
  next.helpText = value;
  emitNode(next);
}

function optionsText(): string {
  return (currentNode().options ?? []).join(", ");
}

function setOptionsText(value: string): void {
  const next = currentNode();
  next.options = value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
  emitNode(next);
}

function documentSchemaIdText(): string {
  return currentNode().documentSchemaId ?? "";
}

function documentLabelFieldText(): string {
  return currentNode().documentLabelField ?? "";
}

function setDocumentSchemaId(value: string): void {
  const next = currentNode();
  next.documentSchemaId = value;
  emitNode(next);
}

function setDocumentLabelField(value: string): void {
  const next = currentNode();
  next.documentLabelField = value;
  emitNode(next);
}

function mapFieldsValue(): CmsFieldSchema[] {
  const next = currentNode();
  if (next.type !== "map" || !Array.isArray(next.mapFields)) {
    return [];
  }
  return next.mapFields.map((entry) => normalizeFieldNode(entry));
}

function addMapField(): void {
  const next = currentNode();
  next.type = "map";
  next.mapFields = [...mapFieldsValue(), createDefaultFieldNode()];
  emitNode(next);
}

function updateMapField(index: number, value: EditableSchemaNode): void {
  const next = currentNode();
  const fields = mapFieldsValue();
  fields[index] = normalizeFieldNode(value);
  next.mapFields = fields;
  emitNode(next);
}

function removeMapField(index: number): void {
  const next = currentNode();
  const fields = mapFieldsValue();
  fields.splice(index, 1);
  next.mapFields = fields;
  emitNode(next);
}

function itemSchemaValue(): EditableSchemaNode {
  const next = currentNode();
  if (next.type !== "array") {
    return createDefaultNestedNode();
  }
  return normalizeNestedNode(next.itemSchema ?? createDefaultNestedNode());
}

function updateItemSchema(value: EditableSchemaNode): void {
  const next = currentNode();
  next.type = "array";
  next.itemSchema = normalizeNestedNode(value);
  emitNode(next);
}

function removeSelf(): void {
  emit("remove");
}
</script>

<template>
  <article class="rounded-xl border border-slate-200 bg-slate-50 p-3">
    <div class="mb-3 flex items-start justify-between gap-2">
      <p v-if="title" class="text-xs font-bold uppercase tracking-wide text-slate-600">{{ title }}</p>
      <button
        v-if="canRemove"
        type="button"
        :disabled="disabled"
        class="rounded-md border border-rose-300 px-2 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 disabled:opacity-60"
        @click="removeSelf"
      >
        Quitar
      </button>
    </div>

    <div v-if="withIdentity" class="grid gap-2 md:grid-cols-2">
      <label class="space-y-1">
        <span class="text-xs font-semibold text-slate-700">Key</span>
        <input
          :value="currentNode().key || ''"
          type="text"
          :disabled="disabled"
          class="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100"
          @input="setIdentity('key', ($event.target as HTMLInputElement).value)"
        />
      </label>
      <label class="space-y-1">
        <span class="text-xs font-semibold text-slate-700">Label</span>
        <input
          :value="currentNode().label || ''"
          type="text"
          :disabled="disabled"
          class="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100"
          @input="setIdentity('label', ($event.target as HTMLInputElement).value)"
        />
      </label>
    </div>

    <div class="mt-2 grid gap-2 md:grid-cols-3">
      <label class="space-y-1">
        <span class="text-xs font-semibold text-slate-700">Tipo</span>
        <select
          :value="currentNode().type"
          :disabled="disabled"
          class="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100"
          @change="setType(($event.target as HTMLSelectElement).value)"
        >
          <option v-for="option in FIELD_TYPE_OPTIONS" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </label>

      <label class="space-y-1">
        <span class="text-xs font-semibold text-slate-700">Placeholder</span>
        <input
          :value="currentNode().placeholder || ''"
          type="text"
          :disabled="disabled"
          class="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100"
          @input="setPlaceholder(($event.target as HTMLInputElement).value)"
        />
      </label>

      <label class="space-y-1">
        <span class="text-xs font-semibold text-slate-700">Requerido</span>
        <span class="flex h-[34px] items-center rounded-md border border-slate-300 bg-white px-2 text-sm text-slate-700">
          <input
            :checked="Boolean(currentNode().required)"
            type="checkbox"
            :disabled="disabled"
            @change="setRequired(($event.target as HTMLInputElement).checked)"
          />
          <span class="ml-2">Sí</span>
        </span>
      </label>
    </div>

    <label class="mt-2 block space-y-1">
      <span class="text-xs font-semibold text-slate-700">Help text</span>
      <input
        :value="currentNode().helpText || ''"
        type="text"
        :disabled="disabled"
        class="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100"
        @input="setHelpText(($event.target as HTMLInputElement).value)"
      />
    </label>

    <label v-if="currentNode().type === 'select'" class="mt-2 block space-y-1">
      <span class="text-xs font-semibold text-slate-700">Opciones (separadas por coma)</span>
      <input
        :value="optionsText()"
        type="text"
        :disabled="disabled"
        class="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100"
        @input="setOptionsText(($event.target as HTMLInputElement).value)"
      />
    </label>

    <div v-if="currentNode().type === 'document'" class="mt-2 grid gap-2 md:grid-cols-2">
      <label class="space-y-1">
        <span class="text-xs font-semibold text-slate-700">Schema destino</span>
        <input
          :value="documentSchemaIdText()"
          type="text"
          :disabled="disabled"
          placeholder="representantes"
          class="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100"
          @input="setDocumentSchemaId(($event.target as HTMLInputElement).value)"
        />
      </label>
      <label class="space-y-1">
        <span class="text-xs font-semibold text-slate-700">Campo etiqueta</span>
        <input
          :value="documentLabelFieldText()"
          type="text"
          :disabled="disabled"
          placeholder="nombre"
          class="w-full rounded-md border border-slate-300 px-2 py-1.5 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100"
          @input="setDocumentLabelField(($event.target as HTMLInputElement).value)"
        />
      </label>
    </div>

    <div v-if="currentNode().type === 'map'" class="mt-3 rounded-lg border border-slate-200 bg-white p-2">
      <div class="mb-2 flex items-center justify-between">
        <p class="text-xs font-bold uppercase tracking-wide text-slate-600">Map fields</p>
        <button
          type="button"
          :disabled="disabled"
          class="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          @click="addMapField"
        >
          Agregar campo
        </button>
      </div>

      <div class="space-y-2">
        <CmsSchemaFieldEditor
          v-for="(mapField, index) in mapFieldsValue()"
          :key="`map-field-${index}`"
          :model-value="mapField"
          :disabled="disabled"
          :can-remove="true"
          title="Campo de map"
          @update:model-value="updateMapField(index, $event)"
          @remove="removeMapField(index)"
        />
      </div>
    </div>

    <div v-if="currentNode().type === 'array'" class="mt-3 rounded-lg border border-slate-200 bg-white p-2">
      <p class="mb-2 text-xs font-bold uppercase tracking-wide text-slate-600">Item schema</p>
      <CmsSchemaFieldEditor
        :model-value="itemSchemaValue()"
        :with-identity="false"
        :disabled="disabled"
        title="Estructura del ítem"
        @update:model-value="updateItemSchema"
      />
    </div>
  </article>
</template>
