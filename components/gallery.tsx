import Image from "next/image";

const projects = [
  {
    title: "Harmonia",
    category: "Branding",
    image: "/images/project-1.jpg",
  },
  {
    title: "Naturel",
    category: "Wnętrza",
    image: "/images/project-2.jpg",
  },
  {
    title: "Serene",
    category: "Web Design",
    image: "/images/project-3.jpg",
  },
];

export function Gallery() {
  return (
    <section id="realizacje" className="bg-secondary/50 px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Realizacje
          </p>
          <h2 className="font-serif text-4xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
            Wybrane projekty
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/10" />
              </div>
              <div className="mt-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {project.category}
                </p>
                <h3 className="mt-1 font-serif text-xl text-foreground">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
