import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { ComponentSize, SpacingSize } from "./types";

/**
 * Utility function to merge class names with Tailwind CSS conflict resolution
 */
export function cn(...inputs: ClassValue[]): string {
	return twMerge(clsx(inputs));
}

/**
 * Get size-specific classes for components
 */
export const getSizeClasses = (size: ComponentSize = "md") => {
	const sizeMap = {
		sm: {
			padding: "px-sm py-xs",
			text: "text-sm",
			height: "h-8",
			iconSize: "w-4 h-4",
		},
		md: {
			padding: "px-md py-sm",
			text: "text-base",
			height: "h-10",
			iconSize: "w-5 h-5",
		},
		lg: {
			padding: "px-lg py-md",
			text: "text-lg",
			height: "h-12",
			iconSize: "w-6 h-6",
		},
	};
	return sizeMap[size];
};

/**
 * Get spacing classes
 */
export const getSpacingClass = (spacing: SpacingSize): string => {
	const spacingMap: Record<SpacingSize, string> = {
		xs: "xs",
		sm: "sm",
		md: "md",
		lg: "lg",
		xl: "xl",
		"2xl": "2xl",
		"3xl": "3xl",
	};
	return spacingMap[spacing];
};

/**
 * Button variant classes
 */
export const buttonVariants = {
	primary:
		"bg-primary-500 hover:bg-primary-600 focus:ring-primary-500 text-white border-transparent",
	secondary:
		"bg-surface-100 hover:bg-surface-200 focus:ring-primary-500 text-surface-900 border-surface-200",
	ghost: "bg-transparent hover:bg-surface-100 focus:ring-primary-500 text-surface-700 border-transparent",
	danger: "bg-semantic-error hover:bg-red-600 focus:ring-red-500 text-white border-transparent",
};

/**
 * Card variant classes
 */
export const cardVariants = {
	default: "bg-white border border-surface-200",
	elevated: "bg-white shadow-card hover:shadow-card-hover",
	outlined: "bg-white border-2 border-surface-200 hover:border-primary-200",
};

/**
 * Focus ring utility
 */
export const focusRing =
	"focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500";

/**
 * Transition utility
 */
export const transition = "transition-all duration-200 ease-in-out";

/**
 * Format numbers for display in dashboard
 */
export const formatNumber = (value: number): string => {
	if (value >= 1000000) {
		return `${(value / 1000000).toFixed(1)}M`;
	} else if (value >= 1000) {
		return `${(value / 1000).toFixed(1)}K`;
	}
	return value.toString();
};

/**
 * Format percentage for display
 */
export const formatPercentage = (value: number): string => {
	return `${value.toFixed(1)}%`;
};

/**
 * Format date for display
 */
export const formatDate = (date: string): string => {
	return new Date(date).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
	});
};

/**
 * Format date range for display
 */
export const formatDateRange = (start: string, end: string): string => {
	const startDate = new Date(start);
	const endDate = new Date(end);

	const startFormatted = startDate.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year:
			startDate.getFullYear() !== endDate.getFullYear()
				? "numeric"
				: undefined,
	});

	const endFormatted = endDate.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	return `${startFormatted} - ${endFormatted}`;
};

/**
 * Generate accessible color for charts based on index
 */
export const getChartColor = (index: number): string => {
	const colors = [
		"#3b82f6", // primary-500
		"#10b981", // success
		"#f59e0b", // warning
		"#ef4444", // error
		"#8b5cf6", // purple-500
		"#06b6d4", // cyan-500
		"#84cc16", // lime-500
		"#f97316", // orange-500
	];
	return colors[index % colors.length];
};
