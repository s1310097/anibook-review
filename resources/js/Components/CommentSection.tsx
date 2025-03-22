import React, { useState, useEffect } from "react";
import axios from "axios";

interface Comment {
    id: number;
    user: { name: string };
    comment_text: string;
    created_at: string;
}

const CommentSection = ({ reviewId }: { reviewId: number }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/reviews/${reviewId}/comments`);
            setComments(response.data);
        } catch (error) {
            console.error("コメント取得エラー", error);
        }
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        setLoading(true);

        try {
            const response = await axios.post(`/api/reviews/${reviewId}/comments`, { comment_text: newComment });
            setComments([response.data, ...comments]); // 新しいコメントを先頭に追加
            setNewComment("");
        } catch (error) {
            console.error("コメント投稿エラー", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="comment-section">
            <h3>コメント ({comments.length})</h3>
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="コメントを入力..."
                disabled={loading}
            />
            <button onClick={handleAddComment} disabled={loading}>投稿</button>

            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <strong>{comment.user.name}</strong> - {comment.comment_text}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentSection;
