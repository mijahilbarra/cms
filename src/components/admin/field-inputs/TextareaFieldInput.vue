<script setup lang="ts">
defineOptions({ name: "TextareaFieldInput" });

withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    disabled?: boolean;
    rows?: number;
  }>(),
  {
    placeholder: "",
    disabled: false,
    rows: 4
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <textarea
    :value="modelValue"
    :rows="rows"
    :placeholder="placeholder"
    :disabled="disabled"
    class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100"
    @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  ></textarea>
</template>
