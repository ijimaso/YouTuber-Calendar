document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid'],
        events: [
            {
            title: '【罠の応酬】文理対抗！マリオメーカー対決！',
            start: '2019-08-03',
            url: 'https://www.youtube.com/watch?v=JcyHfkY4-3U',
            imageurl: 'https://i.ytimg.com/vi/B2EZyROtZ20/mqdefault.jpg',
            },
            {
                title: '【罠の応酬】文理対抗！マリオメーカー対決！',
                start: '2019-08-05',
                url: 'https://www.youtube.com/watch?v=JcyHfkY4-3U',
                imageurl: 'https://i.ytimg.com/vi/B2EZyROtZ20/mqdefault.jpg',
            }],
        eventRender: (info) => {
            if (info.event.extendedProps.imageurl) {
                info.el.querySelector('.fc-title').innerHTML =
                    `<img src='${info.event.extendedProps.imageurl}' width='170' height='100'><br>
                            ${info.event.title}`;
            }
        }
    })
    calendar.render();
});