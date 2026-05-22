import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import { ArrowUpRight, Phone, Check, Star, ChevronDown, Mail, MapPin, Sparkles } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LocalWeb.pl — Strony internetowe dla lokalnych firm" },
      { name: "description", content: "Projektuję strony dla kwiaciarni, mechaników, hydraulików i lokalnych firm w całej Polsce. Płacisz tylko jeśli strona Ci się spodoba." },
      { property: "og:title", content: "LocalWeb.pl — Strony dla lokalnych firm" },
      { property: "og:description", content: "Pokazuję gotową stronę przed zakupem. Bez zaliczek, bez ryzyka." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap" },
    ],
  }),
  component: Index,
});

const nav = [
  { href: "#projekty", label: "Projekty" },
  { href: "#proces", label: "Jak pracuję" },
  { href: "#o-mnie", label: "O mnie" },
  { href: "#opinie", label: "Opinie" },
];

const projects = [
  { tag: "Handel", city: "Warszawa", year: "2024", name: "Kwiaciarnia „Różany Ogród\"", desc: "Galeria bukietów, formularz zamówień, mapa. Wzrost zapytań o 180% w 3 miesiące.", chips: ["Galeria", "Zamówienia"], url: "#" },
  { tag: "Usługi", city: "Kraków", year: "2024", name: "Auto-Serwis Nowak", desc: "Lista usług, cennik, zapis na wizytę. Pozycja #1 w Google Maps na „mechanik Kraków\".", chips: ["Cennik", "Zapis online", "SEO"], url: "#" },
  { tag: "Usługi", city: "Wrocław", year: "2023", name: "Hydraulik – P. Malinowski", desc: "Numer alarmowy na górze, zakres usług, opinie Google. Wdrożenie w 5 dni.", chips: ["Alarm 24h", "Opinie"], url: "#" },
  { tag: "Gastronomia", city: "Gdańsk", year: "2024", name: "Piekarnia „Złoty Kłos\"", desc: "Menu sezonowe, galeria wypieków, zamówienie tortu przez stronę.", chips: ["Menu", "Galeria"], url: "#" },
  { tag: "Zdrowie", city: "Poznań", year: "2023", name: "Gabinet dr Wiśniewska", desc: "Profile lekarzy, cennik zabiegów, formularz rejestracji. Integracja z Docplanner.", chips: ["Rejestracja", "Zespół"], url: "#" },
  { tag: "Gastronomia", city: "Łódź", year: "2024", name: "Restauracja „Pod Lipą\"", desc: "Menu PDF, rezerwacja stolików, integracja z Glovo. Wersja w 3 językach.", chips: ["Rezerwacje", "Dostawa"], url: "#" },
  { tag: "Usługi", city: "Warszawa", year: "2024", name: "Salon Piękności „Aura\"", desc: "Galeria realizacji, cennik zabiegów, rezerwacja online przez Booksy.", chips: ["Booksy", "Galeria"], url: "#" },
  { tag: "Usługi", city: "Katowice", year: "2024", name: "Elektryk Kamil – Instalacje", desc: "Zakres usług, zdjęcia realizacji, kontakt alarmowy. Widoczność w Google od 1. tygodnia.", chips: ["Zakres", "Kontakt 24h"], url: "#" },
];

const filters = ["Wszystkie", "Usługi", "Handel", "Gastronomia", "Zdrowie"] as const;

const steps = [
  { n: "01", t: "Kontakt", d: "Krótka rozmowa o Twojej firmie — bez zobowiązań i bez opłat." },
  { n: "02", t: "Tworzę stronę", d: "Projektuję gotową stronę dopasowaną do Twojej branży, zanim cokolwiek zapłacisz." },
  { n: "03", t: "Oglądamy razem", d: "Spotykamy się na Google Meet — pokazuję Ci stronę i omawiam każdy detal." },
  { n: "04", t: "Decydujesz", d: "Podoba się — uruchamiamy. Nie podoba się — rozchodzimy się bez żadnych kosztów." },
];

const trust = [
  { t: "Zero ryzyka dla Ciebie", d: "Nie biorę zaliczek. Płacisz dopiero po tym, jak zobaczysz gotową stronę i ją zaakceptujesz." },
  { t: "Znam Twoją branżę", d: "Strony dla mechaników, hydraulików, kwiaciarni, restauracji, gabinetów i wielu innych. Wiem co działa." },
  { t: "Mobilna i szybka", d: "Ponad 70% klientów szuka usług na telefonie. Każda strona zoptymalizowana pod mobile i szybkość." },
  { t: "Wsparcie po wdrożeniu", d: "Nie znikam po uruchomieniu. Pomagam z poprawkami, aktualizacjami i pytaniami." },
];

