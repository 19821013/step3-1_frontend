import { useState } from 'react';

export default function RegionAndDateRecommendation() {
  const [region, setRegion] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [recommendation, setRecommendation] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ region, month: parseInt(month), day: parseInt(day) }),
    });
    const data = await response.json();
    if (data.recommendation) {
      setRecommendation(data.recommendation);
    } else {
      alert(data.error || 'エラーが発生しました');
    }
  };

  return (
    <div>
      <h1>地域と日付に基づくおすすめの提案</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          placeholder="地域を入力"
        />
        <input
          type="number"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          placeholder="月を入力"
          min="1"
          max="12"
        />
        <input
          type="number"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          placeholder="日を入力"
          min="1"
          max="31"
        />
        <button type="submit">提案を表示</button>
      </form>
      {recommendation && <p>おすすめの提案: {recommendation}</p>}
    </div>
  );
}
