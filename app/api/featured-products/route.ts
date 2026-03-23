import { getCategories, getProductsByCategory } from '@/lib/supabase-queries'

export async function GET() {
  try {
    const categories = await getCategories()
    const featuredProducts = []

    // Pobrać jeden produkt z każdej kategorii
    for (const category of categories.slice(0, 4)) {
      const products = await getProductsByCategory(category.id)
      if (products.length > 0) {
        featuredProducts.push({
          product: products[0],
          categorySlug: category.slug,
          categoryTitle: category.title,
        })
      }
    }

    return Response.json(featuredProducts)
  } catch (error) {
    console.error('[v0] Error fetching featured products:', error)
    return Response.json(
      { error: 'Failed to fetch featured products' },
      { status: 500 }
    )
  }
}
