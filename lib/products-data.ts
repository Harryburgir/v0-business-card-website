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
        id: "body-kr-1",
        title: "Body krótki rękaw",
        price: "69 zł",
        image: "/images/product-body-kr-1.jpg",
        description: "Kopertowe zapięcie, motywy western",
        sizes: ["56", "62", "74", "80", "86"],
      },
      {
        id: "body-kr-2",
        title: "Body krótki rękaw różowe",
        price: "69 zł",
        image: "/images/product-body-kr-2.jpg",
        description: "Kopertowe zapięcie, motywy western",
        sizes: ["56", "62", "74", "80", "86"],
      },
      {
        id: "body-dl-1",
        title: "Body długi rękaw kratka niebieska",
        price: "69 zł",
        image: "/images/product-body-dl-1.jpg",
        description: "Kopertowe zapięcie, wzór w kratkę",
        sizes: ["56", "62", "74", "80", "86"],
      },
      {
        id: "body-dl-2",
        title: "Body długi rękaw różowe",
        price: "69 zł",
        image: "/images/product-body-dl-2.jpg",
        description: "Kopertowe zapięcie, motywy western",
        sizes: ["56", "62", "74", "80", "86"],
      },
      {
        id: "body-dl-3",
        title: "Body długi rękaw kratka różowa",
        price: "69 zł",
        image: "/images/product-body-dl-3.jpg",
        description: "Kopertowe zapięcie, wzór w kratkę",
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
    ],
  },
  {
    slug: "pieluszki",
    title: "Pieluszki",
    description: "Delikatne pieluszki bawełniane",
    longDescription: "Wielofunkcyjne pieluszki bawełniane, idealne do otulania, jako podkładka czy ściereczka. Wykonane z najdelikatniejszej bawełny, który z każdym praniem staje się coraz miękka.",
    products: [
      {
        id: "pieluszka-1",
        title: "Zestaw 3 pieluszek kratka różowa",
        price: "49 zł",
        image: "/images/product-pieluszka-1.jpg",
        description: "3 sztuki,100% bawełna, wzór w kratkę",
      },
      {
        id: "pieluszka-2",
        title: "Zestaw 3 pieluszek kratka niebieska",
        price: "49 zł",
        image: "/images/product-pieluszka-2.jpg",
        description: "3 sztuki, 100% bawełna, wzór w kratkę",
      },
    ],
  },
  {
    slug: "posciele",
    title: "Pościele",
    description: "Delikatne pościele i otulacze dla maluszków",
    longDescription: "Nasze pościele wykonane są z najmiększejszej bawełny, zapewniając maluszkowi bezpieczny i komfortowy sen. Każdy zestaw jest starannie dobrany pod kątem delikatności tkaniny i ponadczasowej estetyki.",
    products: [
      {
        id: "posciel-1",
        title: "Pościel muślinowa ecru",
        price: "149 zł",
        image: "/images/product-posciel-1.jpg",
        description: "Poszewka + poszwa, 100% muślin",
      },
      {
        id: "posciel-2",
        title: "Pościel bawełniana beżowa",
        price: "149 zł",
        image: "/images/product-posciel-2.jpg",
        description: "Miękka bawełna, zestaw 2-częściowy",
      },
      {
        id: "posciel-3",
        title: "Zestaw pościel + otulacz",
        price: "149 zł",
        image: "/images/product-posciel-3.jpg",
        description: "Kompletny zestaw do łóżeczka",
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
      {
        id: "spodenki-4",
        title: "Spodenki białe ze stópkami",
        price: "69 zł",
        image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Spodenki-k41wMq21yNVYBmXWLwuyRtQk69Xjiv.jpeg",
        description: "Bawełna organiczna, ażurowy wzór, kokardka",
        sizes: ["56", "62", "74", "80", "86"],
      },
    ],
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map((cat) => cat.slug);
}
