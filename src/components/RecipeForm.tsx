'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { createRecipe } from '@/actions/recipe-actions'

// Defining the shape of our category objects from the DB
interface Category {
  id?: string | number;
  name: string;
}

interface RecipeFormProps {
  categories: Category[]
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full bg-orange-600 hover:bg-orange-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-orange-200 transition-all active:scale-[0.98] disabled:bg-gray-300 shadow-none"
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <span className="animate-spin text-lg">⏳</span> Publishing...
        </span>
      ) : 'Publish to Tayabli'}
    </button>
  )
}

export default function RecipeForm({ categories }: RecipeFormProps) {
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }])
  const [preview, setPreview] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPreview(URL.createObjectURL(file))
  }

  const addIngredient = () => setIngredients([...ingredients, { name: '', quantity: '' }])

  return (
    <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-2xl p-8 sm:p-12 rounded-[3rem] shadow-2xl shadow-orange-900/5 border border-white">
      <form action={createRecipe} className="space-y-10">
        
        {/* IMAGE PREVIEW */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4A3728]/40 ml-2">Recipe Cover</label>
          <div className="relative aspect-video rounded-3xl bg-white/50 border-2 border-dashed border-orange-200 flex flex-col items-center justify-center overflow-hidden hover:bg-orange-50/50 transition-all cursor-pointer group shadow-inner">
            {preview ? (
              <img src={preview} className="w-full h-full object-cover animate-in fade-in" alt="Preview" />
            ) : (
              <div className="text-center opacity-40 group-hover:scale-110 transition-transform">
                <span className="text-4xl mb-2 block">📸</span>
                <p className="text-[10px] font-black uppercase tracking-widest">Select Visual</p>
              </div>
            )}
            <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" required />
          </div>
        </div>

        {/* TITLE */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4A3728]/40 ml-2">Dish Title</label>
          <input 
            name="title" 
            placeholder="e.g. Traditional Mtewem" 
            className="w-full bg-white/50 border-none rounded-2xl p-4 text-xl font-bold text-[#4A3728] focus:ring-2 focus:ring-orange-200 outline-none shadow-inner" 
            required 
          />
        </div>

        {/* UPDATED DYNAMIC CATEGORY DROPDOWN */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4A3728]/40 ml-2">Cuisine Category</label>
          <div className="relative">
            <select 
              name="category" 
              className="w-full bg-white/50 border-none rounded-2xl p-4 text-sm font-bold outline-none cursor-pointer appearance-none shadow-inner focus:ring-2 focus:ring-orange-200"
              required
            >
              <option value="" disabled selected>Select from our Heritage...</option>
              {categories.length > 0 ? (
                categories.map((cat, idx) => (
                  <option key={cat.id || idx} value={cat.name}>
                    {cat.name}
                  </option>
                ))
              ) : (
                <option disabled>Loading categories from database...</option>
              )}
            </select>
            <span className="absolute right-4 top-4 pointer-events-none opacity-40 text-xs">▼</span>
          </div>
        </div>

        {/* INGREDIENTS */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4A3728]/40 ml-2">Ingredients</label>
          <div className="space-y-3">
            {ingredients.map((ing, i) => (
              <div key={i} className="flex gap-3 animate-in slide-in-from-left-2">
                <input 
                  placeholder="Qty" 
                  className="w-24 bg-white/50 border-none rounded-xl p-3 text-sm italic outline-none shadow-inner" 
                  value={ing.quantity}
                  onChange={(e) => {
                    const n = [...ingredients]; n[i].quantity = e.target.value; setIngredients(n);
                  }} 
                />
                <input 
                  placeholder="Name..." 
                  className="flex-1 bg-white/50 border-none rounded-xl p-3 text-sm font-bold text-[#4A3728] outline-none shadow-inner" 
                  value={ing.name}
                  onChange={(e) => {
                    const n = [...ingredients]; n[i].name = e.target.value; setIngredients(n);
                  }} 
                />
              </div>
            ))}
          </div>
          <input type="hidden" name="ingredientsData" value={JSON.stringify(ingredients)} />
          <button 
            type="button" 
            onClick={addIngredient} 
            className="text-[10px] font-black uppercase tracking-widest text-orange-600 hover:text-orange-700 ml-2 transition-colors"
          >
            + Add Another Row
          </button>
        </div>

        {/* PREPARATION */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4A3728]/40 ml-2">Process</label>
          <textarea 
            name="instructions" 
            rows={5} 
            placeholder="Explain how the magic happens..." 
            className="w-full bg-white/50 border-none rounded-3xl p-6 text-sm leading-relaxed outline-none shadow-inner focus:ring-2 focus:ring-orange-100 resize-none" 
            required
          ></textarea>
        </div>

        <SubmitButton />
      </form>
    </div>
  )
}