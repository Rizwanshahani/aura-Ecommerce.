import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Star, Check, Quote, MessageSquarePlus, ThumbsUp,
  Filter, ShieldCheck, Sparkles, X
} from "lucide-react";

const initialReviews = [
  {
    name: "Alice Henderson",
    role: "UI Designer • MacBook Pro M3 Buyer",
    text: "The MacBook Pro M3 I bought is flawless. Shipping was incredibly fast, and customer support was super helpful throughout! The Liquid Retina XDR display is breathtaking for design work.",
    rating: 5,
    avatar: "AH",
    verified: true,
    date: "2 days ago",
    helpfulCount: 24,
  },
  {
    name: "Marcus Brody",
    role: "Software Engineer • Sony WH-1000XM5 Buyer",
    text: "Sony WH-1000XM5 headphones are outstanding. Excellent noise cancelling in my noisy office environment, authentic product, and battery lasts all week. Will buy again from Aura!",
    rating: 5,
    avatar: "MB",
    verified: true,
    date: "4 days ago",
    helpfulCount: 18,
  },
  {
    name: "Clara Vance",
    role: "Tech Blogger • iPhone 15 Pro Buyer",
    text: "Best tech shopping experience. The layout is clean, checkout was seamless, and the product quality is top-notch. Titanium design feels so premium.",
    rating: 4,
    avatar: "CV",
    verified: true,
    date: "1 week ago",
    helpfulCount: 15,
  },
  {
    name: "David Kim",
    role: "Photographer • DJI Mini 4 Pro Buyer",
    text: "Got the DJI Mini 4 Pro drone here. Packed securely in bubble wrap, arrived 2 days earlier than estimated, and the 4K HDR video quality is astounding for aerial shoots!",
    rating: 5,
    avatar: "DK",
    verified: true,
    date: "1 week ago",
    helpfulCount: 31,
  },
  {
    name: "Elena Rostova",
    role: "Product Manager • Apple Watch Series 9 Buyer",
    text: "The Apple Watch Series 9 was an amazing purchase. Smooth order tracking, clear email updates at every stage, and 100% genuine electronics.",
    rating: 5,
    avatar: "ER",
    verified: true,
    date: "2 weeks ago",
    helpfulCount: 9,
  },
  {
    name: "Jason Patel",
    role: "DevOps Lead • Dell XPS 15 Buyer",
    text: "Dell XPS 15 is an absolute powerhouse for compilation and virtualization. Great customer service when I had questions about warranty coverage.",
    rating: 5,
    avatar: "JP",
    verified: true,
    date: "3 weeks ago",
    helpfulCount: 12,
  },
  {
    name: "Samantha Wright",
    role: "Digital Marketer • Bose QC Ultra Buyer",
    text: "Bose QuietComfort Ultra earbuds are worth every single penny. Immersive spatial audio is magical. Fast checkout with credit card.",
    rating: 5,
    avatar: "SW",
    verified: true,
    date: "1 month ago",
    helpfulCount: 7,
  },
  {
    name: "Liam O'Connor",
    role: "Architect • iPad Pro M2 Buyer",
    text: "The iPad Pro M2 is my daily driver for drawing and client presentations. Aura Store provided the best price compared to anywhere else online.",
    rating: 5,
    avatar: "LO",
    verified: true,
    date: "1 month ago",
    helpfulCount: 14,
  },
];

