import { useState, useEffect, useRef, useMemo } from "react";
import { useOutletContext } from "react-router";
import { HxThemeToggle } from "../ui/hx-toggle";
import { SearchTrigger } from "../docs/search-command";
import { Copy, Check } from "lucide-react";
import { useTheme } from "../theme-context";
import { SectionJumpFab } from "../docs/section-jump-fab";
import { Button } from "../ui/hollaex-button";

/* ══════════════════════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════════════════════ */

type Shade = { step: string; hex: string };
type PrimitiveScale = {
  id: string;
  name: string;
  description: string;
  shades: Shade[];
};

const primitiveScales: PrimitiveScale[] = [
  {
    id: "silver",
    name: "Silver",
    description:
      "Cool blue-toned neutral scale used across all surfaces, borders, and text hierarchy in both themes.",
    shades: [
      { step: "50", hex: "#F2F4F5" },
      { step: "100", hex: "#E5E8EB" },
      { step: "200", hex: "#DFE3E6" },
      { step: "300", hex: "#CBD2D7" },
      { step: "400", hex: "#BEC7CD" },
      { step: "500", hex: "#889CA8" },
      { step: "600", hex: "#7C8E9A" },
      { step: "700", hex: "#4C5660" },
      { step: "800", hex: "#3A4149" },
      { step: "850", hex: "#343A41" },
      { step: "900", hex: "#282C32" },
      { step: "925", hex: "#22262B" },
      { step: "950", hex: "#1C1F23" },
      { step: "975", hex: "#16181B" },
      { step: "1000", hex: "#101214" },
    ],
  },
  {
    id: "neutral",
    name: "Neutral",
    description:
      "Pure gray scale without color tinting, used for light-mode surfaces and content hierarchy.",
    shades: [
      { step: "50", hex: "#FAFAFA" },
      { step: "100", hex: "#F5F5F5" },
      { step: "200", hex: "#F4F4F4" },
      { step: "300", hex: "#EBEBEB" },
      { step: "400", hex: "#EAEAEA" },
      { step: "500", hex: "#E1E1E1" },
      { step: "600", hex: "#DEDEDE" },
      { step: "700", hex: "#D5D5D5" },
      { step: "800", hex: "#D0D0D0" },
      { step: "900", hex: "#C4C4C4" },
      { step: "1000", hex: "#A1A1A1" },
      { step: "1100", hex: "#7A7A7A" },
      { step: "1200", hex: "#525252" },
      { step: "1300", hex: "#1A1A1A" },
      { step: "1400", hex: "#181818" },
      { step: "1500", hex: "#141414" },
      { step: "1600", hex: "#101010" },
      { step: "1700", hex: "#0C0C0C" },
    ],
  },
  {
    id: "blue",
    name: "Blue",
    description:
      "Brand blue scale used for interactive elements, focus states, links, and primary actions.",
    shades: [
      { step: "50", hex: "#EFF6FF" },
      { step: "100", hex: "#DBEAFE" },
      { step: "200", hex: "#BCD0F8" },
      { step: "300", hex: "#A7C1F7" },
      { step: "400", hex: "#7CA1F3" },
      { step: "500", hex: "#7CA3F0" },
      { step: "600", hex: "#3A73ED" },
      { step: "700", hex: "#2463EB" },
      { step: "800", hex: "#2059D4" },
      { step: "900", hex: "#1D4FBC" },
      { step: "950", hex: "#0D2352" },
    ],
  },
  {
    id: "red",
    name: "Red",
    description:
      "Danger / error scale used for destructive actions, error states, and alert indicators.",
    shades: [
      { step: "50", hex: "#FEF2F2" },
      { step: "100", hex: "#FEE2E2" },
      { step: "200", hex: "#FCEAEA" },
      { step: "300", hex: "#F5BFBF" },
      { step: "400", hex: "#F87171" },
      { step: "500", hex: "#E03E3E" },
      { step: "600", hex: "#DC2828" },
      { step: "700", hex: "#C62424" },
      { step: "800", hex: "#B02020" },
      { step: "900", hex: "#7B1414" },
      { step: "950", hex: "#6E1414" },
    ],
  },
  {
    id: "green",
    name: "Green",
    description:
      "Success scale used for positive feedback, completed states, and the toggle-on color.",
    shades: [
      { step: "50", hex: "#E8F6ED" },
      { step: "100", hex: "#B8E4C8" },
      { step: "200", hex: "#34D399" },
      { step: "300", hex: "#16A249" },
      { step: "400", hex: "#14903F" },
      { step: "500", hex: "#195F31" },
      { step: "900", hex: "#04200F" },
    ],
  },
  {
    id: "yellow",
    name: "Yellow",
    description:
      "Warning scale used for cautionary states, attention indicators, and warning alerts.",
    shades: [
      { step: "50", hex: "#FFFAE8" },
      { step: "100", hex: "#FDE68A" },
      { step: "200", hex: "#FACC14" },
      { step: "300", hex: "#D4A017" },
      { step: "400", hex: "#B8860B" },
      { step: "500", hex: "#7D660A" },
      { step: "900", hex: "#4B3D06" },
    ],
  },
  {
    id: "purple",
    name: "Purple",
    description:
      "Accent scale used for badge variants and decorative UI elements.",
    shades: [
      { step: "50", hex: "#F0ECF9" },
      { step: "100", hex: "#C4B5F0" },
      { step: "200", hex: "#A78BFA" },
      { step: "300", hex: "#6941C6" },
      { step: "900", hex: "#1E0A47" },
    ],
  },
  {
    id: "orange",
    name: "Orange",
    description:
      "Accent scale used for badge variants and chart elements.",
    shades: [
      { step: "50", hex: "#FFF4E8" },
      { step: "100", hex: "#FDC68A" },
      { step: "200", hex: "#FB923C" },
      { step: "300", hex: "#D47017" },
      { step: "900", hex: "#431407" },
    ],
  },
  {
    id: "pink",
    name: "Pink",
    description:
      "Accent scale used for badge variants and chart highlights.",
    shades: [
      { step: "50", hex: "#FCE8F0" },
      { step: "100", hex: "#F5B3CC" },
      { step: "200", hex: "#F472B6" },
      { step: "300", hex: "#C6175E" },
      { step: "900", hex: "#3B0720" },
    ],
  },
  {
    id: "olive",
    name: "Olive",
    description: "Accent scale used for badge variants.",
    shades: [
      { step: "50", hex: "#F0F3E8" },
      { step: "100", hex: "#C6D69E" },
      { step: "200", hex: "#A3B86C" },
      { step: "300", hex: "#5C6B24" },
      { step: "900", hex: "#1A2008" },
    ],
  },
];

/* ── Aliases ────────────────────────────────────────────────── */
type AliasToken = {
  name: string;
  cssVar: string;
  lightHex: string;
  darkHex: string;
  role: string;
};
type AliasCategory = {
  id: string;
  label: string;
  description: string;
  tokens: AliasToken[];
};

