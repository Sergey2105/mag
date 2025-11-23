import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "@/components/ui/label";

export interface FilterCheckboxProps {
    text: string;
    value: string;
    endAdornment?: React.ReactNode;
    onCheckedChange?: (checked: boolean) => void;
    checked?: boolean;
    name?: string;
}

export default function FilterCheckbox(props: FilterCheckboxProps) {
    const { text, value, endAdornment, onCheckedChange, checked, name } = props;
    return (
        <div className="flex items-center space-x-2">
            <Checkbox onCheckedChange={onCheckedChange} checked={checked} value={value} className="rounded-xl w-6 h-6" id={`checkbox-${String(name)}-${String(value)}`} />
            <Label htmlFor={`checkbox-${String(name)}-${String(value)}`} className="cursor-pointer flex-1">
                {text}
            </Label>

            {endAdornment}
        </div>
    );
}
