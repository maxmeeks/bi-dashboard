import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DataTable } from "../components/DataTable";
import { mockLocationMetrics, mockTypeMetrics } from "../data/mockData";

const meta = {
	title: "Dashboard/DataTable",
	component: DataTable,
	parameters: {
		layout: "fullscreen",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for the stories
const sampleLocationData = mockLocationMetrics.map((item, index) => ({
	id: `loc-${index}`,
	location: item.locationName,
	samples: item.samplesProcessed,
	avgTime: `${item.averageProcessingTime} min`,
	utilization: `${item.utilizationRate}%`,
	progress: item.utilizationRate,
}));

const sampleTypeData = mockTypeMetrics.map((item, index) => ({
	id: `type-${index}`,
	type: item.sampleType,
	count: item.count,
	avgTime: `${item.averageProcessingTime} min`,
	completion: `${item.completionRate}%`,
	progress: item.completionRate,
}));

export const LocationBreakdown: Story = {
	args: {
		data: sampleLocationData,
		columns: [
			{ key: "location", label: "Laboratory Location", sortable: true },
			{
				key: "samples",
				label: "Samples Processed",
				sortable: true,
				align: "right",
			},
			{
				key: "avgTime",
				label: "Avg Processing Time",
				sortable: true,
				align: "right",
			},
			{
				key: "utilization",
				label: "Utilization Rate",
				sortable: false,
				align: "right",
			},
		],
		progressColumn: "progress",
		title: "Laboratory Location Breakdown",
	},
};

export const SampleTypeBreakdown: Story = {
	args: {
		data: sampleTypeData,
		columns: [
			{ key: "type", label: "Sample Type", sortable: true },
			{
				key: "count",
				label: "Total Count",
				sortable: true,
				align: "right",
			},
			{
				key: "avgTime",
				label: "Avg Processing Time",
				sortable: true,
				align: "right",
			},
			{
				key: "completion",
				label: "Completion Rate",
				sortable: false,
				align: "right",
			},
		],
		progressColumn: "progress",
		title: "Sample Type Performance",
	},
};

export const SimpleTable: Story = {
	args: {
		data: [
			{ id: "1", name: "Sample A", status: "Completed", time: "2.5h" },
			{ id: "2", name: "Sample B", status: "In Progress", time: "1.2h" },
			{ id: "3", name: "Sample C", status: "Pending", time: "0h" },
		],
		columns: [
			{ key: "name", label: "Sample Name", sortable: true },
			{ key: "status", label: "Status", sortable: true },
			{
				key: "time",
				label: "Processing Time",
				sortable: true,
				align: "right",
			},
		],
		title: "Basic Sample List",
	},
};

export const WithExportFeature = {
	name: "Table with Export",
	render: () => (
		<div className="p-6 bg-gray-50">
			<DataTable
				data={sampleLocationData}
				columns={[
					{
						key: "location",
						label: "Laboratory Location",
						sortable: true,
					},
					{
						key: "samples",
						label: "Samples Processed",
						sortable: true,
						align: "right",
					},
					{
						key: "avgTime",
						label: "Avg Processing Time",
						sortable: true,
						align: "right",
					},
					{
						key: "utilization",
						label: "Utilization Rate",
						sortable: false,
						align: "right",
					},
				]}
				progressColumn="progress"
				title="Laboratory Performance Report"
				showExport={true}
			/>
		</div>
	),
};

export const EmptyState: Story = {
	args: {
		data: [],
		columns: [
			{ key: "location", label: "Laboratory Location", sortable: true },
			{
				key: "samples",
				label: "Samples Processed",
				sortable: true,
				align: "right",
			},
		],
		title: "No Data Available",
	},
};
