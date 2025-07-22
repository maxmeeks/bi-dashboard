import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button, IconButton, ButtonGroup } from "../Button";

describe("Button", () => {
	it("renders with default props", () => {
		render(<Button>Test Button</Button>);
		const button = screen.getByRole("button", { name: "Test Button" });
		expect(button).toBeInTheDocument();
		expect(button).toHaveClass(
			"inline-flex",
			"items-center",
			"justify-center"
		);
	});

	it("applies variant classes correctly", () => {
		const { rerender } = render(<Button variant="primary">Primary</Button>);
		let button = screen.getByRole("button");
		expect(button).toBeInTheDocument();

		rerender(<Button variant="secondary">Secondary</Button>);
		button = screen.getByRole("button");
		expect(button).toBeInTheDocument();

		rerender(<Button variant="ghost">Ghost</Button>);
		button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	it("applies size classes correctly", () => {
		const { rerender } = render(<Button size="sm">Small</Button>);
		let button = screen.getByRole("button");
		expect(button).toBeInTheDocument();

		rerender(<Button size="md">Medium</Button>);
		button = screen.getByRole("button");
		expect(button).toBeInTheDocument();

		rerender(<Button size="lg">Large</Button>);
		button = screen.getByRole("button");
		expect(button).toBeInTheDocument();
	});

	it("handles click events", () => {
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Clickable</Button>);

		const button = screen.getByRole("button");
		fireEvent.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("disables when disabled prop is true", () => {
		render(<Button disabled>Disabled Button</Button>);
		const button = screen.getByRole("button");

		expect(button).toBeDisabled();
		expect(button).toHaveAttribute("aria-disabled", "true");
	});

	it("shows loading state", () => {
		render(<Button loading>Loading Button</Button>);
		const button = screen.getByRole("button");

		expect(button).toBeDisabled();
		expect(button).toHaveAttribute("aria-disabled", "true");
		expect(button.querySelector("svg")).toBeInTheDocument();
	});

	it("renders with left icon", () => {
		const icon = <span data-testid="left-icon">←</span>;
		render(<Button leftIcon={icon}>With Left Icon</Button>);

		expect(screen.getByTestId("left-icon")).toBeInTheDocument();
		expect(screen.getByText("With Left Icon")).toBeInTheDocument();
	});

	it("renders with right icon", () => {
		const icon = <span data-testid="right-icon">→</span>;
		render(<Button rightIcon={icon}>With Right Icon</Button>);

		expect(screen.getByTestId("right-icon")).toBeInTheDocument();
		expect(screen.getByText("With Right Icon")).toBeInTheDocument();
	});

	it("applies custom className", () => {
		render(<Button className="custom-class">Custom</Button>);
		const button = screen.getByRole("button");

		expect(button).toHaveClass("custom-class");
	});
});

describe("IconButton", () => {
	it("renders icon button with aria-label", () => {
		const icon = <span data-testid="icon">★</span>;
		render(<IconButton icon={icon} aria-label="Favorite" />);

		const button = screen.getByRole("button", { name: "Favorite" });
		expect(button).toBeInTheDocument();
		expect(screen.getByTestId("icon")).toBeInTheDocument();
	});

	it("requires aria-label prop", () => {
		const icon = <span data-testid="icon">★</span>;
		render(<IconButton icon={icon} aria-label="Required Label" />);

		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("aria-label", "Required Label");
	});
});

describe("ButtonGroup", () => {
	it("renders button group with role", () => {
		render(
			<ButtonGroup>
				<Button>First</Button>
				<Button>Second</Button>
				<Button>Third</Button>
			</ButtonGroup>
		);

		const group = screen.getByRole("group");
		expect(group).toBeInTheDocument();
		expect(screen.getByText("First")).toBeInTheDocument();
		expect(screen.getByText("Second")).toBeInTheDocument();
		expect(screen.getByText("Third")).toBeInTheDocument();
	});

	it("applies custom className to group", () => {
		render(
			<ButtonGroup className="custom-group">
				<Button>Button</Button>
			</ButtonGroup>
		);

		const group = screen.getByRole("group");
		expect(group).toHaveClass("custom-group");
	});
});
