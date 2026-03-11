<script setup lang="ts">
defineOptions({ name: "NumericFieldInput" });

withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    disabled?: boolean;
    step?: string;
    min?: number | null;
  }>(),
  {
    placeholder: "",
    disabled: false,
    step: "any",
    min: null
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <input
    :value="modelValue"
    type="number"
    :step="step"
    :min="min ?? undefined"
    :placeholder="placeholder"
    :disabled="disabled"
    class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
