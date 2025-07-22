import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";
import { Button } from "./Button";
import { Input } from "./Input";
import { Grid } from "./Grid";
import { cn } from "../design-system";

/**
 * Dashboard Layout - Main layout structure for the lab throughput dashboard
 *
 * Features:
 * - Header with title and date range picker
 * - Responsive grid layout for visualizations
 * - Consistent spacing and styling
 * - Mobile-friendly design
 */

interface DashboardProps {
	children: React.ReactNode;
	className?: string;
}

export const Dashboard: React.FC<DashboardProps> = ({
	children,
	className,
}) => {
	return (
		<div className={cn("min-h-screen bg-surface-50", className)}>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				{children}
			</div>
		</div>
	);
};

/**
 * DashboardHeader - Header section with title and controls
 */
interface DashboardHeaderProps {
	title: string;
	subtitle?: string;
	children?: React.ReactNode;
	className?: string;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
	title,
	subtitle,
	children,
	className,
}) => {
	return (
		<div className={cn("pb-6 border-b border-surface-200 mb-6", className)}>
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-3xl font-bold text-surface-900">
						{title}
					</h1>
					{subtitle && (
						<p className="mt-1 text-sm text-surface-600">
							{subtitle}
						</p>
					)}
				</div>
				{children && (
					<div className="flex flex-col sm:flex-row gap-3">
						{children}
					</div>
				)}
			</div>
		</div>
	);
};

/**
 * DateRangePicker - Component for selecting date ranges
 */
interface DateRange {
	startDate: string;
	endDate: string;
}

interface DateRangePickerProps {
	value: DateRange;
	onChange: (dateRange: DateRange) => void;
	className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
	value,
	onChange,
	className,
}) => {
	const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange({
			...value,
			startDate: e.target.value,
		});
	};

	const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange({
			...value,
			endDate: e.target.value,
		});
	};

	// Quick date range presets
	const setQuickRange = (days: number) => {
		const endDate = new Date();
		const startDate = new Date();
		startDate.setDate(endDate.getDate() - days);

		onChange({
			startDate: startDate.toISOString().split("T")[0],
			endDate: endDate.toISOString().split("T")[0],
		});
	};

	return (
		<div className={cn("flex flex-col sm:flex-row gap-3", className)}>
			{/* Quick Range Buttons */}
			<div className="flex gap-2">
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setQuickRange(7)}
				>
					7 days
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setQuickRange(30)}
				>
					30 days
				</Button>
				<Button
					variant="ghost"
					size="sm"
					onClick={() => setQuickRange(90)}
				>
					90 days
				</Button>
			</div>

			{/* Date Inputs */}
			<div className="flex gap-2 items-center">
				<Input
					type="date"
					value={value.startDate}
					onChange={handleStartDateChange}
					size="sm"
					className="w-auto"
				/>
				<span className="text-surface-400">to</span>
				<Input
					type="date"
					value={value.endDate}
					onChange={handleEndDateChange}
					size="sm"
					className="w-auto"
				/>
			</div>
		</div>
	);
};

/**
 * DashboardGrid - Pre-configured grid for dashboard layout
 */
interface DashboardGridProps {
	children: React.ReactNode;
	className?: string;
}

export const DashboardGrid: React.FC<DashboardGridProps> = ({
	children,
	className,
}) => {
	return (
		<Grid cols={{ sm: 1, lg: 2 }} gap="lg" className={className}>
			{children}
		</Grid>
	);
};

/**
 * MetricCard - Card component specifically for displaying metrics
 */
interface MetricCardProps {
	title: string;
	value: string | number;
	change?: {
		value: number;
		type: "increase" | "decrease";
		period: string;
	};
	className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
	title,
	value,
	change,
	className,
}) => {
	const getChangeColor = (type: "increase" | "decrease") => {
		return type === "increase"
			? "text-semantic-success"
			: "text-semantic-error";
	};

	const getChangeIcon = (type: "increase" | "decrease") => {
		return type === "increase" ? "↗" : "↘";
	};

	return (
		<Card
			variant="default"
			className={className}
			role="region"
			aria-labelledby={`metric-${title
				.replace(/\s+/g, "-")
				.toLowerCase()}`}
		>
			<CardContent className="p-6">
				<div className="flex items-center justify-between">
					<div>
						<p
							id={`metric-${title
								.replace(/\s+/g, "-")
								.toLowerCase()}`}
							className="text-sm font-medium text-surface-600"
						>
							{title}
						</p>
						<p
							className="text-3xl font-bold text-surface-900"
							aria-describedby={
								change
									? `change-${title
											.replace(/\s+/g, "-")
											.toLowerCase()}`
									: undefined
							}
						>
							{value}
						</p>
					</div>
					{change && (
						<div
							id={`change-${title
								.replace(/\s+/g, "-")
								.toLowerCase()}`}
							className={cn(
								"text-sm",
								getChangeColor(change.type)
							)}
							role="status"
							aria-live="polite"
						>
							<span
								className="inline-flex items-center"
								aria-label={`${
									change.type === "increase"
										? "Increased"
										: "Decreased"
								} by ${Math.abs(change.value)} percent`}
							>
								<span aria-hidden="true">
									{getChangeIcon(change.type)}
								</span>
								{Math.abs(change.value)}%
							</span>
							<p className="text-xs text-surface-500 mt-1">
								{change.period}
							</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

/**
 * ChartContainer - Container for chart visualizations
 */
interface ChartContainerProps {
	title: string;
	description?: string;
	children: React.ReactNode;
	actions?: React.ReactNode;
	className?: string;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
	title,
	description,
	children,
	actions,
	className,
}) => {
	return (
		<Card variant="default" className={className}>
			<CardHeader>
				<div className="flex items-center justify-between">
					<div>
						<CardTitle>{title}</CardTitle>
						{description && (
							<p className="text-sm text-surface-600 mt-1">
								{description}
							</p>
						)}
					</div>
					{actions && <div className="flex gap-2">{actions}</div>}
				</div>
			</CardHeader>
			<CardContent>{children}</CardContent>
		</Card>
	);
};
