<script setup lang="ts">
import Quill from "quill";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import "quill/dist/quill.snow.css";

const props = withDefaults(
 defineProps<{
 modelValue: string;
 placeholder?: string;
 subirImagen?: (file: File) => Promise<string>;
 disabled?: boolean;
 }>(),
 {
 placeholder: "Escribe aquí el contenido...",
 disabled: false
 }
);

const emit = defineEmits<{
 (event: "update:modelValue", value: string): void;
}>();

const root = ref<HTMLDivElement | null>(null);
let editor: Quill | null = null;

onMounted(() => {
 if (!root.value) {
 return;
 }

 editor = new Quill(root.value, {
 theme: "snow",
 placeholder: props.placeholder,
 modules: {
 toolbar: {
 container: [
 [{ header: [1, 2, 3, false] }],
 ["bold", "italic", "underline", "strike"],
 [{ color: [] }, { background: [] }],
 [{ list: "ordered" }, { list: "bullet" }],
 ["blockquote", "code-block"],
 ["link", "image"],
 ["clean"]
 ],
 handlers: {
 image: imageHandler
 }
 }
 }
 });

 editor.root.innerHTML = props.modelValue || "";
 editor.enable(!props.disabled);
 editor.on("text-change", () => {
 if (!editor) {
 return;
 }
 emit("update:modelValue", editor.root.innerHTML);
 });
});

onBeforeUnmount(() => {
 editor = null;
});

watch(
 () => props.modelValue,
 (nextValue) => {
 if (!editor) {
 return;
 }

 if (editor.root.innerHTML !== nextValue) {
 editor.root.innerHTML = nextValue || "";
 }
 }
);

watch(
 () => props.disabled,
 (nextValue) => {
 editor?.enable(!nextValue);
 }
);

async function imageHandler(): Promise<void> {
 if (!editor) {
 return;
 }

 const input = document.createElement("input");
 input.type = "file";
 input.accept = "image/*";
 input.click();

 input.onchange = async () => {
 const file = input.files?.[0];
 if (!file) {
 return;
 }

 const range = editor?.getSelection(true);
 if (!range) {
 return;
 }

 try {
 if (props.disabled) {
 return;
 }
 let imageUrl = "";
 if (props.subirImagen) {
 imageUrl = await props.subirImagen(file);
 } else {
 imageUrl = await toDataUrl(file);
 }
 editor?.insertEmbed(range.index, "image", imageUrl, "user");
 } catch (error) {
 console.error("No se pudo subir la imagen al editor:", error);
 }
 };
}

function toDataUrl(file: File): Promise<string> {
 return new Promise((resolve, reject) => {
 const reader = new FileReader();
 reader.onload = () => resolve(String(reader.result));
 reader.onerror = () => reject(new Error("No fue posible leer la imagen."));
 reader.readAsDataURL(file);
 });
}
</script>

<template>
 <div class="rounded-lg border ">
 <div ref="root" class="min-h-[260px]"></div>
 </div>
</template>
