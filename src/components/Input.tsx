import React, { forwardRef } from "react";
import { cn, getSizeClasses, focusRing, transition } from "../design-system";
import type { InputProps } from "../design-system";

/**
 * Input component - A flexible, accessible form input with comprehensive features
 *
 * Features:
 * - Multiple sizes using design system tokens
 * - Label, error, and hint text support
 * - Icon support (left and right)
 * - Error and disabled states
 * - Full accessibility compliance
 * - Forward ref support for form libraries
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			size = "md",
			disabled = false,
			label,
			error,
			hint,
			leftIcon,
			rightIcon,
			className,
			...props
		},
		ref
	) => {
		const sizeClasses = getSizeClasses(size);
		const hasError = Boolean(error);
		const inputId = React.useId();
		const errorId = `${inputId}-error`;
		const hintId = `${inputId}-hint`;

		const baseClasses = [
			"block w-full rounded-md border",
			"placeholder:text-surface-400",
			"disabled:cursor-not-allowed disabled:opacity-50",
			focusRing,
			transition,
			sizeClasses.padding,
			sizeClasses.text,
		];

		const stateClasses = hasError
			? "border-semantic-error focus:border-semantic-error focus:ring-semantic-error text-surface-900"
			: "border-surface-300 focus:border-primary-500 focus:ring-primary-500 text-surface-900";

		const backgroundClasses = disabled ? "bg-surface-50" : "bg-white";

		return (
			<div className="space-y-1">
				{label && (
					<label
						htmlFor={inputId}
						className="block text-sm font-medium text-surface-700"
					>
						{label}
					</label>
				)}

				<div className="relative">
					{leftIcon && (
						<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
							<span
								className={cn(
									"text-surface-400",
									sizeClasses.iconSize
								)}
								aria-hidden="true"
							>
								{leftIcon}
							</span>
						</div>
					)}

					<input
						ref={ref}
						id={inputId}
						disabled={disabled}
						aria-invalid={hasError}
						aria-describedby={cn(error && errorId, hint && hintId)}
						className={cn(
							...baseClasses,
							stateClasses,
							backgroundClasses,
							leftIcon && "pl-10",
							rightIcon && "pr-10",
							className
						)}
						{...props}
					/>

					{rightIcon && (
						<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
							<span
								className={cn(
									hasError
										? "text-semantic-error"
										: "text-surface-400",
									sizeClasses.iconSize
								)}
								aria-hidden="true"
							>
								{rightIcon}
							</span>
						</div>
					)}
				</div>

				{error && (
					<p
						id={errorId}
						className="text-sm text-semantic-error"
						role="alert"
					>
						{error}
					</p>
				)}

				{hint && !error && (
					<p id={hintId} className="text-sm text-surface-500">
						{hint}
					</p>
				)}
			</div>
		);
	}
);

Input.displayName = "Input";

/**
 * Textarea component - Multi-line text input
 */
interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	size?: "sm" | "md" | "lg";
	disabled?: boolean;
	label?: string;
	error?: string;
	hint?: string;
	rows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	(
		{
			size = "md",
			disabled = false,
			label,
			error,
			hint,
			rows = 4,
			className,
			...props
		},
		ref
	) => {
		const sizeClasses = getSizeClasses(size);
		const hasError = Boolean(error);
		const textareaId = React.useId();
		const errorId = `${textareaId}-error`;
		const hintId = `${textareaId}-hint`;

		const baseClasses = [
			"block w-full rounded-md border resize-none",
			"placeholder:text-surface-400",
			"disabled:cursor-not-allowed disabled:opacity-50",
			focusRing,
			transition,
			sizeClasses.padding,
			sizeClasses.text,
		];

		const stateClasses = hasError
			? "border-semantic-error focus:border-semantic-error focus:ring-semantic-error"
			: "border-surface-300 focus:border-primary-500 focus:ring-primary-500";

		const backgroundClasses = disabled ? "bg-surface-50" : "bg-white";

		return (
			<div className="space-y-1">
				{label && (
					<label
						htmlFor={textareaId}
						className="block text-sm font-medium text-surface-700"
					>
						{label}
					</label>
				)}

				<textarea
					ref={ref}
					id={textareaId}
					rows={rows}
					disabled={disabled}
					aria-invalid={hasError}
					aria-describedby={cn(error && errorId, hint && hintId)}
					className={cn(
						...baseClasses,
						stateClasses,
						backgroundClasses,
						className
					)}
					{...props}
				/>

				{error && (
					<p
						id={errorId}
						className="text-sm text-semantic-error"
						role="alert"
					>
						{error}
					</p>
				)}

				{hint && !error && (
					<p id={hintId} className="text-sm text-surface-500">
						{hint}
					</p>
				)}
			</div>
		);
	}
);

Textarea.displayName = "Textarea";

/**
 * Select component - Dropdown selection input
 */
interface SelectProps
	extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
	size?: "sm" | "md" | "lg";
	disabled?: boolean;
	label?: string;
	error?: string;
	hint?: string;
	options: { value: string; label: string; disabled?: boolean }[];
	placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	(
		{
			size = "md",
			disabled = false,
			label,
			error,
			hint,
			options,
			placeholder,
			className,
			...props
		},
		ref
	) => {
		const sizeClasses = getSizeClasses(size);
		const hasError = Boolean(error);
		const selectId = React.useId();
		const errorId = `${selectId}-error`;
		const hintId = `${selectId}-hint`;

		const baseClasses = [
			"block w-full rounded-md border cursor-pointer",
			"disabled:cursor-not-allowed disabled:opacity-50",
			focusRing,
			transition,
			sizeClasses.padding,
			sizeClasses.text,
		];

		const stateClasses = hasError
			? "border-semantic-error focus:border-semantic-error focus:ring-semantic-error"
			: "border-surface-300 focus:border-primary-500 focus:ring-primary-500";

		const backgroundClasses = disabled ? "bg-surface-50" : "bg-white";

		return (
			<div className="space-y-1">
				{label && (
					<label
						htmlFor={selectId}
						className="block text-sm font-medium text-surface-700"
					>
						{label}
					</label>
				)}

				<select
					ref={ref}
					id={selectId}
					disabled={disabled}
					aria-invalid={hasError}
					aria-describedby={cn(error && errorId, hint && hintId)}
					className={cn(
						...baseClasses,
						stateClasses,
						backgroundClasses,
						className
					)}
					{...props}
				>
					{placeholder && (
						<option value="" disabled>
							{placeholder}
						</option>
					)}
					{options.map(
						({ value, label, disabled: optionDisabled }) => (
							<option
								key={value}
								value={value}
								disabled={optionDisabled}
							>
								{label}
							</option>
						)
					)}
				</select>

				{error && (
					<p
						id={errorId}
						className="text-sm text-semantic-error"
						role="alert"
					>
						{error}
					</p>
				)}

				{hint && !error && (
					<p id={hintId} className="text-sm text-surface-500">
						{hint}
					</p>
				)}
			</div>
		);
	}
);

Select.displayName = "Select";
