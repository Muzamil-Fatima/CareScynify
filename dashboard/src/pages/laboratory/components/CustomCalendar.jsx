import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css'; // Styling ke liye niche Step 3 dekhein

const CustomCalendar = () => {
  const [value, onChange] = useState(new Date());

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden">
      <Calendar
        onChange={onChange}
        value={value}
        className="border-none w-full text-sm"
        calendarType="gregory"
      />
    </div>
    
  );


  
};

export default CustomCalendar;