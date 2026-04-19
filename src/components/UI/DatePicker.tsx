"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import Dropdown from "./DropDown";
import Input, { InputProps } from "./Input";
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { 
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, 
  eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, 
  setHours, setMinutes, isValid, setYear, setMonth, addYears, subYears
} from "date-fns";

export interface DatePickerProps extends Omit<InputProps, "type" | "value" | "onChange"> {
  value?: string | Date | null;
  onChange?: (date: string) => void;
  showTime?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ 
  value, 
  onChange, 
  showTime = true, 
  placeholder = "Select date & time",
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, origin: "origin-top-left" });
  
  // Views: days -> months -> years
  const [viewMode, setViewMode] = useState<"days" | "months" | "years">("days");

  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const popoverContentRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true); }, []);
  
  const selectedDate = useMemo(() => {
    if (!value) return null;
    const d = typeof value === "string" ? new Date(value) : value;
    return isValid(d) ? d : null;
  }, [value]);

  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date());
  
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  useEffect(() => {
    if (selectedDate) {
       if (!isSameMonth(selectedDate, currentMonth)) setCurrentMonth(selectedDate);
       
       const h = selectedDate.getHours();
       const m = selectedDate.getMinutes();
       setPeriod(h >= 12 ? "PM" : "AM");
       setHour((h % 12 || 12).toString().padStart(2, '0'));
       setMinute(m.toString().padStart(2, '0'));
    }
  }, [selectedDate]);

  const updatePosition = () => {
    if (inputWrapperRef.current) {
      const rect = inputWrapperRef.current.getBoundingClientRect();
      
      let popoverHeight = 360; 
      let popoverWidth = 320; 

      if (popoverContentRef.current) {
         popoverHeight = popoverContentRef.current.offsetHeight;
         popoverWidth = popoverContentRef.current.offsetWidth;
      }

      let top = rect.bottom + 8;
      let left = rect.left;
      let origin = "origin-top-left";

      // Y-axis overflow check
      if (top + popoverHeight > window.innerHeight) {
         if (rect.top > window.innerHeight - rect.bottom) {
             top = rect.top - popoverHeight - 8;
             origin = "origin-bottom-left";
         }
      }

      // X-axis overflow check
      if (left + popoverWidth > window.innerWidth) {
         left = Math.max(8, window.innerWidth - popoverWidth - 16);
      }

      setPosition({ top, left, origin });
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Must cast correctly to handle Portal target elements matching
      if (
        popoverContentRef.current && !popoverContentRef.current.contains(e.target as Node) &&
        inputWrapperRef.current && !inputWrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setViewMode("days");
      }
    };
    
    // Close cleanly or follow input when standard events occur outside the dropdown
    const handleScroll = (e: Event) => {
      if (popoverContentRef.current && popoverContentRef.current.contains(e.target as Node)) {
        return; 
      }
      updatePosition();
    };

    if (isOpen) {
      updatePosition();
      requestAnimationFrame(() => updatePosition());
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", updatePosition);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen]);

  const handleTimeChangeInternal = (h: string, m: string, p: "AM"|"PM", dateObj = selectedDate) => {
    let parsedH = parseInt(h, 10);
    if (parsedH === 12) {
       parsedH = p === "AM" ? 0 : 12;
    } else if (p === "PM") {
       parsedH += 12;
    }
    const parsedM = parseInt(m, 10) || 0;
    
    if (dateObj && onChange) {
       let newDate = setHours(dateObj, parsedH);
       newDate = setMinutes(newDate, parsedM);
       onChange(newDate.toISOString());
    }
  };

  const handleDateSelect = (day: Date) => {
    let parsedH = parseInt(hour, 10);
    if (parsedH === 12) parsedH = period === "AM" ? 0 : 12;
    else if (period === "PM") parsedH += 12;

    const parsedM = parseInt(minute, 10) || 0;
    
    let newDate = setHours(setMinutes(day, parsedM), parsedH);
    if (!showTime) {
      newDate = setHours(setMinutes(newDate, 0), 0);
    }
    if (onChange) onChange(newDate.toISOString()); 
    if (!showTime) {
      setIsOpen(false);
      setViewMode("days");
    }
  };

  const displayFormat = showTime ? "MMM dd, yyyy  hh:mm a" : "MMM dd, yyyy";
  const displayValue = selectedDate ? format(selectedDate, displayFormat) : "";

  // Grid pre-calcs
  const gridStart = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
  const gridEnd = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });
  const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

  const renderDays = () => (
    <>
      <div className="flex items-center justify-between mb-4">
        <button 
           type="button"
           onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} 
           className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
        >
          <ChevronLeft size={18} />
        </button>
        <button 
           type="button"
           onClick={() => setViewMode("months")}
           className="font-semibold text-slate-800 text-sm hover:text-indigo-600 transition-colors px-2 py-1 rounded-md"
        >
           {format(currentMonth, 'MMMM yyyy')}
        </button>
        <button 
           type="button"
           onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
           className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map(day => (
          <div key={day} className="text-center text-xs font-semibold uppercase text-slate-400 py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {days.map(day => {
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
          const isCurrentMonth = isSameMonth(day, currentMonth);
          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => handleDateSelect(day)}
              className={`
                w-8 h-8 mx-auto flex items-center justify-center rounded-lg text-sm transition-all
                ${isSelected 
                  ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-medium shadow-md shadow-indigo-600/30' 
                  : 'hover:bg-slate-100 text-slate-700 font-medium bg-transparent border border-transparent hover:border-slate-200'
                }
                ${!isCurrentMonth && !isSelected ? 'text-slate-300' : ''}
              `}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </>
  );

  const renderMonths = () => (
    <>
      <div className="flex items-center justify-between mb-4">
        <button 
           type="button"
           onClick={() => setCurrentMonth(subYears(currentMonth, 1))} 
           className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
        >
          <ChevronLeft size={18} />
        </button>
        <button 
           type="button"
           onClick={() => setViewMode("years")}
           className="font-semibold text-slate-800 text-sm hover:text-indigo-600 transition-colors px-2 py-1 rounded-md"
        >
           {format(currentMonth, 'yyyy')}
        </button>
        <button 
           type="button"
           onClick={() => setCurrentMonth(addYears(currentMonth, 1))}
           className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
        >
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 py-2 mb-2">
         {Array.from({ length: 12 }).map((_, i) => {
             const d = new Date(currentMonth.getFullYear(), i, 1);
             return (
               <button 
                  key={i}
                  type="button"
                  onClick={() => {
                     setCurrentMonth(setMonth(currentMonth, i));
                     setViewMode("days");
                  }}
                  className="py-2 px-1 text-sm rounded-lg hover:bg-slate-100 hover:text-indigo-600 font-medium text-slate-700 transition"
               >
                 {format(d, 'MMM')}
               </button>
             );
         })}
      </div>
    </>
  );

  const renderYears = () => {
    const startY = currentMonth.getFullYear() - 7;
    return (
      <>
        <div className="flex items-center justify-between mb-4">
          <button 
             type="button"
             onClick={() => setCurrentMonth(subYears(currentMonth, 15))} 
             className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="font-semibold text-slate-800 text-sm">
             {startY} - {startY + 14}
          </div>
          <button 
             type="button"
             onClick={() => setCurrentMonth(addYears(currentMonth, 15))}
             className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
          >
            <ChevronRight size={18} />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 py-2 mb-2">
           {Array.from({ length: 15 }).map((_, i) => {
               const y = startY + i;
               return (
                 <button 
                    key={y}
                    type="button"
                    onClick={() => {
                       setCurrentMonth(setYear(currentMonth, y));
                       setViewMode("months");
                    }}
                    className={`py-2 px-1 text-sm rounded-lg font-medium transition ${y === currentMonth.getFullYear() ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-slate-100 text-slate-700 hover:text-indigo-600'}`}
                 >
                   {y}
                 </button>
               );
           })}
        </div>
      </>
    );
  };

  const portalContent = isOpen && isClient ? createPortal(
    <div 
      ref={popoverContentRef}
      style={{ top: position.top, left: position.left, position: 'fixed', zIndex: 999999 }}
      className={`bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-xl p-4 w-[320px] select-none animate-in fade-in zoom-in-95 duration-200 ${position.origin}`}
    >
      {viewMode === "days" && renderDays()}
      {viewMode === "months" && renderMonths()}
      {viewMode === "years" && renderYears()}

      {showTime && viewMode === "days" && (
        <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-2">
          <div className="flex items-center gap-2 text-slate-600">
            <Clock size={16} />
            <span className="text-sm font-medium">Time</span>
          </div>
          
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 p-1 rounded-lg">
            <Dropdown
              value={hour}
              options={Array.from({length: 12}).map((_, i) => ({ value: (i+1).toString().padStart(2, '0'), label: (i+1).toString().padStart(2, '0') }))}
              onChange={(val) => {
                 setHour(val as string);
                 if(selectedDate) handleTimeChangeInternal(val as string, minute, period, selectedDate);
              }}
              size="xs"
              variant="inline"
              className="w-14"
              dropdownWidth={80}
            />
            <span className="text-slate-400 font-bold -mx-1 -mt-0.5">:</span>
            <Dropdown
              value={minute}
              options={Array.from({length: 60}).map((_, i) => ({ value: i.toString().padStart(2, '0'), label: i.toString().padStart(2, '0') }))}
              onChange={(val) => {
                 setMinute(val as string);
                 if(selectedDate) handleTimeChangeInternal(hour, val as string, period, selectedDate);
              }}
              size="xs"
              variant="inline"
              className="w-14"
              dropdownWidth={80}
            />
            <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>
            <Dropdown
              value={period}
              options={[{value: "AM", label: "AM"}, {value: "PM", label: "PM"}]}
              onChange={(val) => {
                 const p = val as "AM"|"PM";
                 setPeriod(p);
                 if(selectedDate) handleTimeChangeInternal(hour, minute, p, selectedDate);
              }}
              size="xs"
              variant="inline"
              className="w-16"
              dropdownWidth={80}
            />
          </div>
        </div>
      )}
    </div>,
    document.body
  ) : null;

  return (
    <div className="relative w-full z-10" ref={inputWrapperRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="w-full relative">
        <Input
          {...props}
          placeholder={placeholder}
          value={displayValue}
          readOnly
          leftIcon={<CalendarIcon size={18} />}
          className="cursor-pointer bg-white"
        />
      </div>
      {portalContent}
    </div>
  );
};

export default DatePicker;
