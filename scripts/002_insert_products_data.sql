-- Wstawiam kategorie
INSERT INTO public.categories (slug, title, description, long_description) VALUES
('niemowleta-0-3-miesiace', 'Niemowlęta 0-3 miesiące', 'Mięciutkie ubranka dla najmłodszych', 'Delikatne ubranka dla noworodków i niemowląt wykonane z najlepszych materiałów. Oddychające, miękkie i bezpieczne dla wrażliwej skórki.'),
('niemowleta', 'Niemowlęta', 'Ubrania dla najmłodszych', 'Kompletna kolekcja ubrań dla niemowląt wykonana z najlepszych materiałów.'),
('odkrywcy', 'Odkrywcy', 'Dla chłopczyka - 6-12 miesięcy', 'Kolekcja dla maluszków od 6 do 12 miesięcy, którzy już odkrywają świat.'),
('dziewczynki', 'Dla dziewczynki', 'Ubrania dla dziewczynek', 'Specjalna kolekcja dla małych księżniczek z różowymi tonami i delikatnymi wzorami.')
ON CONFLICT DO NOTHING;

-- Wstawiam produkty dla kategorii "Niemowlęta 0-3 miesiące"
INSERT INTO public.products (id, category_id, title, price, image, description, sizes) VALUES
(
  'body-niemowleta-1',
  (SELECT id FROM public.categories WHERE slug = 'niemowleta-0-3-miesiace'),
  'Body z długim rękawem — ażurek',
  '89 zł',
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/body%20%281%29-tmmZmLmVrJpL0zZfqHK8lSqWxPX0p9.jpeg',
  'Wykonane z najdelikatniejszego ażurku bawełnianego. Miękkie, oddychające, idealne dla noworodka.',
  ARRAY['50', '56']
)
ON CONFLICT DO NOTHING;

-- Wstawiam produkty dla kategorii "Niemowlęta"
INSERT INTO public.products (id, category_id, title, price, image, description, sizes) VALUES
(
  'pajacyk-niemowleta-1',
  (SELECT id FROM public.categories WHERE slug = 'niemowleta'),
  'Pajacyk niemowlęcy',
  '119 zł',
  '/images/collection-newborn.jpg',
  'Wygodny pajacyk dla niemowlęcia',
  ARRAY['56', '62']
)
ON CONFLICT DO NOTHING;

-- Wstawiam produkty dla kategorii "Odkrywcy"
INSERT INTO public.products (id, category_id, title, price, image, description, sizes) VALUES
(
  'pajacyk-odkrywcy-1',
  (SELECT id FROM public.categories WHERE slug = 'odkrywcy'),
  'Pajacyk niemowlęcy — biały',
  '129 zł',
  '/images/collection-toddler.jpg',
  'Elegancki pajacyk dla chłopczyka',
  ARRAY['68', '74']
)
ON CONFLICT DO NOTHING;

-- Wstawiam produkty dla kategorii "Dla dziewczynki"
INSERT INTO public.products (id, category_id, title, price, image, description, sizes) VALUES
(
  'sukienka-dziewczynka-1',
  (SELECT id FROM public.categories WHERE slug = 'dziewczynki'),
  'Sukienka z krótkim rękawem',
  '109 zł',
  '/images/collection-baby.jpg',
  'Uroczy outfit dla dziewczynki',
  ARRAY['56', '62']
)
ON CONFLICT DO NOTHING;
