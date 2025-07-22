/**
 * Data Types for Lab Throughput Dashboard
 *
 * Defines the structure for lab samples, metrics, and related data types
 */

export interface LabSample {
	id: string;
	sampleNumber: string;
	submissionDate: Date;
	completionDate?: Date;
	priority: "urgent" | "high" | "normal" | "low";
	status: "received" | "in_progress" | "completed" | "on_hold" | "cancelled";
	sampleType: string;
	location: LabLocation;
	processingTimeMinutes?: number;
	technician: string;
	department: string;
}

export interface LabLocation {
	id: string;
	name: string;
	code: string;
	department: string;
	capacity: number;
	isActive: boolean;
}

export interface ThroughputMetrics {
	date: string;
	totalSamples: number;
	completedSamples: number;
	averageProcessingTime: number;
	onTimeCompletion: number;
	locationBreakdown: LocationMetrics[];
	typeBreakdown: TypeMetrics[];
}

export interface LocationMetrics {
	locationId: string;
	locationName: string;
	samplesProcessed: number;
	averageProcessingTime: number;
	utilizationRate: number;
}

export interface TypeMetrics {
	sampleType: string;
	count: number;
	averageProcessingTime: number;
	completionRate: number;
}

export interface DashboardSummary {
	totalSamplesToday: number;
	completedToday: number;
	averageProcessingTime: number;
	onTimeRate: number;
	changes: {
		totalSamples: { value: number; type: "increase" | "decrease" };
		completed: { value: number; type: "increase" | "decrease" };
		processingTime: { value: number; type: "increase" | "decrease" };
		onTimeRate: { value: number; type: "increase" | "decrease" };
	};
}

export interface ChartDataPoint {
	date: string;
	samples: number;
	completed: number;
	processingTime: number;
}

export interface DateRange {
	startDate: string;
	endDate: string;
}

// Filter and sorting options
export type SortField = "date" | "samples" | "processingTime" | "onTimeRate";
export type SortDirection = "asc" | "desc";

export interface DataFilters {
	dateRange: DateRange;
	locations: string[];
	sampleTypes: string[];
	priorities: string[];
	statuses: string[];
	sortBy: SortField;
	sortDirection: SortDirection;
}
