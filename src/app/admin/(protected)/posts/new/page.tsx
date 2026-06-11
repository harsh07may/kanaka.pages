import { PostForm } from "@/components/admin/PostForm";
import { createPost } from "../../actions";

export default function NewPostPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-mono text-3xl font-black uppercase">New Post</h1>
      <PostForm action={createPost} submitLabel="Create Post" />
    </div>
  );
}
