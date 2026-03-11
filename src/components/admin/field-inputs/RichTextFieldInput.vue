<script setup lang="ts">
import RichTextEditor from "../../blog/RichTextEditor.vue";

defineOptions({ name: "RichTextFieldInput" });

withDefaults(
  defineProps<{
    modelValue: string;
    disabled?: boolean;
    uploadImage: (file: File) => Promise<string>;
  }>(),
  {
    disabled: false
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <RichTextEditor
    :model-value="modelValue"
    :subir-imagen="uploadImage"
    :disabled="disabled"
    @update:model-value="emit('update:modelValue', $event)"
  />
</template>
