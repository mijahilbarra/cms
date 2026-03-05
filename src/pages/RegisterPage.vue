<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { registrarUsuario } from "../firebase/auth";
import { getCmsRouteConfig } from "../runtime/cmsConfig";

const router = useRouter();
const { basePath, loginPath } = getCmsRouteConfig();

const email = ref("");
const password = ref("");
const confirmarPassword = ref("");
const loading = ref(false);
const error = ref("");

async function submit(): Promise<void> {
  error.value = "";
  if (password.value !== confirmarPassword.value) {
    error.value = "Las contraseñas no coinciden.";
    return;
  }

  loading.value = true;
  try {
    await registrarUsuario(email.value, password.value);
    await router.push(basePath);
  } catch {
    error.value = "No se pudo crear la cuenta. Revisa el formato del correo y contraseña.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <main class="cms-main-shell mx-auto max-w-md px-5 py-14">
    <h1 class="text-3xl font-black text-[var(--pw-text)]">Crear cuenta</h1>
    <p class="mt-2 text-sm text-[var(--pw-muted-text)]">Registro para administrar contenido.</p>

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
          minlength="6"
          required
          class="w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]"
          placeholder="Mínimo 6 caracteres"
        />
      </div>

      <div>
        <label class="mb-1 block text-sm font-semibold text-[var(--pw-muted-text)]">Confirmar contraseña</label>
        <input
          v-model="confirmarPassword"
          type="password"
          minlength="6"
          required
          class="w-full rounded-md border border-[var(--pw-border)] px-3 py-2 text-sm outline-none focus:border-[var(--pw-accent)]"
          placeholder="Repite la contraseña"
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
        {{ loading ? "Creando cuenta..." : "Registrarme" }}
      </button>
    </form>

    <p class="mt-4 text-sm text-[var(--pw-muted-text)]">
      ¿Ya tienes cuenta?
      <RouterLink :to="loginPath" class="font-semibold text-[var(--pw-accent)]">Iniciar sesión</RouterLink>
    </p>
  </main>
</template>
