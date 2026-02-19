'use server'
import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createRecipe(formData: FormData) {
  const title = formData.get('title')
  const category = formData.get('category')
  const instructions = formData.get('instructions')
  
  // Parse the dynamic ingredients from the hidden input
  const ingredientsJson = formData.get('ingredientsData') as string
  const ingredients = JSON.parse(ingredientsJson || '[]')

  const imageFile = formData.get('image') as File
  const fileName = `${Date.now()}-${imageFile.name}`
  
  const { data: imageData } = await supabase.storage
    .from('recipe-images')
    .upload(fileName, imageFile)

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/recipe-images/${imageData?.path}`

  await supabase.from('recipes').insert([
    { 
      title, 
      category, 
      ingredients, // This is now an array of objects
      instructions, 
      image_url: imageUrl 
    }
  ])

  revalidatePath('/')
  redirect('/')
}