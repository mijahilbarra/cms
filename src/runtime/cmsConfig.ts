export type CmsRouteConfig = {
  basePath: string;
  loginPath: string;
  registerPath: string;
  homePath: string;
};

let cmsRouteConfig: CmsRouteConfig = {
  basePath: "/admin",
  loginPath: "/ingresar",
  registerPath: "/registro",
  homePath: "/"
};

export function setCmsRouteConfig(nextConfig: Partial<CmsRouteConfig>): void {
  cmsRouteConfig = {
    ...cmsRouteConfig,
    ...nextConfig
  };
}

export function getCmsRouteConfig(): CmsRouteConfig {
  return cmsRouteConfig;
}
