// Design System TypeScript Types

export type ColorScale =
	| 50
	| 100
	| 200
	| 300
	| 400
	| 500
	| 600
	| 700
	| 800
	| 900
	| 950;
export type SemanticColor = "success" | "warning" | "error" | "info";
export type ComponentSize = "sm" | "md" | "lg";
export type SpacingSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

// Button component variants
export interface ButtonVariant {
	primary: string;
	secondary: string;
	ghost: string;
	danger: string;
}

// Component props for consistent styling
export interface ComponentStyleProps {
	size?: ComponentSize;
	disabled?: boolean;
	className?: string;
}

// Card component props
export interface CardProps
	extends ComponentStyleProps,
		React.HTMLAttributes<HTMLDivElement> {
	variant?: "default" | "elevated" | "outlined";
	padding?: SpacingSize;
	children: React.ReactNode;
}

// Button component props
export interface ButtonProps
	extends ComponentStyleProps,
		React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: keyof ButtonVariant;
	loading?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	children: React.ReactNode;
}

// Input component props
export interface InputProps
	extends ComponentStyleProps,
		Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
	label?: string;
	error?: string;
	hint?: string;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
}

// Grid component props
export interface GridProps extends ComponentStyleProps {
	cols?: 1 | 2 | 3 | 4 | 6 | 12;
	gap?: SpacingSize;
	children: React.ReactNode;
}

// Chart data types for our dashboard
export interface ChartDataPoint {
	date: string;
	samples: number;
	location?: string;
	type?: string;
}

export interface LocationBreakdown {
	location: string;
	samples: number;
	percentage: number;
	types: Record<string, number>;
}

export interface KPIData {
	totalSamples: number;
	avgDailySamples: number;
	topLocation: string;
	growthRate: number;
}

export interface DashboardData {
	dailyThroughput: ChartDataPoint[];
	locationBreakdown: LocationBreakdown[];
	kpis: KPIData;
	dateRange: {
		start: string;
		end: string;
	};
}
