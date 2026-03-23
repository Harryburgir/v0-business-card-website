-- Tabela kategorii produktów (La de Bébé mini - 0-24 miesiące)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela produktów
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT UNIQUE NOT NULL, -- np. "body-kr-3"
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  price TEXT NOT NULL, -- np. "69 zł"
  price_value INTEGER, -- wartość w groszach dla sortowania/obliczeń
  image TEXT NOT NULL,
  description TEXT,
  sizes TEXT[], -- tablica rozmiarów np. ["56", "62", "74"]
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela kategorii La de Bébé (2-8 lat)
CREATE TABLE IF NOT EXISTS ladebebe_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  age_range TEXT DEFAULT '2-6 lat',
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tabela produktów La de Bébé (2-8 lat)
CREATE TABLE IF NOT EXISTS ladebebe_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT UNIQUE NOT NULL,
  category_id UUID REFERENCES ladebebe_categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  price TEXT NOT NULL,
  price_value INTEGER,
  image TEXT NOT NULL,
  description TEXT,
  sizes TEXT[],
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Indeksy dla lepszej wydajności
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_visible ON products(is_visible);
CREATE INDEX IF NOT EXISTS idx_categories_visible ON categories(is_visible);
CREATE INDEX IF NOT EXISTS idx_ladebebe_products_category ON ladebebe_products(category_id);

-- Włącz Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE ladebebe_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE ladebebe_products ENABLE ROW LEVEL SECURITY;

-- Polityki RLS - publiczny dostęp do odczytu (produkty są publiczne)
CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access to ladebebe_categories" ON ladebebe_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to ladebebe_products" ON ladebebe_products FOR SELECT USING (true);

-- Funkcja do automatycznej aktualizacji updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggery dla updated_at
DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_ladebebe_categories_updated_at ON ladebebe_categories;
CREATE TRIGGER update_ladebebe_categories_updated_at
  BEFORE UPDATE ON ladebebe_categories
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_ladebebe_products_updated_at ON ladebebe_products;
CREATE TRIGGER update_ladebebe_products_updated_at
  BEFORE UPDATE ON ladebebe_products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
