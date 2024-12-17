import React, { useState } from 'react';
import '../ calendar/calendar.css';

function Calendar() {
    let [currentDate, setCurrentDate] = useState(new Date());
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDate();

    let dayOfTheWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    let monthName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    let lastDayOfMonth = new Date(currentYear, currentMonth, daysInMonth).getDay();
    firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    lastDayOfMonth = lastDayOfMonth === 0 ? 6 : lastDayOfMonth - 1;

    let daysArray = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        daysArray.push(<div className='empty' key={`empty-start-${i}`}></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push(<div className={i === currentDay ? 'day currentDay' : 'day'} key={i}>{i}</div>);
    }
    for (let i = lastDayOfMonth + 1; i < 7; i++) {        
        daysArray.push(<div className='empty' key={`empty-end-${i}`}></div>);
    }

    function changeMonth(month) {
        setCurrentDate(new Date(currentYear, currentMonth + month, 1));
    }

    return (
        <div className='calendar'>
            <div className='buttonBox'>
                <button className='button' onClick={() => changeMonth(-1)}>назад</button>
                <button className='button' onClick={() => changeMonth(1)}>вперед</button>
            </div>
            <div className='month'>{monthName[currentMonth]} {currentYear}</div>
            <div className='weekdays'>
                {dayOfTheWeek.map((day, index) => (
                    <div className='dayOfTheWeek' key={index}>{day}</div>
                ))}
            </div>
            <div className='days'>
                {daysArray}
            </div>

        </div>
    );
}

export default Calendar;
