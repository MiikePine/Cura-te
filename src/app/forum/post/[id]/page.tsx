import { Metadata } from "next";
import type { NextPage } from "next";
import PostDetailPage from "./PostDetailClient";
import forumData from "../../../forum/forum_static_data.json";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = forumData.forum_posts.find((p) => p.id === resolvedParams.id);
  return {
    title: post?.content.slice(0, 50) ?? "Post",
    description: `Detalhes do post de ${post?.username}`,
  };
}

export async function generateStaticParams() {
  return forumData.forum_posts.map((post) => ({
    id: post.id,
  }));
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const resolvedParams = await params;
  return <PostDetailPage params={resolvedParams} />;
};

export default Page;