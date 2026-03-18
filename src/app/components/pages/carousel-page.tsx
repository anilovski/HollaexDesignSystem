import { ComponentPage, Section, ExampleRow } from "../docs/component-page";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../ui/carousel";

function SlideCard({ label, color }: { label: string; color: string }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg"
      style={{
        height: 180,
        backgroundColor: color,
        border: "1px solid var(--border-subtle)",
        fontSize: "var(--text-h5)",
        fontWeight: "var(--font-weight-bold)",
        fontFamily: "var(--font-family-supreme)",
        color: "var(--color-text-secondary)",
      }}
    >
      {label}
    </div>
  );
}

const slides = [
  { label: "BTC", color: "var(--secondary-subtle)" },
  { label: "ETH", color: "var(--brand-subtle)" },
  { label: "XRP", color: "var(--secondary-subtle)" },
  { label: "SOL", color: "var(--brand-subtle)" },
  { label: "DOGE", color: "var(--secondary-subtle)" },
];

export function CarouselPage() {
  return (
    <ComponentPage name="Carousel" description="A slideshow component for cycling through content panels. Built on Embla Carousel with accessible previous/next controls and flexible sizing.">
      <Section title="Basic" description="A simple horizontal carousel with navigation buttons.">
        <ExampleRow label="Default">
          <div className="w-full" style={{ maxWidth: 480 }}>
            <Carousel className="w-full">
              <CarouselContent>
                {slides.map((s, i) => (
                  <CarouselItem key={i}>
                    <SlideCard label={s.label} color={s.color} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </ExampleRow>
      </Section>

      <Section title="Multiple Per View" description="Show multiple slides at once using basis classes.">
        <ExampleRow label="3 per row">
          <div className="w-full" style={{ maxWidth: 600 }}>
            <Carousel className="w-full">
              <CarouselContent className="-ml-2">
                {slides.map((s, i) => (
                  <CarouselItem key={i} className="pl-2 basis-1/3">
                    <SlideCard label={s.label} color={s.color} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </ExampleRow>
      </Section>

      <Section title="Vertical" description="A vertically-oriented carousel.">
        <ExampleRow label="Vertical">
          <div style={{ maxHeight: 400 }}>
            <Carousel orientation="vertical" className="w-full" style={{ maxWidth: 300 }}>
              <CarouselContent className="-mt-2" style={{ height: 360 }}>
                {slides.map((s, i) => (
                  <CarouselItem key={i} className="pt-2 basis-1/3">
                    <SlideCard label={s.label} color={s.color} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </ExampleRow>
      </Section>
    </ComponentPage>
  );
}
