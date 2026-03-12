<script setup lang="ts">
defineOptions({ name: "DocumentFieldInput" });

type DocumentOption = {
 id: string;
 label: string;
};

withDefaults(
 defineProps<{
 modelValue: string;
 options?: DocumentOption[];
 hint?: string;
 disabled?: boolean;
 }>(),
 {
 options: () => [],
 hint: "",
 disabled: false
 }
);

const emit = defineEmits<{
 (event: "update:modelValue", value: string): void;
}>();
</script>

<template>
 <div class="space-y-2">
 <select
 :value="modelValue"
 :disabled="disabled"
 class="w-full rounded-md border px-3 py-2 text-sm outline-none "
 @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
 >
 <option value="">Selecciona un documento</option>
 <option
 v-for="option in options"
 :key="option.id"
 :value="option.id"
 >
 {{ option.label }}
 </option>
 </select>
 <p v-if="hint" class="text-xs ">{{ hint }}</p>
 </div>
</template>
