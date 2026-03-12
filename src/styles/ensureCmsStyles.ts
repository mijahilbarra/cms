import tailwindCssText from "./tailwind.css?inline";
import cmsStaticCssText from "./cms-static.css?inline";

const CMS_STYLE_TAG_ID = "pif-warriors-cms-inline-styles";

export function ensureCmsStyles(): void {
  if (typeof document === "undefined") {
    return;
  }

  if (document.getElementById(CMS_STYLE_TAG_ID)) {
    return;
  }

  const styleTag = document.createElement("style");
  styleTag.id = CMS_STYLE_TAG_ID;
  styleTag.setAttribute("data-source", "@elmuki/pif-warriors-cms");
  styleTag.textContent = `${tailwindCssText}\n${cmsStaticCssText}`;
  document.head.appendChild(styleTag);
}
