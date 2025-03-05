export interface User {
  id: number;
  name: string;
  email: string;  // email を必須にする
  favorite_work?: string;
  bio?: string;
  is_public?: boolean;
}

export interface PageProps {
  auth: {
      user: User;
  };
  // 任意のプロパティを含むインデックスシグネチャを追加
  [key: string]: any; // インデックスシグネチャを追加
}

export interface Review {
  id: number;
  user: User;
  title: string;
  work_id: string;
  work_type: "anime" | "book";
  image_url: string;
  review_text: string;
  is_public: boolean;
  likes_count: number;
  user_liked: boolean;
  created_at: string;
}

export interface Comment {
  id: number;
  user: User;
  review_id: number;
  comment_text: string;
  created_at: string;
}

export interface Like {
  id: number;
  user_id: number;
  review_id: number;
}