import React from "react";
import {
	LineChart as RechartsLineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { colors } from "../design-system";
import type { ChartDataPoint } from "../data";

/**
 * LineChart component - A responsive line chart for displaying lab throughput metrics
 *
 * Features:
 * - Multiple data series (samples, completed, processing time)
 * - Responsive design with consistent styling
 * - Interactive tooltips and legends
 * - Accessible chart structure
 * - Design system color integration
 */

interface LineChartProps {
	data: ChartDataPoint[];
	showSamples?: boolean;
	showCompleted?: boolean;
	showProcessingTime?: boolean;
	height?: number;
	className?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
	data,
	showSamples = true,
	showCompleted = true,
	showProcessingTime = false,
	height = 300,
	className,
}) => {
	// Custom tooltip component
	const CustomTooltip = ({
		active,
		payload,
		label,
	}: {
		active?: boolean;
		payload?: Array<{
			color: string;
			name: string;
			value: number;
			dataKey: string;
		}>;
		label?: string;
	}) => {
		if (!active || !payload?.length) return null;

		return (
			<div className="bg-white border border-surface-200 rounded-lg shadow-lg p-3">
				<p className="text-sm font-medium text-surface-900 mb-2">
					{new Date(label!).toLocaleDateString()}
				</p>
				{payload.map((entry, index: number) => (
					<div
						key={index}
						className="flex items-center gap-2 text-sm"
					>
						<div
							className="w-3 h-3 rounded-full"
							style={{ backgroundColor: entry.color }}
						/>
						<span className="text-surface-600">{entry.name}:</span>
						<span className="font-medium text-surface-900">
							{entry.dataKey === "processingTime"
								? `${entry.value} min`
								: entry.value.toLocaleString()}
						</span>
					</div>
				))}
			</div>
		);
	};

	// Custom legend component
	const CustomLegend = ({
		payload,
	}: {
		payload?: Array<{
			color: string;
			value: string;
		}>;
	}) => {
		if (!payload?.length) return null;

		return (
			<div className="flex flex-wrap justify-center gap-4 mt-4">
				{payload.map((entry, index: number) => (
					<div
						key={index}
						className="flex items-center gap-2 text-sm"
					>
						<div
							className="w-3 h-3 rounded-full"
							style={{ backgroundColor: entry.color }}
						/>
						<span className="text-surface-600">{entry.value}</span>
					</div>
				))}
			</div>
		);
	};

	return (
		<div
			className={className}
			style={{ height }}
			role="img"
			aria-label="Line chart showing lab throughput metrics over time"
		>
			<ResponsiveContainer width="100%" height="100%">
				<RechartsLineChart
					data={data}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
					aria-label="Interactive line chart with sample metrics"
				>
					<CartesianGrid
						strokeDasharray="3 3"
						stroke={colors.surface[200]}
						opacity={0.6}
					/>
					<XAxis
						dataKey="date"
						tickFormatter={(value) => {
							const date = new Date(value);
							return `${date.getMonth() + 1}/${date.getDate()}`;
						}}
						stroke={colors.surface[600]}
						fontSize={12}
						tickLine={false}
						axisLine={false}
					/>
					<YAxis
						stroke={colors.surface[600]}
						fontSize={12}
						tickLine={false}
						axisLine={false}
					/>
					<Tooltip content={<CustomTooltip />} />
					<Legend content={<CustomLegend />} />

					{showSamples && (
						<Line
							type="monotone"
							dataKey="samples"
							name="Total Samples"
							stroke={colors.primary[500]}
							strokeWidth={2}
							dot={{
								fill: colors.primary[500],
								strokeWidth: 2,
								r: 4,
							}}
							activeDot={{
								r: 6,
								stroke: colors.primary[500],
								strokeWidth: 2,
							}}
						/>
					)}

					{showCompleted && (
						<Line
							type="monotone"
							dataKey="completed"
							name="Completed Samples"
							stroke={colors.semantic.success}
							strokeWidth={2}
							dot={{
								fill: colors.semantic.success,
								strokeWidth: 2,
								r: 4,
							}}
							activeDot={{
								r: 6,
								stroke: colors.semantic.success,
								strokeWidth: 2,
							}}
						/>
					)}

					{showProcessingTime && (
						<Line
							type="monotone"
							dataKey="processingTime"
							name="Avg Processing Time (min)"
							stroke={colors.semantic.warning}
							strokeWidth={2}
							dot={{
								fill: colors.semantic.warning,
								strokeWidth: 2,
								r: 4,
							}}
							activeDot={{
								r: 6,
								stroke: colors.semantic.warning,
								strokeWidth: 2,
							}}
							yAxisId="right"
						/>
					)}
				</RechartsLineChart>
			</ResponsiveContainer>
		</div>
	);
};

/**
 * SampleTrendChart - Pre-configured line chart for sample trends
 */
interface SampleTrendChartProps {
	data: ChartDataPoint[];
	title?: string;
	height?: number;
	className?: string;
}

export const SampleTrendChart: React.FC<SampleTrendChartProps> = ({
	data,
	title = "Sample Trends Over Time",
	height = 350,
	className,
}) => {
	return (
		<div className={className}>
			{title && (
				<h3 className="text-lg font-semibold text-surface-900 mb-4">
					{title}
				</h3>
			)}
			<LineChart
				data={data}
				showSamples={true}
				showCompleted={true}
				showProcessingTime={false}
				height={height}
			/>
		</div>
	);
};

/**
 * ProcessingTimeChart - Chart focused on processing time trends
 */
interface ProcessingTimeChartProps {
	data: ChartDataPoint[];
	title?: string;
	height?: number;
	className?: string;
}

export const ProcessingTimeChart: React.FC<ProcessingTimeChartProps> = ({
	data,
	title = "Average Processing Time",
	height = 300,
	className,
}) => {
	return (
		<div className={className}>
			{title && (
				<h3 className="text-lg font-semibold text-surface-900 mb-4">
					{title}
				</h3>
			)}
			<LineChart
				data={data}
				showSamples={false}
				showCompleted={false}
				showProcessingTime={true}
				height={height}
			/>
		</div>
	);
};
