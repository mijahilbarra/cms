<script setup lang="ts">
defineOptions({ name: "SelectFieldInput" });

withDefaults(
  defineProps<{
    modelValue: string;
    options?: string[];
    disabled?: boolean;
  }>(),
  {
    options: () => [],
    disabled: false
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <select
    :value="modelValue"
    :disabled="disabled"
    class="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500 disabled:bg-slate-100"
    @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option value="">Selecciona una opción</option>
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>
