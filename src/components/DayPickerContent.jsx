/* eslint-disable react/prop-types */
import { DayPicker } from "react-day-picker";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi";

function DayPickerContent(props) {
  return (
    <DayPicker
      mode="single"
      captionLayout="dropdown-buttons"
      selected={props.date}
      onSelect={props.setDate}
      fromYear={2019}
      toYear={2025}
      showOutsideDays
      fixedWeeks
      className="border-0"
      classNames={{
        vhidden: "hidden",
        caption_dropdowns: "flex justify-center text-center gap-3",
        dropdown: "p-1 rounded border",
        caption:
          " flex justify-center py-2 mb-3 relative items-center text-gray-900",
        caption_label: "hidden text-sm font-medium text-gray-900",
        nav: "flex items-center",
        nav_button:
          "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
        nav_button_previous: "absolute left-1.5",
        nav_button_next: "absolute right-1.5",
        table: "w-full border-collapse",
        head_row: "flex font-medium text-gray-900",
        head_cell: "m-0.5 w-8 font-normal text-sm",
        row: "flex w-full mt-2",
        cell: "text-gray-600 rounded-md h-7 w-8 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: "h-8 w-8 p-0 font-normal",
        day_range_end: "day-range-end",
        day_selected:
          "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
        day_today: "rounded-md bg-gray-200 text-gray-900",
        day_outside:
          "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
        day_disabled: "text-gray-500 opacity-50",
        day_hidden: "invisible",
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <HiChevronLeft {...props} className="h-4 w-4 stroke-2" />
        ),
        IconRight: ({ ...props }) => (
          <HiChevronRight {...props} className="h-4 w-4 stroke-2" />
        ),
      }}
    />
  );
}

export default DayPickerContent;
