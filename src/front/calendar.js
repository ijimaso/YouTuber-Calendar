// 動画情報を取得する関数
const crawlVideos = async (calendar, pageToken) => {
    const channelId = document.getElementById('dropdown-channels').value;

    let crawlVideosUrl;
    if (!pageToken) {
        crawlVideosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=10&key=${apikey['key']}`;
    } else {
        crawlVideosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=10&pageToken=${pageToken}&key=${apikey['key']}`
    }

    const resultsVideos = await fetch(crawlVideosUrl, {
        method: "GET",
        mode: 'cors',
        headers: { "Content-Type": "Access-Control-Allow-Origin; text/plain" }
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

    // nextPageTokenを取得
    const { nextPageToken } = resultsVideosJson;
    pagingToken = nextPageToken;
};

let pagingToken;

// カレンダーUIを描画する
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
            left: 'crawlButton pagingButton',
            center: 'title',
            right: 'prev,next'
        },
        customButtons: {
            crawlButton: {
                text: '取得',
                click: async () => {
                    await crawlVideos(calendar, pagingToken);
                }
            },
            pagingButton: {
                text: 'ページング',
                click: async () => {
                    await crawlVideos(calendar, pagingToken);
                }
            }
        },
        eventRender: (info) => {
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
        eventColor: 'white'
    })
    calendar.render();
});
