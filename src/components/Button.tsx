import React from "react";
import {
	cn,
	buttonVariants,
	getSizeClasses,
	focusRing,
	transition,
} from "../design-system";
import type { ButtonProps } from "../design-system";

/**
 * Button component - A versatile, accessible button with multiple variants and sizes
 *
 * Features:
 * - Multiple variants (primary, secondary, ghost, danger)
 * - Consistent sizing using design system tokens
 * - Loading state with disabled interaction
 * - Icon support (left and right)
 * - Full accessibility compliance
 * - Keyboard navigation support
 */
export const Button: React.FC<ButtonProps> = ({
	variant = "primary",
	size = "md",
	disabled = false,
	loading = false,
	leftIcon,
	rightIcon,
	className,
	children,
	...props
}) => {
	const sizeClasses = getSizeClasses(size);
	const isDisabled = disabled || loading;

	const baseClasses = [
		"inline-flex items-center justify-center",
		"border font-medium rounded-md",
		"cursor-pointer select-none",
		"disabled:opacity-50 disabled:cursor-not-allowed",
		focusRing,
		transition,
		sizeClasses.padding,
		sizeClasses.text,
		sizeClasses.height,
	];

	const variantClasses = buttonVariants[variant];

	return (
		<button
			className={cn(...baseClasses, variantClasses, className)}
			disabled={isDisabled}
			aria-disabled={isDisabled}
			{...props}
		>
			{loading && (
				<LoadingSpinner
					className={cn(sizeClasses.iconSize, children ? "mr-2" : "")}
				/>
			)}
			{!loading && leftIcon && (
				<span
					className={cn(sizeClasses.iconSize, children ? "mr-2" : "")}
					aria-hidden="true"
				>
					{leftIcon}
				</span>
			)}
			{children}
			{!loading && rightIcon && (
				<span
					className={cn(sizeClasses.iconSize, children ? "ml-2" : "")}
					aria-hidden="true"
				>
					{rightIcon}
				</span>
			)}
		</button>
	);
};

/**
 * LoadingSpinner - Internal component for loading states
 */
interface LoadingSpinnerProps {
	className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }) => (
	<svg
		className={cn("animate-spin", className)}
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		aria-hidden="true"
	>
		<circle
			className="opacity-25"
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
			strokeWidth="4"
		/>
		<path
			className="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
		/>
	</svg>
);

/**
 * IconButton - Specialized button for icon-only use cases
 */
interface IconButtonProps
	extends Omit<ButtonProps, "children" | "leftIcon" | "rightIcon"> {
	icon: React.ReactNode;
	"aria-label": string;
}

export const IconButton: React.FC<IconButtonProps> = ({
	icon,
	size = "md",
	className,
	...props
}) => {
	const sizeClasses = getSizeClasses(size);

	return (
		<Button
			size={size}
			className={cn("aspect-square", className)}
			{...props}
		>
			<span className={sizeClasses.iconSize} aria-hidden="true">
				{icon}
			</span>
		</Button>
	);
};

/**
 * ButtonGroup - Container for grouping related buttons
 */
interface ButtonGroupProps {
	children: React.ReactNode;
	className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
	children,
	className,
}) => (
	<div
		className={cn(
			"inline-flex rounded-md shadow-sm",
			"[&>button:first-child]:rounded-r-none",
			"[&>button:last-child]:rounded-l-none",
			"[&>button:not(:first-child):not(:last-child)]:rounded-none",
			"[&>button:not(:first-child)]:-ml-px",
			className
		)}
		role="group"
	>
		{children}
	</div>
);
