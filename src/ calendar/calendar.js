import React, {useState} from 'react';
import '../ calendar/calendar.css';
import Modal from "../modal/modal";

function Calendar() {
    let [currentDate, setCurrentDate] = useState(new Date());
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();
    let currentDay = currentDate.getDate();
    let [modalWindowState,setModalWindowState]=useState(false)
    let dayOfTheWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    let monthName = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let [modalInputValue,setModalInputValue]=useState('')
    let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    let lastDayOfMonth = new Date(currentYear, currentMonth, daysInMonth).getDay();
    firstDayOfMonth = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    lastDayOfMonth = lastDayOfMonth === 0 ? 6 : lastDayOfMonth - 1;
    let [eventDate,setEventDate]=useState()
    let daysArray = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        daysArray.push(<div className='empty' key={`empty-start-${i}`}></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push(<div className={i === currentDay ? 'day currentDay' : 'day'} onClick={()=>event(i)} key={i}>{i}</div>);
    }
    for (let i = lastDayOfMonth + 1; i < 7; i++) {        
        daysArray.push(<div className='empty' key={`empty-end-${i}`}></div>);
    }
    function event(day){
        setModalWindowState(true)
        setEventDate({year:currentYear,month:currentMonth,day:day})
    }
    function changeMonth(month) {
        setCurrentDate(new Date(currentYear, currentMonth + month, 1));
    }

    console.log(modalInputValue)
    return (
        <div className='calendar'>
            <Modal open={modalWindowState} close={()=>setModalWindowState(false)}>
                <div>
                    <div className='modal__title'>Добавить новое событие</div>
                    <input className='modal__input' onChange={(event)=>setModalInputValue(event.target.value)}></input>
                    <button className='modal__button'>Добавить</button>
                </div>
            </Modal>
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