const aliasCategories: AliasCategory[] = [
  {
    id: "alias-bg",
    label: "Background",
    description:
      "Surface colors used for page layouts, canvas areas, navigation, and overlays.",
    tokens: [
      {
        name: "background",
        cssVar: "--background",
        lightHex: "#FFFFFF",
        darkHex: "#101214",
        role: "Default page background",
      },
      {
        name: "card",
        cssVar: "--card",
        lightHex: "#FFFFFF",
        darkHex: "#16181B",
        role: "Card and modal surfaces",
      },
      {
        name: "popover",
        cssVar: "--popover",
        lightHex: "#FFFFFF",
        darkHex: "#16181B",
        role: "Dropdown and tooltip backgrounds",
      },
      {
        name: "secondary",
        cssVar: "--secondary",
        lightHex: "#F4F4F4",
        darkHex: "#22262B",
        role: "Secondary surface / pill background",
      },
      {
        name: "muted",
        cssVar: "--muted",
        lightHex: "#F4F4F4",
        darkHex: "#22262B",
        role: "Subtle / less prominent backgrounds",
      },
      {
        name: "secondary-subtle",
        cssVar: "--secondary-subtle",
        lightHex: "#F5F5F5",
        darkHex: "#1C1F23",
        role: "Even lighter secondary surface",
      },
      {
        name: "secondary-subtle-hover",
        cssVar: "--secondary-subtle-hover",
        lightHex: "#EBEBEB",
        darkHex: "#22262B",
        role: "Secondary subtle hover state",
      },
      {
        name: "sidebar",
        cssVar: "--sidebar",
        lightHex: "#FFFFFF",
        darkHex: "#101214",
        role: "Sidebar background",
      },
      {
        name: "sidebar-accent",
        cssVar: "--sidebar-accent",
        lightHex: "#F4F4F4",
        darkHex: "#1C1F23",
        role: "Sidebar active item highlight",
      },
      {
        name: "input-background",
        cssVar: "--input-background",
        lightHex: "#FFFFFF",
        darkHex: "#16181B",
        role: "Input field background",
      },
      {
        name: "preview-header-bg",
        cssVar: "--preview-header-bg",
        lightHex: "#EAEAEA",
        darkHex: "#16181B",
        role: "Preview panel label bar",
      },
    ],
  },
  {
    id: "alias-text",
    label: "Text",
    description:
      "Foreground colors for content hierarchy, interactive labels, status messages, and inverse contexts.",
    tokens: [
      {
        name: "foreground",
        cssVar: "--foreground",
        lightHex: "#1A1A1A",
        darkHex: "#F2F4F5",
        role: "Primary page foreground",
      },
      {
        name: "color-text-primary",
        cssVar: "--color-text-primary",
        lightHex: "#1A1A1A",
        darkHex: "#F2F4F5",
        role: "Primary content text",
      },
      {
        name: "color-text-secondary",
        cssVar: "--color-text-secondary",
        lightHex: "#525252",
        darkHex: "#A0A7AD",
        role: "Secondary / supportive text",
      },
      {
        name: "muted-foreground",
        cssVar: "--muted-foreground",
        lightHex: "#525252",
        darkHex: "#A0A7AD",
        role: "Muted / de-emphasized text",
      },
      {
        name: "color-text-tertiary",
        cssVar: "--color-text-tertiary",
        lightHex: "#7A7A7A",
        darkHex: "#7B838A",
        role: "Tertiary / caption text",
      },
      {
        name: "color-text-disabled",
        cssVar: "--color-text-disabled",
        lightHex: "#C8C8C8",
        darkHex: "#404851",
        role: "Disabled text",
      },
      {
        name: "color-text-inverse",
        cssVar: "--color-text-inverse",
        lightHex: "#FFFFFF",
        darkHex: "#101214",
        role: "Text on dark/light inverse backgrounds",
      },
      {
        name: "color-text-brand",
        cssVar: "--color-text-brand",
        lightHex: "#2463EB",
        darkHex: "#3A73ED",
        role: "Brand-colored text",
      },
      {
        name: "color-text-danger",
        cssVar: "--color-text-danger",
        lightHex: "#DC2828",
        darkHex: "#DC2828",
        role: "Error / danger text",
      },
      {
        name: "primary-foreground",
        cssVar: "--primary-foreground",
        lightHex: "#FFFFFF",
        darkHex: "#FFFFFF",
        role: "Text on primary-colored elements",
      },
      {
        name: "card-foreground",
        cssVar: "--card-foreground",
        lightHex: "#1A1A1A",
        darkHex: "#F2F4F5",
        role: "Text on card surfaces",
      },
    ],
  },
  {
    id: "alias-border",
    label: "Border",
    description:
      "Divider, outline, focus ring, and interactive state borders across all components.",
    tokens: [
      {
        name: "border",
        cssVar: "--border",
        lightHex: "#E1E1E1",
        darkHex: "#343A41",
        role: "Default component border",
      },
      {
        name: "border-layout",
        cssVar: "--border-layout",
        lightHex: "#E6E6E6",
        darkHex: "#252A30",
        role: "Structural layout edges (sidebar, header)",
      },
      {
        name: "border-subtle",
        cssVar: "--border-subtle",
        lightHex: "#EBEBEB",
        darkHex: "#22262B",
        role: "Softer borders for cards and dividers",
      },
      {
        name: "color-border-subtle",
        cssVar: "--color-border-subtle",
        lightHex: "#E1E1E1",
        darkHex: "#343A41",
        role: "Component-level subtle border",
      },
      {
        name: "ring",
        cssVar: "--ring",
        lightHex: "#2463EB",
        darkHex: "#3A73ED",
        role: "Focus ring color",
      },
      {
        name: "focus-ring",
        cssVar: "--focus-ring",
        lightHex: "#2463EB",
        darkHex: "#3A73ED",
        role: "Interactive focus indicator",
      },
      {
        name: "focus-ring-offset",
        cssVar: "--focus-ring-offset",
        lightHex: "#FFFFFF",
        darkHex: "#101214",
        role: "Focus ring offset (gap between ring and element)",
      },
      {
        name: "sidebar-border",
        cssVar: "--sidebar-border",
        lightHex: "#E1E1E1",
        darkHex: "#22262B",
        role: "Sidebar divider border",
      },
    ],
  },
  {
    id: "alias-brand",
    label: "Brand / Primary",
    description:
      "Interactive brand tokens for buttons, links, and call-to-action elements.",
    tokens: [
      {
        name: "primary",
        cssVar: "--primary",
        lightHex: "#2463EB",
        darkHex: "#3A73ED",
        role: "Primary interactive color",
      },
      {
        name: "brand-default",
        cssVar: "--brand-default",
        lightHex: "#2463EB",
        darkHex: "#3A73ED",
        role: "Primary button default",
      },
      {
        name: "brand-hover",
        cssVar: "--brand-hover",
        lightHex: "#2059D4",
        darkHex: "#2463EB",
        role: "Primary button hover",
      },
      {
        name: "brand-active",
        cssVar: "--brand-active",
        lightHex: "#1D4FBC",
        darkHex: "#2059D4",
        role: "Primary button active / pressed",
      },
      {
        name: "brand-disabled",
        cssVar: "--brand-disabled",
        lightHex: "#7CA1F3",
        darkHex: "#0D2352",
        role: "Primary button disabled",
      },
      {
        name: "brand-subtle",
        cssVar: "--brand-subtle",
        lightHex: "#EFF6FF",
        darkHex: "rgba(58,115,237,0.12)",
        role: "Subtle brand surface",
      },
      {
        name: "brand-subtle-hover",
        cssVar: "--brand-subtle-hover",
        lightHex: "#DBEAFE",
        darkHex: "rgba(58,115,237,0.20)",
        role: "Subtle brand surface hover",
      },
      {
        name: "brand-fg",
        cssVar: "--brand-fg",
        lightHex: "#FFFFFF",
        darkHex: "#FFFFFF",
        role: "Text on brand-colored elements",
      },
    ],
  },
  {
    id: "alias-secondary",
    label: "Secondary",
    description:
      "Secondary button and interactive element tokens.",
    tokens: [
      {
        name: "secondary-default",
        cssVar: "--secondary-default",
        lightHex: "#181818",
        darkHex: "#F2F4F5",
        role: "Secondary button default",
      },
      {
        name: "secondary-hover",
        cssVar: "--secondary-hover",
        lightHex: "#101010",
        darkHex: "#E5E8EB",
        role: "Secondary button hover",
      },
      {
        name: "secondary-active",
        cssVar: "--secondary-active",
        lightHex: "#0C0C0C",
        darkHex: "#DFE3E6",
        role: "Secondary button active",
      },
      {
        name: "secondary-disabled",
        cssVar: "--secondary-disabled",
        lightHex: "#7A7A7A",
        darkHex: "#343A41",
        role: "Secondary button disabled",
      },
      {
        name: "secondary-fg",
        cssVar: "--secondary-fg",
        lightHex: "#FFFFFF",
        darkHex: "#101214",
        role: "Text on secondary buttons",
      },
    ],
  },
  {
    id: "alias-danger",
    label: "Danger",
    description:
      "Destructive action tokens for delete, error, and alert contexts.",
    tokens: [
      {
        name: "destructive",
        cssVar: "--destructive",
        lightHex: "#DC2828",
        darkHex: "#DC2828",
        role: "Destructive action base",
      },
      {
        name: "danger-default",
        cssVar: "--danger-default",
        lightHex: "#DC2828",
        darkHex: "#DC2828",
        role: "Danger button default",
      },
      {
        name: "danger-hover",
        cssVar: "--danger-hover",
        lightHex: "#E03E3E",
        darkHex: "#E03E3E",
        role: "Danger button hover",
      },
      {
        name: "danger-active",
        cssVar: "--danger-active",
        lightHex: "#C62424",
        darkHex: "#C62424",
        role: "Danger button active",
      },
      {
        name: "danger-disabled",
        cssVar: "--danger-disabled",
        lightHex: "#F5BFBF",
        darkHex: "#6E1414",
        role: "Danger button disabled",
      },
      {
        name: "danger-subtle",
        cssVar: "--danger-subtle",
        lightHex: "#FEF2F2",
        darkHex: "rgba(220,40,40,0.12)",
        role: "Subtle danger surface",
      },
      {
        name: "danger-fg",
        cssVar: "--danger-fg",
        lightHex: "#FFFFFF",
        darkHex: "#FFFFFF",
        role: "Text on danger elements",
      },
    ],
  },
  {
    id: "alias-status",
    label: "Status",
    description:
      "Semantic status tokens for info, success, warning, and error feedback UI.",
    tokens: [
      {
        name: "alert-info-bg",
        cssVar: "--alert-info-bg",
        lightHex: "#E9EFFD",
        darkHex: "rgba(58,115,237,0.10)",
        role: "Info alert background",
      },
      {
        name: "alert-info-border",
        cssVar: "--alert-info-border",
        lightHex: "#2463EB",
        darkHex: "#3A73ED",
        role: "Info alert accent border",
      },
      {
        name: "alert-info-icon",
        cssVar: "--alert-info-icon",
        lightHex: "#2463EB",
        darkHex: "#3A73ED",
        role: "Info alert icon color",
      },
      {
        name: "alert-success-bg",
        cssVar: "--alert-success-bg",
        lightHex: "#E8F6ED",
        darkHex: "rgba(22,162,73,0.10)",
        role: "Success alert background",
      },
      {
        name: "alert-success-border",
        cssVar: "--alert-success-border",
        lightHex: "#16A249",
        darkHex: "#16A249",
        role: "Success alert accent border",
      },
      {
        name: "alert-success-icon",
        cssVar: "--alert-success-icon",
        lightHex: "#16A249",
        darkHex: "#16A249",
        role: "Success alert icon color",
      },
      {
        name: "alert-warning-bg",
        cssVar: "--alert-warning-bg",
        lightHex: "#FFFAE8",
        darkHex: "rgba(250,204,20,0.10)",
        role: "Warning alert background",
      },
      {
        name: "alert-warning-border",
        cssVar: "--alert-warning-border",
        lightHex: "#FACC14",
        darkHex: "#FACC14",
        role: "Warning alert accent border",
      },
      {
        name: "alert-warning-icon",
        cssVar: "--alert-warning-icon",
        lightHex: "#D4A017",
        darkHex: "#D4A017",
        role: "Warning alert icon color",
      },
      {
        name: "alert-error-bg",
        cssVar: "--alert-error-bg",
        lightHex: "#FCEAEA",
        darkHex: "rgba(220,40,40,0.10)",
        role: "Error alert background",
      },
      {
        name: "alert-error-border",
        cssVar: "--alert-error-border",
        lightHex: "#DC2828",
        darkHex: "#DC2828",
        role: "Error alert accent border",
      },
      {
        name: "alert-error-icon",
        cssVar: "--alert-error-icon",
        lightHex: "#DC2828",
        darkHex: "#DC2828",
        role: "Error alert icon color",
      },
    ],
  },
];

