import { Metadata } from "next";
import type { NextPage } from "next";
import PostDetailClient from "./PostDetailClient"; // Client component
import feedData from "../../feed_static_data.json";

interface PageProps {
  params: Promise<{ id: string }>; // Match folder name [id]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = feedData.feed_posts.find((p) => p.id === id);
  const title = post ? post.content.slice(0, 60) + (post.content.length > 60 ? "..." : "") : "Post Detail";
  const description = post ? `Post by ${post.username}: ${post.content.slice(0, 160)}...` : "Explore community posts on Healing Path";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://healing-path.com/feed/post/${id}`,
      images: post?.image_url ? [{ url: post.image_url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: post?.image_url ? [post.image_url] : [],
    },
  };
}

export async function generateStaticParams() {
  return feedData.feed_posts.map((post) => ({
    id: post.id, // Match folder name [id]
  }));
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { id } = await params;
  return <PostDetailClient params={{ id }} />; // Pass params object
};

export default Page;
