# YouTuber Calendar
## 概要
自分の登録チャンネルの投稿した動画をカレンダー上で確認できるWebアプリ

## コンセプト
自分の登録しているYouTubeチャンネルの投稿動画は，公式Webページ上では，横に羅列されていて，見にくい．<br>
そこで，カレンダーの各セル上に動画のサムネイルとタイトルを可視化することで，日時と投稿された動画情報のリンクがしやすくなると思い，このWebアプリを開発した．<br>
また，YouTube好きとしては，あえて昔の動画情報を可視化することで，「このYouTuberはこのころにこんな動画を上げたのか～，懐かしいな」等というように感傷にも浸れる．

## 主要機能
* 選択した登録チャンネルとクリックした日付から動画情報を取得し，カレンダー上に可視化する機能
* 可視化した動画から実際の動画ページに遷移する機能
* 自分の登録チャンネルを取得する機能

## 使い方
1. マイチャンネルIDフォームに[自分のチャンネルID](https://support.google.com/youtube/answer/3250431?hl=ja)を入力し，OKボタンを押す．
2. 右のセレクトボックスで動画情報を取得したい登録チャンネルを選択する．
3. カレンダー上で動画を取得したい日時を選択する．
4. カレンダーの右上にある取得ボタンを押す．

## 使用ライブラリ・API
[FullCalendar v4](https://fullcalendar.io/)<br>
[Bootstrap 4.2.1](https://getbootstrap.com/docs/4.2/getting-started/introduction/)<br>
[YouTube Data API v3](https://developers.google.com/youtube/v3/)