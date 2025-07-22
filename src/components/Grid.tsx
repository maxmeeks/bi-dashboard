import React from "react";
import { cn } from "../design-system";

/**
 * Grid component - A flexible CSS Grid container with responsive support
 *
 * Features:
 * - Responsive column configuration
 * - Configurable gap spacing using design system tokens
 * - Auto-fit and auto-fill column modes
 * - Accessible and semantic structure
 */

interface GridProps extends React.HTMLAttributes<HTMLElement> {
	children: React.ReactNode;
	className?: string;
	cols?: number | "auto-fit" | "auto-fill" | ResponsiveCols;
	gap?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
	rows?: number | "auto";
	as?: React.ElementType;
}

interface ResponsiveCols {
	sm?: number;
	md?: number;
	lg?: number;
	xl?: number;
	"2xl"?: number;
}

export const Grid: React.FC<GridProps> = ({
	children,
	className,
	cols = 1,
	gap = "md",
	rows = "auto",
	as: Component = "div",
	...rest
}) => {
	const getColsClasses = (cols: GridProps["cols"]) => {
		if (typeof cols === "number") {
			return `grid-cols-${cols}`;
		}

		if (cols === "auto-fit") {
			return "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]";
		}

		if (cols === "auto-fill") {
			return "grid-cols-[repeat(auto-fill,minmax(250px,1fr))]";
		}

		if (typeof cols === "object") {
			const responsive = [];
			if (cols.sm) responsive.push(`sm:grid-cols-${cols.sm}`);
			if (cols.md) responsive.push(`md:grid-cols-${cols.md}`);
			if (cols.lg) responsive.push(`lg:grid-cols-${cols.lg}`);
			if (cols.xl) responsive.push(`xl:grid-cols-${cols.xl}`);
			if (cols["2xl"]) responsive.push(`2xl:grid-cols-${cols["2xl"]}`);
			return responsive.join(" ");
		}

		return "grid-cols-1";
	};

	const getGapClass = (gap: GridProps["gap"]) => {
		const gapMap = {
			xs: "gap-1",
			sm: "gap-2",
			md: "gap-4",
			lg: "gap-6",
			xl: "gap-8",
			"2xl": "gap-12",
		};
		return gapMap[gap!];
	};

	const getRowsClass = (rows: GridProps["rows"]) => {
		if (typeof rows === "number") {
			return `grid-rows-${rows}`;
		}
		return "grid-rows-none";
	};

	const baseClasses = "grid";
	const colsClasses = getColsClasses(cols);
	const gapClass = getGapClass(gap);
	const rowsClass = getRowsClass(rows);

	return (
		<Component
			className={cn(
				baseClasses,
				colsClasses,
				gapClass,
				rowsClass,
				className
			)}
			{...rest}
		>
			{children}
		</Component>
	);
};

/**
 * GridItem - Individual grid item with positioning control
 */
interface GridItemProps extends React.HTMLAttributes<HTMLElement> {
	children: React.ReactNode;
	className?: string;
	colSpan?: number | "full";
	rowSpan?: number | "full";
	colStart?: number;
	rowStart?: number;
	as?: React.ElementType;
}

export const GridItem: React.FC<GridItemProps> = ({
	children,
	className,
	colSpan,
	rowSpan,
	colStart,
	rowStart,
	as: Component = "div",
	...rest
}) => {
	const getColSpanClass = (span: GridItemProps["colSpan"]) => {
		if (span === "full") return "col-span-full";
		if (typeof span === "number") return `col-span-${span}`;
		return "";
	};

	const getRowSpanClass = (span: GridItemProps["rowSpan"]) => {
		if (span === "full") return "row-span-full";
		if (typeof span === "number") return `row-span-${span}`;
		return "";
	};

	const getColStartClass = (start: number | undefined) => {
		if (typeof start === "number") return `col-start-${start}`;
		return "";
	};

	const getRowStartClass = (start: number | undefined) => {
		if (typeof start === "number") return `row-start-${start}`;
		return "";
	};

	return (
		<Component
			className={cn(
				getColSpanClass(colSpan),
				getRowSpanClass(rowSpan),
				getColStartClass(colStart),
				getRowStartClass(rowStart),
				className
			)}
			{...rest}
		>
			{children}
		</Component>
	);
};

/**
 * AutoGrid - Responsive grid with automatic column sizing
 */
interface AutoGridProps extends React.HTMLAttributes<HTMLElement> {
	children: React.ReactNode;
	className?: string;
	minColWidth?: string;
	gap?: GridProps["gap"];
	as?: React.ElementType;
}

export const AutoGrid: React.FC<AutoGridProps> = ({
	children,
	className,
	minColWidth = "250px",
	gap = "md",
	as: Component = "div",
	...rest
}) => {
	const getGapClass = (gap: GridProps["gap"]) => {
		const gapMap = {
			xs: "gap-1",
			sm: "gap-2",
			md: "gap-4",
			lg: "gap-6",
			xl: "gap-8",
			"2xl": "gap-12",
		};
		return gapMap[gap!];
	};

	return (
		<Component
			className={cn("grid", getGapClass(gap), className)}
			style={{
				gridTemplateColumns: `repeat(auto-fit, minmax(${minColWidth}, 1fr))`,
			}}
			{...rest}
		>
			{children}
		</Component>
	);
};
