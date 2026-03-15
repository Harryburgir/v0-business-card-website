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
        title: "Body krótki rękaw ecru",
        price: "69 zł",
        image: "/images/product-body-kr-1.jpg",
        description: "Kopertowe zapięcie, motywy western",
        sizes: ["56", "62", "74", "86"],
      },
      {
        id: "body-kr-2",
        title: "Body krótki rękaw różowe",
        price: "69 zł",
        image: "/images/product-body-kr-2.jpg",
        description: "Kopertowe zapięcie, motywy western",
        sizes: ["56", "62", "74", "86"],
      },
      {
        id: "body-dl-1",
        title: "Body długi rękaw kratka niebieska",
        price: "69 zł",
        image: "/images/product-body-dl-1.jpg",
        description: "Kopertowe zapięcie, wzór w kratkę",
        sizes: ["56", "62", "74", "86"],
      },
      {
        id: "body-dl-2",
        title: "Body długi rękaw różowe",
        price: "69 zł",
        image: "/images/product-body-dl-2.jpg",
        description: "Kopertowe zapięcie, motywy western",
        sizes: ["56", "62", "74", "86"],
      },
      {
        id: "body-dl-3",
        title: "Body długi rękaw kratka różowa",
        price: "69 zł",
        image: "/images/product-body-dl-3.jpg",
        description: "Kopertowe zapięcie, wzór w kratkę",
        sizes: ["56", "62", "74", "86"],
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
        title: "Śpiochy bawełna organiczna wzór western ecru",
        price: "109 zł",
        image: "/images/product-spiochy-1.jpg",
        description: "Bawełna organiczna, kołnierzyk peter pan, stópki",
        sizes: ["56", "62", "74", "86"],
      },
      {
        id: "spiochy-2",
        title: "Śpiochy bawełna organiczna niebieskie",
        price: "109 zł",
        image: "/images/product-spiochy-2.jpg",
        description: "Bawełna organiczna, biały kołnierzyk peter pan, stópki",
        sizes: ["56", "62", "74", "86"],
      },
      {
        id: "spiochy-3",
        title: "Śpiochy bawełna organiczna wzór jeździecki ecru",
        price: "109 zł",
        image: "/images/product-spiochy-3.jpg",
        description: "Bawełna organiczna, kołnierzyk peter pan, stópki",
        sizes: ["56", "62", "74", "86"],
      },
      {
        id: "spiochy-4",
        title: "Śpiochy bawełna organiczna różowe",
        price: "109 zł",
        image: "/images/product-spiochy-4.jpg",
        description: "Bawełna organiczna, kołnierzyk z koronką, stópki",
        sizes: ["56", "62", "74", "86"],
      },
    ],
  },
  {
    slug: "pieluszki",
    title: "Pieluszki",
    description: "Delikatne pieluszki muślinowe",
    longDescription: "Wielofunkcyjne pieluszki muślinowe, idealne do otulania, jako podkładka czy ściereczka. Wykonane z najdelikatniejszego muślinu, który z każdym praniem staje się coraz miększy.",
    products: [
      {
        id: "pieluszka-1",
        title: "Pieluszka muślinowa ecru",
        price: "49 zł",
        image: "/images/product-pieluszka-1.jpg",
        description: "70x70 cm, 100% bawełna",
      },
      {
        id: "pieluszka-2",
        title: "Zestaw 3 pieluszek",
        price: "49 zł",
        image: "/images/product-pieluszka-2.jpg",
        description: "3 sztuki w naturalnych kolorach",
      },
      {
        id: "pieluszka-3",
        title: "Duża pieluszka otulacz",
        price: "49 zł",
        image: "/images/product-pieluszka-3.jpg",
        description: "120x120 cm",
      },
    ],
  },
  {
    slug: "posciele",
    title: "Pościele",
    description: "Delikatne pościele i otulacze dla maluszków",
    longDescription: "Nasze pościele wykonane są z najmiększego muślinu i bawełny, zapewniając maluszkowi bezpieczny i komfortowy sen. Każdy zestaw jest starannie dobrany pod kątem delikatności tkaniny i ponadczasowej estetyki.",
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
    slug: "leginsy",
    title: "Leginsy",
    description: "Wygodne leginsy dla maluszków",
    longDescription: "Miękkie i elastyczne leginsy, idealne do noszenia co dzień. Wykonane z naturalnych tkanin, zapewniają swobodę ruchów podczas zabawy i snu.",
    products: [
      {
        id: "leginsy-1",
        title: "Leginsy muślinowe ecru",
        price: "59 zł",
        image: "/images/product-leginsy-1.jpg",
        description: "Lekkie i przewiewne",
        sizes: ["56", "62", "74", "86"],
      },
      {
        id: "leginsy-2",
        title: "Leginsy bawełniane beżowe",
        price: "59 zł",
        image: "/images/product-leginsy-2.jpg",
        description: "Naturalna bawełna, wygodna gumka",
        sizes: ["56", "62", "74", "86"],
      },
      {
        id: "leginsy-3",
        title: "Leginsy kremowe",
        price: "59 zł",
        image: "/images/product-leginsy-3.jpg",
        description: "Miękka bawełna",
        sizes: ["56", "62", "74", "86"],
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