/* ── Tokens (full reference) ────────────────────────────────── */
type DesignToken = {
  token: string;
  cssVar: string;
  role: string;
  lightValue: string;
  darkValue: string;
};
type TokenSection = {
  id: string;
  label: string;
  tokens: DesignToken[];
};

const tokenSections: TokenSection[] = [
  {
    id: "tok-bg",
    label: "Background Tokens",
    tokens: [
      {
        token: "$background",
        cssVar: "--background",
        role: "Default page background",
        lightValue: "#FFFFFF",
        darkValue: "#101214",
      },
      {
        token: "$card",
        cssVar: "--card",
        role: "Card and modal surface",
        lightValue: "#FFFFFF",
        darkValue: "#16181B",
      },
      {
        token: "$popover",
        cssVar: "--popover",
        role: "Dropdown and tooltip bg",
        lightValue: "#FFFFFF",
        darkValue: "#16181B",
      },
      {
        token: "$secondary",
        cssVar: "--secondary",
        role: "Secondary surface",
        lightValue: "#F4F4F4",
        darkValue: "#22262B",
      },
      {
        token: "$muted",
        cssVar: "--muted",
        role: "Muted background",
        lightValue: "#F4F4F4",
        darkValue: "#22262B",
      },
      {
        token: "$input-background",
        cssVar: "--input-background",
        role: "Input field background",
        lightValue: "#FFFFFF",
        darkValue: "#16181B",
      },
      {
        token: "$sidebar",
        cssVar: "--sidebar",
        role: "Sidebar surface",
        lightValue: "#FFFFFF",
        darkValue: "#101214",
      },
      {
        token: "$secondary-subtle",
        cssVar: "--secondary-subtle",
        role: "Subtle secondary surface",
        lightValue: "#F5F5F5",
        darkValue: "#1C1F23",
      },
      {
        token: "$preview-header-bg",
        cssVar: "--preview-header-bg",
        role: "Preview panel bar",
        lightValue: "#EAEAEA",
        darkValue: "#16181B",
      },
    ],
  },
  {
    id: "tok-text",
    label: "Text Tokens",
    tokens: [
      {
        token: "$foreground",
        cssVar: "--foreground",
        role: "Primary page foreground",
        lightValue: "#1A1A1A",
        darkValue: "#F2F4F5",
      },
      {
        token: "$color-text-primary",
        cssVar: "--color-text-primary",
        role: "Primary content text",
        lightValue: "#1A1A1A",
        darkValue: "#F2F4F5",
      },
      {
        token: "$color-text-secondary",
        cssVar: "--color-text-secondary",
        role: "Secondary text",
        lightValue: "#525252",
        darkValue: "#A0A7AD",
      },
      {
        token: "$color-text-tertiary",
        cssVar: "--color-text-tertiary",
        role: "Tertiary text",
        lightValue: "#7A7A7A",
        darkValue: "#7B838A",
      },
      {
        token: "$color-text-disabled",
        cssVar: "--color-text-disabled",
        role: "Disabled text",
        lightValue: "#C8C8C8",
        darkValue: "#404851",
      },
      {
        token: "$color-text-inverse",
        cssVar: "--color-text-inverse",
        role: "Inverse text",
        lightValue: "#FFFFFF",
        darkValue: "#101214",
      },
      {
        token: "$color-text-brand",
        cssVar: "--color-text-brand",
        role: "Brand text",
        lightValue: "#2463EB",
        darkValue: "#3A73ED",
      },
      {
        token: "$color-text-danger",
        cssVar: "--color-text-danger",
        role: "Error text",
        lightValue: "#DC2828",
        darkValue: "#DC2828",
      },
      {
        token: "$muted-foreground",
        cssVar: "--muted-foreground",
        role: "Muted text",
        lightValue: "#525252",
        darkValue: "#A0A7AD",
      },
      {
        token: "$primary-foreground",
        cssVar: "--primary-foreground",
        role: "Text on primary",
        lightValue: "#FFFFFF",
        darkValue: "#FFFFFF",
      },
    ],
  },
  {
    id: "tok-border",
    label: "Border Tokens",
    tokens: [
      {
        token: "$border",
        cssVar: "--border",
        role: "Default border",
        lightValue: "#E1E1E1",
        darkValue: "#343A41",
      },
      {
        token: "$border-layout",
        cssVar: "--border-layout",
        role: "Layout edges",
        lightValue: "#E6E6E6",
        darkValue: "#252A30",
      },
      {
        token: "$border-subtle",
        cssVar: "--border-subtle",
        role: "Subtle border",
        lightValue: "#EBEBEB",
        darkValue: "#22262B",
      },
      {
        token: "$ring",
        cssVar: "--ring",
        role: "Focus ring",
        lightValue: "#2463EB",
        darkValue: "#3A73ED",
      },
      {
        token: "$focus-ring",
        cssVar: "--focus-ring",
        role: "Focus indicator",
        lightValue: "#2463EB",
        darkValue: "#3A73ED",
      },
      {
        token: "$focus-ring-offset",
        cssVar: "--focus-ring-offset",
        role: "Focus ring offset",
        lightValue: "#FFFFFF",
        darkValue: "#101214",
      },
    ],
  },
  {
    id: "tok-brand",
    label: "Button — Primary",
    tokens: [
      {
        token: "$brand-default",
        cssVar: "--brand-default",
        role: "Primary default",
        lightValue: "#2463EB",
        darkValue: "#3A73ED",
      },
      {
        token: "$brand-hover",
        cssVar: "--brand-hover",
        role: "Primary hover",
        lightValue: "#2059D4",
        darkValue: "#2463EB",
      },
      {
        token: "$brand-active",
        cssVar: "--brand-active",
        role: "Primary active",
        lightValue: "#1D4FBC",
        darkValue: "#2059D4",
      },
      {
        token: "$brand-disabled",
        cssVar: "--brand-disabled",
        role: "Primary disabled",
        lightValue: "#7CA1F3",
        darkValue: "#0D2352",
      },
      {
        token: "$brand-subtle",
        cssVar: "--brand-subtle",
        role: "Subtle brand bg",
        lightValue: "#EFF6FF",
        darkValue: "rgba(58,115,237,0.12)",
      },
      {
        token: "$brand-fg",
        cssVar: "--brand-fg",
        role: "Text on brand",
        lightValue: "#FFFFFF",
        darkValue: "#FFFFFF",
      },
    ],
  },
  {
    id: "tok-secondary",
    label: "Button — Secondary",
    tokens: [
      {
        token: "$secondary-default",
        cssVar: "--secondary-default",
        role: "Secondary default",
        lightValue: "#181818",
        darkValue: "#F2F4F5",
      },
      {
        token: "$secondary-hover",
        cssVar: "--secondary-hover",
        role: "Secondary hover",
        lightValue: "#101010",
        darkValue: "#E5E8EB",
      },
      {
        token: "$secondary-active",
        cssVar: "--secondary-active",
        role: "Secondary active",
        lightValue: "#0C0C0C",
        darkValue: "#DFE3E6",
      },
      {
        token: "$secondary-disabled",
        cssVar: "--secondary-disabled",
        role: "Secondary disabled",
        lightValue: "#7A7A7A",
        darkValue: "#343A41",
      },
      {
        token: "$secondary-fg",
        cssVar: "--secondary-fg",
        role: "Text on secondary",
        lightValue: "#FFFFFF",
        darkValue: "#101214",
      },
    ],
  },
  {
    id: "tok-danger",
    label: "Button — Danger",
    tokens: [
      {
        token: "$danger-default",
        cssVar: "--danger-default",
        role: "Danger default",
        lightValue: "#DC2828",
        darkValue: "#DC2828",
      },
      {
        token: "$danger-hover",
        cssVar: "--danger-hover",
        role: "Danger hover",
        lightValue: "#E03E3E",
        darkValue: "#E03E3E",
      },
      {
        token: "$danger-active",
        cssVar: "--danger-active",
        role: "Danger active",
        lightValue: "#C62424",
        darkValue: "#C62424",
      },
      {
        token: "$danger-disabled",
        cssVar: "--danger-disabled",
        role: "Danger disabled",
        lightValue: "#F5BFBF",
        darkValue: "#6E1414",
      },
      {
        token: "$danger-subtle",
        cssVar: "--danger-subtle",
        role: "Subtle danger bg",
        lightValue: "#FEF2F2",
        darkValue: "rgba(220,40,40,0.12)",
      },
      {
        token: "$danger-fg",
        cssVar: "--danger-fg",
        role: "Text on danger",
        lightValue: "#FFFFFF",
        darkValue: "#FFFFFF",
      },
    ],
  },
  {
    id: "tok-alert",
    label: "Alert Tokens",
    tokens: [
      {
        token: "$alert-info-bg",
        cssVar: "--alert-info-bg",
        role: "Info alert bg",
        lightValue: "#E9EFFD",
        darkValue: "rgba(58,115,237,0.10)",
      },
      {
        token: "$alert-info-border",
        cssVar: "--alert-info-border",
        role: "Info alert border",
        lightValue: "#2463EB",
        darkValue: "#3A73ED",
      },
      {
        token: "$alert-info-icon",
        cssVar: "--alert-info-icon",
        role: "Info alert icon",
        lightValue: "#2463EB",
        darkValue: "#3A73ED",
      },
      {
        token: "$alert-success-bg",
        cssVar: "--alert-success-bg",
        role: "Success alert bg",
        lightValue: "#E8F6ED",
        darkValue: "rgba(22,162,73,0.10)",
      },
      {
        token: "$alert-success-border",
        cssVar: "--alert-success-border",
        role: "Success accent",
        lightValue: "#16A249",
        darkValue: "#16A249",
      },
      {
        token: "$alert-warning-bg",
        cssVar: "--alert-warning-bg",
        role: "Warning alert bg",
        lightValue: "#FFFAE8",
        darkValue: "rgba(250,204,20,0.10)",
      },
      {
        token: "$alert-warning-border",
        cssVar: "--alert-warning-border",
        role: "Warning accent",
        lightValue: "#FACC14",
        darkValue: "#FACC14",
      },
      {
        token: "$alert-error-bg",
        cssVar: "--alert-error-bg",
        role: "Error alert bg",
        lightValue: "#FCEAEA",
        darkValue: "rgba(220,40,40,0.10)",
      },
      {
        token: "$alert-error-border",
        cssVar: "--alert-error-border",
        role: "Error accent",
        lightValue: "#DC2828",
        darkValue: "#DC2828",
      },
    ],
  },
  {
    id: "tok-modal",
    label: "Modal Tokens",
    tokens: [
      {
        token: "$modal-overlay-bg",
        cssVar: "--modal-overlay-bg",
        role: "Modal backdrop",
        lightValue: "rgba(0,0,0,0.45)",
        darkValue: "rgba(0,0,0,0.65)",
      },
      {
        token: "$modal-bg",
        cssVar: "--modal-bg",
        role: "Modal background",
        lightValue: "#FFFFFF",
        darkValue: "#16181B",
      },
      {
        token: "$modal-fg",
        cssVar: "--modal-fg",
        role: "Modal text",
        lightValue: "#1A1A1A",
        darkValue: "#F2F4F5",
      },
      {
        token: "$modal-border",
        cssVar: "--modal-border",
        role: "Modal border",
        lightValue: "#EBEBEB",
        darkValue: "#343A41",
      },
      {
        token: "$modal-title-fg",
        cssVar: "--modal-title-fg",
        role: "Modal title",
        lightValue: "#1A1A1A",
        darkValue: "#F2F4F5",
      },
      {
        token: "$modal-desc-fg",
        cssVar: "--modal-desc-fg",
        role: "Modal description",
        lightValue: "#525252",
        darkValue: "#A0A7AD",
      },
      {
        token: "$modal-close-fg",
        cssVar: "--modal-close-fg",
        role: "Close icon",
        lightValue: "#7A7A7A",
        darkValue: "#7B838A",
      },
      {
        token: "$modal-close-hover-bg",
        cssVar: "--modal-close-hover-bg",
        role: "Close hover bg",
        lightValue: "#F4F4F4",
        darkValue: "#22262B",
      },
    ],
  },
  {
    id: "tok-toggle",
    label: "Toggle Tokens",
    tokens: [
      {
        token: "$toggle-on-bg",
        cssVar: "--toggle-on-bg",
        role: "Toggle on bg",
        lightValue: "#16A249",
        darkValue: "#16A249",
      },
      {
        token: "$toggle-on-hover-bg",
        cssVar: "--toggle-on-hover-bg",
        role: "Toggle on hover",
        lightValue: "#14903F",
        darkValue: "#14903F",
      },
      {
        token: "$toggle-off-bg",
        cssVar: "--toggle-off-bg",
        role: "Toggle off bg",
        lightValue: "#D4D4D4",
        darkValue: "#3A4149",
      },
      {
        token: "$toggle-off-hover-bg",
        cssVar: "--toggle-off-hover-bg",
        role: "Toggle off hover",
        lightValue: "#BFBFBF",
        darkValue: "#4C5660",
      },
      {
        token: "$toggle-disabled-bg",
        cssVar: "--toggle-disabled-bg",
        role: "Toggle disabled",
        lightValue: "#EBEBEB",
        darkValue: "#22262B",
      },
      {
        token: "$toggle-thumb-bg",
        cssVar: "--toggle-thumb-bg",
        role: "Toggle thumb",
        lightValue: "#FFFFFF",
        darkValue: "#FFFFFF",
      },
    ],
  },
];

