import { createClient } from '@/lib/supabase/server'

export async function getCategories() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order')
  
  if (error) {
    console.error('[v0] Error fetching categories:', error)
    return []
  }
  
  return data || []
}

export async function getCategoryBySlug(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_visible', true)
    .single()
  
  if (error) {
    console.error('[v0] Error fetching category:', error)
    return null
  }
  
  return data
}

export async function getProductsByCategory(categoryId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .eq('is_visible', true)
    .order('sort_order')
  
  if (error) {
    console.error('[v0] Error fetching products:', error)
    return []
  }
  
  return data || []
}

export async function getProductByProductId(productId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('product_id', productId)
    .single()
  
  if (error) {
    console.error('[v0] Error fetching product:', error)
    return null
  }
  
  return data
}

export async function getAllProducts() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order')
  
  if (error) {
    console.error('[v0] Error fetching all products:', error)
    return []
  }
  
  return data || []
}

// Funkcje dla La de Bébé (2-8 lat)
export async function getLadebebeCategories() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('ladebebe_categories')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order')
  
  if (error) {
    console.error('[v0] Error fetching ladebebe categories:', error)
    return []
  }
  
  return data || []
}

export async function getLadebebeCategoryBySlug(slug: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('ladebebe_categories')
    .select('*')
    .eq('slug', slug)
    .eq('is_visible', true)
    .single()
  
  if (error) {
    console.error('[v0] Error fetching ladebebe category:', error)
    return null
  }
  
  return data
}

export async function getLadebebeProductsByCategory(categoryId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('ladebebe_products')
    .select('*')
    .eq('category_id', categoryId)
    .eq('is_visible', true)
    .order('sort_order')
  
  if (error) {
    console.error('[v0] Error fetching ladebebe products:', error)
    return []
  }
  
  return data || []
}

export async function getAllLadebebeProducts() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('ladebebe_products')
    .select('*')
    .eq('is_visible', true)
    .order('sort_order')
  
  if (error) {
    console.error('[v0] Error fetching all ladebebe products:', error)
    return []
  }
  
  return data || []
}
