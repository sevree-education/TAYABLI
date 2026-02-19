'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import RecipeForm from "@/components/RecipeForm"

export default function AddRecipePage() {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCategories() {
      // Fetching from the dedicated categories table you created
      const { data, error } = await supabase
        .from('categories')
        .select('id, name')
        .order('name', { ascending: true })

      if (error) {
        console.error('Error fetching categories:', error)
      } else {
        setCategories(data || [])
      }
      setLoading(false)
    }

    fetchCategories()
  }, [])

  return (
    <main className="min-h-screen pb-20 pt-12 px-4 relative overflow-hidden bg-[#FFFBFA]">
      {/* Moving Background Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext y='40' x='10' style='font-size: 18px;'%3E🥘%3C/text%3E%3Ctext y='90' x='60' style='font-size: 18px;'%3E🥐%3C/text%3E%3Ctext y='25' x='75' style='font-size: 18px;'%3E🥖%3C/text%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
          animation: 'drift 80s linear infinite',
        }}
      />

      <style jsx global>{`
        @keyframes drift {
          from { background-position: 0 0; }
          to { background-position: 800px 800px; }
        }
      `}</style>

      {/* Page Header */}
      <div className="max-w-2xl mx-auto mb-10 text-center relative z-10">
        <h1 className="text-5xl font-serif italic text-[#4A3728] tracking-tight">
          New Recipe
        </h1>
        <p className="text-[#8C7A6B] mt-3 font-medium text-lg italic opacity-80">
          Add your culinary magic to the Algerian collection.
        </p>
      </div>

      <div className="relative z-10">
        {loading ? (
          <div className="max-w-2xl mx-auto bg-white/50 backdrop-blur-xl h-96 rounded-[3rem] animate-pulse flex items-center justify-center">
            <p className="text-[#8C7A6B] font-serif italic">Loading database...</p>
          </div>
        ) : (
          <RecipeForm categories={categories} />
        )}
      </div>
    </main>
  )
}