const reviews = [
  { i: "MK", n: "Maria Kowalczyk", r: "Kwiaciarnia „Różany Ogród\", Warszawa", q: "Marek zadzwonił i powiedział że zrobił stronę dla mojej kwiaciarni. Byłam sceptyczna, ale na Google Meet zobaczyłam gotową stronę i od razu kupiłam. Teraz mam 3x więcej zamówień." },
  { i: "PN", n: "Piotr Nowak", r: "Auto-Serwis Nowak, Kraków", q: "Pokazał mi gotową stronę dla mojego warsztatu. Po 2 miesiącach jestem #1 w Google Maps na „mechanik Kraków\". Nie zapłaciłem złotówki zanim zobaczyłem efekt." },
  { i: "TM", n: "Tomasz Malinowski", r: "Hydraulik, Wrocław", q: "Nie miałem strony i nie wiedziałem że mi potrzeba. Marek pokazał jak będzie wyglądać zanim zapłaciłem. W tydzień miałem gotową stronę i nowych klientów z Google." },
  { i: "AW", n: "Anna Wiśniewska", r: "Gabinet stomatologiczny, Poznań", q: "Strona wygląda lepiej niż u konkurencji. Pacjenci często pytają kto ją robił. Mogę sama edytować treści, Marek wszystko wytłumaczył. Termin dotrzymany co do dnia." },
];

const faqs = [
  { q: "Ile kosztuje strona?", a: "Cena zależy od zakresu projektu — zadzwoń, omówimy szczegóły i dopasuję ofertę do Twojej firmy i budżetu." },
  { q: "Co jeśli strona mi się nie spodoba?", a: "Nic nie płacisz — to moje ryzyko. Kupujesz tylko jeśli strona Ci się podoba. Żadnych zaliczek, żadnych umów na start." },
  { q: "Jak szybko będzie gotowa?", a: "Zazwyczaj 5–10 dni roboczych od akceptacji projektu do uruchomienia strony w internecie." },
  { q: "Czy mogę sam edytować treści?", a: "Tak — po wdrożeniu uczę Cię jak samodzielnie aktualizować teksty, zdjęcia i godziny otwarcia." },
];

const INDUSTRIES = [
  "Kwiaciarnie", "Mechanicy", "Hydraulicy", "Piekarnie", "Restauracje",
  "Gabinety dentystyczne", "Salony piękności", "Elektrycy", "Fryzjerzy",
  "Warsztaty", "Fizjoterapia", "Sklepy lokalne", "Stolarze", "Fotografowie",
];

