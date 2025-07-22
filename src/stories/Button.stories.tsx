import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import React from "react";
import { Button, IconButton, ButtonGroup } from "../components/Button";

const meta = {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: "select",
			options: ["primary", "secondary", "ghost", "danger"],
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg"],
		},
		disabled: {
			control: "boolean",
		},
		loading: {
			control: "boolean",
		},
	},
	args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Simple SVG icons as JSX elements
const PlusIcon = (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M12 6v6m0 0v6m0-6h6m-6 0H6"
		/>
	</svg>
);

const ArrowRightIcon = (
	<svg
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M9 5l7 7-7 7"
		/>
	</svg>
);

export const Primary: Story = {
	args: {
		variant: "primary",
		children: "Primary Button",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Secondary Button",
	},
};

export const Ghost: Story = {
	args: {
		variant: "ghost",
		children: "Ghost Button",
	},
};

export const Danger: Story = {
	args: {
		variant: "danger",
		children: "Danger Button",
	},
};

export const Small: Story = {
	args: {
		size: "sm",
		children: "Small Button",
	},
};

export const Medium: Story = {
	args: {
		size: "md",
		children: "Medium Button",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		children: "Large Button",
	},
};

export const Loading: Story = {
	args: {
		loading: true,
		children: "Loading Button",
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		children: "Disabled Button",
	},
};

export const WithLeftIcon: Story = {
	args: {
		leftIcon: PlusIcon,
		children: "Add Item",
	},
};

export const WithRightIcon: Story = {
	args: {
		rightIcon: ArrowRightIcon,
		children: "Next",
	},
};

export const IconButtonExample = {
	name: "Icon Button",
	render: () => (
		<IconButton icon={PlusIcon} aria-label="Add item" onClick={fn()} />
	),
};

export const ButtonGroupExample = {
	name: "Button Group",
	render: () => (
		<ButtonGroup>
			<Button variant="secondary" onClick={fn()}>
				First
			</Button>
			<Button variant="secondary" onClick={fn()}>
				Second
			</Button>
			<Button variant="secondary" onClick={fn()}>
				Third
			</Button>
		</ButtonGroup>
	),
};
