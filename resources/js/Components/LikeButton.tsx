import React, { useState } from "react";
import axios from "axios";

interface LikeButtonProps {
    reviewId: number;
    initialLikes: number;
    initialUserLiked: boolean;
}

const LikeButton: React.FC<LikeButtonProps> = ({ reviewId, initialLikes, initialUserLiked }) => {
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(initialUserLiked);

    const toggleLike = async () => {
        try {
            const response = await axios.post(`/api/reviews/${reviewId}/like`);
            setLiked(response.data.liked);
            setLikes(response.data.likes_count);
        } catch (error) {
            console.error("いいねの処理に失敗しました", error);
        }
    };

    return (
        <button onClick={toggleLike} style={{ cursor: "pointer", padding: "5px 10px", border: "none", background: liked ? "red" : "gray", color: "white" }}>
            ❤️ {likes}
        </button>
    );
};

export default LikeButton;
