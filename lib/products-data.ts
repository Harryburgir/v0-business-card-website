export interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  description: string;
  sizes?: string[];
}

export interface Category {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  products: Product[];
}

export const categories: Category[] = [
  {
    slug: "body",
    title: "Body",
    description: "Miękkie body dla każdej pory roku",
    longDescription: "Nasze body z naturalnej bawełny to podstawa garderoby każdego maluszka. Dostępne z krótkim i długim rękawem, zapewniają komfort i bezpieczeństwo delikatnej skórze.",
    products: [
      {
        id: "body-kr-3",
        title: "Body krótki rękaw kratka różowa",
        price: "69 zł",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260318-WA0029-H0JpNS4IpUlwnWkrgFuHZ4YQGCdlR4.jpg",
        description: "Kopertowe zapięcie, wzór w kratkę, krótki rękaw",
        sizes: ["56", "62", "74", "80", "86"],
      },
      {
        id: "body-kr-4",
        title: "Body krótki rękaw różowe western",
        price: "69 zł",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260318-WA0026-Q7L8X0Zeodo3XQWLFYzFYlsaxrkbMZ.jpg",
        description: "Kopertowe zapięcie, haft western, różowy",
        sizes: ["56", "62", "74", "80", "86"],
      },
      {
        id: "body-dl-4",
        title: "Body długi rękaw kratka z falbanką",
        price: "69 zł",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260318-WA0028-FOhLZmFbiRRU0htfaq542gXLZDoGjR.jpg",
        description: "Kopertowe zapięcie, wzór w kratkę, falbanka",
        sizes: ["56", "62", "74", "80", "86"],
      },
      {
        id: "body-dl-5",
        title: "Body długi rękaw różowe z czapeczką",
        price: "79 zł",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260318-WA0024-G12vL8BFvjyweI2QKJkJuAJxu6R248.jpg",
        description: "Kopertowe zapięcie, motywy western, z czapeczką",
        sizes: ["56", "62", "74", "80", "86"],
      },
      {
        id: "body-kr-5",
        title: "Body krótki rękaw białe western",
        price: "69 zł",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260318-WA0027-cWMzHoN82tDFwac5lC69FvBzuM8B8l.jpg",
        description: "Kopertowe zapięcie, haft western, białe",
        sizes: ["56", "62", "74", "80", "86"],
      },
      {
        id: "body-kr-6",
        title: "Body krótki rękaw kratka niebieska",
        price: "69 zł",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260318-WA0025-hyFoeyKTuh52Q9HYLiXNF9uish37ar.jpg",
        description: "Kopertowe zapięcie, wzór w kratkę, niebieski",
        sizes: ["56", "62", "74", "80", "86"],
      },
      {
        id: "body-dl-6",
        title: "Body długi rękaw białe motywy jeździeckie",
        price: "69 zł",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/boooooody-bps9bk4PAUgZzLqvDSHoqPswZaR1HZ.jpg",
        description: "Kopertowe zapięcie, motywy jeździeckie: konie, podkowy, trofea",
        sizes: ["56", "62", "74", "80", "86"],
      },
    ],
  },
  {
    slug: "spiochy",
    title: "Śpiochy",
    description: "Miękkie i wygodne śpiochy z naturalnej bawełny",
    longDescription: "Nasze śpiochy wykonane są z najwyższej jakości naturalnej bawełny, która jest delikatna dla wrażliwej skóry maluszka. Każda para jest starannie uszyta, aby zapewnić maksymalny komfort podczas snu i zabawy.",
    products: [
      {
        id: "spiochy-1",
        title: "Śpiochy bawełna organiczna wzór western",
        price: "109 zł",
        image: "/images/product-spiochy-1.jpg",
        description: "Bawełna organiczna, kołnierzyk peter pan, stópki",
        sizes: ["56", "62", "74", "80", "86"],
      },
      {
        id: "spiochy-2",
        title: "Śpiochy bawełna organiczna niebieskie",
        price: "109 zł",
        image: "/images/product-spiochy-2.jpg",
        description: "Bawełna organiczna, biały kołnierzyk peter pan, stópki",
        sizes: ["56", "62", "74", "80", "86"],
      },
      {
        id: "spiochy-3",
        title: "Śpiochy bawełna organiczna wzór jeździecki",
        price: "109 zł",
        image: "/images/product-spiochy-3.jpg",
        description: "Bawełna organiczna, kołnierzyk peter pan, stópki",
        sizes: ["56", "62", "74", "80", "86"],
      },
      {
        id: "spiochy-4",
        title: "Śpiochy bawełna organiczna różowe",
        price: "109 zł",
        image: "/images/product-spiochy-4.jpg",
        description: "Bawełna organiczna, kołnierzyk z koronką, stópki",
        sizes: ["56", "62", "74", "80", "86"],
      },
      {
        id: "spiochy-5",
        title: "Śpiochy bawełna organiczna western",
        price: "109 zł",
        image: "/images/product-spiochy-5.jpg",
        description: "Bawełna organiczna, kołnierzyk peter pan, motywy western, stópki",
        sizes: ["56", "62", "74", "80", "86"],
      },
      {
        id: "spiochy-6",
        title: "Śpiochy białe motywy jeździeckie",
        price: "109 zł",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nowe%20%C5%9Bpiochy%20-vI2hQ4jCqW3YZMqVpWJZT15wiXImPC.jpg",
        description: "Bawełna organiczna, kołnierzyk peter pan, haft jeździecki, stópki",
        sizes: ["56", "62", "74", "80", "86"],
      },
    ],
  },
  {
    slug: "pieluszki",
    title: "Pieluszki",
    description: "Delikatne pieluszki muślinowe",
    longDescription: "Wielofunkcyjne pieluszki muślinowe, idealne do otulania, jako podkładka czy ściereczka. Wykonane z muślinu bambusowego, który z każdym praniem staje się coraz miękka.",
    products: [
      {
        id: "pieluszka-1",
        title: "Zestaw 3 pieluszek kratka różowa",
        price: "49 zł",
        image: "/images/product-pieluszka-1.jpg",
        description: "3 sztuki, Muślin Bambusowy, wzór w kratkę",
      },
      {
        id: "pieluszka-2",
        title: "Zestaw 3 pieluszek kratka niebieska",
        price: "49 zł",
        image: "/images/product-pieluszka-2.jpg",
        description: "3 sztuki, Muślin Bambusowy, wzór w kratkę",
      },
    ],
  },
  {
    slug: "posciele",
    title: "Pościele",
    description: "Delikatne pościele i otulacze dla maluszków",
    longDescription: "Nasze pościele wykonane są z Satyny Bawełnianej, zapewniając maluszkowi bezpieczny i komfortowy sen. Każdy zestaw jest starannie dobrany pod kątem delikatności tkaniny i ponadczasowej estetyki.",
    products: [
      {
        id: "posciel-konie-chlopiec",
        title: "Pościel Konie - dla chłopca",
        price: "169 zł",
        image: "/images/posciel-konie.jpg",
        description: "Satyna Bawełniana 100%, wzór konie i podkowy w odcieniach niebieskich, zestaw 2-częściowy (poszewka + poszwa)",
      },
      {
        id: "posciel-konie-dziewczynka",
        title: "Pościel Konie - dla dziewczynki",
        price: "169 zł",
        image: "/images/posciel-konie.jpg",
        description: "Satyna Bawełniana 100%, wzór konie, podkowy i różowe wstążki, zestaw 2-częściowy (poszewka + poszwa)",
      },
    ],
  },
  {
    slug: "spodenki",
    title: "Spodenki",
    description: "Wygodne spodenki dla maluszków",
    longDescription: "Miękkie i elastyczne spodenki, idealne do noszenia co dzień. Wykonane z naturalnych tkanin, zapewniają swobodę ruchów podczas zabawy i snu.",
    products: [
      {
        id: "spodenki-1",
        title: "Spodenki różowe z falbanką",
        price: "59 zł",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spodnie-BqKjdb93YurCThQ1DuYuS0YiMLCqwW.jpeg",
        description: "Miękka bawełna, ozdobna falbanka",
        sizes: ["56", "62", "74", "80", "86"],
      },
      {
        id: "spodenki-2",
        title: "Spodenki niebieskie",
        price: "59 zł",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spodnie%20%282%29-dleEzvDI28GOHKPrAyP8y6a9f5gSsp.jpeg",
        description: "Naturalna bawełna, wygodna gumka",
        sizes: ["56", "62", "74", "80", "86"],
      },
      {
        id: "spodenki-3",
        title: "Spodenki różowe w kratkę z falbanką",
        price: "59 zł",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spodnie%20%283%29-BGPTUy6cOz2wmPFzAgyyaVq8kle7qx.jpeg",
        description: "Bawełna, wzór w kratkę, ozdobna falbanka",
        sizes: ["56", "62", "74", "80", "86"],
      },

    ],
  },
];

