<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { iniciarSesion } from "../firebase/auth";
import { getCmsRouteConfig } from "../runtime/cmsConfig";

const route = useRoute();
const router = useRouter();
const { basePath, registerPath } = getCmsRouteConfig();

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

async function submit(): Promise<void> {
 error.value = "";
 loading.value = true;
 try {
 await iniciarSesion(email.value, password.value);
 const redirect = typeof route.query.redirect === "string" ? route.query.redirect : basePath;
 await router.push(redirect);
 } catch {
 error.value = "No se pudo iniciar sesión. Verifica correo y contraseña.";
 } finally {
 loading.value = false;
 }
}
</script>

<template>
 <main class="cms-main-shell mx-auto max-w-md px-5 py-14">
 <h1 class="text-3xl font-black ">Ingresar</h1>
 <p class="mt-2 text-sm ">Accede para administrar contenido y esquemas.</p>

 <form class="mt-8 space-y-4 rounded-xl border p-5" @submit.prevent="submit">
 <div>
 <label class="mb-1 block text-sm font-semibold ">Correo</label>
 <input
 v-model="email"
 type="email"
 required
 class="w-full rounded-md border px-3 py-2 text-sm outline-none "
 placeholder="tu@email.com"
 />
 </div>

 <div>
 <label class="mb-1 block text-sm font-semibold ">Contraseña</label>
 <input
 v-model="password"
 type="password"
 required
 class="w-full rounded-md border px-3 py-2 text-sm outline-none "
 placeholder="********"
 />
 </div>

 <p v-if="error" class="rounded-md border px-3 py-2 text-sm ">
 {{ error }}
 </p>

 <button
 type="submit"
 :disabled="loading"
 class="w-full rounded-md px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
 >
 {{ loading ? "Ingresando..." : "Entrar" }}
 </button>
 </form>

 <p class="mt-4 text-sm ">
 ¿No tienes cuenta?
 <RouterLink :to="registerPath" class="font-semibold ">Crear cuenta</RouterLink>
 </p>
 </main>
</template>
