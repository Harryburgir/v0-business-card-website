-- Wstawianie kategorii La de Bébé mini (0-24 miesiące)
INSERT INTO public.categories (slug, title, description, long_description, sort_order) VALUES
('niemowleta-0-3-miesiace', 'Niemowlęta 0-3 miesiące', 'Mięciutkie ubranka dla najmłodszych', 'Delikatne ubranka dla noworodków i niemowląt wykonane z najlepszych materiałów. Oddychające, miękkie i bezpieczne dla wrażliwej skórki.', 1),
('niemowleta', 'Niemowlęta', 'Ubrania dla najmłodszych', 'Kompletna kolekcja ubrań dla niemowląt wykonana z najlepszych materiałów.', 2),
('odkrywcy', 'Odkrywcy', 'Dla chłopczyka - 6-12 miesięcy', 'Kolekcja dla maluszków od 6 do 12 miesięcy, którzy już odkrywają świat.', 3),
('dziewczynki', 'Dla dziewczynki', 'Ubrania dla dziewczynek', 'Specjalna kolekcja dla małych księżniczek z różowymi tonami i delikatnymi wzorami.', 4)
ON CONFLICT (slug) DO NOTHING;

-- Wstawianie produktów dla kategorii "Niemowlęta 0-3 miesiące"
INSERT INTO public.products (product_id, category_id, title, price, price_value, image, description, sizes) VALUES
('body-niemowleta-1',
  (SELECT id FROM public.categories WHERE slug = 'niemowleta-0-3-miesiace' LIMIT 1),
  'Body z długim rękawem — ażurek',
  '89 zł',
  8900,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/body%20%281%29-tmmZmLmVrJpL0zZfqHK8lSqWxPX0p9.jpeg',
  'Wykonane z najdelikatniejszego ażurku bawełnianego. Miękkie, oddychające, idealne dla noworodka.',
  ARRAY['50', '56']
)
ON CONFLICT (product_id) DO NOTHING;

-- Wstawianie produktów dla kategorii "Niemowlęta"
INSERT INTO public.products (product_id, category_id, title, price, price_value, image, description, sizes) VALUES
('pajacyk-niemowleta-1',
  (SELECT id FROM public.categories WHERE slug = 'niemowleta' LIMIT 1),
  'Pajacyk niemowlęcy',
  '119 zł',
  11900,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260322-WA0023-tvtgt0uTUy8hOIQrCA4AxEQFFx4SxW.jpg',
  'Wygodny pajacyk dla niemowlęcia w różowy deseń z kokardkami',
  ARRAY['56', '62']
)
ON CONFLICT (product_id) DO NOTHING;

-- Wstawianie produktów dla kategorii "Odkrywcy"
INSERT INTO public.products (product_id, category_id, title, price, price_value, image, description, sizes) VALUES
('pajacyk-odkrywcy-1',
  (SELECT id FROM public.categories WHERE slug = 'odkrywcy' LIMIT 1),
  'Pajacyk niemowlęcy — biały',
  '129 zł',
  12900,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260321-WA0007-mUxDGds4yBYhEQxJOCpWUgJSEFwIyQ.jpg',
  'Elegancki pajacyk dla chłopczyka z haftami',
  ARRAY['68', '74']
)
ON CONFLICT (product_id) DO NOTHING;

-- Wstawianie produktów dla kategorii "Dla dziewczynki"
INSERT INTO public.products (product_id, category_id, title, price, price_value, image, description, sizes) VALUES
('sukienka-dziewczynka-1',
  (SELECT id FROM public.categories WHERE slug = 'dziewczynki' LIMIT 1),
  'Sukienka z krótkim rękawem',
  '109 zł',
  10900,
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260321-WA0006-lQPYusdmVl9GKkrIQ9fnV9Gr9kTuFJ.jpg',
  'Uroczy outfit dla dziewczynki',
  ARRAY['56', '62']
)
ON CONFLICT (product_id) DO NOTHING;
