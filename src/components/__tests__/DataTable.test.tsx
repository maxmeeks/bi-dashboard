import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
	DataTable,
	ProgressBar,
	LocationMetricsTable,
	TypeMetricsTable,
	TableContainer,
	ExportButton,
} from "../DataTable";
import type { LocationMetrics, TypeMetrics } from "../../data";

const mockLocationData: LocationMetrics[] = [
	{
		locationId: "loc-1",
		locationName: "Main Lab",
		samplesProcessed: 150,
		averageProcessingTime: 45,
		utilizationRate: 85,
	},
	{
		locationId: "loc-2",
		locationName: "Emergency Lab",
		samplesProcessed: 75,
		averageProcessingTime: 30,
		utilizationRate: 60,
	},
];

const mockTypeData: TypeMetrics[] = [
	{
		sampleType: "Blood Chemistry",
		count: 100,
		averageProcessingTime: 40,
		completionRate: 95,
	},
	{
		sampleType: "Urinalysis",
		count: 50,
		averageProcessingTime: 25,
		completionRate: 98,
	},
];

describe("DataTable", () => {
	const mockColumns = [
		{ key: "name", label: "Name", sortable: true },
		{ key: "value", label: "Value", sortable: true },
		{ key: "status", label: "Status", sortable: false },
	];

	const mockData = [
		{ name: "Item 1", value: 100, status: "Active" },
		{ name: "Item 2", value: 50, status: "Inactive" },
		{ name: "Item 3", value: 200, status: "Active" },
	];

	it("renders table with data", () => {
		render(<DataTable data={mockData} columns={mockColumns} />);

		expect(screen.getByText("Name")).toBeInTheDocument();
		expect(screen.getByText("Value")).toBeInTheDocument();
		expect(screen.getByText("Status")).toBeInTheDocument();

		expect(screen.getByText("Item 1")).toBeInTheDocument();
		expect(screen.getByText("100")).toBeInTheDocument();
		expect(screen.getByText("Active")).toBeInTheDocument();
	});

	it("shows empty message when no data", () => {
		render(
			<DataTable
				data={[]}
				columns={mockColumns}
				emptyMessage="No items found"
			/>
		);
		expect(screen.getByText("No items found")).toBeInTheDocument();
	});

	it("handles sorting on sortable columns", () => {
		render(<DataTable data={mockData} columns={mockColumns} />);

		const nameHeader = screen.getByText("Name");
		fireEvent.click(nameHeader);

		// Check that sort indicator is present
		expect(nameHeader.parentElement).toHaveTextContent("↑");

		// Click again to reverse sort
		fireEvent.click(nameHeader);
		expect(nameHeader.parentElement).toHaveTextContent("↓");
	});

	it("does not sort on non-sortable columns", () => {
		render(<DataTable data={mockData} columns={mockColumns} />);

		const statusHeader = screen.getByText("Status");
		expect(statusHeader.parentElement).not.toHaveClass("cursor-pointer");
	});

	it("applies custom className", () => {
		render(
			<DataTable
				data={mockData}
				columns={mockColumns}
				className="custom-table"
			/>
		);
		const tableContainer = screen.getByRole("table").parentElement;
		expect(tableContainer).toHaveClass("custom-table");
	});

	it("renders custom cell content", () => {
		const customColumns = [
			{
				key: "name",
				label: "Name",
				render: (value: unknown) => <strong>{String(value)}</strong>,
			},
		];

		render(
			<DataTable data={[{ name: "Test Item" }]} columns={customColumns} />
		);

		const strongElement = screen.getByText("Test Item");
		expect(strongElement.tagName).toBe("STRONG");
	});
});

describe("ProgressBar", () => {
	it("renders progress bar with correct percentage", () => {
		render(<ProgressBar value={75} />);
		expect(screen.getByText("75%")).toBeInTheDocument();
	});

	it("limits percentage to maximum value", () => {
		render(<ProgressBar value={150} max={100} />);
		expect(screen.getByText("100%")).toBeInTheDocument();
	});

	it("hides label when showLabel is false", () => {
		render(<ProgressBar value={50} showLabel={false} />);
		expect(screen.queryByText("50%")).not.toBeInTheDocument();
	});

	it("applies correct color classes based on value", () => {
		const { rerender } = render(<ProgressBar value={50} />);
		let progressBar = document.querySelector(".bg-semantic-success");
		expect(progressBar).toBeInTheDocument();

		rerender(<ProgressBar value={80} />);
		progressBar = document.querySelector(".bg-semantic-warning");
		expect(progressBar).toBeInTheDocument();

		rerender(<ProgressBar value={95} />);
		progressBar = document.querySelector(".bg-semantic-error");
		expect(progressBar).toBeInTheDocument();
	});
});

