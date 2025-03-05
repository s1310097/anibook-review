import React, { useState } from "react";
import "./ReviewForm.css";

interface ReviewFormProps {
  workId: string | undefined;
  workType: "anime" | "book";
}

const ReviewForm: React.FC<ReviewFormProps> = ({ workId, workType }) => {
  const [title, setTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  // レビュー送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert("レビューする作品タイトルを入力してください");
      return;
    }
    if (!workId) {
      alert("作品IDが取得できませんでした");
      return;
    }

    try {
      const response = await fetch(`/api/works/${workId}/${workType}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          review_text: reviewText,
          is_public: isPublic,
          work_type: workType,
        }),
      });

      if (response.ok) {
        alert("レビューを投稿しました！");
      } else {
        const errorText = await response.text(); // JSONとして解析できない場合のためにtextとして取得
        alert(`レビュー投稿に失敗しました: ${errorText}`);
      }
    } catch (error) {
      console.error("レビュー投稿エラー:", error);
      alert("エラーが発生しました");
    }
  };

  return (
    <div className="review-form-container">
      <h2>レビュー投稿</h2>

      {/* レビュー投稿フォーム */}
      <form onSubmit={handleSubmit} className="review-form">
        <input
          type="text"
          placeholder="作品タイトル"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="レビュー内容 (500文字以内)"
          maxLength={500}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
        <label>
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(!isPublic)}
          />
          公開する
        </label>
        <button type="submit">投稿</button>
      </form>
    </div>
  );
};

export default ReviewForm;