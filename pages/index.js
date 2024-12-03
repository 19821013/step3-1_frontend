import { useState } from 'react';

export default function Home() {

  //GETリクエストを送信
  const [getResponse, setGetResponse] = useState('');

  const handleGetRequest = async () => {
    const res = await fetch('http://localhost:5000/api/hello', {
      method: 'GET',
    });
    const data = await res.json();


    // GETリクエストの結果をコンソールに表示
    console.log("GETリクエストの結果:", data.message);

    setGetResponse(data.message);
  };

  //動的なGETリクエストの送信
  const [id, setId] = useState('');
  const [idResponse, setIdResponse] = useState('');

  // IDを指定してGETリクエストを送信
  const handleIdRequest = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:5000/api/multiply/${id}`, {
      method: 'GET',
    });
    const data = await res.json();

    // IDリクエストの結果をコンソールに表示
    console.log("IDリクエストの結果:", data.doubled_value);

    setIdResponse(data.doubled_value);
  };

  //POSTリクエストを送信
  const [input, setInput] = useState('');
  const [postResponse, setPostResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    //入力されたデータをコンソールに表示
    console.log("入力情報:", input);

    const res = await fetch('http://localhost:5000/api/echo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "message":input }),

    });
    console.log(JSON.stringify({ "message":input }));
    const data = await res.json();

    //バックエンドからのレスポンスをコンソールに表示
    console.log("Backendからのお返事:", data.message);

    setPostResponse(data.message);
  };


  return (
    <div>

      <h1>Next.jsとFlaskの連携アプリ</h1>

      <h2>GETリクエストを送信</h2>
      <button onClick={handleGetRequest}>GETリクエストを送信</button>
      {getResponse && <p>サーバーからのGET応答: {getResponse}</p>}

      <h2>IDを指定してGETリクエストを送信</h2>
      <form onSubmit={handleIdRequest}>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="IDを入力してください"
        />
        <button type="submit">送信</button>
      </form>
      {idResponse && <p>Flaskからの応答: {idResponse}</p>}

      <h2>POSTリクエストを送信</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}

          onChange={(e) => setInput(e.target.value)}
          placeholder="テキストを入力してください"
        />

        <button type="submit">送信</button>
      </form>
      {postResponse && <p>FlaskからのPOST応答: {postResponse}</p>}

    </div>
  );
}
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>日数後の何月何日を表示</title>
</head>
<body>
  <h1>日数後の何月何日を表示</h1>
  
  <!-- 入力フォーム -->
  <label for="days">日数を入力してください（デフォルトは365日）:</label>
  <input type="number" id="days" name="days" value="365" min="1" max="365">
  <button onclick="calculateDate()">送信</button>
  
  <!-- 結果表示 -->
  <h2 id="result"></h2>

  <script>
    function calculateDate() {
      // フォームの入力値を取得
      const days = parseInt(document.getElementById('days').value, 10) || 365;

      // 現在の日付を取得
      const currentDate = new Date();

      // 日数後の日付を計算
      currentDate.setDate(currentDate.getDate() + days);

      // 月日を取得
      const month = currentDate.getMonth() + 1; // 月は0から始まるので +1
      const day = currentDate.getDate();

      // 結果を表示
      document.getElementById('result').textContent = `${days}日後は ${month}月${day}日 です。`;
    }
  </script>
</body>
</html>