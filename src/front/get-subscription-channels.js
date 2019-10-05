// APIを再度叩く関数
const reGetSubscLists = async (pageToken, subscriptionChannels) => {
    const reGetSubscListsUrl = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId=${myChannelId}&maxResults=50&pageToken=${pageToken}&key=${apikey['key']}`;
    const resultsSubscriptions = await fetch(reGetSubscListsUrl, {
        mode: "cors",
        headers: { "Content-Type": "Access-Control-Allow-Origin; text/plain" }
    }).catch((err) => {
        console.log(err);
    });
    const results = await resultsSubscriptions.json();

    const { items } = results;
    items.forEach((item) => {
        // チャンネル名, チャンネルID
        const subscriptionChannelName = item['snippet']['title'];
        const subscriptionChannelId = item['snippet']['resourceId']['channelId'];

        subscriptionChannels.push({
            channelName: subscriptionChannelName,
            channelId: subscriptionChannelId
        });
    })

    // 次ページトークンを取得
    const { nextPageToken } = results;
    if (nextPageToken) {
        sleep(1000);
        await reGetSubscLists(nextPageToken, subscriptionChannels);
    }

    if (!nextPageToken) {
        return subscriptionChannels;
    }
};

// メイン
const myChannelId = document.getElementById('input-mychannelid').value;
const btnChannelId = document.getElementById('btn-mychannelid');
btnChannelId.addEventListener('click', async () => {
    const subscriptionChannels = [];

    // 自分のチャンネルの登録チャンネル群をAPIで取得
    const getSubscListsUrl = `https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&channelId=${myChannelId}&maxResults=50&key=${apikey['key']}`;
    const resultsSubscriptions = await fetch(getSubscListsUrl, {
        mode: "cors",
        headers: { "Content-Type": "Access-Control-Allow-Origin; text/plain" }
    }).catch((err) => {
        console.log(err);
    });
    const results = await resultsSubscriptions.json();

    // 各登録チャンネルを取得
    const { items } = results;
    items.forEach((item) => {
        // チャンネル名, チャンネルID
        const subscriptionChannelName = item['snippet']['title'];
        const subscriptionChannelId = item['snippet']['resourceId']['channelId'];

        subscriptionChannels.push({
            channelName: subscriptionChannelName,
            channelId: subscriptionChannelId
        });
    })

    // 次ページトークンがある場合は，もう一度APIを叩く
    const { nextPageToken } = results
    if (nextPageToken) {
        sleep(1000);
        await reGetSubscLists(nextPageToken, subscriptionChannels);
    }

    // ドロップダウンに挿入
    const dropdownChannels = document.getElementById('dropdown-channels');
    subscriptionChannels.forEach((channel) => {
        const { channelName } = channel
        const { channelId } = channel

        const option = document.createElement('option');
        option.innerHTML = channelName;
        option.value = channelId;
        dropdownChannels.appendChild(option);
    });
});
