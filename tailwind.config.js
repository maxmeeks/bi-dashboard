import {
	colors,
	spacing,
	fontSize,
	borderRadius,
} from "./src/design-system/tokens.js";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./.storybook/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			// Design System Tokens imported from TypeScript
			colors,
			spacing,
			fontSize: {
				// Convert fontSize tokens to Tailwind format (with line heights)
				xs: [fontSize.xs, { lineHeight: "1rem" }],
				sm: [fontSize.sm, { lineHeight: "1.25rem" }],
				base: [fontSize.base, { lineHeight: "1.5rem" }],
				lg: [fontSize.lg, { lineHeight: "1.75rem" }],
				xl: [fontSize.xl, { lineHeight: "1.75rem" }],
				"2xl": [fontSize["2xl"], { lineHeight: "2rem" }],
				"3xl": [fontSize["3xl"], { lineHeight: "2.25rem" }],
				"4xl": [fontSize["4xl"], { lineHeight: "2.5rem" }],
			},
			borderRadius,
		},
	},
	plugins: [],
};
