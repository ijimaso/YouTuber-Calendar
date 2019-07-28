const fs = require('fs');
const apikey = require('../util/apikey.json');
const YouTube = require('youtube-node');

const youTube = new YouTube();

// APIキーを設定
youTube.setKey(apikey.key);

// パラメータ指定
const params = {
    channelId: 'UCutJqz56653xV2wwSvut_hQ', // チャンネルを指定
    order: 'date' // 新着順で取得
};

// searchメソッド
// キーワードと件数を指定して，動画情報を取得
// パラメータを指定することで条件を絞り込むことも可能
// 動画には簡単なデータのみ
youTube.search('東海オンエア', 10, params, (error, result) => {
    if (error) {
        console.log(error);
    }
    else {
        const dataJSON = JSON.stringify(result, null, "\t");
        fs.writeFileSync('../util/sample_youtube_data.json', dataJSON);
        console.log('Success!!');
    }
});