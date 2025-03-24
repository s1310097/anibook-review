import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const Index = () => {
    const { workId , workType } = useParams();
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchReviews = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await fetch(`http://localhost:8000/api/works/${workId}/${workType}/reviews`);
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error("⚠️ レビュー取得エラー:", error);
                setError("レビューの取得に失敗しました。");
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [workId]);

    return (
        <div style={{ padding: "20px" }}>
            <h1>レビュー一覧 (作品ID: {workId})</h1>
            {loading && <p>読み込み中...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {reviews.length > 0 ? (
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            <h3>{review.title}</h3>
                            <p>{review.review_text}</p>
                            <p>投稿者: {review.user.name}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <div>
                    <p>レビューはまだありません。</p>
                    <Link
                        to={`/works/${workId}/${workType}/reviews/create`}
                        style={{
                            display: "inline-block",
                            padding: "10px 20px",
                            backgroundColor: "#007bff",
                            color: "white",
                            textDecoration: "none",
                            borderRadius: "5px",
                            marginTop: "10px",
                        }}
                    >
                        レビューを投稿する
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Index;