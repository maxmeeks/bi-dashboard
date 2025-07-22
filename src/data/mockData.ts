import type {
	LabSample,
	LabLocation,
	DashboardSummary,
	ChartDataPoint,
	LocationMetrics,
	TypeMetrics,
} from "./types";

/**
 * Mock Data for Lab Throughput Dashboard
 *
 * Realistic sample data for development and testing
 */

// Lab locations
export const labLocations: LabLocation[] = [
	{
		id: "loc-001",
		name: "Main Laboratory",
		code: "MAIN",
		department: "Clinical Chemistry",
		capacity: 500,
		isActive: true,
	},
	{
		id: "loc-002",
		name: "Microbiology Lab",
		code: "MICRO",
		department: "Microbiology",
		capacity: 200,
		isActive: true,
	},
	{
		id: "loc-003",
		name: "Hematology Lab",
		code: "HEMA",
		department: "Hematology",
		capacity: 300,
		isActive: true,
	},
	{
		id: "loc-004",
		name: "Emergency Lab",
		code: "EMRG",
		department: "Emergency",
		capacity: 100,
		isActive: true,
	},
	{
		id: "loc-005",
		name: "Research Lab A",
		code: "RESA",
		department: "Research",
		capacity: 150,
		isActive: false,
	},
];

// Sample types
export const sampleTypes = [
	"Blood Chemistry",
	"Complete Blood Count",
	"Urinalysis",
	"Microbiology Culture",
	"Immunology",
	"Molecular Diagnostics",
	"Cytology",
	"Histology",
	"Toxicology",
	"Serology",
];

// Generate mock samples for the last 90 days
export const generateMockSamples = (days: number = 90): LabSample[] => {
	const samples: LabSample[] = [];
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - days);

	const technicians = [
		"Dr. Sarah Johnson",
		"Mike Chen",
		"Emily Rodriguez",
		"David Kim",
		"Lisa Thompson",
		"Alex Martinez",
		"Jessica Brown",
		"Tom Wilson",
	];

	for (let day = 0; day < days; day++) {
		const currentDate = new Date(startDate);
		currentDate.setDate(startDate.getDate() + day);

		// Generate 20-80 samples per day with some randomness
		const samplesPerDay = Math.floor(Math.random() * 60) + 20;

		for (let i = 0; i < samplesPerDay; i++) {
			const submissionDate = new Date(currentDate);
			submissionDate.setHours(Math.random() * 24, Math.random() * 60);

			const location = labLocations[Math.floor(Math.random() * 4)]; // Only active locations
			const sampleType =
				sampleTypes[Math.floor(Math.random() * sampleTypes.length)];
			const technician =
				technicians[Math.floor(Math.random() * technicians.length)];

			const processingTime = Math.floor(Math.random() * 240) + 30; // 30-270 minutes
			const completionDate = new Date(submissionDate);
			completionDate.setMinutes(
				completionDate.getMinutes() + processingTime
			);

			// Determine status based on time elapsed
			const now = new Date();
			let status: LabSample["status"];
			if (completionDate <= now) {
				const random = Math.random();
				if (random < 0.85) status = "completed";
				else if (random < 0.95) status = "in_progress";
				else status = "on_hold";
			} else {
				status = Math.random() < 0.7 ? "in_progress" : "received";
			}

			const priority: LabSample["priority"] =
				Math.random() < 0.1
					? "urgent"
					: Math.random() < 0.25
					? "high"
					: Math.random() < 0.75
					? "normal"
					: "low";

			samples.push({
				id: `sample-${day}-${i}`,
				sampleNumber: `S${currentDate.getFullYear()}${String(
					currentDate.getMonth() + 1
				).padStart(2, "0")}${String(currentDate.getDate()).padStart(
					2,
					"0"
				)}-${String(i + 1).padStart(3, "0")}`,
				submissionDate,
				completionDate:
					status === "completed" ? completionDate : undefined,
				priority,
				status,
				sampleType,
				location,
				processingTimeMinutes:
					status === "completed" ? processingTime : undefined,
				technician,
				department: location.department,
			});
		}
	}

	return samples;
};

// Generate chart data from samples
export const generateChartData = (
	samples: LabSample[],
	days: number = 30
): ChartDataPoint[] => {
	const chartData: ChartDataPoint[] = [];
	const endDate = new Date();
	const startDate = new Date();
	startDate.setDate(endDate.getDate() - days);

	for (let day = 0; day < days; day++) {
		const currentDate = new Date(startDate);
		currentDate.setDate(startDate.getDate() + day);

		const dayStart = new Date(currentDate);
		dayStart.setHours(0, 0, 0, 0);
		const dayEnd = new Date(currentDate);
		dayEnd.setHours(23, 59, 59, 999);

		const daySamples = samples.filter(
			(sample) =>
				sample.submissionDate >= dayStart &&
				sample.submissionDate <= dayEnd
		);

		const completedSamples = daySamples.filter(
			(sample) => sample.status === "completed"
		);
		const avgProcessingTime =
			completedSamples.length > 0
				? completedSamples.reduce(
						(sum, sample) =>
							sum + (sample.processingTimeMinutes || 0),
						0
				  ) / completedSamples.length
				: 0;

		chartData.push({
			date: currentDate.toISOString().split("T")[0],
			samples: daySamples.length,
			completed: completedSamples.length,
			processingTime: Math.round(avgProcessingTime),
		});
	}

	return chartData;
};

