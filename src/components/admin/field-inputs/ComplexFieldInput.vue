<script setup lang="ts">
import CmsNestedValueEditor from "../CmsNestedValueEditor.vue";
import type { CmsFieldSchema } from "../../../types/contentSchema";

defineOptions({ name: "ComplexFieldInput" });

withDefaults(
 defineProps<{
 field: CmsFieldSchema;
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
</script>

<template>
 <CmsNestedValueEditor
 :schema="field"
 :model-value="modelValue"
 :disabled="disabled"
 @update:model-value="emit('update:modelValue', $event)"
 />
</template>
