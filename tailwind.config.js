/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./.storybook/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			// Design System Tokens
			colors: {
				// Primary brand colors
				primary: {
					50: "#eff6ff",
					100: "#dbeafe",
					200: "#bfdbfe",
					300: "#93c5fd",
					400: "#60a5fa",
					500: "#3b82f6",
					600: "#2563eb",
					700: "#1d4ed8",
					800: "#1e40af",
					900: "#1e3a8a",
					950: "#172554",
				},
				// Surface colors for cards and backgrounds
				surface: {
					50: "#f8fafc",
					100: "#f1f5f9",
					200: "#e2e8f0",
					300: "#cbd5e1",
					400: "#94a3b8",
					500: "#64748b",
					600: "#475569",
					700: "#334155",
					800: "#1e293b",
					900: "#0f172a",
					950: "#020617",
				},
				// Semantic colors
				semantic: {
					success: "#10b981",
					warning: "#f59e0b",
					error: "#ef4444",
					info: "#3b82f6",
				},
			},
			// Design system spacing
			spacing: {
				xs: "0.25rem", // 4px
				sm: "0.5rem", // 8px
				md: "1rem", // 16px
				lg: "1.5rem", // 24px
				xl: "2rem", // 32px
				"2xl": "3rem", // 48px
				"3xl": "4rem", // 64px
			},
			// Typography scale
			fontSize: {
				xs: ["0.75rem", { lineHeight: "1rem" }],
				sm: ["0.875rem", { lineHeight: "1.25rem" }],
				base: ["1rem", { lineHeight: "1.5rem" }],
				lg: ["1.125rem", { lineHeight: "1.75rem" }],
				xl: ["1.25rem", { lineHeight: "1.75rem" }],
				"2xl": ["1.5rem", { lineHeight: "2rem" }],
				"3xl": ["1.875rem", { lineHeight: "2.25rem" }],
				"4xl": ["2.25rem", { lineHeight: "2.5rem" }],
			},
			// Border radius scale
			borderRadius: {
				xs: "0.125rem",
				sm: "0.25rem",
				md: "0.375rem",
				lg: "0.5rem",
				xl: "0.75rem",
			},
		},
	},
	plugins: [],
};
