document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid'],
        defaultView: 'dayGridMonth',
        defaultDate: '2019-08-08',
        eventLimit: true,
        views: {
            timeGrid: {
                eventLimit: 1
            }
        },
        header: {
            right: 'addEventButton today prev,next'
        },
        customButtons: {
            addEventButton: {
                text: 'Crawl YouTube Data',
                click: () => {
                    const header = new Headers();
                    header.append('Access-Control-Allow-Origin', 'text/plain');
                    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCutJqz56653xV2wwSvut_hQ&order=date&maxResults=30&key=AIzaSyCzELFogwdWFTsEw1MwBYqrUpbfPtnNGrg`;
                    fetch(url,
                        {
                            mode: 'cors',
                            header
                        })
                        .then(response => {
                            if (!response.ok) {
                                console.error('Server Error', response);
                            } else {
                                console.log('Crawl Success!!');
                                response.json().then(results => {
                                    const { items } = results;
                                    items.forEach(item => {
                                        const { publishedAt, title } = item.snippet;
                                        const { videoId } = item.id;
                                        const imageurl = item.snippet.thumbnails.medium.url;
                                        const event = {
                                            title,
                                            start: publishedAt.split("T")[0],
                                            url: `https://www.youtube.com/watch?v=${videoId}`,
                                            imageurl
                                        };
                                        calendar.addEvent(event);
                                    });
                                })
                            }
                        }).catch(error => {
                            console.error('Network Error', error);
                        });
                }
            }
        },
        eventRender: (info) => {
            // console.log(info);
            tippy(info.el, {
                content: info.event.title,
                placement: 'top',
                arrow: true,
                arrowType: 'sharp',
                animation: 'fade',
            })
            if (info.event.extendedProps.imageurl) {
                info.el.querySelector('.fc-title').innerHTML =
                    `<img src='${info.event.extendedProps.imageurl}' width='170' height='105'>`;
            }
        },
        eventColor: 'white',
        // テストイベント
        // events: [
        //     {
        //         title: 'ijima',
        //         start: '2019-08-06'
        //     }, {
        //         title: 'ijima2',
        //         start: '2019-08-08'
        //     }]
    })
    calendar.render();
});