import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Grid, GridItem, AutoGrid } from "../Grid";

describe("Grid", () => {
	it("renders with default props", () => {
		render(
			<Grid data-testid="grid">
				<div>Grid Item 1</div>
				<div>Grid Item 2</div>
			</Grid>
		);

		const grid = screen.getByTestId("grid");
		expect(grid).toBeInTheDocument();
		expect(grid).toHaveClass("grid");
		expect(screen.getByText("Grid Item 1")).toBeInTheDocument();
		expect(screen.getByText("Grid Item 2")).toBeInTheDocument();
	});

	it("applies column classes correctly", () => {
		const { rerender } = render(
			<Grid cols={2} data-testid="grid">
				<div>Item</div>
			</Grid>
		);

		let grid = screen.getByTestId("grid");
		expect(grid).toHaveClass("grid-cols-2");

		rerender(
			<Grid cols={4} data-testid="grid">
				<div>Item</div>
			</Grid>
		);

		grid = screen.getByTestId("grid");
		expect(grid).toHaveClass("grid-cols-4");
	});

	it("applies responsive column classes", () => {
		render(
			<Grid
				cols={{ sm: 1, md: 2, lg: 3, xl: 4, "2xl": 6 }}
				data-testid="grid"
			>
				<div>Item</div>
			</Grid>
		);

		const grid = screen.getByTestId("grid");
		expect(grid).toHaveClass(
			"sm:grid-cols-1",
			"md:grid-cols-2",
			"lg:grid-cols-3",
			"xl:grid-cols-4",
			"2xl:grid-cols-6"
		);
	});

	it("applies auto-fit and auto-fill classes", () => {
		const { rerender } = render(
			<Grid cols="auto-fit" data-testid="grid">
				<div>Item</div>
			</Grid>
		);

		let grid = screen.getByTestId("grid");
		expect(grid).toHaveClass(
			"grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
		);

		rerender(
			<Grid cols="auto-fill" data-testid="grid">
				<div>Item</div>
			</Grid>
		);

		grid = screen.getByTestId("grid");
		expect(grid).toHaveClass(
			"grid-cols-[repeat(auto-fill,minmax(250px,1fr))]"
		);
	});

	it("applies gap classes correctly", () => {
		const { rerender } = render(
			<Grid gap="xs" data-testid="grid">
				<div>Item</div>
			</Grid>
		);

		let grid = screen.getByTestId("grid");
		expect(grid).toHaveClass("gap-1");

		rerender(
			<Grid gap="sm" data-testid="grid">
				<div>Item</div>
			</Grid>
		);

		grid = screen.getByTestId("grid");
		expect(grid).toHaveClass("gap-2");

		rerender(
			<Grid gap="lg" data-testid="grid">
				<div>Item</div>
			</Grid>
		);

		grid = screen.getByTestId("grid");
		expect(grid).toHaveClass("gap-6");
	});

	it("applies row classes correctly", () => {
		const { rerender } = render(
			<Grid rows={3} data-testid="grid">
				<div>Item</div>
			</Grid>
		);

		let grid = screen.getByTestId("grid");
		expect(grid).toHaveClass("grid-rows-3");

		rerender(
			<Grid rows="auto" data-testid="grid">
				<div>Item</div>
			</Grid>
		);

		grid = screen.getByTestId("grid");
		expect(grid).toHaveClass("grid-rows-none");
	});

	it("renders as different HTML elements", () => {
		render(
			<Grid as="section" data-testid="grid-section">
				<div>Item</div>
			</Grid>
		);

		const grid = screen.getByTestId("grid-section");
		expect(grid.tagName).toBe("SECTION");
	});

	it("applies custom className", () => {
		render(
			<Grid className="custom-grid" data-testid="grid">
				<div>Item</div>
			</Grid>
		);

		const grid = screen.getByTestId("grid");
		expect(grid).toHaveClass("custom-grid");
	});
});

describe("GridItem", () => {
	it("renders grid item with content", () => {
		render(<GridItem data-testid="grid-item">Grid Item Content</GridItem>);

		const item = screen.getByTestId("grid-item");
		expect(item).toBeInTheDocument();
		expect(screen.getByText("Grid Item Content")).toBeInTheDocument();
	});

	it("applies column span classes", () => {
		const { rerender } = render(
			<GridItem colSpan={2} data-testid="grid-item">
				Item
			</GridItem>
		);

		let item = screen.getByTestId("grid-item");
		expect(item).toHaveClass("col-span-2");

		rerender(
			<GridItem colSpan="full" data-testid="grid-item">
				Item
			</GridItem>
		);

		item = screen.getByTestId("grid-item");
		expect(item).toHaveClass("col-span-full");
	});

	it("applies row span classes", () => {
		const { rerender } = render(
			<GridItem rowSpan={3} data-testid="grid-item">
				Item
			</GridItem>
		);

		let item = screen.getByTestId("grid-item");
		expect(item).toHaveClass("row-span-3");

		rerender(
			<GridItem rowSpan="full" data-testid="grid-item">
				Item
			</GridItem>
		);

		item = screen.getByTestId("grid-item");
		expect(item).toHaveClass("row-span-full");
	});

	it("applies column and row start classes", () => {
		render(
			<GridItem colStart={2} rowStart={3} data-testid="grid-item">
				Item
			</GridItem>
		);

		const item = screen.getByTestId("grid-item");
		expect(item).toHaveClass("col-start-2", "row-start-3");
	});

	it("renders as different HTML elements", () => {
		render(
			<GridItem as="article" data-testid="grid-article">
				Article Content
			</GridItem>
		);

		const item = screen.getByTestId("grid-article");
		expect(item.tagName).toBe("ARTICLE");
	});

	it("applies custom className", () => {
		render(
			<GridItem className="custom-item" data-testid="grid-item">
				Item
			</GridItem>
		);

		const item = screen.getByTestId("grid-item");
		expect(item).toHaveClass("custom-item");
	});
});

describe("AutoGrid", () => {
	it("renders auto grid with default props", () => {
		render(
			<AutoGrid data-testid="auto-grid">
				<div>Auto Item 1</div>
				<div>Auto Item 2</div>
			</AutoGrid>
		);

		const grid = screen.getByTestId("auto-grid");
		expect(grid).toBeInTheDocument();
		expect(grid).toHaveClass("grid", "gap-4");
		expect(screen.getByText("Auto Item 1")).toBeInTheDocument();
		expect(screen.getByText("Auto Item 2")).toBeInTheDocument();
	});

	it("applies custom minimum column width", () => {
		render(
			<AutoGrid minColWidth="300px" data-testid="auto-grid">
				<div>Item</div>
			</AutoGrid>
		);

		const grid = screen.getByTestId("auto-grid");
		expect(grid).toHaveStyle({
			gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
		});
	});

	it("applies gap classes correctly", () => {
		render(
			<AutoGrid gap="xl" data-testid="auto-grid">
				<div>Item</div>
			</AutoGrid>
		);

		const grid = screen.getByTestId("auto-grid");
		expect(grid).toHaveClass("gap-8");
	});

	it("renders as different HTML elements", () => {
		render(
			<AutoGrid as="main" data-testid="auto-main">
				<div>Item</div>
			</AutoGrid>
		);

		const grid = screen.getByTestId("auto-main");
		expect(grid.tagName).toBe("MAIN");
	});

	it("applies custom className", () => {
		render(
			<AutoGrid className="custom-auto-grid" data-testid="auto-grid">
				<div>Item</div>
			</AutoGrid>
		);

		const grid = screen.getByTestId("auto-grid");
		expect(grid).toHaveClass("custom-auto-grid");
	});
});
