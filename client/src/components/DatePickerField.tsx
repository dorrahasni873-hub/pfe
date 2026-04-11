/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Field, FieldLabel } from "@/components/ui/field";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
type Props = {
  label: string;
  name: string;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
};

export function DatePickerField({ label, name, watch, setValue }: Props) {
  const date = watch(name);

  return (
    <Field className="w-full">
      <FieldLabel>{label}</FieldLabel>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start font-normal w-full"
          >
            {date ? format(new Date(date), "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date ? new Date(date) : undefined}
            onSelect={(selectedDate) => {
              setValue(name, selectedDate);
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}
