// HTTP通信を行って，データを取得するサンプルコード
const fetchYouTubeData = (channelId, key) => {
    const header = new Headers();
    header.append('Access-Control-Allow-Origin', 'text/plain');
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&maxResults=10&key=${key}`,
        {
            method: 'GET',
            mode: 'cors',
            header
        })
        .then(response => {
            console.log(response.status);
            if (!response.ok) {
                console.error("サーバーエラー", response);
            } else {
                response.json().then(results => {
                    // const p = document.getElementById('p');
                    const items = results.items;
                    items.forEach(item => {
                        const { publishedAt, title } = item.snippet;
                        const { videoId } = item.id;
                        const thumbnail = item.snippet.thumbnails.medium.url;
                        console.log(publishedAt, title, videoId);
                        console.log(thumbnail);
                    });
                    // p.innerHTML = results;
                })
            }
        }).catch(error => {
            console.error("ネットワークエラー", error);
        });
}