// HTTP通信を行って，データを取得するサンプルコード
const fetchYouTubeData = (channelId, key) => {
    const header = new Headers();
    header.append('Access-Control-Allow-Origin', 'text/plain');
    // console.log(header);
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=10&key=${key}`,
        {
            mode: 'cors',
            header
        })
        .then(response => {
            // console.log(response);
            // console.log(response.status);
            // console.log(response.text);
            if (!response.ok) {
                console.error("サーバーエラー", response);
            } else {
                response.json().then(results => {
                    console.log(results);
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
                        console.log(event);
                        events.push(event);
                    });
                    console.log(calendar);
                    calendar.addEventSource(events);
                })
            }
        }).catch(error => {
            console.error("ネットワークエラー", error);
        });
}