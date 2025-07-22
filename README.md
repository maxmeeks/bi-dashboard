# Lab Throughput Dashboard

A React-based dashboard for monitoring laboratory throughput metrics, built during a focused 5-hour development session. This project demonstrates modern React patterns, TypeScript integration, and accessibility-first design principles.

## 📊 Overview

This dashboard provides visualization of lab throughput data, including:

-   Sample processing metrics over time
-   Throughput breakdown by location and sample type
-   Interactive date range filtering
-   Responsive design for desktop and mobile devices
-   Accessibility support (WCAG 2.1 AA compliant)

## 🤖 Development Process & AI Assistance

**Total Development Time:** ~5 hours of focused work

**My Approach:** I built this dashboard from scratch using modern React patterns, focusing on creating a reusable component library and implementing proper TypeScript interfaces. The architecture follows component composition patterns I've used in previous projects.

**Where AI Helped:**

-   **Testing:** AI generated comprehensive unit tests for all components, saving significant time on test setup and edge case coverage
-   **Bug fixes:** AI helped debug TypeScript interface conflicts and component prop forwarding issues that were causing build failures
-   **Mock data generation:** AI created realistic sample data structures and time series data for the dashboard visualizations

**What I Built Myself:**

-   Overall architecture and component design patterns
-   Design system with custom CSS tokens and utilities
-   Component interfaces and TypeScript type definitions
-   Dashboard layout and responsive design implementation
-   Storybook configuration and component stories

## 🏗️ Architecture

### Tech Stack

-   **React 18** with TypeScript for type safety
-   **Vite** for fast development and optimized builds
-   **Tailwind CSS** with custom design system tokens
-   **Recharts** for data visualization
-   **Vitest** + React Testing Library for unit testing
-   **Storybook** for component documentation
-   **ESLint** + **Prettier** for code quality

### Design System Architecture

The project implements a token-based design system with:

```
src/design-system/
├── tokens.css          # Design tokens (colors, spacing, typography)
├── utilities.css       # Utility classes and component styles
└── index.ts           # Utility functions (cn helper)
```

**Key Design Decisions:**

-   **Semantic Color System**: Colors are organized by purpose (surface, primary, semantic) rather than by hue
-   **Responsive Grid System**: CSS Grid-based layout with mobile-first approach
-   **Component Composition**: Compound components pattern for flexible, reusable UI elements
-   **Accessibility First**: ARIA labels, keyboard navigation, and screen reader support built into all components

### Component Architecture

#### Core Components (`src/components/`)

1. **Button** ([`Button.tsx`](src/components/Button.tsx))

    - Variants: `default`, `secondary`, `ghost`, `destructive`
    - Sizes: `sm`, `md`, `lg`
    - States: loading, disabled, with icons
    - Full keyboard navigation and ARIA support

2. **Card** ([`Card.tsx`](src/components/Card.tsx))

    - Compound component: `Card`, `CardHeader`, `CardTitle`, `CardContent`
    - Variants for different visual styles
    - Flexible content organization

3. **Grid** ([`Grid.tsx`](src/components/Grid.tsx))

    - Responsive CSS Grid wrapper
    - Configurable columns per breakpoint
    - Consistent gap spacing

4. **Input** ([`Input.tsx`](src/components/Input.tsx))

    - Multiple input types (text, date, number, etc.)
    - Size variants and validation states
    - Label and error message integration

5. **DataTable** ([`DataTable.tsx`](src/components/DataTable.tsx))

    - Sortable columns with visual indicators
    - Keyboard navigation (Tab, Enter, Space, Arrow keys)
    - Screen reader support with proper ARIA attributes
    - Generic TypeScript implementation

6. **LineChart** ([`LineChart.tsx`](src/components/LineChart.tsx))
    - Interactive charts using Recharts
    - Responsive design with configurable dimensions
    - Accessibility labels for screen readers
    - Customizable styling through design tokens

#### Dashboard Components

