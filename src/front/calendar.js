// 動画情報を取得する関数
const crawlVideos = async (calendar, clickedDate) => {
    const channelId = document.getElementById('select-menu-channels').value;

    const crawlVideosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=10&order=date&publishedBefore=${clickedDate}&key=${apikey['key']}`;
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
};

let clickedDate;

// カレンダーUIを描画する
document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        // 各カレンダー設定
        plugins: ['dayGrid', 'interaction'],
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
            right: 'prev,next'
        },
        selectable: true,
        eventColor: 'white',

        // ボタン関数
        customButtons: {
            crawlButton: {
                text: '取得',
                click: async () => {
                    await crawlVideos(calendar, clickedDate);
                }
            }
        },

        // セルクリック関数
        dateClick: (info) => {
            clickedDate = info.dateStr;
            clickedDate = clickedDate.split("-");
            clickedDate[2] = String(Number(clickedDate[2]) + 1);
            clickedDate = clickedDate.join('-');
            clickedDate = `${clickedDate}T00:00:00Z`;
            console.log(clickedDate);
        },

        // 動画データ可視化
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
        }
    })
    calendar.render();
});
