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
    slug: "spiochy",
    title: "Śpiochy",
    description: "Miękkie i wygodne śpiochy z naturalnej bawełny",
    longDescription: "Nasze śpiochy wykonane są z najwyższej jakości naturalnej bawełny, która jest delikatna dla wrażliwej skóry maluszka. Każda para jest starannie uszyta, aby zapewnić maksymalny komfort podczas snu i zabawy.",
    products: [
      {
        id: "spiochy-1",
        title: "Śpiochy ecru z muślinu",
        price: "89 zł",
        image: "/images/product-spiochy-1.jpg",
        description: "Delikatny muślin, oddychający materiał",
        sizes: ["56", "62", "68", "74"],
      },
      {
        id: "spiochy-2",
        title: "Śpiochy beżowe z bawełny",
        price: "79 zł",
        image: "/images/product-spiochy-2.jpg",
        description: "100% naturalna bawełna",
        sizes: ["56", "62", "68", "74", "80"],
      },
      {
        id: "spiochy-3",
        title: "Śpiochy kremowe z gumką",
        price: "85 zł",
        image: "/images/product-spiochy-3.jpg",
        description: "Wygodna gumka w pasie",
        sizes: ["62", "68", "74"],
      },
    ],
  },
  {
    slug: "pajace",
    title: "Pajace",
    description: "Jednoczęściowe pajace idealne na co dzień",
    longDescription: "Praktyczne pajace jednoczęściowe, które ułatwiają ubieranie maluszka. Wykonane z naturalnych tkanin, zapewniają swobodę ruchów i komfort przez cały dzień.",
    products: [
      {
        id: "pajac-1",
        title: "Pajac z długim rękawem ecru",
        price: "109 zł",
        image: "/images/product-pajac-1.jpg",
        description: "Zapinany na napy",
        sizes: ["56", "62", "68", "74"],
      },
      {
        id: "pajac-2",
        title: "Pajac muślinowy beżowy",
        price: "119 zł",
        image: "/images/product-pajac-2.jpg",
        description: "Lekki i przewiewny",
        sizes: ["56", "62", "68"],
      },
    ],
  },
  {
    slug: "body-dlugi-rekaw",
    title: "Body długi rękaw",
    description: "Ciepłe body na chłodniejsze dni",
    longDescription: "Body z długim rękawem to podstawa garderoby każdego maluszka. Nasze body są wykonane z miękkiej, niebarwionej bawełny, która chroni delikatną skórę.",
    products: [
      {
        id: "body-dl-1",
        title: "Body długi rękaw ecru",
        price: "69 zł",
        image: "/images/product-body-dl-1.jpg",
        description: "Kopertowe zapięcie",
        sizes: ["56", "62", "68", "74", "80"],
      },
      {
        id: "body-dl-2",
        title: "Body długi rękaw beż",
        price: "69 zł",
        image: "/images/product-body-dl-2.jpg",
        description: "Naturalna bawełna",
        sizes: ["56", "62", "68", "74"],
      },
      {
        id: "body-dl-3",
        title: "Body długi rękaw kremowe",
        price: "75 zł",
        image: "/images/product-body-dl-3.jpg",
        description: "Z delikatnym haftem",
        sizes: ["62", "68", "74", "80"],
      },
    ],
  },
  {
    slug: "body-krotki-rekaw",
    title: "Body krótki rękaw",
    description: "Lekkie body na cieplejsze dni",
    longDescription: "Idealne na lato i cieplejsze dni. Nasze body z krótkim rękawem zapewniają przewiewność i komfort, chroniąc jednocześnie delikatną skórę maluszka.",
    products: [
      {
        id: "body-kr-1",
        title: "Body krótki rękaw ecru",
        price: "59 zł",
        image: "/images/product-body-kr-1.jpg",
        description: "Lekkie i przewiewne",
        sizes: ["56", "62", "68", "74", "80"],
      },
      {
        id: "body-kr-2",
        title: "Body krótki rękaw beżowe",
        price: "59 zł",
        image: "/images/product-body-kr-2.jpg",
        description: "Naturalna bawełna",
        sizes: ["56", "62", "68", "74"],
      },
    ],
  },
  {
    slug: "komplety-do-szpitala",
    title: "Komplety do szpitala",
    description: "Wyprawki na pierwsze dni życia",
    longDescription: "Specjalnie przygotowane zestawy na pierwsze dni życia Twojego maluszka. Każdy komplet zawiera starannie dobrane ubranka z naturalnych, bezpiecznych tkanin.",
    products: [
      {
        id: "szpital-1",
        title: "Wyprawka podstawowa",
        price: "249 zł",
        image: "/images/product-szpital-1.jpg",
        description: "Body, śpiochy, czapeczka, rękawiczki",
        sizes: ["56"],
      },
      {
        id: "szpital-2",
        title: "Wyprawka premium",
        price: "399 zł",
        image: "/images/product-szpital-2.jpg",
        description: "Pełny zestaw na pierwsze dni",
        sizes: ["56"],
      },
      {
        id: "szpital-3",
        title: "Wyprawka deluxe",
        price: "549 zł",
        image: "/images/product-szpital-3.jpg",
        description: "Rozszerzony zestaw z kocykiem",
        sizes: ["56"],
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
        price: "39 zł",
        image: "/images/product-pieluszka-1.jpg",
        description: "70x70 cm, 100% bawełna",
      },
      {
        id: "pieluszka-2",
        title: "Zestaw 3 pieluszek",
        price: "99 zł",
        image: "/images/product-pieluszka-2.jpg",
        description: "3 sztuki w naturalnych kolorach",
      },
      {
        id: "pieluszka-3",
        title: "Duża pieluszka otulacz",
        price: "69 zł",
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
        price: "129 zł",
        image: "/images/product-posciel-2.jpg",
        description: "Miękka bawełna, zestaw 2-częściowy",
      },
      {
        id: "posciel-3",
        title: "Zestaw pościel + otulacz",
        price: "199 zł",
        image: "/images/product-posciel-3.jpg",
        description: "Kompletny zestaw do łóżeczka",
      },
    ],
  },
  {
    slug: "spodenki",
    title: "Spodenki",
    description: "Wygodne spodenki dla maluszków",
    longDescription: "Wygodne spodenki idealne na cieplejsze dni. Wykonane z naturalnych tkanin, zapewniają swobodę ruchów podczas zabawy.",
    products: [
      {
        id: "spodenki-1",
        title: "Spodenki muślinowe ecru",
        price: "59 zł",
        image: "/images/product-spodenki-1.jpg",
        description: "Lekkie i przewiewne",
        sizes: ["62", "68", "74", "80"],
      },
      {
        id: "spodenki-2",
        title: "Spodenki z gumką beżowe",
        price: "55 zł",
        image: "/images/product-spodenki-2.jpg",
        description: "Wygodna gumka w pasie",
        sizes: ["68", "74", "80", "86"],
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
