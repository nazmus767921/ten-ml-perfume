"use client";

import * as React from "react";

import { 
  InputGroup, 
  InputGroupInput, 
  InputGroupAddon, 
  InputGroupButton 
} from "@/components/ui/input-group";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react/dist/ssr";

interface QuantityInputProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export function QuantityInput({
  value: controlledValue,
  defaultValue = 1,
  onChange,
  min = 1,
  max = 99,
  step = 1,
  disabled = false,
}: QuantityInputProps) {
  // 1. Local state always manages the real-time typing buffer string
  const [localValue, setLocalValue] = React.useState<string>(
    controlledValue !== undefined ? controlledValue.toString() : defaultValue.toString()
  );

  // 2. Keep local string state in sync if parent value changes externally
  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setLocalValue(controlledValue.toString());
    }
  }, [controlledValue]);

  // Numeric fallback helper for internal button math logic
  const numericValue = parseInt(localValue, 10) || min;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // Allow user to clear input completely to type from scratch
    if (inputValue === "") {
      setLocalValue("");
      return;
    }

    const parsedValue = parseInt(inputValue, 10);
    if (isNaN(parsedValue)) return;

    // Clamp values so they don't type past your min/max limits
    const clampedValue = Math.min(Math.max(parsedValue, min), max);
    
    setLocalValue(clampedValue.toString());
    onChange?.(clampedValue);
  };

  // When user clicks out of the input field
  const handleBlur = () => {
    if (localValue === "" || isNaN(parseInt(localValue, 10))) {
      setLocalValue(min.toString());
      onChange?.(min);
    } else {
      // Clean up any weird leading zeros on blur (e.g., "05" -> "5")
      const finalNum = Math.min(Math.max(numericValue, min), max);
      setLocalValue(finalNum.toString());
      onChange?.(finalNum);
    }
  };

  const handleDecrement = () => {
    const newValue = Math.max(numericValue - step, min);
    setLocalValue(newValue.toString());
    onChange?.(newValue);
  };

  const handleIncrement = () => {
    const newValue = Math.min(numericValue + step, max);
    setLocalValue(newValue.toString());
    onChange?.(newValue);
  };

  return (
    <InputGroup className="w-fit">
      <InputGroupInput
        type="number"
        value={localValue} // Controlled by local typing buffer string
        onChange={handleInputChange}
        onBlur={handleBlur}
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        className="w-14 text-center p-0 font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />

      {/* Visually positioned on the Left */}
      <InputGroupAddon align="inline-start">
        <InputGroupButton
          size="icon-sm"
          variant="ghost"
          onClick={handleDecrement}
          disabled={disabled || numericValue <= min}
          type="button"
          aria-label="Decrease quantity"
          className="text-muted-foreground hover:bg-muted/50"
        >
          <MinusIcon className="h-3.5 w-3.5" />
        </InputGroupButton>
      </InputGroupAddon>

      {/* Visually positioned on the Right */}
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-sm"
          variant="ghost"
          onClick={handleIncrement}
          disabled={disabled || numericValue >= max}
          type="button"
          aria-label="Increase quantity"
          className="text-muted-foreground hover:bg-muted/50"
        >
          <PlusIcon className="h-3.5 w-3.5" />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}