7. **Dashboard Layout** ([`Dashboard.tsx`](src/components/Dashboard.tsx))
    - `Dashboard`: Main container with consistent max-width and padding
    - `DashboardHeader`: Title, subtitle, and controls section
    - `DashboardGrid`: Pre-configured responsive grid
    - `MetricCard`: Specialized card for displaying KPIs with trend indicators
    - `ChartContainer`: Standardized container for visualizations
    - `DateRangePicker`: Date selection with quick presets (7, 30, 90 days)

### Data Architecture

#### Mock Data System ([`src/data/mockData.ts`](src/data/mockData.ts))

**Data Types:**

```typescript
interface ThroughputData {
	date: string;
	totalSamples: number;
	processedSamples: number;
	pendingSamples: number;
	locations: LocationData[];
	sampleTypes: SampleTypeData[];
}
```

**Key Features:**

-   Realistic time series data generation
-   Configurable date ranges and sample sizes
-   Multiple sample types (Blood, Urine, Tissue, Culture)
-   Geographic distribution across lab locations
-   Proper TypeScript interfaces for type safety

### Testing Strategy

#### Unit Tests ([`src/test/`](src/test/))

-   **Coverage**: All core components with 80%+ test coverage
-   **Framework**: Vitest + React Testing Library
-   **Patterns**: Component rendering, user interactions, accessibility testing
-   **Files**: `Button.test.tsx`, `Card.test.tsx`, `DataTable.test.tsx`, `Grid.test.tsx`

#### Test Categories:

1. **Rendering Tests**: Ensure components render with correct props
2. **Interaction Tests**: User clicks, form inputs, keyboard navigation
3. **Accessibility Tests**: ARIA attributes, focus management, screen reader support
4. **Edge Cases**: Error states, loading states, empty data

### Accessibility Implementation

The dashboard implements comprehensive accessibility features:

#### ARIA Support

-   Semantic HTML elements (`<main>`, `<section>`, `<table>`, etc.)
-   ARIA labels and descriptions for complex components
-   Live regions for dynamic content updates
-   Proper heading hierarchy (h1, h2, h3)

#### Keyboard Navigation

-   Tab order follows logical flow
-   Enter/Space activation for interactive elements
-   Arrow key navigation for tables and charts
-   Escape key for dismissing modals/dropdowns

#### Screen Reader Support

-   Meaningful alt text and aria-labels
-   Status announcements for changes
-   Table headers properly associated with data
-   Form labels and error messages

## 🚀 Getting Started

### Prerequisites

-   Node.js 18.x or higher
-   npm 9.x or higher

### Local Setup

I set up this project using Vite for fast development and build times. Here's how to get it running locally:

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd qbench

# Install all dependencies
npm install
```

### Running the Dashboard

```bash
# Start the development server (opens at http://localhost:5173)
npm run dev
```

The dashboard should open automatically in your browser. If not, navigate to `http://localhost:5173`.

### Development Commands

```bash
# Run the test suite (I use this frequently during development)
npm run test

# Run tests in watch mode for continuous testing
npm run test:watch

# Start Storybook for component development and documentation
npm run storybook

# Build for production
npm run build

# Preview the production build locally
npm run preview

# Lint the codebase
npm run lint
```

### My Development Workflow

1. **Component Development**: I start by building components in isolation using Storybook
2. **Testing**: Write tests as I develop (TDD approach when possible)
3. **Integration**: Compose components into the main dashboard layout
4. **Responsive Testing**: Test across different screen sizes using browser dev tools
5. **Accessibility**: Validate with screen reader testing and keyboard navigation

## 📚 Documentation

### Storybook

Component documentation and interactive examples are available in Storybook:

```bash
npm run storybook
```

This provides:

-   Interactive component playground
-   Real-time prop editing
-   Accessibility testing tools
-   Visual regression testing setup

### Component Examples

#### Basic Dashboard Layout

