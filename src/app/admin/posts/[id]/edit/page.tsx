import { notFound } from "next/navigation";
import { PostForm } from "@/components/admin/PostForm";
import { getPostById } from "@/lib/posts";
import { updatePost } from "../../../actions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-mono text-3xl font-black uppercase">Edit Post</h1>
      <PostForm
        action={updatePost.bind(null, id)}
        initialPost={post}
        submitLabel="Save Changes"
      />
    </div>
  );
}
