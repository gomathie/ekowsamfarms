import React, { useState } from 'react';
import { PageId, BlogPost } from '../types';
import { BLOG_POSTS } from '../data/farmData';
import { BookOpen, Calendar, User, Clock, ArrowRight, X, Tag } from 'lucide-react';

interface BlogPageProps {
  setCurrentPage: (page: PageId) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ setCurrentPage }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <div className="space-y-12 pb-16 font-sans">
      {/* Page Header */}
      <section className="bg-blue-950 text-white py-14 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-widest bg-blue-900 px-3 py-1 rounded-full border border-blue-800">
            KNOWLEDGE BASE & GUIDES
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-serif">
            Ekow Sam Farming Insights
          </h1>
          <p className="text-blue-200 text-xs sm:text-sm max-w-2xl mx-auto">
            Practical agricultural guides, heliculture profitability breakdowns, catfish water quality tips, and zero-waste farming innovations in West Africa.
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-blue-900 text-blue-100 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-blue-600" />
                      {post.author}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      {post.date}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-700 transition-colors font-serif leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {post.snippet}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                <button
                  onClick={() => setSelectedPost(post)}
                  className="w-full bg-slate-100 hover:bg-blue-600 text-slate-800 hover:text-white font-bold py-2.5 rounded-xl transition-colors text-xs flex items-center justify-center gap-1.5"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Article Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-100 relative my-8">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute right-4 top-4 z-10 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="h-64 relative bg-slate-100">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  {selectedPost.category}
                </span>
                <h3 className="text-xl font-bold font-serif leading-tight">{selectedPost.title}</h3>
                <div className="flex items-center gap-3 text-xs text-blue-200">
                  <span>By {selectedPost.author}</span>
                  <span>•</span>
                  <span>{selectedPost.date}</span>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed max-h-[400px] overflow-y-auto">
              {selectedPost.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}

              <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-1.5">
                {selectedPost.tags.map((tag, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-900 text-[10px] font-bold px-2.5 py-1 rounded border border-blue-200">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
