// HTTP通信を行って，データを取得するサンプルコード
function getUserInfo(userId) {
    fetch(`https://api.github.com/users/${userId}`)
        .then(response => {
            console.log(response.status);
            if (!response.ok) {
                console.error("サーバーエラー", response);
            } else {
                response.json().then(userInfo => {
                    const p = document.getElementById('p');
                    console.log(userInfo['login']);
                    p.innerHTML = userInfo['login'];
                })
            }
        }).catch(error => {
            console.error("ネットワークエラー", error);
        });
}