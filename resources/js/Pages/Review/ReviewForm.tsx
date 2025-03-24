import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ReviewFormProps {
  workId: string;
  workType: "anime" | "book";
}

const ReviewForm: React.FC<ReviewFormProps> = ({ workId, workType }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const apiUrl = `http://localhost:8000/api/works/${workId}/${workType}/reviews`;
    const requestData = {
      work_id: workId,         
      work_type: workType,      
      title: title,
      review_text: reviewText,
      is_public: isPublic,
    };

    console.log("🚀 APIリクエスト URL:", apiUrl);
    console.log("📤 送信データ:", requestData);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const responseText = await response.text(); 
      console.log("📩 APIレスポンス:", responseText);

      if (!response.ok) {
        throw new Error(`APIエラー: ${response.status} ${response.statusText}`);
      }

      if (!responseText) {
        console.warn("⚠️ 空のレスポンスを受け取りました");
        navigate(`/works/${workId}/${workType}/reviews`);
        return;
      }

      // JSONパース
      const data = JSON.parse(responseText);
      console.log("✅ 成功データ:", data);

      // 成功したらレビュー一覧にリダイレクト
      navigate(`/works/${workId}/${workType}/reviews`);
    } catch (error: any) {
      console.error("⚠️ レビュー投稿エラー:", error);
      setError(error.message || "レビューの投稿に失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>タイトル</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "10px", margin: "10px 0", width: "300px" }}
        />
      </div>
      <div>
        <label>レビュー</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          style={{ padding: "10px", margin: "10px 0", width: "300px", height: "100px" }}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          公開
        </label>
      </div>
      <button
        type="submit"
        style={{
          padding: "10px",
          backgroundColor: loading ? "#ccc" : "#4CAF50",
          color: "white",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
        }}
        disabled={loading}
      >
        {loading ? "送信中..." : "投稿"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ReviewForm;
