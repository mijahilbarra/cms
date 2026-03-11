<script setup lang="ts">
defineOptions({ name: "DateFieldInput" });

withDefaults(
  defineProps<{
    modelValue: string;
    placeholder?: string;
    disabled?: boolean;
  }>(),
  {
    placeholder: "",
    disabled: false
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <input
    :value="modelValue"
    type="date"
    :placeholder="placeholder"
    :disabled="disabled"
    class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