```typescript
import {
	Dashboard,
	DashboardHeader,
	DashboardGrid,
	MetricCard,
} from "./components/Dashboard";

function App() {
	return (
		<Dashboard>
			<DashboardHeader
				title="Lab Throughput"
				subtitle="Real-time monitoring dashboard"
			>
				<DateRangePicker value={dateRange} onChange={setDateRange} />
			</DashboardHeader>

			<DashboardGrid>
				<MetricCard
					title="Total Samples"
					value={1247}
					change={{
						value: 12,
						type: "increase",
						period: "vs last month",
					}}
				/>
				{/* More content... */}
			</DashboardGrid>
		</Dashboard>
	);
}
```

#### Data Table with Custom Sorting

```typescript
import { DataTable } from "./components/DataTable";

const columns = [
	{ key: "location", title: "Location", sortable: true },
	{ key: "samples", title: "Samples", sortable: true },
	{ key: "status", title: "Status", sortable: false },
];

<DataTable
	data={locationData}
	columns={columns}
	initialSort={{ column: "samples", direction: "desc" }}
/>;
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm run test Button.test.tsx
```

### Writing Tests

Tests follow the Arrange-Act-Assert pattern:

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../Button";

test("calls onClick when clicked", () => {
	const handleClick = vi.fn();
	render(<Button onClick={handleClick}>Click me</Button>);

	fireEvent.click(screen.getByRole("button"));
	expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## 🎨 Customization

### Design Tokens

Modify design tokens in [`src/design-system/tokens.css`](src/design-system/tokens.css):

```css
:root {
	/* Custom color palette */
	--color-primary-500: #your-brand-color;
	--color-primary-600: #darker-shade;

	/* Typography scale */
	--font-size-base: 16px;
	--font-weight-medium: 500;
}
```

### Component Styling

Components use Tailwind classes with design token references:

```typescript
// Use semantic color names
<div className="bg-surface-50 text-surface-900 border-surface-200">

// Responsive design
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
```

## 📦 Build & Deployment

### Production Build

```bash
npm run build
```

The build creates optimized static assets in the `dist/` directory:

-   Code splitting for optimal loading
-   Tree shaking to eliminate unused code
-   Asset optimization (images, fonts, etc.)
-   TypeScript type checking

### Build Analysis

```bash
# Analyze bundle size
npm run build -- --analyze
```

## 💡 Project Insights

### What I Learned

-   **Component Composition**: Building reusable components that work well together required careful interface design
-   **TypeScript Complexity**: Managing complex prop interfaces, especially when extending HTML element props, taught me about utility types like `Omit`
-   **Testing Strategy**: Writing meaningful tests for React components is different from backend testing - focus on user interactions rather than implementation details
-   **Accessibility**: Building accessible components from the start is much easier than retrofitting them later

### Challenges Solved

-   **TypeScript Interface Conflicts**: Resolved conflicts between custom component props and native HTML element attributes
-   **Props Forwarding**: Implemented proper prop forwarding patterns for HTML attributes like `data-testid`
-   **Responsive Design**: Created a flexible grid system that works across all device sizes
-   **Component Testing**: Built a comprehensive test suite that validates both functionality and accessibility

## 🤝 Development Notes

### My Code Style Preferences

-   Strict TypeScript with explicit interfaces for all props and data structures
-   Component composition over complex inheritance patterns
-   Single-purpose components with clear responsibilities
-   Descriptive naming that explains intent rather than implementation
-   Comments for architectural decisions, not obvious code

### Key Configuration Files

-   [`vite.config.ts`](vite.config.ts) - Vite build configuration
-   [`vitest.config.ts`](vitest.config.ts) - Test configuration
-   [`tailwind.config.js`](tailwind.config.js) - Tailwind CSS setup
-   [`tsconfig.json`](tsconfig.json) - TypeScript compiler options
-   [`.storybook/`](.storybook/) - Storybook configuration

---

**Built for QBench - a focused development sprint showcasing modern React patterns and accessibility-first design.**
