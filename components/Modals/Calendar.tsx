// import React, { useState } from "react";

// import { twMerge } from "tailwind-merge";

// import { DayPicker } from "react-day-picker";
// import "react-day-picker/dist/style.css";

// import Button from "components/Common/Button";

// import { formatTime } from "services/format";

// type CalendarButtonProps = {
//   date: string;
//   onSelect: (date: string) => void;
// };

// const CalendarButton: React.FC<CalendarButtonProps> = (props) => {
//   const { date, onSelect } = props;

//   const time = date ? new Date(date) : undefined;

//   const [openCalendar, setOpenCalendar] = useState(false);

//   function toggleCalendar() {
//     setOpenCalendar((prev) => !prev);
//   }

//   const todayStyle = {
//     backgroundColor: "#e0e7ff",
//     color: "#4f46e5",
//   };

//   const modifiedStyles = {
//     selected: {
//       backgroundColor: "#4f46e5",
//       color: "white",
//     },
//     today: time ? undefined : todayStyle,
//   };

//   const footer = (
//     <div className="w-full flex justify-end">
//       <Button className="text-blue-600 underline" onClick={toggleCalendar}>
//         cancel
//       </Button>
//     </div>
//   );

//   return (
//     <div className="relative">
//       <Button
//         leftIcon="Calendar"
//         className="text-indigo-600 bg-indigo-100 py-2 px-6 hover:underline"
//         onClick={toggleCalendar}
//       >
//         {date ? formatTime(time?.toString() as string) : "no due date"}
//       </Button>

//       <DayPicker
//         mode="single"
//         selected={time}
//         defaultMonth={time}
//         footer={footer}
//         // @ts-ignore
//         modifiersStyles={modifiedStyles}
//         className={twMerge(
//           "absolute bg-white border border-gray-300 rounded-md p-4 -left-4 z-50",
//           openCalendar ? "visible" : "invisible"
//         )}
//         onSelect={(date) => {
//           date = date as Date;

//           if (date) {
//             onSelect(
//               `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
//             );
//           }

//           toggleCalendar();
//         }}
//       />
//     </div>
//   );
// };

// export default CalendarButton;
