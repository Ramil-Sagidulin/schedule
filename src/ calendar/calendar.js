function Calendar(){

    let date=new Date();
    let year=date.getFullYear();
    let month= date.getMonth();
    let day=date.getDay();

    let dayOfTheWeek=['Пн','Вт','Ср','Чт','Пт','Сб','Вс']

    return(
        <div className='calendar'>
            {dayOfTheWeek.map(function (day){
                return(
                    <div className='dayOfTheWeek'>{day}</div>
                )
            })}
            <div></div>
        </div>
    )
}
export default Calendar