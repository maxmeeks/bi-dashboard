// Design System Tokens - TypeScript version with type safety
// These tokens import from the JavaScript version to maintain single source of truth

import {
	colors as _colors,
	spacing as _spacing,
	fontSize as _fontSize,
	borderRadius as _borderRadius,
	shadows as _shadows,
	componentSizes as _componentSizes,
	breakpoints as _breakpoints,
	animations as _animations,
} from "./tokens.js";

// Type definitions for design tokens
type ColorScale = {
	50: string;
	100: string;
	200: string;
	300: string;
	400: string;
	500: string;
	600: string;
	700: string;
	800: string;
	900: string;
	950: string;
};

type SemanticColors = {
	success: string;
	warning: string;
	error: string;
	info: string;
};

type Colors = {
	primary: ColorScale;
	surface: ColorScale;
	semantic: SemanticColors;
};

type Spacing = {
	xs: string;
	sm: string;
	md: string;
	lg: string;
	xl: string;
	"2xl": string;
	"3xl": string;
};

type FontSize = {
	xs: string;
	sm: string;
	base: string;
	lg: string;
	xl: string;
	"2xl": string;
	"3xl": string;
	"4xl": string;
};

type BorderRadius = {
	xs: string;
	sm: string;
	md: string;
	lg: string;
	xl: string;
};

type Shadows = {
	card: string;
	cardHover: string;
	focus: string;
};

type ComponentSizes = {
	sm: {
		padding: string;
		fontSize: string;
		height: string;
	};
	md: {
		padding: string;
		fontSize: string;
		height: string;
	};
	lg: {
		padding: string;
		fontSize: string;
		height: string;
	};
};

type Breakpoints = {
	sm: string;
	md: string;
	lg: string;
	xl: string;
	"2xl": string;
};

type Animations = {
	fast: string;
	normal: string;
	slow: string;
	easing: {
		in: string;
		out: string;
		inOut: string;
	};
};

// Re-export with proper type annotations
export const colors: Colors = _colors;
export const spacing: Spacing = _spacing;
export const fontSize: FontSize = _fontSize;
export const borderRadius: BorderRadius = _borderRadius;
export const shadows: Shadows = _shadows;
export const componentSizes: ComponentSizes = _componentSizes;
export const breakpoints: Breakpoints = _breakpoints;
export const animations: Animations = _animations;
