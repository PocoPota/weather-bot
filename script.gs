function myFunction() {
  var WEBHOOK_URL = "YOUR_WEBHOOL_URL";
  //discordのwebhookのURL

  //スクレイピングしたいWebページのURLを変数で定義する
  var url = "https://tenki.jp/forecast/3/16/4410/13101/";
  // tenki.jpでの自分の地域の今日明日の天気のURL
  //URLに対しフェッチを行ってHTMLデータを取得する
  var html = UrlFetchApp.fetch(url).getContentText("UTF-8");

  // 今日の日付と曜日
  var date = Parser.data(html)
    .from('<h3 class="left-style">今日&nbsp;')
    .to('<span class="weekday">')
    .build();

  var dow = Parser.data(html)
    .from('<span class="weekday">')
    .to('</span>')
    .build();
  
  var today = date + dow + 'の〇〇の降水確率';

  var rainyPercent = Parser.data(html)
    .from('<tr class="rain-probability">')
    .to('</tr>')
    .iterate();

  var rainyPercent = Parser.data(rainyPercent[0])
    .from('<td>')
    .to('</td>')
    .iterate();

  var rainyPercent1 = rainyPercent[1].slice(0,-27);
  var rainyPercent2 = rainyPercent[2].slice(0,-27);
  var rainyPercent3 = rainyPercent[3].slice(0,-27);

  var message = today + '\r\n' + '06時～12時 : ' + rainyPercent1 + '%' + '\r\n' + '12時～18時 : ' + rainyPercent2 + '%' + '\r\n' + '18時～24時 : ' + rainyPercent3 + '%';

  const payload = {
    username: "今日の降水確率bot☔",
    avatar_url: "icon URL",
    content: message
  };

  UrlFetchApp.fetch(WEBHOOK_URL, {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  });
}
