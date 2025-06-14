"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Plus, Tag, MessageSquare, ArrowUpDown, Users } from "lucide-react";
import Link from "next/link";
import forumData from "./forum_static_data.json";
import Image from "next/image";

// Define types for forum data
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

// Animation variants


const stagger = {
  visible: { transition: { staggerChildren: 0.05 } },
};



// Forum categories
const categories = [
  "All",
  "Yoga",
  "Reiki",
  "Meditation",
  "Events & Workshops",
  "Expat Community",
  "General Wellness",
];

// Sorting options
const sortOptions = [
  { value: "recent", label: "Most Recent" },
  { value: "replies", label: "Most Replies" },
  { value: "oldest", label: "Oldest" },
];

// Generate avatar placeholder
const getAvatarUrl = (username: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=7C9A92&color=fff`;

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[]>(forumData.forum_posts as ForumPost[]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const postsPerPage = 10;

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = [...forumData.forum_posts] as ForumPost[];

    // Filter by category
    if (selectedCategory !== "All") {
      result = result.filter((post) => post.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort posts
    result.sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      } else {
        return b.replies_count - a.replies_count;
      }
    });

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  // Update posts and reset page
  useMemo(() => {
    setPosts(filteredPosts);
    setPage(1);
  }, [filteredPosts]);

  // Calculate paginated posts
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const paginatedPosts = posts.slice((page - 1) * postsPerPage, page * postsPerPage);

  // Format date
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-[#F7F4F0] font-sans min-h-screen">
      {/* Main Content */}
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 pt-20 pb-12">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: isSidebarOpen ? 0 : -300 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-16 left-0 w-64 bg-white shadow-md z-40 h-[calc(100vh-4rem)] overflow-y-auto mf:sticky mf:top-20 mf:w-80 mf:flex mf:flex-col mf:shadow-none mf:translate-x-0 mf:bg-transparent"
          >
            <div className="p-6 space-y-6">
              {/* Mobile Search */}
              <div className="relative mf:hidden">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7C9A92]" />
                <input
                  type="text"
                  placeholder="Search forum..."
                  className="w-full pl-10 pr-4 py-2 bg-[#F7F4F0] rounded-full text-sm text-[#4A6670] placeholder-[#7C9A92]/70 focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search forum posts"
                />
              </div>
              {/* Community Stats */}
              <div className="bg-[#7C9A92]/10 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-[#4A6670] mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4" /> Community
                </h3>
                <p className="text-xs text-[#7C9A92]">
                  {forumData.forum_posts.length} posts •{" "}
                  {[...new Set(forumData.forum_posts.map((post) => post.user_id))].length} members
                </p>
              </div>
              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-[#4A6670] mb-2 flex items-center gap-2">
                  <Tag className="h-4 w-4" /> Categories
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
                <h3 className="text-sm font-semibold text-[#4A6670] mb-2">Trending Posts</h3>
                <ul className="space-y-3">
                  {forumData.forum_posts
                    .sort((a, b) => b.replies_count - a.replies_count)
                    .slice(0, 4)
                    .map((post) => (
                      <li key={post.id}>
                        <Link
                          href={`/forum/post/${post.id}`}
                          className="text-sm text-[#4A6670] hover:text-[#E6B17E] line-clamp-2 transition-colors"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          {post.title}
                        </Link>
                        <p className="text-xs text-[#7C9A92]/80 mt-1">
                          {post.replies_count} replies • {formatDate(post.last_reply_at)}
                        </p>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </motion.aside>

          {/* Main Content Area */}
          <main className="flex-1 mx-24">
            {/* Controls */}
            <motion.div
              initial="hidden"
              animate="visible"
      
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 bg-white p-4 rounded-lg shadow-sm border border-[#E6E6E6]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7C9A92]" />
                  <input
                    type="text"
                    placeholder="Search forum..."
                    className="w-full pl-10 pr-4 py-2 bg-[#F7F4F0] rounded-full text-sm text-[#4A6670] placeholder-[#7C9A92]/70 focus:outline-none focus:ring-2 focus:ring-[#E6B17E]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    aria-label="Search forum posts"
                  />
                </div>
                <button
                  disabled
                  className="flex items-center gap-2 px-4 py-2 bg-[#E6B17E] text-white rounded-full text-sm font-medium hover:bg-[#D9A066] transition-colors opacity-50 cursor-not-allowed"
                  aria-label="Create new post (disabled)"
                >
                  <Plus className="h-4 w-4" />
                  New Post
                </button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-[#4A6670]">
                  {posts.length} {posts.length === 1 ? "Post" : "Posts"}
                </span>
                <div className="relative">
                  <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#7C9A92]" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-[#F7F4F0] rounded-full text-sm text-[#4A6670] focus:outline-none focus:ring-2 focus:ring-[#E6B17E] appearance-none"
                    aria-label="Sort posts"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 text-[#7C9A92] hover:text-[#E6B17E] md:hidden"
                  aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
                >
                  {isSidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </motion.div>

            {/* Posts List */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategory}-${searchQuery}-${sortBy}-${page}`}
                initial="hidden"
                animate="visible"
                variants={stagger}
                className="grid gap-4"
              >
                {paginatedPosts.length === 0 ? (
                  <motion.div
                    
                    className="text-center text-[#7C9A92] text-base py-12"
                  >
                    No posts found. Try adjusting your search or category.
                  </motion.div>
                ) : (
                  paginatedPosts.map((post) => (
                    <motion.div
                      key={post.id}
               
                      whileHover="hover"
                      className="bg-white rounded-lg shadow-sm border border-[#E6E6E6] overflow-hidden transition-all"
            
                    >
                      <Link href={`/forum/post/${post.id}`} className="block p-5">
                        <div className="flex items-start gap-4">
                          <Link
                            href={`/profile/${post.user_id}`}
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`View ${post.username}'s profile`}
                          >
                            <Image
                              src={getAvatarUrl(post.username)}
                              alt={post.username}
                              className="h-12 w-12 rounded-full hover:ring-2 hover:ring-[#E6B17E] transition-all flex-shrink-0"
                            />
                          </Link>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <Link
                                  href={`/profile/${post.user_id}`}
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <span className="text-sm font-semibold text-[#4A6670] hover:text-[#E6B17E] transition-colors">
                                    {post.username}
                                  </span>
                                </Link>
                                <span className="text-xs text-[#7C9A92]">
                                  {formatDate(post.created_at)}
                                </span>
                              </div>
                              <span className="inline-block px-2 py-1 bg-[#7C9A92]/10 text-[#7C9A92] text-xs font-medium rounded-full mt-2 sm:mt-0">
                                {post.category}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-[#4A6670] mb-2 line-clamp-2 hover:text-[#E6B17E] transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-sm text-[#7C9A92] line-clamp-3">
                              {post.content}
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                              <MessageSquare className="h-4 w-4 text-[#7C9A92]" />
                              <span className="text-xs text-[#4A6670]">
                                {post.replies_count} {post.replies_count === 1 ? "Reply" : "Replies"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial="hidden"
                animate="visible"
                
                className="flex justify-center gap-2 mt-8"
              >
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-full text-sm font-medium text-[#4A6670] hover:bg-[#7C9A92]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Previous page"
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      page === p
                        ? "bg-[#E6B17E] text-white"
                        : "text-[#4A6670] hover:bg-[#7C9A92]/10"
                    }`}
                    aria-label={`Go to page ${p}`}
                    aria-current={page === p ? "true" : "false"}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-full text-sm font-medium text-[#4A6670] hover:bg-[#7C9A92]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  aria-label="Next page"
                >
                  Next
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}