import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import {
	DashboardHeader,
	MetricCard,
	DateRangePicker,
} from "../components/Dashboard";
import { mockDashboardSummary } from "../data/mockData";

const meta = {
	title: "Dashboard/Components",
	component: DashboardHeader,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof DashboardHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderWithTitle: Story = {
	args: {
		title: "Lab Throughput Dashboard",
		subtitle: "Real-time monitoring of laboratory sample processing",
	},
};

export const HeaderWithDatePicker = {
	name: "Header with Date Picker",
	render: () => {
		const [dateRange, setDateRange] = React.useState({
			startDate: "2024-01-01",
			endDate: "2024-01-31",
		});

		return (
			<div className="bg-gray-50 p-6">
				<DashboardHeader
					title="Lab Throughput Dashboard"
					subtitle="Monitor sample processing performance across all laboratory locations"
				>
					<DateRangePicker
						value={dateRange}
						onChange={setDateRange}
					/>
				</DashboardHeader>
			</div>
		);
	},
};

export const MetricCards = {
	name: "Metric Cards Overview",
	render: () => {
		const summary = mockDashboardSummary;

		return (
			<div className="bg-gray-50 p-6 space-y-6">
				<h2 className="text-xl font-semibold text-gray-900">
					Key Performance Metrics
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<MetricCard
						title="Total Samples Today"
						value={summary.totalSamplesToday.toLocaleString()}
						change={{
							...summary.changes.totalSamples,
							period: "vs yesterday",
						}}
					/>
					<MetricCard
						title="Completed Today"
						value={summary.completedToday.toLocaleString()}
						change={{
							...summary.changes.completed,
							period: "vs yesterday",
						}}
					/>
					<MetricCard
						title="Avg Processing Time"
						value={`${summary.averageProcessingTime} min`}
						change={{
							...summary.changes.processingTime,
							period: "vs yesterday",
						}}
					/>
					<MetricCard
						title="On-Time Rate"
						value={`${summary.onTimeRate}%`}
						change={{
							...summary.changes.onTimeRate,
							period: "vs yesterday",
						}}
					/>
				</div>
			</div>
		);
	},
};

export const SingleMetricCard = {
	name: "Individual Metric Card",
	render: () => (
		<div className="bg-gray-50 p-6">
			<MetricCard
				title="Samples Processed Today"
				value="1,247"
				change={{
					value: 23,
					type: "increase",
					period: "vs yesterday",
				}}
			/>
		</div>
	),
};

export const MetricCardVariations = {
	name: "Metric Card Variations",
	render: () => (
		<div className="bg-gray-50 p-6 space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<MetricCard
					title="Positive Trend"
					value="1,247"
					change={{
						value: 12.5,
						type: "increase",
						period: "vs last week",
					}}
				/>
				<MetricCard
					title="Negative Trend"
					value="89 min"
					change={{
						value: 8.2,
						type: "decrease",
						period: "vs last week",
					}}
				/>
				<MetricCard title="No Change Data" value="8" />
				<MetricCard
					title="Large Numbers"
					value="2,450,123"
					change={{
						value: 156.7,
						type: "increase",
						period: "vs last month",
					}}
				/>
			</div>
		</div>
	),
};
