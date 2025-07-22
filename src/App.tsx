import { useState } from "react";
import {
	Dashboard,
	DashboardHeader,
	DashboardGrid,
	DateRangePicker,
	MetricCard,
	ChartContainer,
	SampleTrendChart,
	LocationMetricsTable,
	TypeMetricsTable,
	TableContainer,
	ExportButton,
} from "./components";
import { Grid, GridItem } from "./components";
import {
	mockSamples,
	generateChartData,
	generateDashboardSummary,
	generateLocationMetrics,
	generateTypeMetrics,
	type DateRange,
} from "./data";
import "./App.css";

/**
 * Main Dashboard Application
 *
 * A comprehensive lab throughput dashboard featuring:
 * - Real-time metrics overview
 * - Interactive date range filtering
 * - Line charts for trend visualization
 * - Detailed breakdown tables
 * - Responsive design for all screen sizes
 * - Export functionality for data analysis
 */

function App() {
	const [dateRange, setDateRange] = useState<DateRange>({
		startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
			.toISOString()
			.split("T")[0],
		endDate: new Date().toISOString().split("T")[0],
	});

	// Generate data based on current date range
	const summary = generateDashboardSummary(mockSamples, dateRange);
	const chartData = generateChartData(mockSamples, 30, dateRange);
	const locationMetrics = generateLocationMetrics(mockSamples, dateRange);
	const typeMetrics = generateTypeMetrics(mockSamples, dateRange);

	return (
		<Dashboard>
			{/* Header Section */}
			<DashboardHeader
				title="Lab Throughput Dashboard"
				subtitle="Real-time insights into laboratory sample processing and performance metrics"
			>
				<DateRangePicker value={dateRange} onChange={setDateRange} />
			</DashboardHeader>

			{/* Key Metrics Overview */}
			<section className="mb-8">
				<h2 className="text-xl font-semibold text-slate-900 mb-4">
					Selected Period Overview
				</h2>
				<Grid cols={{ sm: 2, lg: 4 }} gap="lg">
					<GridItem>
						<MetricCard
							title="Total Samples"
							value={summary.totalSamplesToday.toLocaleString()}
							change={{
								value: summary.changes.totalSamples.value,
								type: summary.changes.totalSamples.type,
								period: "vs previous period",
							}}
						/>
					</GridItem>
					<GridItem>
						<MetricCard
							title="Completed"
							value={summary.completedToday.toLocaleString()}
							change={{
								value: summary.changes.completed.value,
								type: summary.changes.completed.type,
								period: "vs previous period",
							}}
						/>
					</GridItem>
					<GridItem>
						<MetricCard
							title="Avg Processing Time"
							value={`${summary.averageProcessingTime} min`}
							change={{
								value: summary.changes.processingTime.value,
								type:
									summary.changes.processingTime.type ===
									"increase"
										? "decrease"
										: "increase", // Inverted because lower is better
								period: "vs previous period",
							}}
						/>
					</GridItem>
					<GridItem>
						<MetricCard
							title="On-Time Rate"
							value={`${summary.onTimeRate}%`}
							change={{
								value: summary.changes.onTimeRate.value,
								type: summary.changes.onTimeRate.type,
								period: "vs previous period",
							}}
						/>
					</GridItem>
				</Grid>
			</section>

			{/* Charts Section */}
			<section className="mb-8">
				<h2 className="text-xl font-semibold text-slate-900 mb-4">
					Trends & Patterns
				</h2>
				<DashboardGrid>
					<GridItem colSpan={2}>
						<ChartContainer
							title="Sample Volume Over Time"
							description="Daily sample submission and completion trends"
							actions={
								<ExportButton
									data={chartData}
									filename="sample-trends.csv"
								/>
							}
						>
							<SampleTrendChart data={chartData} height={400} />
						</ChartContainer>
					</GridItem>
				</DashboardGrid>
			</section>

			{/* Detailed Breakdown Tables */}
			<section className="mb-8">
				<h2 className="text-xl font-semibold text-slate-900 mb-4">
					Performance Breakdown
				</h2>
				<DashboardGrid>
					<GridItem>
						<TableContainer
							title="Location Metrics"
							description="Performance breakdown by laboratory location"
							actions={
								<ExportButton
									data={locationMetrics}
									filename="location-metrics.csv"
								/>
							}
						>
							<LocationMetricsTable data={locationMetrics} />
						</TableContainer>
					</GridItem>
					<GridItem>
						<TableContainer
							title="Sample Type Metrics"
							description="Analysis breakdown by sample type"
							actions={
								<ExportButton
									data={typeMetrics}
									filename="type-metrics.csv"
								/>
							}
						>
							<TypeMetricsTable data={typeMetrics} />
						</TableContainer>
					</GridItem>
				</DashboardGrid>
			</section>

			{/* Mobile-Optimized Additional Metrics */}
			<section className="lg:hidden mb-8">
				<h2 className="text-xl font-semibold text-slate-900 mb-4">
					Quick Stats
				</h2>
				<div className="space-y-4">
					<div className="bg-white rounded-lg border border-slate-200 p-4">
						<div className="flex justify-between items-center">
							<span className="text-sm font-medium text-slate-600">
								Peak Processing Hour
							</span>
							<span className="text-lg font-bold text-slate-900">
								2:00 PM
							</span>
						</div>
					</div>
					<div className="bg-white rounded-lg border border-slate-200 p-4">
						<div className="flex justify-between items-center">
							<span className="text-sm font-medium text-slate-600">
								Most Active Location
							</span>
							<span className="text-lg font-bold text-slate-900">
								Main Lab
							</span>
						</div>
					</div>
					<div className="bg-white rounded-lg border border-slate-200 p-4">
						<div className="flex justify-between items-center">
							<span className="text-sm font-medium text-slate-600">
								Top Sample Type
							</span>
							<span className="text-lg font-bold text-slate-900">
								Blood Chemistry
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="mt-12 pt-8 border-t border-slate-200">
				<div className="flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500">
					<p>© 2025 Lab Throughput Dashboard. All rights reserved.</p>
					<p className="mt-2 sm:mt-0">
						Last updated: {new Date().toLocaleString()}
					</p>
				</div>
			</footer>
		</Dashboard>
	);
}

export default App;
