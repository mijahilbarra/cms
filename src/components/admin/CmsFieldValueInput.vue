<script setup lang="ts">
import type { CmsFieldSchema } from "../../types/contentSchema";
import BooleanFieldInput from "./field-inputs/BooleanFieldInput.vue";
import ComplexFieldInput from "./field-inputs/ComplexFieldInput.vue";
import DateFieldInput from "./field-inputs/DateFieldInput.vue";
import DocumentFieldInput from "./field-inputs/DocumentFieldInput.vue";
import ImageFieldInput from "./field-inputs/ImageFieldInput.vue";
import NumericFieldInput from "./field-inputs/NumericFieldInput.vue";
import RichTextFieldInput from "./field-inputs/RichTextFieldInput.vue";
import SelectFieldInput from "./field-inputs/SelectFieldInput.vue";
import TextareaFieldInput from "./field-inputs/TextareaFieldInput.vue";
import TextFieldInput from "./field-inputs/TextFieldInput.vue";

defineOptions({ name: "CmsFieldValueInput" });

type DocumentOption = {
 id: string;
 label: string;
};

const props = withDefaults(
 defineProps<{
 field: CmsFieldSchema;
 modelValue: unknown;
 disabled?: boolean;
 isAutoId?: boolean;
 documentOptions?: DocumentOption[];
 documentHint?: string;
 uploadImage: (file: File) => Promise<string>;
 }>(),
 {
 disabled: false,
 isAutoId: false,
 documentOptions: () => [],
 documentHint: ""
 }
);

const emit = defineEmits<{
 (event: "update:modelValue", value: unknown): void;
 (event: "update:file", value: File | null): void;
 (event: "remove-image"): void;
}>();

function textValue(): string {
 return typeof props.modelValue === "string" ? props.modelValue : "";
}

function boolValue(): boolean {
 return Boolean(props.modelValue);
}

function numberValue(): string {
 return typeof props.modelValue === "string" ? props.modelValue : "";
}

function complexValue(): unknown {
 return props.modelValue;
}
</script>

<template>
 <div>
 <TextFieldInput
 v-if="field.type === 'text'"
 :model-value="textValue()"
 :placeholder="field.placeholder || ''"
 :disabled="disabled"
 @update:model-value="emit('update:modelValue', $event)"
 />

 <DateFieldInput
 v-else-if="field.type === 'date'"
 :model-value="textValue()"
 :placeholder="field.placeholder || ''"
 :disabled="disabled"
 @update:model-value="emit('update:modelValue', $event)"
 />

 <div v-else-if="field.type === 'numeric' || field.type === 'id'" class="space-y-1">
 <NumericFieldInput
 :model-value="numberValue()"
 :placeholder="field.placeholder || ''"
 :disabled="disabled || isAutoId"
 :step="field.type === 'id' ? '1' : 'any'"
 :min="field.type === 'id' ? 1 : null"
 @update:model-value="emit('update:modelValue', $event)"
 />
 <p v-if="isAutoId" class="text-xs ">
 Se genera automáticamente al crear el documento.
 </p>
 </div>

 <TextareaFieldInput
 v-else-if="field.type === 'textarea'"
 :model-value="textValue()"
 :placeholder="field.placeholder || ''"
 :disabled="disabled"
 @update:model-value="emit('update:modelValue', $event)"
 />

 <SelectFieldInput
 v-else-if="field.type === 'select'"
 :model-value="textValue()"
 :options="field.options || []"
 :disabled="disabled"
 @update:model-value="emit('update:modelValue', $event)"
 />

 <DocumentFieldInput
 v-else-if="field.type === 'document'"
 :model-value="textValue()"
 :options="documentOptions"
 :hint="documentHint"
 :disabled="disabled"
 @update:model-value="emit('update:modelValue', $event)"
 />

 <BooleanFieldInput
 v-else-if="field.type === 'boolean'"
 :model-value="boolValue()"
 :disabled="disabled"
 @update:model-value="emit('update:modelValue', $event)"
 />

 <ImageFieldInput
 v-else-if="field.type === 'image'"
 :model-value="textValue()"
 :disabled="disabled"
 @update:file="emit('update:file', $event)"
 @remove="emit('remove-image')"
 />

 <ComplexFieldInput
 v-else-if="field.type === 'array' || field.type === 'map'"
 :field="field"
 :model-value="complexValue()"
 :disabled="disabled"
 @update:model-value="emit('update:modelValue', $event)"
 />

 <RichTextFieldInput
 v-else-if="field.type === 'richtext'"
 :model-value="textValue()"
 :upload-image="uploadImage"
 :disabled="disabled"
 @update:model-value="emit('update:modelValue', $event)"
 />

 <TextFieldInput
 v-else
 :model-value="textValue()"
 :placeholder="field.placeholder || ''"
 :disabled="disabled"
 @update:model-value="emit('update:modelValue', $event)"
 />
 </div>
</template>
