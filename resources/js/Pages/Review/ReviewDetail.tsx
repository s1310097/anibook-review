import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Review, Comment } from "@/types";

const ReviewDetail = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  const [review, setReview] = useState<Review | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviewDetail = async () => {
      try {
        const reviewResponse = await fetch(`/api/reviews/${reviewId}`);
        const reviewData = await reviewResponse.json();
        setReview(reviewData);

        const commentsResponse = await fetch(`/api/reviews/${reviewId}/comments`);
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
      } catch (error) {
        setError("データの取得に失敗しました。");
      } finally {
        setLoading(false);
      }
    };

    fetchReviewDetail();
  }, [reviewId]);

  if (loading) return <p>読み込み中...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!review) return <p>レビューが見つかりません。</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">{review.title}</h1>
      <p className="text-gray-700">{review.review_text}</p>
      <p className="text-sm text-gray-500">投稿者: {review.user.name}</p>
      <p className="text-sm text-gray-500">いいね: {review.likes_count}</p>

      <div className="mt-4">
        <h2 className="text-xl font-bold">コメント</h2>
        {comments.length > 0 ? (
          <ul>
            {comments.map((comment) => (
              <li key={comment.id} className="border-b p-2">
                <p className="font-semibold">{comment.user.name}</p>
                <p>{comment.comment_text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>コメントはまだありません。</p>
        )}
      </div>
    </div>
  );
};

export default ReviewDetail;
