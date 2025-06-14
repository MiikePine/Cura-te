"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageSquare, Share2, Search, Menu, X, Tag, Users, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import forumData from "../forum/forum_static_data.json";

// Define types for feed data
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
  comments?: FeedComment[];
}

interface FeedComment {
  id: string;
  post_id: string;
  user_id: string;
  username: string;
  content: string;
  created_at: string;
  likes_count: number;
}

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardHover = {
  hover: { y: -4, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", transition: { duration: 0.2 } },
};

// Categories for filtering
const categories = [
  "All",
  "Yoga",
  "Reiki",
  "Meditation",
  "Events & Workshops",
  "Expat Community",
  "General Wellness",
];

// Generate avatar placeholder
const getAvatarUrl = (username: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=7C9A92&color=fff`;

// Mock image URLs for some posts (since forumData doesn't include images)
const mockImages = [
  "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&h=337.5&q=80",
  "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=600&h=337.5&q=80",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&h=337.5&q=80",
];

export default function FeedPage() {
  const [posts, setPosts] = useState<FeedPost[]>(
    forumData.forum_posts.map((post, idx) => ({
      ...post,
      comments_count: post.replies_count,
      likes_count: Math.floor(Math.random() * 100),
      image_url: idx % 3 === 0 ? mockImages[idx % mockImages.length] : undefined,
      comments: forumData.forum_replies
        .filter((r) => r.post_id === post.id)
        .slice(0, 2)
        .map((r) => ({ ...r, likes_count: Math.floor(Math.random() * 20) })),
    }))
  );
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("General Wellness");

  // Filter posts
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    if (selectedCategory !== "All") {
      result = result.filter((post) => post.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter(
        (post) =>
          post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [posts, selectedCategory, searchQuery]);

  // Format date
  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Handle like toggle
  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes_count: post.likes_count + (post.liked ? -1 : 1), liked: !post.liked } : post
      )
    );
  };

  // Handle new post submission
  const handleNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      user_id: "user-1",
      username: "CurrentUser",
      content: newPostContent,
      category: newPostCategory,
      created_at: new Date().toISOString(),
      likes_count: 0,
      comments_count: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setNewPostCategory("General Wellness");
  };

  return (
    <div className="bg-[#F7F4F0] font-sans min-h-screen">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: isSidebarOpen ? 0 : -300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-16 left-0 w-64 bg-white shadow-md z-40 h-[calc(100vh-4rem)] overflow-y-auto lg:sticky lg:top-20 lg:w-80 lg:flex lg:flex-col lg:shadow-none lg:translate-x-0 lg:bg-transparent"
          >
            <div className="p-6 space-y-6">
              {/* Mobile Search */}
              <div className="relative lg:hidden">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7C9A92]" />
                <input
                  type="text"
                  placeholder="Search feed..."
                  className="w-full pl-10 pr-4 py-2 bg-[#F7F4F0] rounded-full text-sm text-[#4A6670] placeholder-[#7C9A92]/70 focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search feed posts"
                />
              </div>
              {/* Community Stats */}
              <div className="bg-[#7C9A92]/10 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-[#4A6670] mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" /> Community
                </h3>
                <p className="text-xs text-[#7C9A92]">
                  {posts.length} posts • {[...new Set(posts.map((post) => post.user_id))].length} members
                </p>
              </div>
              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-[#4A6670] mb-2 flex items-center gap-2">
                  <Tag className="h-4 w-4" /> Topics
                </h3>
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => {
                          setSelectedCategory(category);
                          setIsSidebarOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          selectedCategory === category
                            ? "bg-[#7C9A92] text-white"
                            : "text-[#4A6670] hover:bg-[#7C9A92]/10"
                        }`}
                        aria-current={selectedCategory === category ? "true" : "false"}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Trending Posts */}
              <div>
                <h3 className="text-sm font-semibold text-[#4A6670] mb-2">Trending</h3>
                <ul className="space-y-3">
                  {posts
                    .sort((a, b) => b.likes_count - a.likes_count)
                    .slice(0, 4)
                    .map((post) => (
                      <li key={post.id}>
                        <Link
                          href={`/feed/post/${post.id}`}
                          className="text-sm text-[#4A6670] hover:text-[#E6B17E] line-clamp-2 transition-colors"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          {post.content.substring(0, 50)}...
                        </Link>
                        <p className="text-xs text-[#7C9A92]/80 mt-1">
                          {post.likes_count} likes • {formatDate(post.created_at)}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </motion.aside>

          {/* Main Content Area */}
          <main className="flex-1 max-w-2xl mx-auto">
            {/* New Post Form */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white rounded-lg shadow-sm border border-[#E6E6E6] p-4 mb-6"
            >
              <form onSubmit={handleNewPost}>
                <div className="flex items-start gap-3">
                  <img
                    src={getAvatarUrl("CurrentUser")}
                    alt="Current User"
                    className="h-10 w-10 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1">
                    <textarea
                      placeholder="What's on your mind?"
                      className="w-full h-20 p-2 bg-[#F7F4F0] rounded-lg text-sm text-[#4A6670] placeholder-[#7C9A92]/70 focus:outline-none focus:ring-2 focus:ring-[#E6B17E] resize-none"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      aria-label="Write a new post"
                    />
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-[#7C9A92]" />
                        <select
                          value={newPostCategory}
                          onChange={(e) => setNewPostCategory(e.target.value)}
                          className="bg-[#F7F4F0] rounded-full text-sm text-[#4A6670] focus:outline-none"
                          aria-label="Select post category"
                        >
                          {categories.slice(1).map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#E6B17E] text-white rounded-full text-sm font-medium hover:bg-[#D9A066] transition-colors"
                        disabled={!newPostContent.trim()}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </motion.div>

            {/* Feed Controls */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="flex items-center gap-4 mb-6"
            >
              <div className="relative flex-1 max-w-md hidden sm:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7C9A92]" />
                <input
                  type="text"
                  placeholder="Search feed..."
                  className="w-full pl-10 pr-4 py-2 bg-[#F7F4F0] rounded-full text-sm text-[#4A6670] placeholder-[#7C9A92]/70 focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search feed posts"
                />
              </div>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-[#7C9A92] hover:text-[#E6B17E] lg:hidden"
                aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
              >
                {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </motion.div>

            {/* Posts Feed */}
            <AnimatePresence mode="wait">
              <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-4">
                {filteredPosts.length === 0 ? (
                  <motion.div
                    variants={fadeIn}
                    className="text-center text-[#7C9A92] text-base py-12"
                  >
                    No posts found. Try adjusting your search or topic.
                  </motion.div>
                ) : (
                  filteredPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      variants={fadeIn}
                      whileHover="hover"
                      className="bg-white rounded-lg shadow-sm border border-[#E6E6E6] overflow-hidden transition-all"
                      style={{ variants: cardHover }}
                    >
                      <Link href={`/feed/post/${post.id}`} className="block">
                        <div className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <img
                              src={getAvatarUrl(post.username)}
                              alt={post.username}
                              className="h-10 w-10 rounded-full"
                            />
                            <div>
                              <span className="text-sm font-semibold text-[#4A6670] hover:text-[#E6B17E]">
                                {post.username}
                              </span>
                              <p className="text-xs text-[#7C9A92]">
                                {formatDate(post.created_at)} • {post.category}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-[#4A6670] mb-3 line-clamp-4">{post.content}</p>
                          {post.image_url && (
                            <img
                              src={post.image_url}
                              alt="Post image"
                              className="w-full h-auto rounded-lg object-cover"
                              style={{ aspectRatio: "16/9" }}
                              width={600}
                              height={337.5}
                            />
                          )}
                        </div>
                      </Link>
                      <div className="px-4 pb-4">
                        <div className="flex items-center gap-4 mb-3">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleLike(post.id);
                            }}
                            className={`flex items-center gap-1 text-sm ${
                              post.liked ? "text-[#E6B17E]" : "text-[#7C9A92]"
                            } hover:text-[#E6B17E] transition-colors`}
                            aria-label={post.liked ? "Unlike post" : "Like post"}
                          >
                            <Heart className={`h-4 w-4 ${post.liked ? "fill-current" : ""}`} />
                            {post.likes_count}
                          </button>
                          <Link
                            href={`/feed/post/${post.id}`}
                            className="flex items-center gap-1 text-sm text-[#7C9A92] hover:text-[#E6B17E] transition-colors"
                          >
                            <MessageSquare className="h-4 w-4" />
                            {post.comments_count}
                          </Link>
                          <button
                            className="flex items-center gap-1 text-sm text-[#7C9A92] hover:text-[#E6B17E] transition-colors"
                            aria-label="Share post"
                          >
                            <Share2 className="h-4 w-4" />
                            Share
                          </button>
                        </div>
                        {post.comments && post.comments.length > 0 && (
                          <div className="space-y-3">
                            {post.comments.map((comment) => (
                              <div key={comment.id} className="flex items-start gap-2">
                                <img
                                  src={getAvatarUrl(comment.username)}
                                  alt={comment.username}
                                  className="h-8 w-8 rounded-full"
                                />
                                <div className="flex-1">
                                  <div className="bg-[#F7F4F0] rounded-lg p-2">
                                    <span className="text-xs font-semibold text-[#4A6670]">
                                      {comment.username}
                                    </span>
                                    <p className="text-xs text-[#7C9A92] line-clamp-2">
                                      {comment.content}
                                    </p>
                                  </div>
                                  <div className="flex items-center gap-2 mt-1">
                                    <button
                                      className="text-xs text-[#7C9A92] hover:text-[#E6B17E]"
                                      aria-label="Like comment"
                                    >
                                      Like • {comment.likes_count}
                                    </button>
                                    <span className="text-xs text-[#7C9A92]">
                                      {formatDate(comment.created_at)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                            {post.comments_count > 2 && (
                              <Link
                                href={`/feed/post/${post.id}`}
                                className="text-xs text-[#E6B17E] hover:underline"
                              >
                                View all {post.comments_count} comments
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}