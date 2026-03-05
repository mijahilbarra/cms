<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { rolActual } from "../../firebase/auth";
import { actualizarRolUsuario, listarUsuarios } from "../../services/userService";
import type { AppUser, NullableUserRole } from "../../types/user";

const users = ref<AppUser[]>([]);
const cargando = ref(false);
const error = ref("");
const mensaje = ref("");
const actualizando = ref<string | null>(null);

const puedeEditarRoles = computed(() => rolActual.value === "admin");

const roleOptions: Array<{ label: string; value: NullableUserRole }> = [
  { label: "Admin", value: "admin" },
  { label: "Writer", value: "writer" },
  { label: "Manager", value: "manager" },
  { label: "Sin rol", value: null }
];

onMounted(async () => {
  await cargarUsuarios();
});

async function cargarUsuarios(): Promise<void> {
  cargando.value = true;
  error.value = "";
  try {
    users.value = await listarUsuarios();
  } catch {
    error.value = "No se pudieron cargar los usuarios.";
  } finally {
    cargando.value = false;
  }
}

async function toggleRole(user: AppUser, selectedRole: NullableUserRole): Promise<void> {
  mensaje.value = "";
  error.value = "";

  if (!puedeEditarRoles.value) {
    error.value = "Solo un admin puede cambiar roles.";
    return;
  }

  const nextRole = user.role === selectedRole ? null : selectedRole;
  actualizando.value = user.id;

  try {
    await actualizarRolUsuario(user.id, nextRole);
    user.role = nextRole;
    mensaje.value = "Rol actualizado correctamente.";
  } catch {
    error.value = "No se pudo actualizar el rol.";
  } finally {
    actualizando.value = null;
  }
}

function roleChecked(current: NullableUserRole, option: NullableUserRole): boolean {
  return current === option;
}

function roleLabel(role: NullableUserRole): string {
  if (role === null) {
    return "Sin rol";
  }
  return role.charAt(0).toUpperCase() + role.slice(1);
}

function formatDate(value: AppUser["lastLoginAt"]): string {
  const date = value?.toDate?.();
  if (!date) {
    return "Sin registros";
  }
  return date.toLocaleString("es-ES");
}
</script>

<template>
  <section class="rounded-2xl border border-slate-200 bg-white p-5">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-black text-slate-900">Usuarios</h3>
      <button
        type="button"
        class="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        @click="cargarUsuarios"
      >
        Recargar
      </button>
    </div>
    <p class="mt-1 text-sm text-slate-600">Listado de usuarios con último login y control de rol.</p>

    <p v-if="!puedeEditarRoles" class="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
      Solo usuarios con rol admin pueden editar roles.
    </p>

    <p v-if="error" class="mt-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
      {{ error }}
    </p>
    <p
      v-if="mensaje"
      class="mt-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700"
    >
      {{ mensaje }}
    </p>

    <p v-if="cargando" class="mt-4 text-sm text-slate-500">Cargando usuarios...</p>
    <p v-else-if="users.length === 0" class="mt-4 text-sm text-slate-500">No hay usuarios registrados.</p>

    <div v-else class="mt-4 space-y-3">
      <article
        v-for="user in users"
        :key="user.id"
        class="rounded-lg border border-slate-200 p-4"
      >
        <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="text-sm font-semibold text-slate-900">{{ user.email || user.id }}</p>
            <p class="text-xs text-slate-500">UID: {{ user.id }}</p>
            <p class="text-xs text-slate-500">Último login: {{ formatDate(user.lastLoginAt) }}</p>
            <p class="text-xs text-slate-500">Rol actual: {{ roleLabel(user.role) }}</p>
          </div>

          <div class="flex flex-wrap gap-3">
            <label
              v-for="option in roleOptions"
              :key="option.label"
              class="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-700"
            >
              <input
                type="checkbox"
                :checked="roleChecked(user.role, option.value)"
                :disabled="!puedeEditarRoles || actualizando === user.id"
                @change="toggleRole(user, option.value)"
              />
              {{ option.label }}
            </label>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
