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
    <h1 class="text-3xl font-black text-[var(--pw-text)]">Ingresar</h1>
    <p class="mt-2 text-sm text-[var(--pw-muted-text)]">Accede para administrar blogs y vistas.</p>

    <form class="mt-8 space-y-4 rounded-xl border border-[var(--pw-border)] bg-[var(--pw-surface)] p-5" @submit.prevent="submit">
      <div>
        <label class="mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]">Correo</label>
        <input
          v-model="email"
          type="email"
          required
          class="w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]"
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]">Contraseña</label>
        <input
          v-model="password"
          type="password"
          required
          class="w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]"
          placeholder="********"
        />
      </div>

      <p v-if="error" class="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
        {{ error }}
      </p>

      <button
        type="submit"
        :disabled="loading"
        class="w-full rounded-md bg-[var(--pw-primary)] px-4 py-2 text-sm font-semibold text-[var(--pw-primary-text)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {{ loading ? "Ingresando..." : "Entrar" }}
      </button>
    </form>

    <p class="mt-4 text-sm text-[var(--pw-muted-text)]">
      ¿No tienes cuenta?
      <RouterLink :to="registerPath" class="font-semibold text-[var(--pw-accent)]">Crear cuenta</RouterLink>
    </p>
  </main>
</template>
