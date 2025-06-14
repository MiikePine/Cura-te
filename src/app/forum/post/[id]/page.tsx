
"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";
import forumData from "../../forum_static_data.json";

interface ForumPost {
  id: string;
  user_id: string;
  username: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  replies_count: number;
  last_reply_at: string;
}

interface ForumReply {
  id: string;
  post_id: string;
  user_id: string;
  username: string;
  content: string;
  created_at: string;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

// Generate avatar placeholder
const getAvatarUrl = (username: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=7C9A92&color=fff`;

export default function PostPage({ params }: { params: { id: string } }) {
  const post = forumData.forum_posts.find((p) => p.id === params.id);
  const replies = forumData.forum_replies.filter((r) => r.post_id === params.id);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F8F5F1] flex items-center justify-center">
        <div className="text-[#7C9A92] text-lg">Post not found</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#F8F5F1] font-sans py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-6"
        >
          <Link
            href="/forum"
            className="flex items-center text-[#E6B17E] hover:text-[#D9A066] text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Forum
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Post Header */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white rounded-2xl shadow-md p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={getAvatarUrl(post.username)}
                  alt={post.username}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <span className="text-sm font-medium text-[#4A6670]">
                    {post.username}
                  </span>
                  <p className="text-xs text-[#7C9A92]">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#4A6670] mb-4">
                {post.title}
              </h1>
              <p className="text-[#7C9A92] text-base leading-relaxed mb-4">
                {post.content}
              </p>
              <div className="flex items-center gap-4">
                <span className="inline-block px-3 py-1 bg-[#7C9A92]/10 text-[#7C9A92] text-xs font-medium rounded-full">
                  {post.category}
                </span>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4 text-[#7C9A92]" />
                  <span className="text-sm text-[#4A6670]">
                    {post.replies_count}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Replies */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-6"
            >
              <h2 className="text-xl font-semibold text-[#4A6670] mb-4">
                Replies ({post.replies_count})
              </h2>
              {replies.length === 0 ? (
                <div className="text-[#7C9A92] text-base">
                  No replies yet. Be the first to respond!
                </div>
              ) : (
                replies.map((reply) => (
                  <motion.div
                    key={reply.id}
                    variants={fadeIn}
                    className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-[#E6B17E]"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={getAvatarUrl(reply.username)}
                        alt={reply.username}
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <span className="text-sm font-medium text-[#4A6670]">
                          {reply.username}
                        </span>
                        <p className="text-xs text-[#7C9A92]">
                          {new Date(reply.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#7C9A92] text-base leading-relaxed">
                      {reply.content}
                    </p>
                  </motion.div>
                ))
              )}
            </motion.div>
          </div>

          {/* Sidebar (Desktop Only) */}
          <motion.aside
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="hidden lg:block bg-white rounded-2xl shadow-md p-6 sticky top-24 h-fit"
          >
            <h3 className="text-lg font-semibold text-[#4A6670] mb-4">
              Related Discussions
            </h3>
            <ul className="space-y-3">
              {forumData.forum_posts
                .filter((p) => p.id !== post.id && p.category === post.category)
                .slice(0, 3)
                .map((relatedPost) => (
                  <li key={relatedPost.id}>
                    <Link
                      href={`/forum/post/${relatedPost.id}`}
                      className="text-sm text-[#4A6670] hover:text-[#E6B17E] line-clamp-2 transition-colors"
                    >
                      {relatedPost.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </motion.aside>
        </div>
      </div>
    </section>
  );
