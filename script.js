// 規則の初期設定
const defaultRules = String.raw`
[/\n(?!\n)/g, " "],
[/-\s/g, ""],
[/\.\s+/g, ".\n"],
`.replace(/\n/, "");

$("#rule").val(defaultRules);

// sample dirty text
var sampleText = `Sense child do state to defer mr of forty. Become lat-
ter but nor abroad wisdom waited. Was delivered gentl-
eman acuteness but daughters. In as of whole as match
asked. Pleasure exertion put add entrance distance dr-
awings. In equally matters showing greatly it as. Want
name any wise are able park when. Saw vicinity judgme-
nt remember finished men throwing.`;

// DeepL base URL
var baseUrl = "https://www.deepl.com/translator#en/ja/";

// リアルタイム更新
$("#input")
  .keyup(function () {
    setURL("#url", format(this, "#output"));
  })
  .keyup();

// Format ボタン
$("#format").on("click", function () {
  setURL("#url", format("#input", "#output"));
});

// Clear ボタン
$("#clear").on("click", function () {
  clear("#input");
  setURL("#url", format("#input", "#output"));
});

// Paste ボタン
$("#paste").on("click", function () {
  $("#input").text(getClipText());
  setURL("#url", format("#input", "#output"));
});

// Sample ボタン
$("#sample").on("click", function () {
  $("#input").val(sampleText);
  setURL("#url", format("#input", "#output"));
});

// Openボタン
$("#open").on("click", function () {
  var url = $("#url").attr("href");
  window.open(url, "_blank");
});

// Reset rule ボタン
$("#reset-rule").on("click", function () {
  $("#rule").val(defaultRules);
});

// Clear rule ボタン
$("#clear-rule").on("click", function () {
  $("#rule").val("");
});

// クリップボードを取得
function getClipText() {
  return navigator.clipboard.readText();
}

// URLを生成
function setURL(anchorSelecter, text) {
  // 改行\nをエスケープ。自動でやってくれないので。
  var textForUrl = text.replace(/\n/g, "%0A");
  var textForHtml = text.replace(/\n/g, " ");

  $(anchorSelecter)
    .attr("href", baseUrl + textForUrl)
    .text(baseUrl + textForHtml);
}

// テキスト整形
function format(inputSelector, outputSelector) {
  // テキスト取得
  var text = $(inputSelector).val();
  // 整形
  text = replace(text);
  // 画面出力
  $(outputSelector).text(text);
  // 整形結果を返す
  return text;
}

// テキスト置換
function replace(text) {
  var rules = eval("[" + $("#rule").val() + "]");
  for (var i = 0; i < rules.length; i++) {
    text = text.replace(rules[i][0], rules[i][1]);
  }
  return text;
}

function clear(inputSelector) {
  // テキスト入力エリアをクリア
  $(inputSelector).val("");
}
