import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [animeResults, setAnimeResults] = useState<any[]>([]);
  const [bookResults, setBookResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/search?query=${query}`);
      const data = await response.json();
      console.log("✅ 検索結果:", data);

      if (response.ok) {
        setAnimeResults(data.animeResults);
        setBookResults(data.bookResults);
      } else {
        setError(data.error || "データの取得に失敗しました。");
      }
    } catch (error) {
      console.error("⚠️ API リクエストエラー:", error);
      setError("データの取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>作品検索</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="アニメや本を検索..."
        style={{ padding: "10px", marginBottom: "20px", width: "300px" }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
        }}
      >
        検索
      </button>

      {loading && <p>検索中...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <h2>アニメ結果</h2>
        {animeResults.length > 0 ? (
          <ul>
            {animeResults.map((anime) => (
              <li key={anime.mal_id}>
                <Link to={`/works/${anime.mal_id}/anime/reviews`} style={{ cursor: "pointer", color: "blue" }}>
                  {anime.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>該当するアニメはありません。</p>
        )}
      </div>

      <div>
        <h2>本の結果</h2>
        {bookResults.length > 0 ? (
          <ul>
            {bookResults.map((book) => (
              <li key={book.id}>
                <Link to={`/works/${book.id}/book/reviews`} style={{ cursor: "pointer", color: "blue" }}>
                  {book.volumeInfo.title}
                </Link>
                <p>{book.volumeInfo.authors?.join(", ")}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>該当する本はありません。</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;