function spotlightMove(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  el.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

function Index() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("Wszystkie");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const visible = projects.filter((p) => filter === "Wszystkie" || p.tag === filter);
  const typed = useTypewriter("Twoje miasto · Polska", 50, 0);
  const navHidden = useHideOnScroll();
  const scrollY = useScrollY();
  const progress = useScrollProgress();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Scroll progress */}
      <div className="scroll-progress" style={{ width: "100%", transform: `scaleX(${progress})` }} aria-hidden />
      {/* NAV */}
      <header className={`sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md transition-transform duration-500 ${navHidden ? "nav-hidden" : ""}`}>


        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2 font-serif text-xl">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            LocalWeb<span className="text-muted-foreground">.pl</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm md:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-muted-foreground transition-colors hover:text-foreground">
                {n.label}
              </a>
            ))}
          </nav>
          <a href="#kontakt" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
            Kontakt <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(ellipse_at_70%_40%,black_0%,transparent_70%)]"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center right",
            filter: "blur(8px) saturate(0.8)",
            transform: `translate3d(0, ${scrollY * 0.25}px, 0) scale(1.06)`,
            willChange: "transform",
          }}
        />
        {/* Floating accent blob */}
        <div
          aria-hidden
          className="blob pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, var(--accent-warm), transparent 60%)",
            transform: `translate3d(0, ${scrollY * -0.15}px, 0)`,
          }}
        />
        <div
          aria-hidden
          className="blob pointer-events-none absolute -left-24 top-72 h-[320px] w-[320px] rounded-full opacity-30"
          style={{
            background: "radial-gradient(circle, oklch(0.85 0.08 220), transparent 60%)",
            animationDelay: "-6s",
            transform: `translate3d(0, ${scrollY * -0.08}px, 0)`,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 md:pt-28">
          <div className="flex h-5 items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="caret">{typed}</span>
          </div>
          <h1
            className="mt-6 max-w-4xl font-serif text-5xl leading-[1.05] text-balance md:text-7xl lg:text-8xl"
            style={{ transform: `translate3d(0, ${scrollY * -0.06}px, 0)` }}
          >
            <span className="reveal-1 inline-block">Strony internetowe</span><br />
            <span className="reveal-2 inline-block italic text-accent accent-underline">dla lokalnych firm.</span>
          </h1>
          <p className="reveal-3 mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Projektuję strony dla kwiaciarni, mechaników, hydraulików i dziesiątek innych branż. Pokazuję gotową stronę — płacisz tylko jeśli ci się spodoba.
          </p>

          <div className="reveal-4 mt-10 flex flex-wrap items-center gap-3">
            <a href="#kontakt" className="btn-press shimmer group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90">
              Skontaktuj się <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a href="#projekty" className="btn-press inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary">
              Zobacz projekty
            </a>
            <a href="tel:+48123456789" className="btn-press ml-1 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <Phone className="h-4 w-4" /> +48 123 456 789
            </a>
          </div>

          {/* stats + bullets card */}
          <div className="mt-16 grid gap-6 lg:grid-cols-5">
            <Reveal as="div" className="lg:col-span-3 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-sm spotlight" onMouseMove={spotlightMove}>
              {[
                { n: 47, suffix: "", l: "stron wykonanych" },
                { n: 23, suffix: "", l: "branż" },
                { n: 4.9, suffix: "★", l: "ocena klientów", decimals: 1 },
              ].map((s, i) => (
                <div key={s.l} className={`relative z-10 sr-d${i + 1}`}>
                  <div className="font-serif text-4xl md:text-5xl num-shine">
                    <CountUp to={s.n} decimals={s.decimals ?? 0} />{s.suffix}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </Reveal>
            <Reveal as="ul" className="lg:col-span-2 grid gap-3 rounded-2xl border border-border bg-secondary/60 p-8 text-sm backdrop-blur-sm sr-d2">
              {[
                "Oglądasz gotową stronę przed zakupem",
                "Nie podoba się? Nie płacisz nic",
                "Działa na telefonie i komputerze",
                "Widoczność w Google Maps",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Industries marquee */}
        <div className="marquee-mask relative border-y border-border/60 bg-card/40 py-5 backdrop-blur-sm">
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap text-sm uppercase tracking-[0.18em] text-muted-foreground">
            {[...INDUSTRIES, ...INDUSTRIES].map((label, i) => (
              <span key={i} className="flex items-center gap-3">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* PROCES */}
      <section id="proces" className="border-t border-border bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionLabel>Proces</SectionLabel>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl md:text-5xl">Jak to działa</h2>
          <p className="mt-4 max-w-xl text-muted-foreground">Od pierwszego kontaktu do gotowej strony — bez ryzyka z Twojej strony.</p>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.n} className={`sr-d${i + 1} bg-card p-8 spotlight transition-colors hover:bg-card`} onMouseMove={spotlightMove}>
                <div className="relative z-10 font-serif text-sm text-accent">{s.n}</div>
                <h3 className="relative z-10 mt-6 font-serif text-2xl">{s.t}</h3>
                <p className="relative z-10 mt-3 text-sm text-muted-foreground">{s.d}</p>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* PROJEKTY */}
      <section id="projekty" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>Realizacje</SectionLabel>
              <h2 className="mt-3 font-serif text-4xl md:text-5xl">Wybrane projekty</h2>
              <p className="mt-4 max-w-xl text-muted-foreground">Wybierz branżę, żeby zobaczyć podobne realizacje.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 active:scale-95 ${
                    filter === f
                      ? "border-primary bg-primary text-primary-foreground shadow-sm"
                      : "border-border bg-card text-muted-foreground hover:-translate-y-0.5 hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}

            </div>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((p, idx) => (
              <Reveal
                key={p.name}
                as="div"
                className={`sr-d${(idx % 3) + 1}`}
              >
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={spotlightMove}
                  className="tilt spotlight group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="grain relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-secondary to-sand">
                    <div className="absolute inset-6 rounded-lg border border-border bg-card shadow-sm transition-transform duration-500 group-hover:scale-[1.04] group-hover:-rotate-1">
                      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
                        <span className="h-2 w-2 rounded-full bg-border" />
                        <span className="h-2 w-2 rounded-full bg-border" />
                        <span className="h-2 w-2 rounded-full bg-border" />
                      </div>
                      <div className="space-y-2 p-4">
                        <div className="h-2 w-1/2 rounded bg-secondary" />
                        <div className="h-2 w-3/4 rounded bg-secondary" />
                        <div className="mt-3 grid grid-cols-3 gap-1.5">
                          <div className="aspect-square rounded bg-secondary" />
                          <div className="aspect-square rounded bg-secondary" />
                          <div className="aspect-square rounded bg-accent/30 transition-colors group-hover:bg-accent/60" />
                        </div>
                      </div>
                    </div>
                    <span className="absolute left-4 top-4 rounded-full bg-card/90 px-2.5 py-1 text-xs backdrop-blur">{p.tag}</span>
                    <span className="absolute right-4 top-4 inline-flex h-8 w-8 translate-x-1 items-center justify-center rounded-full bg-card/90 text-foreground opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="relative z-10 flex flex-1 flex-col p-6">
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{p.city} · {p.year}</div>
                    <h3 className="mt-2 font-serif text-2xl transition-colors group-hover:text-accent">{p.name}</h3>
                    <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.desc}</p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {p.chips.map((c) => (
                        <span key={c} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors group-hover:border-accent/40">{c}</span>
                      ))}
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* O MNIE */}
      <section id="o-mnie" className="border-t border-border bg-secondary/40 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel>O mnie</SectionLabel>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-balance">Kim jestem i dlaczego warto mi zaufać.</h2>
            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary font-serif text-xl text-primary-foreground">M</div>
              <div>
                <div className="font-medium">Marek</div>
                <div className="text-sm text-muted-foreground">Założyciel · LocalWeb.pl</div>
              </div>
            </div>
          </div>
          <div className="space-y-6 text-[17px] leading-relaxed text-muted-foreground lg:col-span-7">
            <p>Nazywam się Marek i od ponad <span className="text-foreground">4 lat</span> pomagam lokalnym firmom zaistnieć w internecie. Zaczynałem od stron dla znajomych — dziś mam na koncie ponad <span className="text-foreground">47 projektów w 23 branżach</span>.</p>
            <p>Specjalizuję się wyłącznie w firmach lokalnych — mechanikach, kwiaciarniach, hydraulikach, piekarniach, gabinetach. Wiem, czego klient szukający takiej firmy w Google oczekuje i jak zaprojektować stronę, która go przekonuje do kontaktu.</p>
            <p>Mój model jest prosty i uczciwy: najpierw projektuję stronę, potem ją pokazuję. <span className="text-foreground">Nie biorę zaliczek</span>. Jeśli się spodoba — kupujesz. Jeśli nie — rozchodzimy się bez złotówki kosztu.</p>

            <div className="grid gap-4 pt-6 sm:grid-cols-2">
              {trust.map((b, i) => (
                <Reveal key={b.t} className={`sr-d${(i % 4) + 1} rounded-xl border border-border bg-card p-5 hover-lift spotlight`} onMouseMove={spotlightMove}>
                  <div className="relative z-10 flex items-center gap-2 font-medium text-foreground">
                    <Check className="h-4 w-4 text-accent" /> {b.t}
                  </div>
                  <p className="relative z-10 mt-2 text-sm">{b.d}</p>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* OPINIE */}
      <section id="opinie" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <SectionLabel>Opinie</SectionLabel>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl md:text-5xl">Co mówią właściciele firm.</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {reviews.map((r, i) => (
              <Reveal as="figure" key={r.n} className={`sr-d${(i % 4) + 1} flex flex-col rounded-2xl border border-border bg-card p-8 hover-lift spotlight`} onMouseMove={spotlightMove}>
                <div className="relative z-10 flex items-center gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-4 w-4 fill-current" style={{ animation: `float-y 4s ease-in-out ${k * 0.15}s infinite` }} />
                  ))}
                </div>
                <blockquote className="relative z-10 mt-5 flex-1 font-serif text-xl leading-snug text-foreground">
                  „{r.q}"
                </blockquote>
                <figcaption className="relative z-10 mt-6 flex items-center gap-3 border-t border-border pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-sm font-medium">{r.i}</div>
                  <div>
                    <div className="text-sm font-medium">{r.n}</div>
                    <div className="text-xs text-muted-foreground">{r.r}</div>
                  </div>
                </figcaption>
              </Reveal>
            ))}
          </div>

        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel className="text-primary-foreground/60">Kontakt</SectionLabel>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-balance">
              Zadzwoń, napisz lub zostaw numer — <span className="italic text-accent">oddzwonię dziś.</span>
            </h2>
            <a href="tel:+48123456789" className="mt-10 flex items-center gap-4 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 transition-colors hover:bg-primary-foreground/10">
              <Phone className="h-6 w-6 text-accent" />
              <div>
                <div className="text-xs uppercase tracking-wider text-primary-foreground/60">Zadzwoń teraz</div>
                <div className="font-serif text-3xl">+48 123 456 789</div>
              </div>
            </a>
            <div className="mt-6 flex items-center gap-2 text-sm text-primary-foreground/60">
              <Mail className="h-4 w-4" /> kontakt@localweb.pl
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); alert("Dziękuję! Oddzwonię dziś."); }}
            className="lg:col-span-7 space-y-5 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Imię" name="name" placeholder="Jan Kowalski" />
              <Field label="Telefon" name="phone" type="tel" placeholder="+48 ..." />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-primary-foreground/60">Branża</label>
              <select className="w-full rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-3 text-primary-foreground outline-none transition-colors focus:border-accent">
                <option className="text-foreground">Usługi (mechanik, hydraulik, elektryk…)</option>
                <option className="text-foreground">Handel (sklep, kwiaciarnia…)</option>
                <option className="text-foreground">Gastronomia (restauracja, piekarnia…)</option>
                <option className="text-foreground">Zdrowie (dentysta, fizjoterapeuta…)</option>
                <option className="text-foreground">Inna branża</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-primary-foreground/60">Krótko o firmie (opcjonalnie)</label>
              <textarea rows={4} className="w-full rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-3 text-primary-foreground outline-none transition-colors focus:border-accent" placeholder="Czym się zajmujesz, w jakim mieście…" />
            </div>
            <button type="submit" className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-foreground hover:opacity-90">
              Wyślij — oddzwonię dziś <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* FAQ */}
        <div className="border-t border-primary-foreground/10">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <SectionLabel className="text-primary-foreground/60">FAQ</SectionLabel>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Najczęściej zadawane pytania</h2>
            <div className="mt-10 divide-y divide-primary-foreground/10 border-y border-primary-foreground/10">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <div key={f.q}>
                    <button
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-accent"
                    >
                      <span className="font-serif text-xl md:text-2xl">{f.q}</span>
                      <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-accent" : ""}`} />
                    </button>
                    <div className={`faq-content ${open ? "open" : ""}`}>
                      <div>
                        <p className="pb-6 pr-12 text-primary-foreground/70">{f.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-12 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="font-serif text-xl">LocalWeb<span className="text-muted-foreground">.pl</span></div>
            <p className="mt-1 text-sm text-muted-foreground">Strony internetowe dla lokalnych firm · Spotkania przez Google Meet · Cała Polska</p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <a href="tel:+48123456789" className="flex items-center gap-2 hover:text-foreground"><Phone className="h-4 w-4" /> +48 123 456 789</a>
            <span>© 2025 LocalWeb.pl</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground ${className}`}>
      <span className="h-px w-8 bg-current opacity-40" />
      {children}
    </div>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs uppercase tracking-wider text-primary-foreground/60">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/30 outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}

function useTypewriter(text: string, speed = 60, startDelay = 0) {
  const [out, setOut] = useState("");
  const startedRef = useRef(false);
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    let i = 0;
    let id: ReturnType<typeof setInterval> | undefined;
    const run = () => {
      setOut(text.slice(0, 1));
      i = 1;
      id = setInterval(() => {
        i++;
        setOut(text.slice(0, i));
        if (i >= text.length && id) clearInterval(id);
      }, speed);
    };
    let start: ReturnType<typeof setTimeout> | undefined;
    if (startDelay > 0) start = setTimeout(run, startDelay);
    else run();
    return () => { if (start) clearTimeout(start); if (id) clearInterval(id); };
  }, [text, speed, startDelay]);
  return out;
}

function CountUp({ to, decimals = 0, duration = 1600 }: { to: number; decimals?: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const startedRef = useRef(false);
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setVal(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{val.toFixed(decimals)}</>;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setY(window.scrollY);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return y;
}

function useHideOnScroll(threshold = 140) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y < threshold) { setHidden(false); lastY.current = y; return; }
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0);
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return hidden;
}

type RevealProps = {
  as?: "div" | "ul" | "section" | "figure" | "li" | "h2" | "p";
  className?: string;
  children: ReactNode;
  onMouseMove?: (e: React.MouseEvent<HTMLElement>) => void;
};

function Reveal({ as = "div", className = "", children, onMouseMove }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);
  const setRef = useCallback((node: HTMLElement | null) => {
    ref.current = node;
    if (!node || shown) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(node);
  }, [shown]);
  const Tag = as as keyof React.JSX.IntrinsicElements;
  // @ts-expect-error dynamic tag accepts ref
  return <Tag ref={setRef} onMouseMove={onMouseMove} className={`sr ${shown ? "in" : ""} ${className}`}>{children}</Tag>;
}

