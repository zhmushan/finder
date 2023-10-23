import type { Config } from "tailwindcss";
import daisyui from "daisyui";
import { addDynamicIconSelectors } from "@iconify/tailwind";
import themes from "./src/themes";

export default {
  content: ["./index.html", "./src/**/*.vue"],
  plugins: [daisyui, addDynamicIconSelectors()],
  daisyui: { themes },
} satisfies Config;
