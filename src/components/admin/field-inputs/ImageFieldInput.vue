<script setup lang="ts">
defineOptions({ name: "ImageFieldInput" });

withDefaults(
 defineProps<{
 modelValue: string;
 disabled?: boolean;
 }>(),
 {
 disabled: false
 }
);

const emit = defineEmits<{
 (event: "update:file", value: File | null): void;
 (event: "remove"): void;
}>();

function onFileChange(event: Event): void {
 const input = event.target as HTMLInputElement;
 emit("update:file", input.files?.[0] ?? null);
}
</script>

<template>
 <div class="space-y-2">
 <input
 type="file"
 accept="image/*"
 :disabled="disabled"
 class="block w-full text-sm disabled:opacity-60"
 @change="onFileChange"
 />
 <p v-if="modelValue" class="text-xs break-all">
 URL actual: {{ modelValue }}
 </p>
 <img
 v-if="modelValue"
 :src="modelValue"
 alt="Vista previa"
 class="max-h-32 rounded-md border object-cover"
 />
 <button
 v-if="modelValue"
 type="button"
 class="rounded-md border px-2 py-1 text-xs font-semibold "
 :disabled="disabled"
 @click="emit('remove')"
 >
 Quitar URL
 </button>
 </div>
</template>