const Reviews = () => {
  const [reviewsList, setReviewsList] = useState(() => {
    try {
      const saved = localStorage.getItem("aura_client_reviews");
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  const [filterRating, setFilterRating] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    role: "",
    text: "",
    rating: 5,
  });

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.text.trim()) {
      toast.error("Please provide both your name and review.");
      return;
    }

    const initials = reviewForm.name
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

    const newRev = {
      name: reviewForm.name.trim(),
      role: reviewForm.role.trim() || "Verified Buyer",
      text: reviewForm.text.trim(),
      rating: Number(reviewForm.rating) || 5,
      avatar: initials,
      verified: true,
      date: "Just now",
      helpfulCount: 0,
    };

    const updated = [newRev, ...reviewsList];
    setReviewsList(updated);
    try {
      localStorage.setItem("aura_client_reviews", JSON.stringify(updated));
    } catch (err) {
      console.error(err);
    }

    toast.success("Thank you! Your review has been published.");
    setReviewForm({ name: "", role: "", text: "", rating: 5 });
    setShowModal(false);
  };

  const filteredReviews = filterRating === "all"
    ? reviewsList
    : reviewsList.filter((r) => r.rating === Number(filterRating));

  const averageRating = (
    reviewsList.reduce((acc, r) => acc + r.rating, 0) / (reviewsList.length || 1)
  ).toFixed(1);

  return (
    <div className="pt-28 pb-24 bg-slate-50/60 dark:bg-slate-950 min-h-screen text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Header Hero */}
        <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 md:p-14 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} /> Verified Buyer Feedback
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
                Customer <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Reviews</span>
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                Read real experiences from thousands of customers who trust Aura Store for authentic premium electronics, rapid delivery, and top-tier after-sales care.
              </p>
            </div>

            {/* Score Box */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center space-y-3 shrink-0 min-w-[240px]">
              <div className="text-5xl font-black text-slate-900 dark:text-white">{averageRating}</div>
              <div className="flex justify-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-500 font-bold">Based on {reviewsList.length} verified reviews</p>
              <Button
                onClick={() => setShowModal(true)}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold h-10 rounded-xl text-xs gap-1.5 shadow-md cursor-pointer"
              >
                <MessageSquarePlus size={14} /> Write a Review
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filter By Rating:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: "All Reviews", value: "all" },
              { label: "5 Stars", value: "5" },
              { label: "4 Stars", value: "4" },
            ].map((f) => (
              <button
                key={f.value}
                onClick={() => setFilterRating(f.value)}
                className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  filterRating === f.value
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md"
                    : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev, i) => (
            <div
              key={i}
              className="relative bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800/80 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <Quote size={32} className="absolute top-6 right-6 text-pink-100 dark:text-slate-800 rotate-180 pointer-events-none" />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, starIdx) => (
                      <Star key={starIdx} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 px-2 py-0.5 rounded-full border border-teal-200 dark:border-teal-900">
                      <ShieldCheck size={11} /> Verified Buyer
                    </span>
                  )}
                </div>

                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-200/60 dark:border-pink-900/40 flex items-center justify-center text-pink-600 dark:text-pink-400 font-black text-xs shrink-0">
                    {rev.avatar}
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-900 dark:text-white text-xs">{rev.name}</h5>
                    <p className="text-[10px] text-slate-400">{rev.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                  <ThumbsUp size={12} />
                  <span>{rev.helpfulCount || 12}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Write Review Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Give Your Review</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Share your experience with Aura Store products</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                        className="p-1 hover:scale-125 transition-transform cursor-pointer"
                      >
                        <Star
                          size={24}
                          className={
                            star <= reviewForm.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300 dark:text-slate-700"
                          }
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-500 ml-2">
                      {reviewForm.rating} of 5 stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={reviewForm.name}
                    onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-500 transition-colors text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Role or Product Purchased
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MacBook Pro Buyer or Creative Director"
                    value={reviewForm.role}
                    onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-pink-500 transition-colors text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Your Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your thoughts about product quality, shipping speed, customer service..."
                    value={reviewForm.text}
                    onChange={(e) => setReviewForm({ ...reviewForm, text: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-3 text-sm outline-none focus:border-pink-500 transition-colors text-slate-900 dark:text-white resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                    className="rounded-xl font-bold h-10 px-5 cursor-pointer text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold h-10 px-6 rounded-xl shadow-md cursor-pointer text-xs"
                  >
                    Submit Review
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
