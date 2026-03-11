import Image from "next/image";

const products = [
  {
    title: "Body z długim rękawem",
    price: "89 zł",
    image: "/images/product-1.jpg",
  },
  {
    title: "Spodnie z organicznej bawełny",
    price: "119 zł",
    image: "/images/product-2.jpg",
  },
  {
    title: "Kocyk muślinowy",
    price: "159 zł",
    image: "/images/product-3.jpg",
  },
  {
    title: "Komplet niemowlęcy",
    price: "199 zł",
    image: "/images/product-4.jpg",
  },
];

export function Products() {
  return (
    <section id="produkty" className="bg-secondary/50 px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Bestsellery
            </p>
            <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
              Ulubione produkty
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Nasze najpopularniejsze produkty, które pokochały tysiące rodziców w całej Polsce.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />
              </div>
              <div className="mt-4">
                <h3 className="text-foreground">{product.title}</h3>
                <p className="mt-1 font-serif text-lg text-muted-foreground">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Aby zamówić lub dowiedzieć się więcej o dostępności, skontaktuj się z nami.
          </p>
        </div>
      </div>
    </section>
  );
}
