import { useState, useMemo } from "react";
import { Button } from "./Button";
import { cn } from "../design-system";
import type { LocationMetrics, TypeMetrics } from "../data";

/**
 * DataTable component - A responsive, sortable table for displaying lab metrics
 *
 * Features:
 * - Sortable columns
 * - Responsive design with horizontal scrolling
 * - Consistent styling with design system
 * - Accessible table structure
 * - Progress bars for utilization rates
 */

interface Column<T> {
	key: keyof T | string;
	label: string;
	sortable?: boolean;
	render?: (value: unknown, row: T) => React.ReactNode;
	className?: string;
	align?: "left" | "right" | "center";
}

interface DataTableProps<T> {
	data: T[];
	columns: Column<T>[];
	className?: string;
	emptyMessage?: string;
}

export function DataTable<T extends Record<string, any>>({
	data,
	columns,
	className,
	emptyMessage = "No data available",
}: DataTableProps<T>) {
	const [sortField, setSortField] = useState<string | null>(null);
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

	const sortedData = useMemo(() => {
		if (!sortField) return data;

		return [...data].sort((a, b) => {
			const aValue = (a as any)[sortField];
			const bValue = (b as any)[sortField];

			if (aValue === bValue) return 0;

			// Type-safe comparison for different data types
			if (typeof aValue === "string" && typeof bValue === "string") {
				const comparison = aValue.localeCompare(bValue);
				return sortDirection === "asc" ? comparison : -comparison;
			}

			if (typeof aValue === "number" && typeof bValue === "number") {
				const comparison = aValue - bValue;
				return sortDirection === "asc" ? comparison : -comparison;
			}

			// Fallback for other types
			const comparison = String(aValue) < String(bValue) ? -1 : 1;
			return sortDirection === "asc" ? comparison : -comparison;
		});
	}, [data, sortField, sortDirection]);

	const handleSort = (field: string) => {
		if (sortField === field) {
			setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
		} else {
			setSortField(field);
			setSortDirection("asc");
		}
	};

	const getSortIcon = (field: string) => {
		if (sortField !== field) return "↕";
		return sortDirection === "asc" ? "↑" : "↓";
	};

	if (data.length === 0) {
		return (
			<div className={cn("text-center py-8", className)}>
				<p className="text-surface-500">{emptyMessage}</p>
			</div>
		);
	}

	return (
		<div
			className={cn("overflow-x-auto", className)}
			role="region"
			aria-label="Data table"
		>
			<table
				className="min-w-full divide-y divide-surface-200"
				role="table"
			>
				<thead className="bg-surface-50">
					<tr role="row">
						{columns.map((column) => (
							<th
								key={String(column.key)}
								className={cn(
									"px-6 py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider",
									column.sortable &&
										"cursor-pointer hover:text-surface-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset",
									column.className
								)}
								onClick={() =>
									column.sortable &&
									handleSort(String(column.key))
								}
								onKeyDown={(e) => {
									if (
										column.sortable &&
										(e.key === "Enter" || e.key === " ")
									) {
										e.preventDefault();
										handleSort(String(column.key));
									}
								}}
								tabIndex={column.sortable ? 0 : -1}
								role="columnheader"
								aria-sort={
									sortField === String(column.key)
										? sortDirection === "asc"
											? "ascending"
											: "descending"
										: column.sortable
										? "none"
										: undefined
								}
							>
								<div className="flex items-center gap-1">
									{column.label}
									{column.sortable && (
										<span
											className="text-surface-400"
											aria-label={
												sortField === String(column.key)
													? `Sorted ${
															sortDirection ===
															"asc"
																? "ascending"
																: "descending"
													  }`
													: "Not sorted"
											}
										>
											{getSortIcon(String(column.key))}
										</span>
									)}
								</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-surface-200">
					{sortedData.map((row, index) => (
						<tr key={index} className="hover:bg-surface-50">
							{columns.map((column) => (
								<td
									key={String(column.key)}
									className={cn(
										"px-6 py-4 whitespace-nowrap text-sm",
										column.className
									)}
								>
									{column.render
										? column.render(
												(row as any)[column.key],
												row
										  )
										: String(
												(row as any)[column.key] || "-"
										  )}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

/**
 * ProgressBar - Component for showing utilization rates
 */
interface ProgressBarProps {
	value: number;
	max?: number;
	className?: string;
	showLabel?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
	value,
	max = 100,
	className,
	showLabel = true,
}) => {
	const percentage = Math.min((value / max) * 100, 100);

	const getColor = (pct: number) => {
		if (pct >= 90) return "bg-semantic-error";
		if (pct >= 70) return "bg-semantic-warning";
		return "bg-semantic-success";
	};

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<div className="flex-1 bg-surface-200 rounded-full h-2">
				<div
					className={cn(
						"h-2 rounded-full transition-all",
						getColor(percentage)
					)}
					style={{ width: `${percentage}%` }}
				/>
			</div>
			{showLabel && (
				<span className="text-sm text-surface-600 min-w-[3rem]">
					{Math.round(percentage)}%
				</span>
			)}
		</div>
	);
};

/**
 * LocationMetricsTable - Pre-configured table for location metrics
 */
interface LocationMetricsTableProps {
	data: LocationMetrics[];
	className?: string;
}

export const LocationMetricsTable: React.FC<LocationMetricsTableProps> = ({
	data,
	className,
}) => {
	const columns: Column<LocationMetrics>[] = [
		{
			key: "locationName",
			label: "Location",
			sortable: true,
			render: (value) => (
				<div className="font-medium text-surface-900">
					{value as string}
				</div>
			),
		},
		{
			key: "samplesProcessed",
			label: "Samples Processed",
			sortable: true,
			render: (value) => (
				<span className="text-surface-900">
					{(value as number).toLocaleString()}
				</span>
			),
		},
		{
			key: "averageProcessingTime",
			label: "Avg Processing Time",
			sortable: true,
			render: (value) => (
				<span className="text-surface-600">{value as number} min</span>
			),
		},
		{
			key: "utilizationRate",
			label: "Utilization Rate",
			sortable: true,
			render: (value) => (
				<ProgressBar
					value={value as number}
					className="min-w-[120px]"
				/>
			),
			className: "min-w-[150px]",
		},
	];

	return (
		<DataTable
			data={data}
			columns={columns}
			className={className}
			emptyMessage="No location data available"
		/>
	);
};

/**
 * TypeMetricsTable - Pre-configured table for sample type metrics
 */
interface TypeMetricsTableProps {
	data: TypeMetrics[];
	className?: string;
}

export const TypeMetricsTable: React.FC<TypeMetricsTableProps> = ({
	data,
	className,
}) => {
	const columns: Column<TypeMetrics>[] = [
		{
			key: "sampleType",
			label: "Sample Type",
			sortable: true,
			render: (value) => (
				<div className="font-medium text-surface-900">
					{value as string}
				</div>
			),
		},
		{
			key: "count",
			label: "Total Count",
			sortable: true,
			render: (value) => (
				<span className="text-surface-900">
					{(value as number).toLocaleString()}
				</span>
			),
		},
		{
			key: "averageProcessingTime",
			label: "Avg Processing Time",
			sortable: true,
			render: (value) => (
				<span className="text-surface-600">{value as number} min</span>
			),
		},
		{
			key: "completionRate",
			label: "Completion Rate",
			sortable: true,
			render: (value) => (
				<ProgressBar
					value={value as number}
					className="min-w-[120px]"
					showLabel={true}
				/>
			),
			className: "min-w-[150px]",
		},
	];

	return (
		<DataTable
			data={data}
			columns={columns}
			className={className}
			emptyMessage="No sample type data available"
		/>
	);
};

/**
 * TableContainer - Wrapper component for tables with consistent styling
 */
interface TableContainerProps {
	title: string;
	description?: string;
	children: React.ReactNode;
	actions?: React.ReactNode;
	className?: string;
}

export const TableContainer: React.FC<TableContainerProps> = ({
	title,
	description,
	children,
	actions,
	className,
}) => {
	return (
		<div
			className={cn(
				"bg-white rounded-lg border border-surface-200",
				className
			)}
		>
			<div className="px-6 py-4 border-b border-surface-200">
				<div className="flex items-center justify-between">
					<div>
						<h3 className="text-lg font-semibold text-surface-900">
							{title}
						</h3>
						{description && (
							<p className="text-sm text-surface-600 mt-1">
								{description}
							</p>
						)}
					</div>
					{actions && <div className="flex gap-2">{actions}</div>}
				</div>
			</div>
			<div className="p-0">{children}</div>
		</div>
	);
};

/**
 * ExportButton - Button for exporting table data
 */
interface ExportButtonProps {
	data: unknown[];
	filename?: string;
	className?: string;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
	data,
	filename = "export.csv",
	className,
}) => {
	const handleExport = () => {
		if (data.length === 0) return;

		const headers = Object.keys(data[0] as Record<string, unknown>);
		const csvContent = [
			headers.join(","),
			...data.map((row) =>
				headers
					.map((header) =>
						JSON.stringify(
							(row as Record<string, unknown>)[header] || ""
						)
					)
					.join(",")
			),
		].join("\n");

		const blob = new Blob([csvContent], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={handleExport}
			className={className}
			disabled={data.length === 0}
		>
			Export CSV
		</Button>
	);
};
