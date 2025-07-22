// Design System Tokens
// These tokens correspond to our Tailwind config and provide type-safe access to design values

export const colors = {
	primary: {
		50: "#eff6ff",
		100: "#dbeafe",
		200: "#bfdbfe",
		300: "#93c5fd",
		400: "#60a5fa",
		500: "#3b82f6", // Primary brand color
		600: "#2563eb",
		700: "#1d4ed8",
		800: "#1e40af",
		900: "#1e3a8a",
		950: "#172554",
	},
	surface: {
		50: "#f8fafc", // Light background
		100: "#f1f5f9", // Card backgrounds
		200: "#e2e8f0", // Borders
		300: "#cbd5e1", // Disabled states
		400: "#94a3b8", // Placeholder text
		500: "#64748b", // Secondary text
		600: "#475569", // Body text
		700: "#334155", // Headings
		800: "#1e293b", // Dark backgrounds
		900: "#0f172a", // Primary text
		950: "#020617", // Maximum contrast
	},
	semantic: {
		success: "#10b981",
		warning: "#f59e0b",
		error: "#ef4444",
		info: "#3b82f6",
	},
} as const;

export const spacing = {
	xs: "0.25rem", // 4px
	sm: "0.5rem", // 8px
	md: "1rem", // 16px
	lg: "1.5rem", // 24px
	xl: "2rem", // 32px
	"2xl": "3rem", // 48px
	"3xl": "4rem", // 64px
} as const;

export const fontSize = {
	xs: "0.75rem", // 12px
	sm: "0.875rem", // 14px
	base: "1rem", // 16px
	lg: "1.125rem", // 18px
	xl: "1.25rem", // 20px
	"2xl": "1.5rem", // 24px
	"3xl": "1.875rem", // 30px
	"4xl": "2.25rem", // 36px
} as const;

export const borderRadius = {
	xs: "0.125rem", // 2px
	sm: "0.25rem", // 4px
	md: "0.375rem", // 6px
	lg: "0.5rem", // 8px
	xl: "0.75rem", // 12px
} as const;

export const shadows = {
	card: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
	cardHover:
		"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
	focus: "0 0 0 2px rgb(59 130 246 / 0.5)", // primary-500 with opacity
} as const;

// Component size variants
export const componentSizes = {
	sm: {
		padding: spacing.sm,
		fontSize: fontSize.sm,
		height: "2rem", // 32px
	},
	md: {
		padding: spacing.md,
		fontSize: fontSize.base,
		height: "2.5rem", // 40px
	},
	lg: {
		padding: spacing.lg,
		fontSize: fontSize.lg,
		height: "3rem", // 48px
	},
} as const;

// Breakpoints (matching Tailwind's defaults)
export const breakpoints = {
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
	"2xl": "1536px",
} as const;

// Animation values
export const animations = {
	fast: "150ms",
	normal: "200ms",
	slow: "300ms",
	easing: {
		in: "ease-in",
		out: "ease-out",
		inOut: "ease-in-out",
	},
} as const;
