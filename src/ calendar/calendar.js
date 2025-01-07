import React, { useState } from 'react';
import '../ calendar/calendar.css';
import Modal from "../modal/modal";


function Calendar() {
    let [currentDate, setCurrentDate] = useState(new Date());
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let [modalWindowState, setModalWindowState] = useState(false);
    let [eventDetailsModalState, setEventDetailsModalState] = useState(false);
    let dayOfTheWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    let monthName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let [modalInputValue, setModalInputValue] = useState('');
    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    let lastDayOfMonth = new Date(currentYear, currentMonth, daysInMonth).getDay();
    let [eventInformation, setEventInformation] = useState({});
    let [eventKey, setEventKey] = useState();
    let toDate = new Date();
    let toYear = toDate.getFullYear();
    let toMonth = toDate.getMonth();
    let toDay = toDate.getDate();
    firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    lastDayOfMonth = lastDayOfMonth === 0 ? 6 : lastDayOfMonth - 1;
    let daysArray = [];
    let [eInfo, setEInfo] = useState('');

    for (let i = 0; i < firstDayOfMonth; i++) {
        daysArray.push(<div className='empty' key={`empty-start-${i}`}></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        let dayKey = `${i}-${currentMonth}-${currentYear}`;
        let isPastDate = new Date(currentYear, currentMonth, i).getTime() <= toDate.getTime();
        daysArray.push(
            <div
                draggable={!isPastDate}
                onDragStart={() => !isPastDate && dragStart(dayKey)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => !isPastDate && dragDrop(dayKey)}
                className={dayKey === `${toDay}-${toMonth}-${toYear}` ? 'day currentDay' : (dayKey in eventInformation ? 'day eventDay' : 'day')}
                onClick={() => event(i)}
                key={i}
            >
                {i}
            </div>
        );
    }
    for (let i = lastDayOfMonth + 1; i < 7; i++) {
        daysArray.push(<div className='empty' key={`empty-end-${i}`}></div>);
    }

    function dragStart(day) {
        setEInfo({ key: day, info: eventInformation[day] });
    }

    function dragDrop(day) {
        if (eInfo) {
            setEventInformation((prev) => ({ ...prev, [day]: eInfo.info }));
            setEventInformation((prev) => {
                const newEventInformation = { ...prev };
                delete newEventInformation[eInfo.key];
                return newEventInformation;
            });
        }
    }

    function event(day) {
        let key = `${day}-${currentMonth}-${currentYear}`;
        setEventKey(key);
        if (new Date(currentYear, currentMonth, day).getTime() > toDate.getTime()) {
            if (eventInformation[key]) {
                setEventDetailsModalState(true);
            } else {
                setModalWindowState(true);
            }
        }
        setModalInputValue('');
    }

    function addNewEvent() {
        setEventInformation((prevState) => ({ ...prevState, [eventKey]: modalInputValue }));
        setModalWindowState(false);
    }

    function changeMonth(month) {
        setCurrentDate(new Date(currentYear, currentMonth + month, 1));
    }

    let timeoutId;
    function buttonDragOver(event) {
        event.preventDefault();
        if (!timeoutId) {
            timeoutId = setTimeout(() => {
                changeMonth(1);
            }, 2000);
        }
    }

    function buttonDragLeave() {
        clearTimeout(timeoutId);
    }

    return (
        <div className='calendar'>
            <Modal open={modalWindowState} close={() => setModalWindowState(false)}>
                <div>
                    <div className='modal__title'>Добавить новое событие</div>
                    <input className='modal__input' onChange={(event) => setModalInputValue(event.target.value)}></input>
                    <button disabled={modalInputValue === ''} className='modal__button' onClick={() => addNewEvent()}>Добавить</button>
                </div>
            </Modal>

            <Modal open={eventDetailsModalState} close={() => setEventDetailsModalState(false)}>
                <div>
                    <div className='modal__title'>Информация о событии</div>
                    <div className='modal__content'>{eventInformation[eventKey]}</div>
                </div>
            </Modal>

            <div className='buttonBox'>
                <button className='button' onClick={() => changeMonth(-1)}>назад</button>
                <button className='button' onClick={() => changeMonth(1)} onDragOver={buttonDragOver} onDragLeave={buttonDragLeave}>вперед</button>
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
