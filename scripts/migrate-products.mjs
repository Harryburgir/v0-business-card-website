import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Import your products data
import { categories } from '../lib/products-data.js'

async function migrateProducts() {
  console.log('Starting product migration...')

  try {
    // Migrate categories and products
    for (const category of categories) {
      console.log(`\nProcessing category: ${category.title}`)

      // Insert category
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .insert({
          slug: category.slug,
          title: category.title,
          description: category.description,
          long_description: category.longDescription,
        })
        .select()

      if (categoryError) {
        console.error(`Error inserting category ${category.slug}:`, categoryError)
        continue
      }

      const categoryId = categoryData[0].id
      console.log(`✓ Category inserted with ID: ${categoryId}`)

      // Insert products for this category
      for (const product of category.products) {
        const productData = {
          category_id: categoryId,
          product_id: product.id,
          title: product.title,
          price: product.price,
          description: product.description,
          image: product.image,
          sizes: product.sizes || [],
        }

        const { data: insertedProduct, error: productError } = await supabase
          .from('products')
          .insert(productData)
          .select()

        if (productError) {
          console.error(`Error inserting product ${product.id}:`, productError)
        } else {
          console.log(`  ✓ Product inserted: ${product.title}`)
        }
      }
    }

    console.log('\n✅ Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
  }
}

migrateProducts()
