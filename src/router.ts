import type { RouteRecordRaw, Router } from "vue-router";
import { esperarAuthLista, initCmsAuthListener, usuarioActual } from "./firebase/auth";
import type { CmsFirebaseServices } from "./firebase/context";
import { setCmsFirebaseServices } from "./firebase/context";
import { setCmsRouteConfig } from "./runtime/cmsConfig";
import LoginPage from "./pages/LoginPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import AdminLayoutPage from "./pages/admin/AdminLayoutPage.vue";
import AdminBlogPage from "./pages/admin/AdminBlogPage.vue";
import AdminSchemasPage from "./pages/admin/AdminSchemasPage.vue";
import AdminUsersPage from "./pages/admin/AdminUsersPage.vue";

export type RegisterPifWarriorsCmsOptions = {
  firebase: CmsFirebaseServices;
  basePath?: string;
  loginPath?: string;
  registerPath?: string;
  homePath?: string;
};

const installedRouters = new WeakSet<Router>();

export function registerPifWarriorsCms(
  router: Router,
  options: RegisterPifWarriorsCmsOptions
): void {
  if (installedRouters.has(router)) {
    return;
  }

  const basePath = normalizePath(options.basePath ?? "/admin");
  const loginPath = normalizePath(options.loginPath ?? "/ingresar");
  const registerPath = normalizePath(options.registerPath ?? "/registro");
  const homePath = normalizeHomePath(options.homePath ?? "/");

  setCmsFirebaseServices(options.firebase);
  setCmsRouteConfig({ basePath, loginPath, registerPath, homePath });
  initCmsAuthListener();

  const routes = createCmsRoutes(basePath, loginPath, registerPath);
  for (const route of routes) {
    router.addRoute(route);
  }

  router.beforeEach(async (to) => {
    await esperarAuthLista();

    if (to.meta.cmsRequiresAuth && !usuarioActual.value) {
      return {
        path: loginPath,
        query: { redirect: to.fullPath }
      };
    }

    const isGuestPath = to.path === loginPath || to.path === registerPath || to.meta.cmsGuestOnly;
    if (isGuestPath && usuarioActual.value) {
      return { path: basePath };
    }

    return true;
  });

  installedRouters.add(router);
}

export function createCmsRoutes(
  basePath = "/admin",
  loginPath = "/ingresar",
  registerPath = "/registro"
): RouteRecordRaw[] {
  const safeBase = normalizePath(basePath);
  const safeLogin = normalizePath(loginPath);
  const safeRegister = normalizePath(registerPath);

  return [
    { path: safeLogin, component: LoginPage, meta: { cmsGuestOnly: true } },
    { path: safeRegister, component: RegisterPage, meta: { cmsGuestOnly: true } },
    {
      path: safeBase,
      component: AdminLayoutPage,
      meta: { cmsRequiresAuth: true },
      children: [
        { path: "", redirect: `${safeBase}/content` },
        { path: "content", component: AdminBlogPage, meta: { cmsRequiresAuth: true } },
        { path: "schemas", component: AdminSchemasPage, meta: { cmsRequiresAuth: true } },
        { path: "users", component: AdminUsersPage, meta: { cmsRequiresAuth: true } }
      ]
    }
  ];
}

function normalizePath(input: string): string {
  const value = String(input || "").trim();
  if (!value) {
    return "/";
  }
  return value.startsWith("/") ? value : `/${value}`;
}

function normalizeHomePath(input: string): string {
  const value = String(input || "").trim();
  if (!value) {
    return "/";
  }
  if (/^(https?:)?\/\//i.test(value)) {
    return value;
  }
  return value.startsWith("/") ? value : `/${value}`;
}