describe("LocationMetricsTable", () => {
	it("renders location metrics table", () => {
		render(<LocationMetricsTable data={mockLocationData} />);

		expect(screen.getByText("Location")).toBeInTheDocument();
		expect(screen.getByText("Samples Processed")).toBeInTheDocument();
		expect(screen.getByText("Avg Processing Time")).toBeInTheDocument();
		expect(screen.getByText("Utilization Rate")).toBeInTheDocument();

		expect(screen.getByText("Main Lab")).toBeInTheDocument();
		expect(screen.getByText("150")).toBeInTheDocument();
		expect(screen.getByText("45 min")).toBeInTheDocument();
	});

	it("shows empty message when no location data", () => {
		render(<LocationMetricsTable data={[]} />);
		expect(
			screen.getByText("No location data available")
		).toBeInTheDocument();
	});
});

describe("TypeMetricsTable", () => {
	it("renders type metrics table", () => {
		render(<TypeMetricsTable data={mockTypeData} />);

		expect(screen.getByText("Sample Type")).toBeInTheDocument();
		expect(screen.getByText("Total Count")).toBeInTheDocument();
		expect(screen.getByText("Avg Processing Time")).toBeInTheDocument();
		expect(screen.getByText("Completion Rate")).toBeInTheDocument();

		expect(screen.getByText("Blood Chemistry")).toBeInTheDocument();
		expect(screen.getByText("100")).toBeInTheDocument();
		expect(screen.getByText("40 min")).toBeInTheDocument();
	});

	it("shows empty message when no type data", () => {
		render(<TypeMetricsTable data={[]} />);
		expect(
			screen.getByText("No sample type data available")
		).toBeInTheDocument();
	});
});

describe("TableContainer", () => {
	it("renders table container with title and content", () => {
		render(
			<TableContainer title="Test Table" description="Test description">
				<div>Table content</div>
			</TableContainer>
		);

		expect(screen.getByText("Test Table")).toBeInTheDocument();
		expect(screen.getByText("Test description")).toBeInTheDocument();
		expect(screen.getByText("Table content")).toBeInTheDocument();
	});

	it("renders with actions", () => {
		render(
			<TableContainer
				title="Test Table"
				actions={<button>Action Button</button>}
			>
				<div>Content</div>
			</TableContainer>
		);

		expect(screen.getByText("Action Button")).toBeInTheDocument();
	});
});

describe("ExportButton", () => {
	beforeEach(() => {
		// Mock URL.createObjectURL and other DOM methods
		global.URL.createObjectURL = vi.fn(() => "mock-url");
		global.URL.revokeObjectURL = vi.fn();

		// Mock document methods
		const mockLink = {
			href: "",
			download: "",
			click: vi.fn(),
		};

		vi.spyOn(document, "createElement").mockReturnValue(mockLink as any);
		vi.spyOn(document.body, "appendChild").mockImplementation(
			() => mockLink as any
		);
		vi.spyOn(document.body, "removeChild").mockImplementation(
			() => mockLink as any
		);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("renders export button", () => {
		render(<ExportButton data={[{ name: "test" }]} />);
		expect(screen.getByText("Export CSV")).toBeInTheDocument();
	});

	it("disables button when no data", () => {
		render(<ExportButton data={[]} />);
		const button = screen.getByText("Export CSV");
		expect(button).toBeDisabled();
	});

	it("handles export click", () => {
		const testData = [{ name: "Test", value: 123 }];
		render(<ExportButton data={testData} filename="test.csv" />);

		const button = screen.getByText("Export CSV");
		fireEvent.click(button);

		expect(document.createElement).toHaveBeenCalledWith("a");
		expect(URL.createObjectURL).toHaveBeenCalled();
	});

	it("applies custom className", () => {
		render(
			<ExportButton data={[{ test: "data" }]} className="custom-export" />
		);
		const button = screen.getByText("Export CSV");
		expect(button).toHaveClass("custom-export");
	});
});
