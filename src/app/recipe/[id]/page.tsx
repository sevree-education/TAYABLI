'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function DishPage() {
  const { id } = useParams()
  const router = useRouter()
  const [recipe, setRecipe] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRecipe() {
      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('id', id)
        .single()

      if (error || !data) {
        router.push('/')
      } else {
        setRecipe(data)
      }
      setLoading(false)
    }
    fetchRecipe()
  }, [id, router])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFBFA]">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-orange-200 border-t-orange-600 animate-spin" />
        <p className="font-serif italic text-[#4A3728]">Setting the table...</p>
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#FFFBFA]">
      {/* 1. CINEMATIC HERO SECTION */}
      <div className="relative h-[60vh] w-full overflow-hidden bg-[#4A3728]">
        {recipe.image_url ? (
          <img 
            src={recipe.image_url} 
            alt={recipe.title} 
            className="w-full h-full object-cover opacity-80"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-8xl opacity-20">🥘</div>
        )}
        
        {/* Navigation Overlay */}
        <div className="absolute top-0 left-0 w-full p-8 z-20">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-[#4A3728] transition-all">
            ← Back to Gallery
          </Link>
        </div>

        {/* Gradient Fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FFFBFA] via-transparent to-black/30" />
      </div>

      {/* 2. CONTENT CONTAINER */}
      <div className="max-w-6xl mx-auto px-6 -mt-32 relative z-10">
        
        {/* Title Card */}
        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl shadow-orange-900/5 border border-orange-50 mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="bg-orange-100 text-orange-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest italic">
                {recipe.category}
              </span>
              <h1 className="text-6xl md:text-8xl font-serif italic text-[#4A3728] leading-[0.85] tracking-tighter">
                {recipe.title}
              </h1>
            </div>
            
            <div className="flex gap-8 border-l border-orange-100 pl-8 hidden md:flex">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#8C7A6B] mb-1">Origin</p>
                <p className="font-serif italic text-[#4A3728]">Algeria</p>
              </div>
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#8C7A6B] mb-1">Heritage</p>
                <p className="font-serif italic text-[#4A3728]">Traditional</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-24">
          
          {/* Ingredients Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-12">
              <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#4A3728]/40 mb-8 flex items-center gap-4">
                Ingredients <span className="h-[1px] flex-1 bg-orange-100"></span>
              </h2>
              <div className="space-y-4">
                {recipe.ingredients?.map((ing: any, i: number) => (
                  <div key={i} className="flex justify-between items-center p-5 bg-white rounded-2xl border border-orange-50 hover:border-orange-200 transition-colors shadow-sm">
                    <span className="text-[#4A3728] font-bold text-sm capitalize">{ing.name}</span>
                    <span className="font-serif italic text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded-lg text-sm">{ing.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Instructions Column */}
          <div className="lg:col-span-8">
            <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#4A3728]/40 mb-8 flex items-center gap-4">
              Method of Preparation <span className="h-[1px] flex-1 bg-orange-100"></span>
            </h2>
            <div className="prose prose-orange max-w-none">
              <div className="text-[#4A3728] leading-[1.8] text-xl font-medium whitespace-pre-line bg-white rounded-[3rem] p-10 md:p-16 border border-orange-50 shadow-inner">
                {recipe.instructions}
              </div>
            </div>

            {/* Print / Action Section */}
            <div className="mt-12 flex justify-end">
              <button 
                onClick={() => window.print()}
                className="group flex items-center gap-3 bg-[#4A3728] text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all shadow-xl shadow-orange-900/10"
              >
                <span>Print Protocol</span>
                <span className="group-hover:translate-y-[-2px] transition-transform">🖨️</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}