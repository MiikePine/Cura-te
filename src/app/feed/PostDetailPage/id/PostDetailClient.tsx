
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion"; // Standard import, requires framer-motion@^11.11.9
import { Heart, MessageSquare, Share2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import forumData from "../../../forum/forum_static_data.json";
import Image from "next/image";

// Define interfaces for post and comment data
interface FeedPost {
  id: string;
  user_id: string;
  username: string;
  content: string;
  category: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  image_url?: string;
  liked?: boolean;
}

interface FeedComment {
  id: string;
  post_id: string;
  user_id: string;
  username: string;
  content: string;
  created_at: string;
  likes_count: number;
  liked?: boolean;
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// Generate avatar URL
const getAvatarUrl = (username: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=7C9A92&color=fff`;

// Mock image URLs
const mockImages = [
  "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&h=337.5&q=80",
  "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=600&h=337.5&q=80",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&h=337.5&q=80",
];

// Define props type for dynamic route
type PostDetailPageProps = {
  params: { id: string };
};

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const postData = forumData.forum_posts.find((p) => p.id === params.id);
  const commentsData = forumData.forum_replies.filter((r) => r.post_id === params.id);

  const [post, setPost] = useState<FeedPost>(() => ({
    ...postData!,
    comments_count: postData?.replies_count ?? 0,
    likes_count: Math.floor(Math.random() * 100),
    image_url: mockImages[Math.floor(Math.random() * mockImages.length)],
    liked: false,
  }));

  const [comments, setComments] = useState<FeedComment[]>(
    commentsData.map((r) => ({
      ...r,
      likes_count: Math.floor(Math.random() * 20),
      liked: false,
    }))
  );

  const [newComment, setNewComment] = useState("");

  if (!postData) {
    return (
      <div className="min-h-screen bg-[#F7F4F0] flex items-center justify-center">
        <div className="text-[#7C9A92] text-lg">Post not found</div>
      </div>
    );
  }

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const toggleLike = () => {
    setPost((prev) => ({
      ...prev,
      likes_count: prev.liked ? prev.likes_count - 1 : prev.likes_count + 1,
      liked: !prev.liked,
    }));
  };

  const toggleCommentLike = (commentId: string) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId
          ? { ...c, likes_count: c.liked ? c.likes_count - 1 : c.likes_count + 1, liked: !c.liked }
          : c
      )
    );
  };

  const handleNewComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const comment: FeedComment = {
      id: `comment-${Date.now()}`,
      post_id: post.id,
      user_id: "user-1",
      username: "CurrentUser",
      content: newComment,
      created_at: new Date().toISOString(),
      likes_count: 0,
    };
    setComments([...comments, comment]);
    setPost((prev) => ({ ...prev, comments_count: prev.comments_count + 1 }));
    setNewComment("");
  };

  return (
    <section className="min-h-screen bg-[#F7F4F0] font-sans py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Navigation */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-6">
          <Link
            href="/feed"
            className="flex items-center text-[#E6B17E] hover:text-[#D9A066] text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Feed
          </Link>
        </motion.div>

        {/* Post Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="bg-white rounded-lg shadow-sm border border-[#E6E6E6] overflow-hidden"
        >
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Image
                src={getAvatarUrl(post.username)}
                alt={post.username}
                className="h-10 w-10 rounded-full"
                width={40}
                height={40}
              />
              <div>
                <span className="text-sm font-semibold text-[#4A6670]">{post.username}</span>
                <p className="text-xs text-[#7C9A92]">
                  {formatDate(post.created_at)} • {post.category}
                </p>
              </div>
            </div>
            <p className="text-sm text-[#4A6670] mb-3">{post.content}</p>
            {post.image_url && (
              <Image
                src={post.image_url}
                alt="Post image"
                className="w-full h-auto rounded-lg object-cover"
                style={{ aspectRatio: "16/9" }}
                width={600}
                height={337.5}
              />
            )}
          </div>
          <div className="px-4 pb-4">
            <div className="flex items-center gap-4 mb-3">
              <button
                onClick={toggleLike}
                className={`flex items-center gap-1 text-sm ${
                  post.liked ? "text-[#E6B17E]" : "text-[#7C9A92]"
                } hover:text-[#E6B17E] transition-colors`}
                aria-label={post.liked ? "Unlike post" : "Like post"}
              >
                <Heart className={`h-4 w-4 ${post.liked ? "fill-current" : ""}`} />
                {post.likes_count}
              </button>
              <span className="flex items-center gap-1 text-sm text-[#7C9A92]">
                <MessageSquare className="h-4 w-4" />
                {post.comments_count}
              </span>
              <button
                className="flex items-center gap-1 text-sm text-[#7C9A92] hover:text-[#E6B17E] transition-colors"
                aria-label="Share post"
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="mt-6">
          <h2 className="text-lg font-semibold text-[#4A6670] mb-4">Comments ({post.comments_count})</h2>
          {/* New Comment Form */}
          <form onSubmit={handleNewComment} className="mb-6">
            <div className="flex items-start gap-3">
              <Image
                src={getAvatarUrl("CurrentUser")}
                alt="Current User"
                className="h-8 w-8 rounded-full flex-shrink-0"
                width={32}
                height={32}
              />
              <div className="flex-1">
                <textarea
                  placeholder="Add a comment..."
                  className="w-full h-16 p-2 bg-[#F7F4F0] rounded-lg text-sm text-[#4A6670] placeholder-[#7C9A92]/70 focus:outline-none focus:ring-2 focus:ring-[#E6B17E] resize-none"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  aria-label="Write a comment"
                />
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#E6B17E] text-white rounded-full text-sm font-medium hover:bg-[#D9A066] transition-colors"
                    disabled={!newComment.trim()}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </form>
          {/* Comments List */}
          {comments.length === 0 ? (
            <div className="text-[#7C9A92] text-base">No comments yet. Be the first to comment!</div>
          ) : (
            comments.map((comment) => (
              <motion.div key={comment.id} variants={fadeIn} className="flex items-start gap-3 mb-4">
                <Image
                  src={getAvatarUrl(comment.username)}
                  alt={comment.username}
                  className="h-8 w-8 rounded-full flex-shrink-0"
                  width={32}
                  height={32}
                />
                <div className="flex-1">
                  <div className="bg-[#F7F4F0] rounded-lg p-3">
                    <span className="text-sm font-semibold text-[#4A6670]">{comment.username}</span>
                    <p className="text-sm text-[#7C9A92] mt-1">{comment.content}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => toggleCommentLike(comment.id)}
                      className={`text-xs ${
                        comment.liked ? "text-[#E6B17E]" : "text-[#7C9A92]"
                      } hover:text-[#E6B17E] transition-colors`}
                      aria-label={comment.liked ? "Unlike comment" : "Like comment"}
                    >
                      Like • {comment.likes_count}
                    </button>
                    <span className="text-xs text-[#7C9A92]">{formatDate(comment.created_at)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  );
}
