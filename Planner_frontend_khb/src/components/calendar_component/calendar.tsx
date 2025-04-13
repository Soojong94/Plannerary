"use client";
import React, { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

interface CalendarProps {
  selectedDate: dayjs.Dayjs;
  onDateChange: (date: dayjs.Dayjs) => void;
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateChange }) => {
  const today = dayjs();
  const [currentDate, setCurrentDate] = useState(today);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState(today.year());
  const [selectedMonth, setSelectedMonth] = useState(today.month() + 1);
  const pickerRef = useRef<HTMLDivElement>(null);

  const startOfMonth = currentDate.startOf("month");
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const generateDates = () => {
    const totalSlots = startDay + daysInMonth;
    return Array.from({ length: totalSlots }, (_, i) =>
      i < startDay ? null : i - startDay + 1
    );
  };

  const years = Array.from({ length: 9 }, (_, i) => today.year() - 4 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowPicker(false);
      }
    };
    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPicker]);

  return (
    <div className="relative p-4 rounded-lg bg-white">
      {/* 상단 네비게이션 */}
      <div className="flex justify-between items-center mb-4 relative">
        <button onClick={prevMonth} className="text-xl px-2">
          ←
        </button>

        <div className="relative">
          <h2
            className="text-lg font-semibold cursor-pointer"
            onClick={() => setShowPicker(!showPicker)}
          >
            {currentDate.format("YYYY년 MM월")}
          </h2>

          {showPicker && (
            <div
              ref={pickerRef}
              className="absolute z-10 left-1/2 -translate-x-1/2 mt-2 bg-white border shadow-lg rounded p-3 w-64"
            >
              <div className="flex gap-2">
                <select
                  value={selectedYear}
                  onChange={(e) => {
                    const newYear = Number(e.target.value);
                    setSelectedYear(newYear);
                    setCurrentDate(dayjs(`${newYear}-${selectedMonth}-01`));
                    setShowPicker(false);
                  }}
                  className="w-full border px-2 py-1 rounded text-sm"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}년
                    </option>
                  ))}
                </select>
                <select
                  value={selectedMonth}
                  onChange={(e) => {
                    const newMonth = Number(e.target.value);
                    setSelectedMonth(newMonth);
                    setCurrentDate(dayjs(`${selectedYear}-${newMonth}-01`));
                    setShowPicker(false);
                  }}
                  className="w-full border px-2 py-1 rounded text-sm"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}월
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        <button onClick={nextMonth} className="text-xl px-2">
          →
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 mb-2">
        {weekdays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* 날짜 셀 */}
      <div className="grid grid-cols-7 text-center text-sm">
        {generateDates().map((date, idx) => {
          if (!date) return <div key={idx} />;

          const thisDate = currentDate.date(date);
          const isSelected =
            selectedDate && thisDate.isSame(selectedDate, "day");

          return (
            <div
              key={idx}
              className={`py-4 cursor-pointer rounded-full hover:bg-blue-100 ${
                isSelected ? "bg-blue-500 text-white font-bold" : ""
              }`}
              onClick={() => onDateChange(thisDate)}
            >
              {date}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
