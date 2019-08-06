document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid'],
        header: {
            center: 'addEventButton'
        },
        customButtons: {
            addEventButton: {
                text: 'Crawl YouTube Data',
                click: () => {
                    const header = new Headers();
                    header.append('Access-Control-Allow-Origin', 'text/plain');
                    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCutJqz56653xV2wwSvut_hQ&order=date&maxResults=30&key=AIzaSyCzELFogwdWFTsEw1MwBYqrUpbfPtnNGrg`,
                        {
                            mode: 'cors',
                            header
                        })
                        .then(response => {
                            if (!response.ok) {
                                console.error("サーバーエラー", response);
                            } else {
                                response.json().then(results => {
                                    const items = results.items;
                                    const events = [];
                                    items.forEach(item => {
                                        const { publishedAt, title } = item.snippet;
                                        const { videoId } = item.id;
                                        const imageurl = item.snippet.thumbnails.medium.url;
                                        const start = publishedAt.split("T")[0];
                                        const event = {
                                            title,
                                            start,
                                            url: `https://www.youtube.com/watch?v=${videoId}`,
                                            imageurl
                                        };
                                        events.push(event);
                                    });
                                    console.table(events);
                                    calendar.addEventSource(events);
                                })
                            }
                        }).catch(error => {
                            console.error("ネットワークエラー", error);
                        });
                }
            }
        },
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