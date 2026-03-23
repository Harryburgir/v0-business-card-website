import json
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

# Dane produktów z pliku
products_data = [
    {
        "slug": "niemowleta-0-3-miesiace",
        "title": "Niemowlęta 0-3 miesiące",
        "description": "Mięciutkie ubranka dla najmłodszych",
        "longDescription": "Delikatne ubranka dla noworodków i niemowląt wykonane z najlepszych materiałów. Oddychające, miękkie i bezpieczne dla wrażliwej skórki.",
        "products": [
            {
                "id": "body-niemowleta-1",
                "title": "Body z długim rękawem — ażurek",
                "price": "89 zł",
                "image": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/body%20%281%29-tmmZmLmVrJpL0zZfqHK8lSqWxPX0p9.jpeg",
                "description": "Wykonane z najdelikatniejszego ażurku bawełnianego. Miękkie, oddychające, idealne dla noworodka.",
                "sizes": ["50", "56"],
            }
        ]
    },
    {
        "slug": "niemowleta",
        "title": "Niemowlęta",
        "description": "Ubrania dla najmłodszych",
        "longDescription": "Kompletna kolekcja ubrań dla niemowląt wykonana z najlepszych materiałów.",
        "products": [
            {
                "id": "pajacyk-niemowleta-1",
                "title": "Pajacyk niemowlęcy",
                "price": "119 zł",
                "image": "/images/collection-newborn.jpg",
                "description": "Wygodny pajacyk dla niemowlęcia",
                "sizes": ["56", "62"],
            }
        ]
    },
    {
        "slug": "odkrywcy",
        "title": "Odkrywcy",
        "description": "Dla chłopczyka - 6-12 miesięcy",
        "longDescription": "Kolekcja dla maluszków od 6 do 12 miesięcy, którzy już odkrywają świat.",
        "products": [
            {
                "id": "pajacyk-odkrywcy-1",
                "title": "Pajacyk niemowlęcy — biały",
                "price": "129 zł",
                "image": "/images/collection-toddler.jpg",
                "description": "Elegancki pajacyk dla chłopczyka",
                "sizes": ["68", "74"],
            }
        ]
    },
    {
        "slug": "dziewczynki",
        "title": "Dla dziewczynki",
        "description": "Ubrania dla dziewczynek",
        "longDescription": "Specjalna kolekcja dla małych księżniczek z różowymi tonami i delikatnymi wzorami.",
        "products": [
            {
                "id": "sukienka-dziewczynka-1",
                "title": "Sukienka z krótkim rękawem",
                "price": "109 zł",
                "image": "/images/collection-baby.jpg",
                "description": "Uroczy outfit dla dziewczynki",
                "sizes": ["56", "62"],
            }
        ]
    }
]

# Importuję Supabase
from supabase import create_client, Client

url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")

if not url or not key:
    print("[v0] ERROR: Missing Supabase credentials")
    sys.exit(1)

supabase: Client = create_client(url, key)

print("[v0] Starting product migration to Supabase...")

try:
    # Czyszczę istniejące dane
    supabase.table("products").delete().neq("id", "").execute()
    supabase.table("categories").delete().neq("id", "").execute()
    print("[v0] Cleared existing data")
    
    # Wstawiam kategorie i produkty
    for category_data in products_data:
        # Wstawiam kategorię
        category = {
            "slug": category_data["slug"],
            "title": category_data["title"],
            "description": category_data["description"],
            "long_description": category_data["longDescription"],
        }
        
        cat_response = supabase.table("categories").insert(category).execute()
        category_id = cat_response.data[0]["id"]
        print(f"[v0] Created category: {category_data['title']} (ID: {category_id})")
        
        # Wstawiam produkty dla tej kategorii
        for product_data in category_data["products"]:
            product = {
                "category_id": category_id,
                "id": product_data["id"],
                "title": product_data["title"],
                "price": product_data["price"],
                "image": product_data["image"],
                "description": product_data["description"],
                "sizes": product_data["sizes"],
            }
            
            supabase.table("products").insert(product).execute()
            print(f"[v0] Created product: {product_data['title']}")
    
    print("[v0] ✓ All products migrated successfully!")
    
except Exception as e:
    print(f"[v0] ERROR: {str(e)}")
    sys.exit(1)