// Generate dashboard summary
export const generateDashboardSummary = (
	samples: LabSample[]
): DashboardSummary => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const tomorrow = new Date(today);
	tomorrow.setDate(today.getDate() + 1);

	const yesterday = new Date(today);
	yesterday.setDate(today.getDate() - 1);

	const todaySamples = samples.filter(
		(sample) =>
			sample.submissionDate >= today && sample.submissionDate < tomorrow
	);

	const yesterdaySamples = samples.filter(
		(sample) =>
			sample.submissionDate >= yesterday && sample.submissionDate < today
	);

	const completedToday = todaySamples.filter(
		(sample) => sample.status === "completed"
	);
	const completedYesterday = yesterdaySamples.filter(
		(sample) => sample.status === "completed"
	);

	const avgProcessingTimeToday =
		completedToday.length > 0
			? completedToday.reduce(
					(sum, sample) => sum + (sample.processingTimeMinutes || 0),
					0
			  ) / completedToday.length
			: 0;

	const avgProcessingTimeYesterday =
		completedYesterday.length > 0
			? completedYesterday.reduce(
					(sum, sample) => sum + (sample.processingTimeMinutes || 0),
					0
			  ) / completedYesterday.length
			: 0;

	const onTimeToday =
		(completedToday.filter(
			(sample) => (sample.processingTimeMinutes || 0) <= 120
		).length /
			Math.max(completedToday.length, 1)) *
		100;

	const onTimeYesterday =
		(completedYesterday.filter(
			(sample) => (sample.processingTimeMinutes || 0) <= 120
		).length /
			Math.max(completedYesterday.length, 1)) *
		100;

	const calculateChange = (
		today: number,
		yesterday: number
	): { value: number; type: "increase" | "decrease" } => {
		const change =
			yesterday === 0 ? 0 : ((today - yesterday) / yesterday) * 100;
		return {
			value: Math.abs(Math.round(change)),
			type: change >= 0 ? "increase" : "decrease",
		};
	};

	return {
		totalSamplesToday: todaySamples.length,
		completedToday: completedToday.length,
		averageProcessingTime: Math.round(avgProcessingTimeToday),
		onTimeRate: Math.round(onTimeToday),
		changes: {
			totalSamples: calculateChange(
				todaySamples.length,
				yesterdaySamples.length
			),
			completed: calculateChange(
				completedToday.length,
				completedYesterday.length
			),
			processingTime: calculateChange(
				avgProcessingTimeToday,
				avgProcessingTimeYesterday
			),
			onTimeRate: calculateChange(onTimeToday, onTimeYesterday),
		},
	};
};

// Generate location breakdown
export const generateLocationMetrics = (
	samples: LabSample[],
	dateRange?: { startDate: string; endDate: string }
): LocationMetrics[] => {
	let filteredSamples = samples;

	if (dateRange) {
		const start = new Date(dateRange.startDate);
		const end = new Date(dateRange.endDate);
		filteredSamples = samples.filter(
			(sample) =>
				sample.submissionDate >= start && sample.submissionDate <= end
		);
	}

	return labLocations
		.filter((location) => location.isActive)
		.map((location) => {
			const locationSamples = filteredSamples.filter(
				(sample) =>
					sample.location.id === location.id &&
					sample.status === "completed"
			);

			const avgProcessingTime =
				locationSamples.length > 0
					? locationSamples.reduce(
							(sum, sample) =>
								sum + (sample.processingTimeMinutes || 0),
							0
					  ) / locationSamples.length
					: 0;

			const utilizationRate =
				(locationSamples.length / location.capacity) * 100;

			return {
				locationId: location.id,
				locationName: location.name,
				samplesProcessed: locationSamples.length,
				averageProcessingTime: Math.round(avgProcessingTime),
				utilizationRate: Math.round(Math.min(utilizationRate, 100)),
			};
		});
};

// Generate type breakdown
export const generateTypeMetrics = (
	samples: LabSample[],
	dateRange?: { startDate: string; endDate: string }
): TypeMetrics[] => {
	let filteredSamples = samples;

	if (dateRange) {
		const start = new Date(dateRange.startDate);
		const end = new Date(dateRange.endDate);
		filteredSamples = samples.filter(
			(sample) =>
				sample.submissionDate >= start && sample.submissionDate <= end
		);
	}

	return sampleTypes
		.map((type) => {
			const typeSamples = filteredSamples.filter(
				(sample) => sample.sampleType === type
			);
			const completedSamples = typeSamples.filter(
				(sample) => sample.status === "completed"
			);

			const avgProcessingTime =
				completedSamples.length > 0
					? completedSamples.reduce(
							(sum, sample) =>
								sum + (sample.processingTimeMinutes || 0),
							0
					  ) / completedSamples.length
					: 0;

			const completionRate =
				typeSamples.length > 0
					? (completedSamples.length / typeSamples.length) * 100
					: 0;

			return {
				sampleType: type,
				count: typeSamples.length,
				averageProcessingTime: Math.round(avgProcessingTime),
				completionRate: Math.round(completionRate),
			};
		})
		.filter((metric) => metric.count > 0);
};

// Initialize mock data
export const mockSamples = generateMockSamples(90);
export const mockChartData = generateChartData(mockSamples, 30);
export const mockDashboardSummary = generateDashboardSummary(mockSamples);
export const mockLocationMetrics = generateLocationMetrics(mockSamples);
export const mockTypeMetrics = generateTypeMetrics(mockSamples);
