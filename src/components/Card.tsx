import React from "react";
import {
	cn,
	cardVariants,
	getSpacingClass,
	transition,
} from "../design-system";
import type { CardProps } from "../design-system";

/**
 * Card component - A flexible container with consistent spacing and styling
 *
 * Features:
 * - Multiple visual variants (default, elevated, outlined)
 * - Configurable padding using design system tokens
 * - Accessible and responsive design
 * - Smooth hover transitions
 */
export const Card: React.FC<CardProps> = ({
	variant = "default",
	padding = "lg",
	className,
	children,
	...props
}) => {
	const baseClasses = "rounded-lg";
	const variantClasses = cardVariants[variant];
	const paddingClass = `p-${getSpacingClass(padding)}`;

	return (
		<div
			className={cn(
				baseClasses,
				variantClasses,
				paddingClass,
				transition,
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};

/**
 * CardHeader - Optional header section for cards
 */
interface CardHeaderProps {
	children: React.ReactNode;
	className?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
	children,
	className,
}) => <div className={cn("mb-md last:mb-0", className)}>{children}</div>;

/**
 * CardTitle - Semantic title component for card headers
 */
interface CardTitleProps {
	children: React.ReactNode;
	className?: string;
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const CardTitle: React.FC<CardTitleProps> = ({
	children,
	className,
	as: Component = "h3",
}) => (
	<Component
		className={cn(
			"text-heading text-lg font-semibold text-surface-900",
			className
		)}
	>
		{children}
	</Component>
);

/**
 * CardContent - Main content area of the card
 */
interface CardContentProps {
	children: React.ReactNode;
	className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
	children,
	className,
}) => <div className={cn("text-body", className)}>{children}</div>;

/**
 * CardFooter - Optional footer section for cards
 */
interface CardFooterProps {
	children: React.ReactNode;
	className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
	children,
	className,
}) => (
	<div
		className={cn(
			"mt-md pt-md border-t border-surface-200 first:mt-0 first:pt-0 first:border-t-0",
			className
		)}
	>
		{children}
	</div>
);