export interface LadebebeCategory {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  ageRange: string;
  products: Product[];
}

export const ladebebeCategories: LadebebeCategory[] = [
  {
    slug: "bluzki",
    title: "Bluzki",
    description: "Eleganckie bluzki dla dziewczynek",
    longDescription: "Starannie zaprojektowane bluzki z naturalnych tkanin, idealne na każdą okazję. Delikatne detale, hafty i koronki tworzą wyjątkowy styl dla dziewczynek.",
    ageRange: "2-8 lat",
    products: [
      {
        id: "ldb-bluzka-1",
        title: "Bluzka biała z haftem kwiatowym",
        price: "89 zł",
        image: "/images/collection-toddler.jpg",
        description: "100% bawełna, haft kwiatowy, falbanki przy rękawach",
        sizes: ["92", "98", "104", "110", "116", "122", "128"],
      },
      {
        id: "ldb-bluzka-2",
        title: "Bluzka różowa z kołnierzykiem peter pan",
        price: "89 zł",
        image: "/images/collection-baby.jpg",
        description: "100% bawełna, kołnierzyk peter pan, guziki z tyłu",
        sizes: ["92", "98", "104", "110", "116", "122", "128"],
      },
      {
        id: "ldb-bluzka-3",
        title: "Bluzka kremowa z kokardą",
        price: "89 zł",
        image: "/images/collection-newborn.jpg",
        description: "Bawełna z elastanem, satynowa kokarda, luźny krój",
        sizes: ["92", "98", "104", "110", "116", "122", "128"],
      },
    ],
  },
  {
    slug: "spodnie",
    title: "Spodnie",
    description: "Wygodne i stylowe spodnie dla dzieci",
    longDescription: "Miękkie, elastyczne spodnie z naturalnych tkanin. Wygodna gumka, swobodny krój i starannie dobrane wzory sprawiają, że każde dziecko czuje się komfortowo przez cały dzień.",
    ageRange: "2-8 lat",
    products: [
      {
        id: "ldb-spodnie-1",
        title: "Spodnie beżowe w konie",
        price: "99 zł",
        image: "/images/collection-toddler.jpg",
        description: "100% bawełna, wzór jeździecki, elastyczna gumka",
        sizes: ["92", "98", "104", "110", "116", "122", "128"],
      },
      {
        id: "ldb-spodnie-2",
        title: "Spodnie różowe w kratkę z falbanką",
        price: "99 zł",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spodnie%20%283%29-BGPTUy6cOz2wmPFzAgyyaVq8kle7qx.jpeg",
        description: "Bawełna, wzór w kratkę, ozdobna falbanka na dole",
        sizes: ["92", "98", "104", "110", "116", "122", "128"],
      },
      {
        id: "ldb-spodnie-3",
        title: "Spodnie granatowe jeździeckie",
        price: "99 zł",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spodnie%20%282%29-dleEzvDI28GOHKPrAyP8y6a9f5gSsp.jpeg",
        description: "Miękka bawełna, klasyczny krój, wygodna gumka",
        sizes: ["92", "98", "104", "110", "116", "122", "128"],
      },
    ],
  },
  {
    slug: "sukienki",
    title: "Sukienki",
    description: "Piękne sukienki na każdą okazję",
    longDescription: "Kolekcja sukienek łącząca elegancję z wygodą. Od codziennych fasonów po odświętne kreacje — każda sukienka wykonana jest z naturalnych, oddychających tkanin z dbałością o każdy detal.",
    ageRange: "2-8 lat",
    products: [
      {
        id: "ldb-sukienka-1",
        title: "Sukienka różowa z falbankami",
        price: "129 zł",
        image: "/images/collection-baby.jpg",
        description: "100% bawełna, wielopoziomowe falbanki, sznurowanie z tyłu",
        sizes: ["92", "98", "104", "110", "116", "122", "128"],
      },
      {
        id: "ldb-sukienka-2",
        title: "Sukienka kremowa z haftem",
        price: "139 zł",
        image: "/images/collection-newborn.jpg",
        description: "Bawełna organiczna, haft kwiatowy, wiązane ramiona",
        sizes: ["92", "98", "104", "110", "116", "122", "128"],
      },
      {
        id: "ldb-sukienka-3",
        title: "Sukienka biała jeździecka",
        price: "129 zł",
        image: "/images/collection-toddler.jpg",
        description: "100% bawełna, nadruk jeździecki, kołnierzyk peter pan",
        sizes: ["92", "98", "104", "110", "116", "122", "128"],
      },
    ],
  },
  {
    slug: "komplety",
    title: "Komplety",
    description: "Gotowe zestawy stylowych ubranek",
    longDescription: "Starannie dobrane komplety odzieżowe, które świetnie ze sobą współgrają. Bluzka z pasującymi spodniami lub spódniczką — idealne na co dzień i na wyjątkowe okazje.",
    ageRange: "2-8 lat",
    products: [
      {
        id: "ldb-komplet-1",
        title: "Komplet różowy — bluzka i spodnie",
        price: "169 zł",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/spodnie-BqKjdb93YurCThQ1DuYuS0YiMLCqwW.jpeg",
        description: "Bawełna organiczna, bluzka z falbanką + spodnie z gumką",
        sizes: ["92", "98", "104", "110", "116", "122", "128"],
      },
      {
        id: "ldb-komplet-2",
        title: "Komplet jeździecki — bluzka i spódniczka",
        price: "179 zł",
        image: "/images/collection-baby.jpg",
        description: "100% bawełna, motywy jeździeckie, bluzka + spódniczka z falbanką",
        sizes: ["92", "98", "104", "110", "116", "122", "128"],
      },
      {
        id: "ldb-komplet-3",
        title: "Komplet kremowy elegancki",
        price: "179 zł",
        image: "/images/collection-toddler.jpg",
        description: "Satyna bawełniana, bluzka z kołnierzykiem + spodnie",
        sizes: ["92", "98", "104", "110", "116", "122", "128"],
      },
    ],
  },
  {
    slug: "swetry",
    title: "Swetry i kardygany",
    description: "Ciepłe swetry z naturalnej wełny i bawełny",
    longDescription: "Kolekcja swetrów i kardiganów z najwyższej jakości dzianin. Miękkie, ciepłe i stylowe — idealne na chłodniejsze dni, zarówno w domu jak i na spacerze.",
    ageRange: "2-8 lat",
    products: [
      {
        id: "ldb-sweter-1",
        title: "Kardygan kremowy z guzikami",
        price: "119 zł",
        image: "/images/collection-toddler.jpg",
        description: "100% bawełna organiczna, klasyczny krój, perłowe guziki",
        sizes: ["92", "98", "104", "110", "116", "122", "128"],
      },
      {
        id: "ldb-sweter-2",
        title: "Sweter różowy z koniem",
        price: "119 zł",
        image: "/images/collection-baby.jpg",
        description: "Wełna merynosowa, aplikacja konik, okrągły dekolt",
        sizes: ["92", "98", "104", "110", "116", "122", "128"],
      },
    ],
  },
];

export function getLadebebeCategoryBySlug(slug: string): LadebebeCategory | undefined {
  return ladebebeCategories.find((cat) => cat.slug === slug);
}

export function getAllLadebebeCategorySlugs(): string[] {
  return ladebebeCategories.map((cat) => cat.slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map((cat) => cat.slug);
}
