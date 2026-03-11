<script setup lang="ts">
defineOptions({ name: "BooleanFieldInput" });

withDefaults(
  defineProps<{
    modelValue: boolean;
    disabled?: boolean;
  }>(),
  {
    disabled: false
  }
);

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();
</script>

<template>
  <label
    class="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
  >
    <input
      :checked="modelValue"
      type="checkbox"
      :disabled="disabled"
      @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
    />
    Activo
  </label>
</template>
