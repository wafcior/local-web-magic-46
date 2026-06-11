import { createFileRoute } from "@tanstack/react-router";
import { createElement, useState, useEffect, useRef, useCallback } from "react";
import type { ReactNode } from "react";
import {
  ArrowUpRight,
  Phone,
  Check,
  Star,
  ChevronDown,
  Mail,
  MapPin,
  Sparkles,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TwojaStrona — Strony internetowe dla małych i dużych biznesów" },
      {
        name: "description",
        content:
          "Projektujemy profesjonalne strony dla małych i dużych biznesów. Najpierw oglądasz gotowy projekt, a płacisz tylko gdy Ci się spodoba.",
      },
      { property: "og:title", content: "TwojaStrona — Strony dla Twojego biznesu" },
      {
        property: "og:description",
        content: "Pokazujemy gotową stronę przed zakupem. Bez zaliczek, bez ryzyka.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: Index,
});

// Brand helpers
const PHONE_DISPLAY = "+48 726 142 917";
const PHONE_HREF = "tel:+48726142917";
const EMAIL = "kontakt@twojastrona.czest.pl";

function BrandLogo({ size = 8 }: { size?: number }) {
  return (
    <span
      aria-hidden
      className="inline-block rounded-full bg-accent shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent-warm)_25%,transparent)]"
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
}

function BrandName({ className = "" }: { className?: string }) {
  return <span className={className}>TwojaStrona</span>;
}

function DomainFull({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      TwojaStrona<span className="opacity-50">.czest.pl</span>
    </span>
  );
}

const nav = [
  { href: "#projekty", label: "Projekty" },
  { href: "#proces", label: "Jak pracuję" },
  { href: "#o-mnie", label: "O mnie" },
  { href: "#opinie", label: "Opinie" },
];

const PROJECT_CHIPS = [
  "Tworzenie stron www",
  "Wizytówki Google",
  "Pisanie tekstów",
  "Wersje na telefon",
  "Szybki kontakt",
];

const projects = [
  {
    tag: "Handel",
    city: "Warszawa",
    year: "2024",
    name: 'Kwiaciarnia „Różany Ogród"',
    desc: "Galeria bukietów, formularz zamówień, mapa. Wzrost zapytań o 180% w 3 miesiące.",
    chips: PROJECT_CHIPS,
    url: "https://example.com/rozany-ogrod",
  },
  {
    tag: "Usługi",
    city: "Kraków",
    year: "2024",
    name: "Auto-Serwis Nowak",
    desc: 'Lista usług, cennik, zapis na wizytę. Pozycja #1 w Google Maps na „mechanik Kraków".',
    chips: PROJECT_CHIPS,
    url: "https://example.com/auto-serwis-nowak",
  },
  {
    tag: "Usługi",
    city: "Wrocław",
    year: "2023",
    name: "Hydraulik – P. Malinowski",
    desc: "Numer alarmowy na górze, zakres usług, opinie Google. Wdrożenie w 5 dni.",
    chips: PROJECT_CHIPS,
    url: "https://example.com/hydraulik-malinowski",
  },
  {
    tag: "Gastronomia",
    city: "Gdańsk",
    year: "2024",
    name: 'Piekarnia „Złoty Kłos"',
    desc: "Menu sezonowe, galeria wypieków, zamówienie tortu przez stronę.",
    chips: PROJECT_CHIPS,
    url: "https://example.com/zloty-klos",
  },
  {
    tag: "Zdrowie",
    city: "Poznań",
    year: "2023",
    name: "Gabinet dr Wiśniewska",
    desc: "Profile lekarzy, cennik zabiegów, formularz rejestracji. Integracja z Docplanner.",
    chips: PROJECT_CHIPS,
    url: "https://example.com/dr-wisniewska",
  },
  {
    tag: "Gastronomia",
    city: "Łódź",
    year: "2024",
    name: 'Restauracja „Pod Lipą"',
    desc: "Menu PDF, rezerwacja stolików, integracja z Glovo. Wersja w 3 językach.",
    chips: PROJECT_CHIPS,
    url: "https://example.com/pod-lipa",
  },
  {
    tag: "Usługi",
    city: "Warszawa",
    year: "2024",
    name: 'Salon Piękności „Aura"',
    desc: "Galeria realizacji, cennik zabiegów, rezerwacja online przez Booksy.",
    chips: PROJECT_CHIPS,
    url: "https://example.com/aura",
  },
  {
    tag: "Usługi",
    city: "Katowice",
    year: "2024",
    name: "Elektryk Kamil – Instalacje",
    desc: "Zakres usług, zdjęcia realizacji, kontakt alarmowy. Widoczność w Google od 1. tygodnia.",
    chips: PROJECT_CHIPS,
    url: "https://example.com/elektryk-kamil",
  },
];

const steps = [
  {
    n: "01",
    t: "Szybka rozmowa",
    d: "Rozmawiamy o tym, czym zajmuje się Twoja firma i czego dokładnie potrzebujesz. To krótkie spotkanie jest całkowicie darmowe i niezobowiązujące.",
  },
  {
    n: "02",
    t: "Projekt testowy",
    d: "Przygotowuję dla Ciebie pełną wersję demonstracyjną strony. Widzisz gotowy projekt przed dokonaniem opłaty.",
  },
  {
    n: "03",
    t: "Prezentacja strony",
    d: "Łączymy się na platformie Google Meet, gdzie wspólnie przeglądamy gotową witrynę i omawiamy zastosowane rozwiązania.",
  },
  {
    n: "04",
    t: "Zielone światło",
    d: "Jeśli projekt spełnia Twoje oczekiwania, rozliczamy się i wdrażamy stronę na Twoją domenę. W przeciwnym razie możesz zrezygnować bez żadnych kosztów.",
  },
];

const trust = [
  {
    t: "Zero ryzyka dla Ciebie",
    d: "Nie bierzemy zaliczek. Płacisz dopiero po tym, jak zobaczysz gotową stronę i ją zaakceptujesz.",
  },
  {
    t: "Znamy Twoją branżę",
    d: "Strony dla mechaników, hydraulików, kwiaciarni, restauracji, gabinetów i wielu innych. Wiemy co działa.",
  },
  {
    t: "Mobilna i szybka",
    d: "Ponad 70% klientów szuka usług na telefonie. Każda strona zoptymalizowana pod mobile i szybkość.",
  },
  {
    t: "Wsparcie po wdrożeniu",
    d: "Nie znikamy po uruchomieniu. Pomagamy z poprawkami, aktualizacjami i pytaniami.",
  },
];

const reviews = [
  {
    i: "MA",
    n: "Maria",
    r: 'Kwiaciarnia, Częstochowa',
    q: "Zadzwonili do mnie z informacją, że przygotowali projekt strony dla mojej kwiaciarni tutaj w Częstochowie. Na początku byłam sceptyczna, ale gdy na spotkaniu online zobaczyłam gotowy, działający szablon, od razu się zdecydowałam. Od tamtej pory mam trzy razy więcej zamówień na bukiety.",
  },
  {
    i: "PN",
    n: "Piotr Nowak",
    r: "Auto-Serwis Nowak, Kraków",
    q: 'Pokazali mi gotową stronę dla mojego warsztatu. Po 2 miesiącach jestem #1 w Google Maps na „mechanik Kraków". Nie zapłaciłem złotówki zanim zobaczyłem efekt.',
  },
  {
    i: "TM",
    n: "Tomasz Malinowski",
    r: "Hydraulik, Wrocław",
    q: "Nie miałem strony i nie wiedziałem, że jej potrzebuję. Pokazali jak będzie wyglądać zanim zapłaciłem. W tydzień miałem gotową stronę i nowych klientów z Google.",
  },
  {
    i: "AW",
    n: "Anna Wiśniewska",
    r: "Gabinet stomatologiczny, Poznań",
    q: "Strona wygląda lepiej niż u konkurencji. Pacjenci często pytają kto ją robił. Mogę sama edytować treści, wszystko zostało mi wytłumaczone. Termin dotrzymany co do dnia.",
  },
];

const CZESTOCHOWA_DISTRICTS = [
  "Śródmieście",
  "Tysiąclecie",
  "Północ",
  "Stradom",
  "Ostatni Grosz",
  "Raków",
  "Błeszno",
  "Gnaszyn-Kawodrza",
  "Mirów",
];

const faqs = [
  {
    q: "Ile kosztuje stworzenie strony?",
    a: "Cena zależy od stopnia rozbudowania witryny oraz funkcji, jakich potrzebujesz. Zadzwoń lub napisz, żeby omówić szczegóły, a stworzę dla Ciebie bezpłatną i niezobowiązującą wycenę.",
  },
  {
    q: "Co jeśli projekt mi się nie spodoba?",
    a: "Pracuję etapami i na bieżąco wprowadzam Twoje poprawki. Strona powstaje w stałym kontakcie z Tobą, więc masz pewność, że finalny efekt będzie dokładnie taki, jak chcesz.",
  },
  {
    q: "Jak szybko będzie gotowa?",
    a: "Zazwyczaj 5–10 dni roboczych od akceptacji projektu do uruchomienia strony w internecie.",
  },
  {
    q: "Co jeśli będę chciał coś zmienić na stronie?",
    a: "Oczywiście jest taka możliwość. Strona jest w pełni edytowalna, więc po jej uruchomieniu pomagam w sprawnym wprowadzaniu nowych treści, aktualizacji czy modyfikacji wizualnych.",
  },
];

const INDUSTRIES = [
  "Kwiaciarnie",
  "Mechanicy",
  "Hydraulicy",
  "Piekarnie",
  "Restauracje",
  "Gabinety dentystyczne",
  "Salony piękności",
  "Elektrycy",
  "Fryzjerzy",
  "Warsztaty",
  "Fizjoterapia",
  "Sklepy lokalne",
  "Stolarze",
  "Fotografowie",
];

function spotlightMove(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  el.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const typed = useTypewriter("Twoje miasto · Polska", 50, 0);
  const navHidden = useHideOnScroll();
  const scrollY = useScrollY();
  const progress = useScrollProgress();

  return (
    <div className="min-h-screen overflow-x-clip bg-background text-foreground">
      {/* Scroll progress */}
      <div
        className="scroll-progress"
        style={{ width: "100%", transform: `scaleX(${progress})` }}
        aria-hidden
      />
      {/* NAV */}
      <header
        className={`sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md transition-transform duration-500 ${navHidden ? "nav-hidden" : ""}`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <a href="#top" className="flex items-center gap-2 font-serif text-xl">
            <BrandLogo size={14} />
            <BrandName />
          </a>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#kontakt"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
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
          {/* location pill */}
          <div className="reveal-1 mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-sm">
            <MapPin className="h-3 w-3 text-accent" />
            Polska · Częstochowa
          </div>

          <div className="flex h-5 items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span className="caret">{typed}</span>
          </div>
          <h1
            className="mt-6 max-w-4xl font-serif text-5xl leading-[1.05] text-balance md:text-7xl lg:text-8xl"
            style={{ transform: `translate3d(0, ${scrollY * -0.06}px, 0)` }}
          >
            <span className="reveal-1 inline-block">Strony internetowe</span>
            <br />
            <span className="reveal-2 inline-block italic text-accent accent-underline">
              dla Twojego biznesu.
            </span>
          </h1>
          <p className="reveal-3 mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Projektuję profesjonalne strony dla małych i dużych biznesów. Działasz bez żadnego
            ryzyka: najpierw oglądasz gotowy projekt, a płacisz tylko wtedy, gdy Ci się spodoba.
          </p>


          <div className="reveal-4 mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#kontakt"
              className="btn-press shimmer group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90"
            >
              Skontaktuj się{" "}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#projekty"
              className="btn-press inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary"
            >
              Zobacz projekty
            </a>
            <a
              href="tel:+48123456789"
              className="btn-press ml-1 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <Phone className="h-4 w-4" /> +48 123 456 789
            </a>
          </div>

          {/* stats + bullets card */}
          <div className="mt-16 grid gap-6 lg:grid-cols-5">
            <Reveal
              as="div"
              className="lg:col-span-3 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-sm spotlight"
              onMouseMove={spotlightMove}
            >
              {[
                { n: 47, suffix: "", l: "stron wykonanych" },
                { n: 23, suffix: "", l: "branż" },
                { n: 4.9, suffix: "★", l: "ocena klientów", decimals: 1 },
              ].map((s, i) => (
                <div key={s.l} className={`relative z-10 sr-d${i + 1}`}>
                  <div className="font-serif text-4xl md:text-5xl num-shine">
                    <CountUp to={s.n} decimals={s.decimals ?? 0} />
                    {s.suffix}
                  </div>
                  <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </Reveal>
            <Reveal
              as="ul"
              className="lg:col-span-2 grid gap-3 rounded-2xl border border-border bg-secondary/60 p-8 text-sm backdrop-blur-sm sr-d2"
            >
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

          {/* scroll cue */}
          <a
            href="#projekty"
            className="mt-14 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <span>Przewiń, aby zobaczyć projekty</span>
            <ChevronDown className="h-4 w-4 animate-bounce text-accent" />
          </a>
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
          <p className="mt-4 max-w-xl text-muted-foreground">
            Od pierwszego kontaktu do gotowej strony — bez ryzyka z Twojej strony.
          </p>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal
                key={s.n}
                className={`sr-d${i + 1} bg-card p-8 spotlight transition-colors hover:bg-card`}
                onMouseMove={spotlightMove}
              >
                <div className="relative z-10 font-serif text-sm text-accent">{s.n}</div>
                <h3 className="relative z-10 mt-6 font-serif text-2xl">{s.t}</h3>
                <p className="relative z-10 mt-3 text-sm text-muted-foreground">{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJEKTY */}
      <ProjectsSticky />


      {/* O MNIE */}
      <section
        id="o-mnie"
        className="relative overflow-hidden border-t border-border bg-secondary/40 py-28"
      >
        <div
          aria-hidden
          className="blob pointer-events-none absolute -left-32 top-20 h-[420px] w-[420px] rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, oklch(0.85 0.08 220), transparent 60%)" }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12">
          {/* Sticky portrait column */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionLabel>O mnie</SectionLabel>
              <h2 className="mt-4 font-serif text-5xl md:text-6xl text-balance">
                Cześć, jestem <span className="italic text-accent">Marek</span>.
              </h2>

              {/* Portrait card */}
              <Reveal
                className="mt-10 relative overflow-hidden rounded-3xl border border-border bg-card p-8 spotlight"
                onMouseMove={spotlightMove}
              >
                <div className="relative z-10 flex items-center gap-5">
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary font-serif text-3xl text-primary-foreground">
                    M
                    <span
                      className="absolute -inset-1 rounded-full border border-accent/40 animate-ping opacity-60"
                      aria-hidden
                    />
                  </div>
                  <div>
                    <div className="font-serif text-2xl">Marek</div>
                    <div className="text-sm text-muted-foreground">Założyciel · LocalWeb.pl</div>
                    <div className="mt-1 flex items-center gap-1 text-xs text-accent">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                      Dostępny dziś
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
                  {[
                    { n: "4+", l: "lata doświadczenia" },
                    { n: "47", l: "projektów" },
                    { n: "100%", l: "zwrotów: 0" },
                  ].map((s) => (
                    <div key={s.l}>
                      <div className="font-serif text-2xl text-foreground">{s.n}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                        {s.l}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative z-10 mt-6 flex flex-wrap gap-1.5">
                  {[
                    "WordPress",
                    "React",
                    "SEO lokalne",
                    "Google Maps",
                    "Copywriting",
                    "Mobile-first",
                  ].map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-border bg-secondary/60 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>

          {/* Story + timeline + trust */}
          <div className="lg:col-span-7">
            <div className="space-y-6 text-[17px] leading-relaxed text-muted-foreground">
              <p>
                Od ponad <span className="text-foreground font-medium">4 lat</span> pomagam lokalnym
                firmom zaistnieć w internecie. Zaczynałem od stron dla znajomych — dziś mam na
                koncie ponad{" "}
                <span className="text-foreground font-medium">47 projektów w 23 branżach</span>.
              </p>
              <p>
                Specjalizuję się <span className="text-foreground">wyłącznie</span> w firmach
                lokalnych. Wiem, czego klient szukający mechanika, kwiaciarni czy gabinetu w Google
                oczekuje — i jak zaprojektować stronę, która przekonuje go do kontaktu.
              </p>
            </div>

            {/* Timeline */}
            <div className="mt-12 border-l border-border pl-8">
              {[
                {
                  y: "2021",
                  t: "Pierwsza strona",
                  d: "Strona dla warsztatu kolegi. Przyniosła mu 4 telefony w tydzień.",
                },
                {
                  y: "2022",
                  t: "Pełen etat",
                  d: "Rzucam korpo. Skupiam się na lokalnych firmach z całej Polski.",
                },
                {
                  y: "2024",
                  t: "47 projektów",
                  d: 'Model „płacisz po akceptacji" — 0 zwrotów, 100% klientów poleca dalej.',
                },
                {
                  y: "Dziś",
                  t: "Twoja firma?",
                  d: "Pokażę Ci gotową stronę za 5–10 dni. Bez zaliczki, bez ryzyka.",
                },
              ].map((m, i) => (
                <Reveal key={m.y} className={`timeline-item sr-d${(i % 4) + 1} pb-8 last:pb-0`}>
                  <div className="text-xs uppercase tracking-[0.18em] text-accent">{m.y}</div>
                  <div className="mt-1 font-serif text-2xl text-foreground">{m.t}</div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{m.d}</p>
                </Reveal>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {trust.map((b, i) => (
                <Reveal
                  key={b.t}
                  className={`sr-d${(i % 4) + 1} rounded-2xl border border-border bg-card p-5 hover-lift spotlight`}
                  onMouseMove={spotlightMove}
                >
                  <div className="relative z-10 flex items-center gap-2 font-medium text-foreground">
                    <Check className="h-4 w-4 text-accent" /> {b.t}
                  </div>
                  <p className="relative z-10 mt-2 text-sm text-muted-foreground">{b.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OPINIE */}
      <section id="opinie" className="relative overflow-hidden py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <SectionLabel>Opinie · 4.9 ★</SectionLabel>
              <h2 className="mt-3 max-w-2xl font-serif text-5xl md:text-6xl text-balance">
                Co mówią{" "}
                <span className="italic text-accent accent-underline">właściciele firm</span>.
              </h2>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {reviews.slice(0, 4).map((r) => (
                  <div
                    key={r.i}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-secondary text-[10px] font-medium"
                  >
                    {r.i}
                  </div>
                ))}
              </div>
              <span>+ dziesiątki innych</span>
            </div>
          </div>

          {/* Featured big quote */}
          <Reveal
            className="mt-14 relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-16 spotlight"
            onMouseMove={spotlightMove}
          >
            <span className="quote-glyph absolute -top-8 left-6">"</span>
            <div className="relative z-10 flex items-center gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <blockquote className="relative z-10 mt-6 max-w-4xl font-serif text-3xl leading-snug text-foreground md:text-4xl">
              „{reviews[0].q}"
            </blockquote>
            <figcaption className="relative z-10 mt-8 flex items-center gap-4 border-t border-border pt-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                {reviews[0].i}
              </div>
              <div>
                <div className="font-medium">{reviews[0].n}</div>
                <div className="text-sm text-muted-foreground">{reviews[0].r}</div>
              </div>
            </figcaption>
          </Reveal>
        </div>

        {/* Auto-scrolling marquee of other testimonials */}
        <div className="marquee-mask mt-10 overflow-hidden">
          <div className="scroll-x-track flex w-max gap-6 px-6">
            {[...reviews.slice(1), ...reviews.slice(1), ...reviews.slice(1)].map((r, i) => (
              <figure
                key={i}
                onMouseMove={spotlightMove}
                className="spotlight relative flex w-[380px] shrink-0 flex-col rounded-2xl border border-border bg-card p-6 md:w-[440px]"
              >
                <div className="relative z-10 flex items-center gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
                <blockquote className="relative z-10 mt-4 flex-1 font-serif text-lg leading-snug text-foreground">
                  „{r.q}"
                </blockquote>
                <figcaption className="relative z-10 mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                    {r.i}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{r.n}</div>
                    <div className="text-xs text-muted-foreground">{r.r}</div>
                  </div>
                </figcaption>
              </figure>
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
              Zadzwoń, napisz lub zostaw numer —{" "}
              <span className="italic text-accent">oddzwonię dziś.</span>
            </h2>
            <a
              href="tel:+48123456789"
              className="mt-10 flex items-center gap-4 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 transition-colors hover:bg-primary-foreground/10"
            >
              <Phone className="h-6 w-6 text-accent" />
              <div>
                <div className="text-xs uppercase tracking-wider text-primary-foreground/60">
                  Zadzwoń teraz
                </div>
                <div className="font-serif text-3xl">+48 123 456 789</div>
              </div>
            </a>
            <div className="mt-6 flex items-center gap-2 text-sm text-primary-foreground/60">
              <Mail className="h-4 w-4" /> kontakt@localweb.pl
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Dziękuję! Oddzwonię dziś.");
            }}
            className="lg:col-span-7 space-y-5 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Imię" name="name" placeholder="Jan Kowalski" />
              <Field label="Telefon" name="phone" type="tel" placeholder="+48 ..." />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-primary-foreground/60">
                Branża
              </label>
              <select className="w-full rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-3 text-primary-foreground outline-none transition-colors focus:border-accent">
                <option className="text-foreground">Usługi (mechanik, hydraulik, elektryk…)</option>
                <option className="text-foreground">Handel (sklep, kwiaciarnia…)</option>
                <option className="text-foreground">Gastronomia (restauracja, piekarnia…)</option>
                <option className="text-foreground">Zdrowie (dentysta, fizjoterapeuta…)</option>
                <option className="text-foreground">Inna branża</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-wider text-primary-foreground/60">
                Krótko o firmie (opcjonalnie)
              </label>
              <textarea
                rows={4}
                className="w-full rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-3 text-primary-foreground outline-none transition-colors focus:border-accent"
                placeholder="Czym się zajmujesz, w jakim mieście…"
              />
            </div>
            <button
              type="submit"
              className="btn-press inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-accent-foreground hover:opacity-90"
            >
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
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-accent" : ""}`}
                      />
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
            <div className="font-serif text-xl">
              LocalWeb<span className="text-muted-foreground">.pl</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Strony internetowe dla lokalnych firm · Spotkania przez Google Meet · Cała Polska
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <a href="tel:+48123456789" className="flex items-center gap-2 hover:text-foreground">
              <Phone className="h-4 w-4" /> +48 123 456 789
            </a>
            <span>© 2025 LocalWeb.pl</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground ${className}`}
    >
      <span className="h-px w-8 bg-current opacity-40" />
      {children}
    </div>
  );
}

function ProjectsSticky() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // total scrollable distance inside the pinned section
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const progress = total > 0 ? scrolled / total : 0;
      const idx = Math.min(
        projects.length - 1,
        Math.floor(progress * projects.length - 0.0001 < 0 ? 0 : progress * projects.length),
      );
      setActive(idx);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const p = projects[active];

  return (
    <section
      id="projekty"
      ref={sectionRef}
      className="relative border-t border-border bg-background"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div
          aria-hidden
          className="blob pointer-events-none absolute -right-40 top-32 h-[460px] w-[460px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, var(--accent-warm), transparent 60%)" }}
        />
        <div className="relative mx-auto flex h-full max-w-[1680px] flex-col px-6 py-10">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>
                Realizacje · {active + 1}/{projects.length}
              </SectionLabel>
              <h2 className="mt-2 font-serif text-3xl text-balance md:text-5xl">
                Wybrane <span className="italic text-accent accent-underline">projekty</span>
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Każdy projekt — inna branża, ten sam efekt: więcej zapytań od lokalnych klientów.
                Przewijaj, aby zobaczyć kolejne.
              </p>
            </div>
          </div>

          <div className="mt-6 grid min-h-0 flex-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
            {/* Left: big sticky preview card */}
            <div
              key={active}
              className="group spotlight relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl"
              onMouseMove={spotlightMove}
              style={{ animation: "soft-rise 0.6s ease-out both" }}
            >
              <span className="index-num pointer-events-none absolute right-6 top-4 z-20 text-7xl md:text-[9rem]">
                {String(active + 1).padStart(2, "0")}
              </span>
              <div className="grain relative h-[58%] min-h-[280px] overflow-hidden bg-gradient-to-br from-secondary via-sand to-secondary">
                <ProjectBrowserMockup project={p} featured index={active} />
                <span className="absolute left-5 top-5 z-20 rounded-full bg-card/95 px-3 py-1 text-xs backdrop-blur">
                  {p.tag}
                </span>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-wider text-muted-foreground">
                  <span>
                    {p.city} · {p.year}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-accent" />
                </div>
                <h3 className="mt-3 font-serif text-3xl leading-tight md:text-5xl">{p.name}</h3>
                <p className="mt-3 max-w-3xl text-sm text-muted-foreground md:text-base">
                  {p.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.chips.map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: nav indicator */}
            <ol className="hidden flex-col gap-2 self-stretch overflow-hidden lg:flex">
              {projects.map((proj, i) => {
                const isActive = i === active;
                return (
                  <li
                    key={proj.name + i}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 transition-all duration-500 ${
                      isActive
                        ? "border-accent/60 bg-card shadow-md"
                        : "border-border bg-card/40 opacity-60"
                    }`}
                  >
                    <span
                      className={`font-serif text-xl tabular-nums ${isActive ? "text-accent" : "text-muted-foreground"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium">{proj.name}</div>
                      <div className="truncate text-xs text-muted-foreground">
                        {proj.tag} · {proj.city}
                      </div>
                    </div>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectBrowserMockup({

  project,
  featured = false,
  index,
}: {
  project: (typeof projects)[number];
  featured?: boolean;
  index: number;
}) {
  return (
    <div
      className={`zoom-img absolute rounded-[1.5rem] border border-border bg-card shadow-xl ${
        featured ? "inset-5 md:inset-8" : "inset-4"
      }`}
    >
      <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="h-2 w-2 rounded-full bg-border" />
        <span className="ml-3 truncate text-[10px] uppercase tracking-wider text-muted-foreground">
          preview.localweb.pl/{project.city.toLowerCase()}
        </span>
      </div>

      <div
        className={`grid h-[calc(100%-37px)] gap-4 p-4 ${
          featured ? "md:grid-cols-[minmax(0,1.2fr)_minmax(240px,0.75fr)] md:p-7" : ""
        }`}
      >
        <div className="flex min-h-0 flex-col justify-between rounded-[1.25rem] bg-secondary/60 p-5">
          <div>
            <div className="h-3 w-28 rounded-full bg-accent/40" />
            <div className="mt-4 h-8 w-4/5 rounded-full bg-card" />
            <div className="mt-3 h-3 w-full rounded-full bg-card/80" />
            <div className="mt-2 h-3 w-3/4 rounded-full bg-card/80" />
          </div>
          <div className={`mt-6 grid gap-3 ${featured ? "grid-cols-3" : "grid-cols-2"}`}>
            {Array.from({ length: featured ? 3 : 2 }).map((_, k) => (
              <div key={k} className="rounded-2xl border border-border bg-card p-3">
                <div
                  className={`rounded-xl ${k === index % 3 ? "bg-accent/45" : "bg-secondary"} ${featured ? "h-16" : "h-12"}`}
                />
                <div className="mt-3 h-2 w-3/4 rounded-full bg-secondary" />
              </div>
            ))}
          </div>
        </div>

        {featured ? (
          <div className="hidden grid-rows-[1.15fr_0.85fr] gap-4 md:grid">
            <div className="rounded-[1.25rem] border border-border bg-card p-4">
              <div className="grid h-full grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, k) => (
                  <div
                    key={k}
                    className={`rounded-2xl ${k === 1 ? "bg-accent/55 transition-colors group-hover:bg-accent" : "bg-secondary"}`}
                  />
                ))}
              </div>
            </div>
            <div className="rounded-[1.25rem] bg-secondary/60 p-4">
              <div className="h-3 w-20 rounded-full bg-accent/35" />
              <div className="mt-4 space-y-2">
                <div className="h-2 w-full rounded-full bg-card" />
                <div className="h-2 w-5/6 rounded-full bg-card" />
                <div className="h-2 w-4/6 rounded-full bg-card" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-xs uppercase tracking-wider text-primary-foreground/60"
      >
        {label}
      </label>
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
    return () => {
      if (start) clearTimeout(start);
      if (id) clearInterval(id);
    };
  }, [text, speed, startDelay]);
  return out;
}

function CountUp({
  to,
  decimals = 0,
  duration = 1600,
}: {
  to: number;
  decimals?: number;
  duration?: number;
}) {
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

function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        setP(max > 0 ? Math.min(1, Math.max(0, h.scrollTop / max)) : 0);
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
  return p;
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
      if (y < threshold) {
        setHidden(false);
        lastY.current = y;
        return;
      }
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
  const setRef = useCallback(
    (node: HTMLElement | null) => {
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
    },
    [shown],
  );
  return createElement(
    as,
    {
      ref: setRef,
      onMouseMove,
      className: `sr ${shown ? "in" : ""} ${className}`,
    },
    children,
  );
}
