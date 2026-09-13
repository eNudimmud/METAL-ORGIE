"use client";

import type { MouseEvent } from "react";
import { withBasePath } from "@/lib/base-path";

function closeMenu(event: MouseEvent<HTMLAnchorElement>) {
  event.currentTarget.closest("details")?.removeAttribute("open");
}

export function MobileMenu() {
  return (
    <details className="mobile-menu">
      <summary aria-label="Ouvrir le menu">Menu</summary>
      <nav aria-label="Navigation mobile">
        <a href={withBasePath("/realisations/")} onClick={closeMenu}>
          Réalisations
        </a>
        <a href={withBasePath("/#atelier")} onClick={closeMenu}>
          L&apos;atelier
        </a>
        <a href={withBasePath("/#guillaume")} onClick={closeMenu}>
          Guillaume
        </a>
        <a href={withBasePath("/#contact")} onClick={closeMenu}>
          Parler de votre projet
        </a>
      </nav>
    </details>
  );
}
