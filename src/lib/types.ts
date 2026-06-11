export interface Post {
  id: string;
  slug: string;
  title: string;
  date: string;
  tags: string[];
  image: string;
  excerpt: string;
  author: string;
  authorRole: string;
  authorBio: string;
  authorImage?: string;
  color: "yellow" | "red" | "blue";
  status: "draft" | "published";
}

export interface FrontMatter {
  id: string;
  title: string;
  date: string;
  tags: string[];
  image: string;
  excerpt: string;
  author: string;
  authorRole: string;
  authorBio: string;
  authorImage?: string;
  color: "yellow" | "red" | "blue";
}
