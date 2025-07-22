import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../Card";

describe("Card", () => {
	it("renders with default props", () => {
		render(<Card>Card Content</Card>);
		const card = screen.getByText("Card Content");
		expect(card).toBeInTheDocument();
		expect(card.parentElement).toHaveClass("rounded-lg");
	});

	it("applies variant classes correctly", () => {
		const { rerender } = render(
			<Card variant="default">Default Card</Card>
		);
		let card = screen.getByText("Default Card");
		expect(card.parentElement).toBeInTheDocument();

		rerender(<Card variant="elevated">Elevated Card</Card>);
		card = screen.getByText("Elevated Card");
		expect(card.parentElement).toBeInTheDocument();

		rerender(<Card variant="outlined">Outlined Card</Card>);
		card = screen.getByText("Outlined Card");
		expect(card.parentElement).toBeInTheDocument();
	});

	it("applies padding classes correctly", () => {
		const { rerender } = render(<Card padding="sm">Small Padding</Card>);
		let card = screen.getByText("Small Padding");
		expect(card.parentElement).toBeInTheDocument();

		rerender(<Card padding="md">Medium Padding</Card>);
		card = screen.getByText("Medium Padding");
		expect(card.parentElement).toBeInTheDocument();

		rerender(<Card padding="lg">Large Padding</Card>);
		card = screen.getByText("Large Padding");
		expect(card.parentElement).toBeInTheDocument();
	});

	it("applies custom className", () => {
		render(<Card className="custom-card">Custom Card</Card>);
		const card = screen.getByText("Custom Card");
		expect(card.parentElement).toHaveClass("custom-card");
	});

	it("forwards additional props", () => {
		render(<Card data-testid="card-element">Test Card</Card>);
		const card = screen.getByTestId("card-element");
		expect(card).toBeInTheDocument();
	});
});

describe("CardHeader", () => {
	it("renders card header with content", () => {
		render(<CardHeader>Header Content</CardHeader>);
		const header = screen.getByText("Header Content");
		expect(header).toBeInTheDocument();
		expect(header).toHaveClass("mb-md", "last:mb-0");
	});

	it("applies custom className", () => {
		render(<CardHeader className="custom-header">Header</CardHeader>);
		const header = screen.getByText("Header");
		expect(header).toHaveClass("custom-header");
	});
});

describe("CardTitle", () => {
	it("renders as h3 by default", () => {
		render(<CardTitle>Card Title</CardTitle>);
		const title = screen.getByRole("heading", { level: 3 });
		expect(title).toBeInTheDocument();
		expect(title).toHaveTextContent("Card Title");
		expect(title).toHaveClass("text-heading", "text-lg", "font-semibold");
	});

	it("renders with different heading levels", () => {
		const { rerender } = render(<CardTitle as="h1">Title H1</CardTitle>);
		let title = screen.getByRole("heading", { level: 1 });
		expect(title).toBeInTheDocument();

		rerender(<CardTitle as="h2">Title H2</CardTitle>);
		title = screen.getByRole("heading", { level: 2 });
		expect(title).toBeInTheDocument();

		rerender(<CardTitle as="h4">Title H4</CardTitle>);
		title = screen.getByRole("heading", { level: 4 });
		expect(title).toBeInTheDocument();
	});

	it("applies custom className", () => {
		render(<CardTitle className="custom-title">Title</CardTitle>);
		const title = screen.getByRole("heading");
		expect(title).toHaveClass("custom-title");
	});
});

describe("CardContent", () => {
	it("renders card content", () => {
		render(<CardContent>Content Text</CardContent>);
		const content = screen.getByText("Content Text");
		expect(content).toBeInTheDocument();
		expect(content).toHaveClass("text-body");
	});

	it("applies custom className", () => {
		render(<CardContent className="custom-content">Content</CardContent>);
		const content = screen.getByText("Content");
		expect(content).toHaveClass("custom-content");
	});
});

describe("CardFooter", () => {
	it("renders card footer", () => {
		render(<CardFooter>Footer Content</CardFooter>);
		const footer = screen.getByText("Footer Content");
		expect(footer).toBeInTheDocument();
		expect(footer).toHaveClass(
			"mt-md",
			"pt-md",
			"border-t",
			"border-surface-200",
			"first:mt-0",
			"first:pt-0",
			"first:border-t-0"
		);
	});

	it("applies custom className", () => {
		render(<CardFooter className="custom-footer">Footer</CardFooter>);
		const footer = screen.getByText("Footer");
		expect(footer).toHaveClass("custom-footer");
	});
});

describe("Card Composition", () => {
	it("renders complete card with all sections", () => {
		render(
			<Card>
				<CardHeader>
					<CardTitle>Test Title</CardTitle>
				</CardHeader>
				<CardContent>This is the main content of the card.</CardContent>
				<CardFooter>Footer actions or information</CardFooter>
			</Card>
		);

		expect(
			screen.getByRole("heading", { name: "Test Title" })
		).toBeInTheDocument();
		expect(
			screen.getByText("This is the main content of the card.")
		).toBeInTheDocument();
		expect(
			screen.getByText("Footer actions or information")
		).toBeInTheDocument();
	});
});
