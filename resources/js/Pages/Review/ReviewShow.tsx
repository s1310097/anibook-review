import React from "react";
import { Review } from "@/types";
import LikeButton from "@/Components/LikeButton";

interface ReviewShowProps {
    review: Review;
}

const ReviewShow: React.FC<ReviewShowProps> = ({ review }) => {
    return (
        <div style={{ padding: "20px" }}>
            <h1>{review.title}</h1>
            <p>{review.review_text}</p>
            <LikeButton reviewId={review.id} initialLikes={review.likes_count} initialUserLiked={review.user_liked} />
        </div>
    );
};

export default ReviewShow;
