import React from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";

const CreateReview = () => {
  const { workId, workType } = useParams<{ workId: string, workType: "anime" | "book" }>(); // URL から workId と workType を取得

  if (!workType || (workType !== "anime" && workType !== "book")) {
    return <div>無効な作品タイプです</div>;
  }

  return (
    <div>
      <h1>レビュー作成 (作品ID: {workId})</h1>
      <ReviewForm workId={workId} workType={workType} />
    </div>
  );
};

export default CreateReview;