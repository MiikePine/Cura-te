"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Heart, MessageSquare, Share2, Search, Menu, X, Tag, Users, Image as ImageIcon, Pin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@terapias/db/supabase";
import { User as SupabaseUser } from "@supabase/supabase-js";
import feedData from "./feed_static_data.json";

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
  comments?: FeedComment[];
  is_pinned?: boolean;
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

interface UserBadge {
  type: "active_post" | "active_comment" | "top_post";
  icon: string;
}

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.05 } },
};

const categories = [
  "All",
  "Yoga",
  "Reiki",
  "Meditation",
  "Events & Workshops",
  "Expat Community",
  "General Wellness",
];

const tabs = [
  { name: "Popular", value: "popular" },
  { name: "Recent", value: "recent" },
  { name: "Events", value: "events" },
];

const getAvatarUrl = (username: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=7C9A92&color=fff`;

const mockImages = [
  "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&h=337.5&q=80",
  "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&w=600&h=337.5&q=80",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&h=337.5&q=80",
];

export default function FeedPage() {
  const [posts, setPosts] = useState<FeedPost[]>(feedData.feed_posts.map((post, idx) => ({
    ...post,
    comments_count: post.comments_count || feedData.feed_comments.filter((c) => c.post_id === post.id).length,
    likes_count: post.likes_count || Math.floor(Math.random() * 100),
    image_url: idx % 3 === 0 ? mockImages[idx % mockImages.length] : undefined,
    liked: false,
    comments: feedData.feed_comments
      .filter((c) => c.post_id === post.id)
      .slice(0, 2)
      .map((c) => ({ ...c, likes_count: c.likes_count || Math.floor(Math.random() * 20) })),
  })));
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTab, setSelectedTab] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("General Wellness");
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    getUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const getUserBadges = (userId: string): UserBadge[] => {
    const userPosts = posts.filter((p) => p.user_id === userId).length;
    const userComments = posts.reduce((acc, p) => acc + (p.comments?.filter((c) => c.user_id === userId).length || 0), 0);
    const topPost = posts
      .filter((p) => p.user_id === userId)
      .reduce((max, p) => (p.likes_count > max.likes_count ? p : max), { likes_count: 0 });
    const badges: UserBadge[] = [];
    if (userPosts >= 5) badges.push({ type: "active_post", icon: "🥉" });
    if (userComments >= 10) badges.push({ type: "active_comment", icon: "🥈" });
    if (topPost.likes_count >= 50) badges.push({ type: "top_post", icon: "🏆" });
    return badges;
  };

  const weeklyQuestion: FeedPost = {
    id: "weekly-question",
    user_id: "admin",
    username: "HealingPath",
    content: "🌿 Pergunta da Semana: Qual é a sua dica de autocuidado para o inverno suíço? Compartilhe suas ideias abaixo!",
    category: "General Wellness",
    created_at: new Date().toISOString(),
    likes_count: 10,
    comments_count: 5,
    liked: false,
    is_pinned: true,
  };

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
    if (selectedTab === "popular") {
      result.sort((a, b) => b.likes_count - a.likes_count);
    } else if (selectedTab === "recent") {
      result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (selectedTab === "events") {
      result = result.filter((post) => post.category === "Events & Workshops");
    }
    return result;
  }, [posts, selectedCategory, searchQuery, selectedTab]);

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes_count: post.likes_count + (post.liked ? -1 : 1), liked: !post.liked } : post
      )
    );
  };

  const handleNewPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("Please sign in to create a post.");
      return;
    }
    if (!newPostContent.trim()) return;
    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      user_id: user.id,
      username: user.email?.split("@")[0] || "User",
      content: newPostContent,
      category: newPostCategory,
      created_at: new Date().toISOString(),
      likes_count: 0,
      comments_count: 0,
      liked: false,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setNewPostCategory("General Wellness");
  };

  return (
    <div className="bg-[#F7F4F0] min-h-screen font-sans">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-4 lg:px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-[256px_1fr] lg:grid-cols-[320px_1fr] gap-4">
          {/* Mobile Sidebar */}
          <motion.aside
            className="md:hidden fixed top-16 left-0 w-64 bg-white shadow-md z-50 h-[calc(100vh-4rem)] overflow-y-auto"
            initial={{ x: -300 }}
            animate={{ x: isSidebarOpen ? 0 : -300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 space-y-6">
              <div className="relative">
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
              <div className="bg-[#7C9A92]/10 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-[#4A6670] mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" /> Community
                </h3>
                <p className="text-xs text-[#7C9A92]">
                  {posts.length} posts • {[...new Set(posts.map((post) => post.user_id))].length} members
                </p>
              </div>
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

          {/* Desktop Sidebar */}
          <aside
            className="hidden md:block sticky top-20 w-64 lg:w-80 bg-white shadow-sm h-[calc(100vh-5rem)] overflow-y-auto z-10"
          >
            <div className="p-6 space-y-6">
              <div className="bg-[#7C9A92]/10 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-[#4A6670] mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" /> Community
                </h3>
                <p className="text-xs text-[#7C9A92]">
                  {posts.length} posts • {[...new Set(posts.map((post) => post.user_id))].length} members
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[#4A6670] mb-2 flex items-center gap-2">
                  <Tag className="h-4 w-4" /> Topics
                </h3>
                <ul className="space-y-1">
                  {categories.map((category) => (
                    <li key={category}>
                      <button
                        onClick={() => setSelectedCategory(category)}
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
          </aside>

          {/* Main Content Area */}
          <main className="flex flex-col w-full max-w-2xl mx-auto gap-6">
            {/* New Post Form */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="bg-white rounded-lg shadow-sm border border-[#E6E6E6] p-4"
            >
              <form onSubmit={handleNewPost}>
                <div className="flex items-start gap-3">
                  <Image
                    src={getAvatarUrl(user?.email?.split("@")[0] || "CurrentUser")}
                    alt="Current User"
                    className="h-10 w-10 rounded-full flex-shrink-0"
                    width={40}
                    height={40}
                  />
                  <div className="flex-1">
                    <textarea
                      placeholder={user ? "What's on your mind?" : "Sign in to share your thoughts..."}
                      className="w-full h-20 p-2 bg-[#F7F4F0] rounded-lg text-sm text-[#4A6670] placeholder-[#7C9A92]/70 focus:outline-none focus:ring-2 focus:ring-[#E6B17E] resize-none"
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      aria-label="Write a new post"
                      disabled={!user}
                    />
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-[#7C9A92]" />
                        <select
                          value={newPostCategory}
                          onChange={(e) => setNewPostCategory(e.target.value)}
                          className="bg-[#F7F4F0] rounded-full text-sm text-[#4A6670] focus:outline-none"
                          aria-label="Select post category"
                          disabled={!user}
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
                        disabled={!user || !newPostContent.trim()}
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
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <div className="relative flex-1 hidden sm:block">
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
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => setSelectedTab(tab.value)}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                      selectedTab === tab.value
                        ? "bg-[#7C9A92] text-white"
                        : "text-[#4A6670] hover:bg-[#7C9A92]/10"
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 text-[#7C9A92] hover:text-[#E6B17E] md:hidden"
                aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
              >
                {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </motion.div>

            {/* Posts Feed */}
            <AnimatePresence mode="wait">
              <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-4">
                {/* Pinned Weekly Question */}
                <motion.div
                  key={weeklyQuestion.id}
                  variants={fadeIn}
                  className="bg-[#E8DED1] rounded-lg shadow-sm border border-[#7C9A92] overflow-hidden transition-all"
                >
                  <Link href={`/feed/post/${weeklyQuestion.id}`} className="block">
                    <div className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Image
                          src={getAvatarUrl(weeklyQuestion.username)}
                          alt={weeklyQuestion.username}
                          className="h-10 w-10 rounded-full"
                          width={40}
                          height={40}
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#4A6670] hover:text-[#E6B17E]">
                            {weeklyQuestion.username}
                          </span>
                          {getUserBadges(weeklyQuestion.user_id).map((badge) => (
                            <span key={badge.type} className="text-xs">{badge.icon}</span>
                          ))}
                          <Pin className="h-4 w-4 text-[#7C9A92]" />
                        </div>
                      </div>
                      <p className="text-sm text-[#4A6670] mb-3">{weeklyQuestion.content}</p>
                    </div>
                  </Link>
                  <div className="px-4 pb-4">
                    <div className="flex items-center gap-4 mb-3">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleLike(weeklyQuestion.id);
                        }}
                        className={`flex items-center gap-1 text-sm ${
                          weeklyQuestion.liked ? "text-[#E6B17E]" : "text-[#7C9A92]"
                        } hover:text-[#E6B17E] transition-colors`}
                        aria-label={weeklyQuestion.liked ? "Unlike post" : "Like post"}
                      >
                        <Heart className={`h-4 w-4 ${weeklyQuestion.liked ? "fill-current" : ""}`} />
                        {weeklyQuestion.likes_count}
                      </button>
                      <Link
                        href={`/feed/post/${weeklyQuestion.id}`}
                        className="flex items-center gap-1 text-sm text-[#7C9A92] hover:text-[#E6B17E] transition-colors"
                      >
                        <MessageSquare className="h-4 w-4" />
                        {weeklyQuestion.comments_count}
                      </Link>
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
                    >
                      <Link href={`/feed/post/${post.id}`} className="block">
                        <div className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <Image
                              src={getAvatarUrl(post.username)}
                              alt={post.username}
                              className="h-10 w-10 rounded-full"
                              width={40}
                              height={40}
                            />
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-[#4A6670] hover:text-[#E6B17E]">
                                {post.username}
                              </span>
                              {getUserBadges(post.user_id).map((badge) => (
                                <span key={badge.type} className="text-xs">{badge.icon}</span>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-[#4A6670] mb-3 line-clamp-4">{post.content}</p>
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
                                <Image
                                  src={getAvatarUrl(comment.username)}
                                  alt={comment.username}
                                  className="h-8 w-8 rounded-full"
                                  width={32}
                                  height={32}
                                />
                                <div className="flex-1">
                                  <div className="bg-[#F7F4F0] rounded-lg p-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-semibold text-[#4A6670]">
                                        {comment.username}
                                      </span>
                                      {getUserBadges(comment.user_id).map((badge) => (
                                        <span key={badge.type} className="text-xs">{badge.icon}</span>
                                      ))}
                                    </div>
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