document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['dayGrid'],
        defaultView: 'dayGridMonth',
        views: {
            dayGrid: {
                eventLimit: 1,
                eventLimitText: 'more videos'
            }
        },
        header: {
            left: 'crawlButton',
            center: 'title',
            right: 'today prev,next'
        },
        customButtons: {
            crawlButton: {
                text: 'Crawl YouTube Data',
                click: async () => {
                    const channel = document.getElementsByClassName('form-control')[0].value;
                    const numberResults = document.getElementsByClassName('form-control')[1].value;
                    console.log(channel, numberResults);

                    const header = new Headers();
                    header.append('Access-Control-Allow-Origin', 'text/plain');

                    // チャンネルIDを取得
                    const crawlChannelIdUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q=${channel}&key=AIzaSyCzELFogwdWFTsEw1MwBYqrUpbfPtnNGrg`
                    const resultsChannel = await fetch(crawlChannelIdUrl, {
                        mode: 'cors',
                        header
                    }).catch((err) => {
                        console.log(err);
                    });
                    const resultsChannelJson = await resultsChannel.json();

                    const { items } = resultsChannelJson;
                    for (const item of items) {
                        if (item['id']['kind'] === 'youtube#channel') {
                            const { channelId } = item['id'];

                            // 動画情報を取得
                            const crawlVideosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=${numberResults}&key=AIzaSyCzELFogwdWFTsEw1MwBYqrUpbfPtnNGrg`;
                            const resultsVideos = await fetch(crawlVideosUrl, {
                                mode: 'cors',
                                header
                            }).catch((err) => {
                                console.log(err);
                            });
                            const resultsVideosJson = await resultsVideos.json();

                            const { items } = resultsVideosJson;
                            items.forEach(item => {
                                const { publishedAt, title, channelTitle } = item.snippet;
                                const { videoId } = item.id;
                                const imageurl = item.snippet.thumbnails.medium.url;

                                const event = {
                                    title,
                                    start: publishedAt.split("T")[0],
                                    url: `https://www.youtube.com/watch?v=${videoId}`,
                                    imageurl,
                                    channelTitle
                                };
                                calendar.addEvent(event);
                            });
                            break;
                        }
                    }
                }
            }
        },
        eventRender: (info) => {
            // console.log(info);
            tippy(info.el, {
                content: `<strong>${info.event.extendedProps.channelTitle}</strong><br>${info.event.title}`,
                placement: 'top',
                arrow: true,
                arrowType: 'sharp',
                animation: 'fade',
            });

            if (info.event.extendedProps.imageurl) {
                info.el.querySelector('.fc-title').innerHTML =
                    `<img src='${info.event.extendedProps.imageurl}' width='170' height='100'>`;
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