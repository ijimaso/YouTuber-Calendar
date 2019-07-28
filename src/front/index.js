// カレンダー表示
document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid'],
        events: [
            {
            title: 'event1',
            start: '2019-07-23'
            },
            {
                title: 'event2',
                start: '2019-07-30'
            },
            {
                title: 'event3',
                start: '2019-07-08'
            },]
    });
    calendar.render();
});

