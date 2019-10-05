function sleep(a) {
    const dt1 = new Date().getTime(); // 現在時刻のタイムスタンプ(ミリ秒)
    let dt2 = new Date().getTime();
    while (dt2 < dt1 + a) {
        dt2 = new Date().getTime();
    }
    return;
};