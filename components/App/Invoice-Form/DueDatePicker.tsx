import { Control, Controller } from "react-hook-form";
import { addDays, subDays } from "date-fns";
import { DayPicker } from "react-day-picker";
import { Popover } from "@headlessui/react";
import { useMemo, useState } from "react";
import { Tooltip } from "react-tooltip";

import "react-day-picker/dist/style.css";

import { InvoiceFormData } from "types/invoice";

import { Icon } from "components/ui/icons";
import Button from "components/ui/Button";
import { formatDate } from "lib/invoice/format";

export const NET_30 = 30;
const NET_90 = 90;


type DueDatePickerProps = {
  control: Control<InvoiceFormData, any>;
};

export function DueDatePicker(props: DueDatePickerProps) {
  const { control } = props;

  const today = new Date();
  const defaultDueDate = addDays(today, NET_30);

  const [dueDate, setDueDate] = useState<Date>();

  const onHandleDateSelect = (date, cb) => {
    setDueDate(date);
    cb();
  };

  const disabledDays = [
    {
      from: subDays(today, today.getDate()),
      to: today,
    },
  ];

  const text = dueDate ? formatDate(dueDate) : "select due date";
  const selectedDate = dueDate || defaultDueDate;

  return (
    <Popover>
      <div className="flex flex-col justify-start">
        <span className="flex flex-row items-center">
          <p className="mr-2">Due Date</p>
          <Icon as="Info" className="text-gray-600 due-date-picker-info" />
          <Tooltip
            anchorSelect=".due-date-picker-info"
            place="top"
            className="first-letter:capitalize"
          >
            select a date that matches Net 30 or 90
          </Tooltip>
        </span>
        <Popover.Button
          as={Button}
          leftIcon="Calendar"
          className="flex flex-row text-gray-500 px-0 underline items-start"
        >
          {text}
        </Popover.Button>
      </div>

      <Popover.Panel>
        {({ close }) => (
          <Controller
            name="due_date"
            control={control}
            defaultValue={defaultDueDate}
            render={({ field }) => (
              <DayPicker
                className="absolute z-10 bg-white border border-gray-300 p-4 !-ml-32"
                mode="single"
                showOutsideDays
                fromMonth={today}
                defaultMonth={selectedDate}
                disabled={disabledDays}
                selected={selectedDate}
                toMonth={addDays(today, NET_90)}
                onSelect={(date) => {
                  date = date || defaultDueDate;

                  onHandleDateSelect(date, () => {
                    field.onChange(date);
                    close();
                  });
                }}
              />
            )}
          />
        )}
      </Popover.Panel>
    </Popover>
  );
}