/* ══════════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════════ */

function parseRGB(
  hex: string,
): [number, number, number] | null {
  const c = hex.replace("#", "");
  if (c.length < 6) return null;
  return [
    parseInt(c.slice(0, 2), 16),
    parseInt(c.slice(2, 4), 16),
    parseInt(c.slice(4, 6), 16),
  ];
}

function relativeLuminance(r: number, g: number, b: number) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928
      ? s / 12.92
      : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(
  hex1: string,
  hex2: string,
): number | null {
  const rgb1 = parseRGB(hex1);
  const rgb2 = parseRGB(hex2);
  if (!rgb1 || !rgb2) return null;
  const l1 = relativeLuminance(...rgb1);
  const l2 = relativeLuminance(...rgb2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function wcagRating(ratio: number): {
  aa: boolean;
  aaLarge: boolean;
  aaa: boolean;
} {
  return {
    aa: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaa: ratio >= 7,
  };
}

function isLightColor(hex: string): boolean {
  const rgb = parseRGB(hex);
  if (!rgb) return true;
  return (
    (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000 > 160
  );
}

/* Small WCAG contrast badge */
function ContrastBadge({
  hex,
  against = "#FFFFFF",
}: {
  hex: string;
  against?: string;
}) {
  const ratio = contrastRatio(hex, against);
  if (ratio === null) return null;
  const { aa, aaLarge, aaa } = wcagRating(ratio);
  const label = aaa
    ? "AAA"
    : aa
      ? "AA"
      : aaLarge
        ? "AA+"
        : "Fail";
  const light = isLightColor(hex);
  return (
    <span
      style={{
        fontFamily: "var(--font-family-supreme)",
        fontSize: "var(--text-indicator)",
        fontWeight: "var(--font-weight-bold)",
        color: light ? "rgba(0,0,0,0.62)" : "rgba(255,255,255,0.78)",
        letterSpacing: "var(--ls-overline)",
        whiteSpace: "nowrap",
        backgroundColor: light ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.10)",
        padding: "2px 6px",
        borderRadius: "var(--radius-xs)",
      }}
      title={`Contrast ${ratio.toFixed(2)}:1 vs ${against}`}
    >
      {against === "#FFFFFF" ? "W" : "B"} {ratio.toFixed(1)} {label}
    </span>
  );
}

function CopyButton({ text }: { text: string }) {
  return (
    <Button
      variant="ghost-secondary"
      size="xs"
      iconOnly
      copyText={text}
      onClick={(e) => e.stopPropagation()}
      title={`Copy ${text}`}
      style={{ borderRadius: "var(--radius-circle)", width: 24, height: 24 }}
    />
  );
}

/* Copy button that lives on a color swatch — adapts fg to light/dark */
function SwatchCopyButton({
  hex,
  isLight,
}: {
  hex: string;
  isLight: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const base = isLight ? "rgba(0,0,0," : "rgba(255,255,255,";
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(hex);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center justify-center rounded-full cursor-pointer transition-colors duration-[var(--duration-short-3)]"
      style={{
        width: "26px",
        height: "26px",
        backgroundColor: "transparent",
        color: `${base}0.35)`,
        border: "none",
        flexShrink: 0,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = `${base}0.08)`;
        e.currentTarget.style.color = `${base}0.75)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = `${base}0.35)`;
      }}
      title={`Copy ${hex}`}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}

/* Shared table header style */
const TH_STYLE: React.CSSProperties = {
  padding: "var(--space-3) var(--space-5)",
  fontSize: "var(--text-overline)",
  fontWeight: "var(--font-weight-bold)" as any,
  letterSpacing: "var(--ls-overline)",
  textTransform: "uppercase",
  color: "var(--muted-foreground)",
  fontFamily: "var(--font-family-supreme)",
};

/* ══════════════════════════════════════════════════════════════
   PRIMITIVES TAB
   ══════════════════════════════════════════════════════════════ */

function PrimitivesTab() {
  return (
    <div className="flex flex-col" style={{ gap: "48px" }}>
      {primitiveScales.map((scale) => (
        <section key={scale.id} id={scale.id} data-section-title={scale.name} className="color-section">
          {/* Section header */}
          <div style={{ marginBottom: "var(--space-6)" }}>
            <h3
              style={{
                fontFamily: "var(--font-family-supreme)",
                fontWeight: "var(--font-weight-bold)",
                fontSize: "var(--text-h3)",
                color: "var(--foreground)",
                letterSpacing: "var(--ls-h3)",
                marginBottom: "var(--space-2)",
              }}
            >
              {scale.name}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-family-supreme)",
                fontWeight: "var(--font-weight-regular)",
                fontSize: "var(--text-label)",
                color: "var(--muted-foreground)",
                lineHeight: 1.6,
              }}
            >
              {scale.description}
            </p>
          </div>

          {/* Big swatch cards — 6-column grid, each card spans 2 cols */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "var(--space-4)",
              marginBottom: "var(--space-6)",
            }}
          >
            {/* Dark to light: reverse the array for display (darkest first like screenshot) */}
            {[...scale.shades].reverse().map((shade) => {
              const light = isLightColor(shade.hex);
              const fg = light
                ? "rgba(0,0,0,0.82)"
                : "rgba(255,255,255,0.92)";
              const fgSub = light
                ? "rgba(0,0,0,0.48)"
                : "rgba(255,255,255,0.56)";
              const footerBg = light
                ? "rgba(0,0,0,0.04)"
                : "rgba(255,255,255,0.07)";
              return (
                <div
                  key={shade.step}
                  className="flex flex-col"
                  style={{
                    gridColumn: "span 2",
                    backgroundColor: shade.hex,
                    borderRadius: "var(--radius-card)",
                    border: `1px solid ${light ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.06)"}`,
                    minHeight: "152px",
                    overflow: "hidden",
                  }}
                >
                  {/* Top area: step number + scale name + copy btn */}
                  <div
                    className="flex-1 flex items-start justify-between"
                    style={{ padding: "var(--space-4) var(--space-4) var(--space-3) var(--space-5)" }}
                  >
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <span
                        style={{
                          fontFamily: "var(--font-family-supreme)",
                          fontWeight: "var(--font-weight-bold)",
                          fontSize: "var(--text-h4)",
                          color: fg,
                          lineHeight: "var(--lh-h4)",
                          letterSpacing: "var(--ls-h4)",
                        }}
                      >
                        {shade.step}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-family-supreme)",
                          fontWeight: "var(--font-weight-regular)",
                          fontSize: "var(--text-caption)",
                          color: fgSub,
                          marginTop: "var(--space-1)",
                          letterSpacing: "var(--ls-caption)",
                        }}
                      >
                        {scale.name}
                      </span>
                    </div>
                    <SwatchCopyButton hex={shade.hex} isLight={light} />
                  </div>
                  {/* Footer strip: hex + contrast badges */}
                  <div
                    className="flex items-center justify-between"
                    style={{
                      backgroundColor: footerBg,
                      padding: "var(--space-3) var(--space-4)",
                      borderTop: `1px solid ${light ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-family-supreme)",
                        fontWeight: "var(--font-weight-medium)",
                        fontSize: "var(--text-caption)",
                        color: fg,
                        textTransform: "uppercase",
                        letterSpacing: "var(--ls-caption)",
                      }}
                    >
                      {shade.hex}
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <ContrastBadge
                        hex={shade.hex}
                        against="#FFFFFF"
                      />
                      <ContrastBadge
                        hex={shade.hex}
                        against="#000000"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   ALIASES TAB
   ══════════════════════════════════════════════════════════════ */

function AliasesTab({
  mode,
}: {
  mode: "both" | "light" | "dark";
}) {
  return (
    <div className="flex flex-col" style={{ gap: "48px" }}>
      {aliasCategories.map((cat) => (
        <section key={cat.id} id={cat.id} data-section-title={cat.label} className="color-section">
          <div
            className="flex items-start justify-between"
            style={{ marginBottom: "var(--space-6)" }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-bold)",
                  fontSize: "var(--text-h3)",
                  color: "var(--foreground)",
                  letterSpacing: "var(--ls-h3)",
                  marginBottom: "var(--space-2)",
                }}
              >
                {cat.label}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-family-supreme)",
                  fontWeight: "var(--font-weight-regular)",
                  fontSize: "var(--text-label)",
                  color: "var(--muted-foreground)",
                  lineHeight: 1.6,
                  maxWidth: "520px",
                }}
              >
                {cat.description}
              </p>
            </div>
            <span
              className="shrink-0"
              style={{
                fontFamily: "var(--font-family-supreme)",
                fontSize: "var(--text-caption)",
                color: "var(--muted-foreground)",
                backgroundColor: "var(--secondary)",
                padding: "var(--space-1) var(--space-3)",
                borderRadius: "var(--radius-chip)",
              }}
            >
              {cat.tokens.length}
            </span>
          </div>

          {/* Big swatch cards — each spans 2 cols */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(6, 1fr)",
              gap: "var(--space-4)",
              marginBottom: "var(--space-6)",
            }}
          >
            {cat.tokens.map((t) => {
              const hex =
                mode === "dark" ? t.darkHex : t.lightHex;
              const light = isLightColor(hex);
              const fg = light
                ? "rgba(0,0,0,0.82)"
                : "rgba(255,255,255,0.92)";
              const fgSub = light
                ? "rgba(0,0,0,0.48)"
                : "rgba(255,255,255,0.56)";
              const footerBg = light
                ? "rgba(0,0,0,0.04)"
                : "rgba(255,255,255,0.07)";
              return (
                <div
                  key={t.name}
                  className="flex flex-col"
                  style={{
                    gridColumn: "span 2",
                    backgroundColor: hex,
                    borderRadius: "var(--radius-card)",
                    border: `1px solid ${light ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.06)"}`,
                    minHeight: "152px",
                    overflow: "hidden",
                  }}
                >
                  {/* Top area: token name + copy btn */}
                  <div
                    className="flex-1 flex items-start justify-between"
                    style={{ padding: "var(--space-4) var(--space-4) var(--space-3) var(--space-5)" }}
                  >
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <span
                        style={{
                          fontFamily: "var(--font-family-supreme)",
                          fontWeight: "var(--font-weight-bold)",
                          fontSize: "var(--text-body-sm)",
                          color: fg,
                          lineHeight: 1.25,
                          wordBreak: "break-all",
                        }}
                      >
                        {t.name}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-family-supreme)",
                          fontWeight: "var(--font-weight-regular)",
                          fontSize: "var(--text-caption)",
                          color: fgSub,
                          marginTop: "var(--space-1)",
                          wordBreak: "break-all",
                        }}
                      >
                        {t.cssVar}
                      </span>
                    </div>
                    <SwatchCopyButton hex={hex} isLight={light} />
                  </div>
                  {/* Footer strip: hex + contrast badges */}
                  <div
                    className="flex items-center justify-between"
                    style={{
                      backgroundColor: footerBg,
                      padding: "var(--space-3) var(--space-4)",
                      borderTop: `1px solid ${light ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)"}`,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-family-supreme)",
                        fontWeight: "var(--font-weight-medium)",
                        fontSize: "var(--text-caption)",
                        color: fg,
                        textTransform: "uppercase",
                        letterSpacing: "var(--ls-caption)",
                      }}
                    >
                      {hex}
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <ContrastBadge
                        hex={hex}
                        against="#FFFFFF"
                      />
                      <ContrastBadge
                        hex={hex}
                        against="#000000"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Token table */}
          <div
            className="overflow-hidden"
            style={{
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--border-subtle)",
              backgroundColor: "var(--background)",
            }}
          >
            <table
              className="w-full border-collapse"
              style={{
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <th
                    className="text-left"
                    style={{ ...TH_STYLE, width: "200px" }}
                  >
                    Token
                  </th>
                  <th className="text-left" style={TH_STYLE}>
                    Role
                  </th>
                  {(mode === "both" || mode === "light") && (
                    <th
                      className="text-left"
                      style={{ ...TH_STYLE, width: "150px" }}
                    >
                      Light
                    </th>
                  )}
                  {(mode === "both" || mode === "dark") && (
                    <th
                      className="text-left"
                      style={{ ...TH_STYLE, width: "150px" }}
                    >
                      Dark
                    </th>
                  )}
                  <th
                    className="text-center"
                    style={{ ...TH_STYLE, width: "90px" }}
                  >
                    WCAG
                  </th>
                </tr>
              </thead>
              <tbody>
                {cat.tokens.map((t) => (
                  <tr
                    key={t.name}
                    className="transition-colors duration-[var(--duration-short-2)]"
                    style={{
                      borderBottom:
                        "1px solid var(--secondary)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "var(--secondary-subtle)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor =
                        "transparent";
                    }}
                  >
                    <td style={{ padding: "10px 16px" }}>
                      <code
                        style={{
                          fontFamily:
                            "var(--font-family-supreme)",
                          fontSize: "11.5px",
                          fontWeight:
                            "var(--font-weight-medium)" as any,
                          color: "var(--foreground)",
                          backgroundColor: "var(--secondary)",
                          padding: "2px 8px",
                          borderRadius: "var(--radius-xs)",
                          border:
                            "1px solid var(--border-subtle)",
                        }}
                      >
                        {t.cssVar}
                      </code>
                    </td>
                    <td
                      style={{
                        padding: "10px 16px",
                        fontSize: "12.5px",
                        color: "var(--color-text-secondary)",
                      }}
                    >
                      {t.role}
                    </td>
                    {(mode === "both" || mode === "light") && (
                      <td style={{ padding: "10px 16px" }}>
                        <div className="flex items-center gap-2.5">
                          <span
                            className="shrink-0"
                            style={{
                              width: "22px",
                              height: "22px",
                              borderRadius: "var(--radius-xs)",
                              backgroundColor: t.lightHex,
                              border: `1px solid ${isLightColor(t.lightHex) ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)"}`,
                            }}
                          />
                          <span
                            style={{
                              fontSize: "var(--text-caption)",
                              color: "var(--muted-foreground)",
                              textTransform: "uppercase",
                            }}
                          >
                            {t.lightHex}
                          </span>
                        </div>
                      </td>
                    )}
                    {(mode === "both" || mode === "dark") && (
                      <td style={{ padding: "10px 16px" }}>
                        <div className="flex items-center gap-2.5">
                          <span
                            className="shrink-0"
                            style={{
                              width: "22px",
                              height: "22px",
                              borderRadius: "var(--radius-xs)",
                              backgroundColor: t.darkHex,
                              border: `1px solid ${isLightColor(t.darkHex) ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.06)"}`,
                            }}
                          />
                          <span
                            style={{
                              fontSize: "var(--text-caption)",
                              color: "var(--muted-foreground)",
                              textTransform: "uppercase",
                            }}
                          >
                            {t.darkHex}
                          </span>
                        </div>
                      </td>
                    )}
                    <td
                      style={{
                        padding: "10px 16px",
                        textAlign: "center",
                      }}
                    >
                      <ContrastBadge
                        hex={
                          mode === "dark"
                            ? t.darkHex
                            : t.lightHex
                        }
                        against={
                          mode === "dark"
                            ? "#101214"
                            : "#FFFFFF"
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TOKENS TAB
   ══════════════════════════════════════════════════════════════ */

function TokensTab({
  mode,
}: {
  mode: "both" | "light" | "dark";
}) {
  return (
    <div className="flex flex-col" style={{ gap: "48px" }}>
      {tokenSections.map((section) => (
        <section key={section.id} id={section.id} data-section-title={section.label} className="color-section">
          <h3
            style={{
              fontFamily: "var(--font-family-supreme)",
              fontWeight: "var(--font-weight-bold)",
              fontSize: "var(--text-h4)",
              color: "var(--foreground)",
              letterSpacing: "var(--ls-h4)",
              marginBottom: "var(--space-5)",
            }}
          >
            {section.label}{" "}
            <span
              style={{
                fontSize: "var(--text-body-sm)",
                fontWeight: "var(--font-weight-regular)" as any,
                color: "var(--muted-foreground)",
              }}
            >
              ({section.tokens.length})
            </span>
          </h3>

          <div
            className="overflow-hidden"
            style={{
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--border-subtle)",
              backgroundColor: "var(--background)",
            }}
          >
            <table
              className="w-full border-collapse"
              style={{
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <th
                    className="text-left"
                    style={{ ...TH_STYLE, width: "200px" }}
                  >
                    Token
                  </th>
                  <th className="text-left" style={TH_STYLE}>
                    Role
                  </th>
                  {(mode === "both" || mode === "light") && (
                    <th
                      className="text-left"
                      style={{ ...TH_STYLE, width: "160px" }}
                    >
                      Light Value
                    </th>
                  )}
                  {(mode === "both" || mode === "dark") && (
                    <th
                      className="text-left"
                      style={{ ...TH_STYLE, width: "160px" }}
                    >
                      Dark Value
                    </th>
                  )}
                  <th
                    className="text-center"
                    style={{ ...TH_STYLE, width: "70px" }}
                  >
                    Example
                  </th>
                </tr>
              </thead>
              <tbody>
                {section.tokens.map((t) => {
                  const displayHex =
                    mode === "dark"
                      ? t.darkValue
                      : t.lightValue;
                  return (
                    <tr
                      key={t.token}
                      className="transition-colors duration-[var(--duration-short-2)]"
                      style={{
                        borderBottom:
                          "1px solid var(--secondary)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "var(--secondary-subtle)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "transparent";
                      }}
                    >
                      <td style={{ padding: "12px 16px" }}>
                        <div className="flex items-center gap-2">
                          <code
                            style={{
                              fontFamily:
                                "var(--font-family-supreme)",
                              fontSize: "var(--text-caption)",
                              fontWeight:
                                "var(--font-weight-medium)" as any,
                              color: "var(--foreground)",
                              backgroundColor:
                                "var(--secondary)",
                              padding: "var(--space-1) var(--space-3)",
                              borderRadius: "var(--radius-xs)",
                              border:
                                "1px solid var(--border-subtle)",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {t.token}
                          </code>
                          <CopyButton
                            text={`var(${t.cssVar})`}
                          />
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "12px 16px",
                          fontSize: "12.5px",
                          color: "var(--color-text-secondary)",
                          lineHeight: 1.5,
                        }}
                      >
                        {t.role}
                      </td>
                      {(mode === "both" ||
                        mode === "light") && (
                        <td style={{ padding: "12px 16px" }}>
                          <span
                            style={{
                              fontSize: "var(--text-caption)",
                              color: "var(--muted-foreground)",
                              textTransform: "uppercase",
                              letterSpacing: "var(--ls-caption)",
                            }}
                          >
                            {t.lightValue}
                          </span>
                        </td>
                      )}
                      {(mode === "both" || mode === "dark") && (
                        <td style={{ padding: "12px 16px" }}>
                          <span
                            style={{
                              fontSize: "var(--text-caption)",
                              color: "var(--muted-foreground)",
                              textTransform: "uppercase",
                              letterSpacing: "var(--ls-caption)",
                            }}
                          >
                            {t.darkValue}
                          </span>
                        </td>
                      )}
                      <td style={{ padding: "12px 16px" }}>
                        <div className="flex items-center justify-center">
                          <span
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius:
                                "var(--radius-circle)",
                              backgroundColor: displayHex,
                              border: `1px solid ${isLightColor(displayHex) ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.08)"}`,
                              display: "block",
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   STICKY SIDE NAV
   ══════════════════════════════════════════════════════════════ */

type SideNavItem = { id: string; label: string; color?: string };

function SideNav({
  items,
  activeId,
}: {
  items: SideNavItem[];
  activeId: string;
}) {
  return (
    <nav
      className="sticky flex flex-col"
      style={{
        top: "120px",
        width: "160px",
        flexShrink: 0,
        fontFamily: "var(--font-family-supreme)",
        gap: "2px",
      }}
    >
      <span
        style={{
          fontSize: "var(--text-overline)",
          fontWeight: "var(--font-weight-bold)" as any,
          letterSpacing: "var(--ls-overline)",
          textTransform: "uppercase",
          color: "var(--muted-foreground)",
          padding: "0 var(--space-3) var(--space-3)",
          marginBottom: "var(--space-1)",
        }}
      >
        On this page
      </span>
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 truncate transition-colors duration-[var(--duration-short-3)]"
            style={{
              fontSize: "var(--text-body-sm)",
              fontWeight: isActive
                ? "var(--font-weight-medium)"
                : "var(--font-weight-regular)",
              color: isActive
                ? "var(--foreground)"
                : "var(--color-text-tertiary)",
              padding: "var(--space-2) var(--space-3)",
              borderRadius: "var(--radius-xs)",
              backgroundColor: isActive
                ? "var(--secondary-subtle)"
                : "transparent",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              if (!isActive)
                e.currentTarget.style.color =
                  "var(--foreground)";
            }}
            onMouseLeave={(e) => {
              if (!isActive)
                e.currentTarget.style.color =
                  "var(--color-text-tertiary)";
            }}
          >
            {item.color && (
              <span
                className="shrink-0"
                style={{
                  width: "16px",
                  height: "16px",
                  borderRadius: "var(--radius-circle)",
                  backgroundColor: item.color,
                  border: "1px solid var(--border)",
                }}
              />
            )}
            <span className="truncate">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
   ══════════════════════════════════════════════════════════════ */

type TabValue = "primitives" | "aliases" | "tokens";

export function ColorsPage() {
  const [activeTab, setActiveTab] =
    useState<TabValue>("primitives");
  const [mode, setMode] = useState<"both" | "light" | "dark">(
    "both",
  );
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  /* Breadcrumb shadow on scroll */
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Build side-nav items for current tab */
  const sideNavItems: SideNavItem[] = useMemo(() => {
    if (activeTab === "primitives")
      return primitiveScales.map((s) => {
        const mid = s.shades[Math.floor(s.shades.length / 2)];
        return { id: s.id, label: s.name, color: mid?.hex };
      });
    if (activeTab === "aliases")
      return aliasCategories.map((c) => ({
        id: c.id,
        label: c.label,
        color: theme === "dark" ? (c.tokens[0]?.darkHex ?? c.tokens[0]?.lightHex) : c.tokens[0]?.lightHex,
      }));
    return tokenSections.map((s) => ({
      id: s.id,
      label: s.label,
      color: theme === "dark" ? (s.tokens[0]?.darkValue ?? s.tokens[0]?.lightValue) : s.tokens[0]?.lightValue,
    }));
  }, [activeTab, theme]);

  /* Intersection observer for active section tracking */
  useEffect(() => {
    const ids = sideNavItems.map((i) => i.id);
    const elems = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (elems.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 },
    );
    elems.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [sideNavItems]);

  /* Counts */
  const totalPrimShades = primitiveScales.reduce(
    (a, s) => a + s.shades.length,
    0,
  );
  const totalAliases = aliasCategories.reduce(
    (a, c) => a + c.tokens.length,
    0,
  );
  const totalTokens = tokenSections.reduce(
    (a, s) => a + s.tokens.length,
    0,
  );
  const countLabel =
    activeTab === "primitives"
      ? `${totalPrimShades} shades`
      : activeTab === "aliases"
        ? `${totalAliases} aliases`
        : `${totalTokens} tokens`;

  const tabItems: { value: TabValue; label: string }[] = [
    { value: "primitives", label: "Primitives" },
    { value: "aliases", label: "Aliases" },
    { value: "tokens", label: "Tokens" },
  ];

  return (
    <div
      className="min-h-full"
      style={{
        backgroundColor: "var(--secondary-subtle)",
        fontFamily: "var(--font-family-supreme)",
      }}
    >
      <div
        ref={sentinelRef}
        className="h-0 w-full"
        aria-hidden="true"
      />

      {/* ── Sticky header — single row, consistent with other pages ── */}
      <div
        className="border-b sticky top-0 z-10 h-[72px] transition-shadow duration-[var(--duration-short-4)] relative"
        style={{
          borderColor: "var(--border-subtle)",
          backgroundColor: "var(--background)",
          boxShadow: scrolled ? "var(--elevation-sm)" : "none",
        }}
      >
        {/* Full-width layer: breadcrumb left, controls right */}
        <div className="h-full flex items-center justify-between relative z-[1]" style={{ padding: "0 var(--space-10)" }}>
          <div className="flex items-center shrink-0" style={{ gap: "var(--space-3)" }}>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>Foundation</span>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--border)" }}>&rsaquo;</span>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--foreground)", fontWeight: "var(--font-weight-bold)" as any, fontFamily: "var(--font-family-supreme)" }}>Colors</span>
          </div>
          <div className="flex items-center shrink-0" style={{ gap: "var(--space-5)" }}>
            <span style={{ fontSize: "var(--text-caption)", color: "var(--muted-foreground)", fontFamily: "var(--font-family-supreme)" }}>{countLabel}</span>
            <ColorsSearch />
            <HxThemeToggle size="lg" />
          </div>
        </div>

        {/* Centered tab layer — aligned with content container below */}
        <div className="absolute inset-0 h-full flex items-center pointer-events-none" style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 var(--space-8)" }}>
          <div className="flex pointer-events-auto" role="tablist" style={{ fontFamily: "var(--font-family-supreme)" }}>
            {tabItems.map((tab) => {
              const isActive = tab.value === activeTab;
              return (
                <button
                  key={tab.value}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.value)}
                  className="relative flex items-center justify-center cursor-pointer select-none outline-none transition-colors duration-[var(--duration-short-3)]"
                  style={{
                    height: "72px",
                    padding: "0 var(--space-5)",
                    fontSize: "var(--text-body)",
                    fontWeight: isActive ? "var(--font-weight-medium)" : "var(--font-weight-regular)",
                    color: isActive ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
                    fontFamily: "var(--font-family-supreme)",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = "var(--color-text-secondary)"; }}
                  onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "var(--color-text-tertiary)"; }}
                >
                  {tab.label}
                  <span
                    className="absolute bottom-0 left-0 w-full transition-transform duration-[var(--duration-medium-2)] origin-left"
                    style={{
                      height: "2px",
                      backgroundColor: "var(--brand-default)",
                      transform: isActive ? "scaleX(1)" : "scaleX(0)",
                      transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Page body: side-nav + content ─────────────────── */}
      <div
        className="flex"
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "0 var(--space-8)",
        }}
      >
        {/* Sticky side nav */}
        <div
          className="shrink-0"
          style={{ width: "200px", paddingTop: "var(--space-10)", paddingRight: "var(--space-8)" }}
        >
          <SideNav
            items={sideNavItems}
            activeId={activeSection}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Page header — only first load */}
          <div style={{ paddingTop: "var(--space-10)", paddingBottom: "var(--space-9)" }}>
            <h1
              style={{
                fontSize: "var(--text-huge)",
                fontWeight: "var(--font-weight-bold)" as any,
                color: "var(--foreground)",
                lineHeight: "var(--lh-huge)",
                letterSpacing: "var(--ls-huge)",
                marginBottom: "var(--space-5)",
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              Colors
            </h1>
            <p
              style={{
                fontSize: "var(--text-base)",
                color: "var(--muted-foreground)",
                lineHeight: 1.6,
                maxWidth: "600px",
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              The HollaEx color system is organized into three
              layers: primitive shade scales, semantic aliases
              that map intentions to values, and the full design
              token reference for both light and dark themes.
            </p>
          </div>

          {/* Tab content */}
          <div style={{ paddingBottom: "var(--space-10)" }}>
            {/* Theme mode toggle — inline action for aliases/tokens */}
            {activeTab !== "primitives" && (
              <div className="flex items-center" style={{ gap: "var(--space-4)", paddingBottom: "var(--space-7)" }}>
                <span
                  style={{
                    fontSize: "var(--text-meta)",
                    color: "var(--muted-foreground)",
                    fontFamily: "var(--font-family-supreme)",
                  }}
                >
                  Show values in
                </span>
                <div
                  className="flex items-center gap-0.5 p-0.5 rounded-md"
                  style={{ backgroundColor: "var(--secondary)" }}
                >
                  {(["both", "light", "dark"] as const).map(
                    (m) => (
                      <button
                        key={m}
                        onClick={() => setMode(m)}
                        className="px-2.5 py-1 rounded transition-all cursor-pointer"
                        style={{
                          fontSize: "var(--text-caption)",
                          backgroundColor:
                            mode === m
                              ? "var(--background)"
                              : "transparent",
                          color:
                            mode === m
                              ? "var(--foreground)"
                              : "var(--muted-foreground)",
                          fontWeight:
                            mode === m
                              ? "var(--font-weight-medium)"
                              : "var(--font-weight-regular)",
                          boxShadow:
                            mode === m
                              ? "0 1px 2px rgba(0,0,0,0.08)"
                              : "none",
                          fontFamily:
                            "var(--font-family-supreme)",
                          border: "none",
                        }}
                      >
                        {m === "both"
                          ? "Both"
                          : m === "light"
                            ? "Light"
                            : "Dark"}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
            {activeTab === "primitives" && <PrimitivesTab />}
            {activeTab === "aliases" && (
              <AliasesTab mode={mode} />
            )}
            {activeTab === "tokens" && (
              <TokensTab mode={mode} />
            )}
          </div>

          {/* Footer */}
          <div
            className="border-t flex items-center justify-between"
            style={{ padding: "var(--space-8) 0", borderColor: "var(--secondary)" }}
          >
            <p
              style={{
                fontSize: "var(--text-meta)",
                color: "var(--muted-foreground)",
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              HollaEx Design System · Colors
            </p>
            <p
              style={{
                fontSize: "var(--text-meta)",
                color: "var(--muted-foreground)",
                fontFamily: "var(--font-family-supreme)",
              }}
            >
              {totalPrimShades} primitives · {totalAliases}{" "}
              aliases · {totalTokens} tokens
            </p>
          </div>
        </div>
      </div>

      <SectionJumpFab
        sectionSelector=".color-section[data-section-title]"
        titleExtractor={(el) => ({
          id: el.id,
          title: el.dataset.sectionTitle || "",
        })}
        showColorDots
      />
    </div>
  );
}

/* ── Search trigger ──────────���──────────────────────────────── */
function ColorsSearch() {
  const ctx = useOutletContext<
    { open: boolean; setOpen: (v: boolean) => void } | undefined
  >();
  if (!ctx) return null;
  return <SearchTrigger onClick={() => ctx.setOpen(true)} />;
}