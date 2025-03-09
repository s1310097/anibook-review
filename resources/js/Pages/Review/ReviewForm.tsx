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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`/api/works/${workId}/${workType}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title, review_text: reviewText, is_public: isPublic, work_type: workType }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "レビューの投稿に失敗しました。");
      }

      const data = await response.json();

      // レビューが正常に投稿された場合、レビュー一覧ページにリダイレクト
      navigate(`/works/${workId}/${workType}/reviews`);
    } catch (error) {
      console.error("⚠️ レビュー投稿エラー:", error);
      setError(error.message || "レビューの投稿に失敗しました。");
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
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
        }}
      >
        投稿
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default ReviewForm;