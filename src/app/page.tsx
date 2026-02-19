"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

// Emoji Mapping based on your Database Categories
const categoryEmojis: { [key: string]: string } = {
  "Traditional Mains": "🥘",
  "Tajines & Stews": "🍲",
  "Soups & Chorbas": "🥣",
  "Breads & Galettes": "🥖",
  "Pastries & Sweets": "🍯",
  "Street Food": "🌯",
  "Appetizers & Salads": "🥗",
  "Saharan Specialties": "🌵",
  "Ramadan Specials": "🌙",
  "Traditional Pasta": "🍝",
};

export default function HomePage() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      // 1. Fetch categories from your categories table
      const { data: catData } = await supabase
        .from("categories")
        .select("name")
        .order("name", { ascending: true });

      // 2. Fetch recipes from your recipes table
      const { data: recipeData } = await supabase
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false });

      if (catData) setCategories(catData);
      if (recipeData) setRecipes(recipeData);

      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredRecipes =
    activeFilter === "All"
      ? recipes
      : recipes.filter((r) => r.category === activeFilter);

  return (
    <main className="min-h-screen bg-[#FFFBFA] px-6 md:px-12 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="mb-16">
          <h1 className="text-7xl md:text-8xl font-serif italic text-[#4A3728] tracking-tighter leading-none">
            Tayabli<span className="text-orange-600">.</span>
          </h1>
          <p className="text-[#8C7A6B] font-bold tracking-[0.4em] text-[10px] md:text-[12px] uppercase opacity-60 mt-4">
            The Algerian Food Protocol
          </p>
        </header>

        {/* CATEGORY FILTER BAR */}
        <div className="mb-16">
          <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar items-center">
            <button
              onClick={() => setActiveFilter("All")}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm ${
                activeFilter === "All"
                  ? "bg-[#4A3728] text-white shadow-xl scale-105"
                  : "bg-white text-[#4A3728] border border-orange-100 hover:border-orange-300"
              }`}
            >
              🍽️ All
            </button>

            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFilter(cat.name)}
                className={`flex items-center gap-2 whitespace-nowrap px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 shadow-sm ${
                  activeFilter === cat.name
                    ? "bg-[#4A3728] text-white shadow-xl scale-105"
                    : "bg-white text-[#4A3728] border border-orange-100 hover:border-orange-300"
                }`}
              >
                <span>{categoryEmojis[cat.name] || "🥘"}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        <div style="width:100%; height:100%; border: 1px solid">
          <button type="button">hello</button>
        </div>
        {/* RECIPE GRID */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-[3/4] bg-orange-50/50 animate-pulse rounded-[3rem]"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
            {filteredRecipes.map((recipe) => (
              <Link
                href={`/recipe/${recipe.id}`}
                key={recipe.id}
                className="group flex flex-col bg-white rounded-[3rem] overflow-hidden border border-orange-50 hover:shadow-[0_40px_80px_-20px_rgba(74,55,40,0.12)] transition-all duration-700"
              >
                {/* Image Section */}
                <div className="relative h-[340px] overflow-hidden">
                  <div className="absolute top-6 left-6 z-10">
                    <span className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest text-[#4A3728] shadow-sm">
                      {categoryEmojis[recipe.category] || "✨"}{" "}
                      {recipe.category}
                    </span>
                  </div>
                  {recipe.image_url ? (
                    <img
                      src={recipe.image_url}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      alt={recipe.title}
                    />
                  ) : (
                    <div className="w-full h-full bg-orange-50 flex items-center justify-center text-6xl">
                      🥘
                    </div>
                  )}
                  {/* Subtle vignette on hover */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Content Section */}
                <div className="p-10 flex flex-col flex-1">
                  <h3 className="text-4xl font-serif italic text-[#4A3728] leading-[1.1] mb-8 group-hover:text-orange-600 transition-colors duration-500">
                    {recipe.title}
                  </h3>

                  <div className="mt-auto pt-8 border-t border-orange-50 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#8C7A6B]">
                      Discover Recipe
                    </span>
                    <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 transform group-hover:translate-x-1 shadow-sm">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredRecipes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-40 text-center">
            <span className="text-6xl mb-6 opacity-30">🥄</span>
            <p className="font-serif italic text-3xl text-[#4A3728] opacity-40">
              The kitchen is empty in this category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
