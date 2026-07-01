import { useState, useRef, createContext, useContext } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Filter,
  X,
  Share2,
  Shield,
  Leaf,
  Package,
  ThumbsUp,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  Award,
  Clock,
  MessageCircle,
  Instagram,
  Globe,
  Play,
  Quote,
} from "lucide-react";

// ─── Fidelity mode (Wireframe / High-Fidelity / Interactive) ──────────────────

type Fidelity = "wireframe" | "hifi" | "interactive";

const FidelityContext = createContext<{ mode: Fidelity; setMode: (m: Fidelity) => void }>({
  mode: "wireframe",
  setMode: () => { },
});

function useFidelity() {
  return useContext(FidelityContext);
}

// Deterministic photo placeholder used in hifi/interactive modes (real internet image,
// seeded so the same label always returns the same photo).
function photoUrl(seed: string, w = 600, h = 600) {
  const slug = encodeURIComponent(seed.toLowerCase().replace(/\s+/g, "-")) || "artisan";
  return `https://picsum.photos/seed/${slug}/${w}/${h}`;
}

// ─── Wireframe primitive helpers (shared) ─────────────────────────────────

// ─── Wireframe primitive helpers ──────────────────────────────────────────────

function ImageBox({
  className = "",
  label = "",
  aspect = "aspect-square",
  dark = false,
}: {
  className?: string;
  label?: string;
  aspect?: string;
  dark?: boolean;
}) {
  const { mode } = useFidelity();

  if (mode !== "wireframe") {
    return (
      <div className={`${aspect} relative overflow-hidden bg-muted ${className}`}>
        <img
          src={photoUrl(label || className)}
          alt={label || "Product"}
          loading="lazy"
          className={`w-full h-full object-cover ${mode === "interactive" ? "transition-transform duration-300 hover:scale-105" : ""}`}
        />
      </div>
    );
  }

  const bg = dark ? "bg-[#c8c8c4]" : "bg-[#e0e0dc]";
  const stroke = dark ? "#b0b0aa" : "#c0c0bb";
  const textCol = dark ? "#888882" : "#8a8a84";
  return (
    <div
      className={`${aspect} ${bg} border border-[#c8c8c4] flex flex-col items-center justify-center gap-1.5 relative overflow-hidden ${className}`}
    >
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <line x1="0" y1="0" x2="100%" y2="100%" stroke={stroke} strokeWidth="1" />
        <line x1="100%" y1="0" x2="0" y2="100%" stroke={stroke} strokeWidth="1" />
      </svg>
      {label && (
        <span className="relative z-10 text-[11px] font-medium uppercase tracking-wider px-2 text-center leading-tight" style={{ color: textCol }}>
          {label}
        </span>
      )}
    </div>
  );
}

function WireLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block text-[10px] font-medium uppercase tracking-widest text-muted-foreground ${className}`}>
      {children}
    </span>
  );
}

function Divider({ className = "", dashed = false }: { className?: string; dashed?: boolean }) {
  return <hr className={`${dashed ? "border-dashed border-[#c0c0bb]" : "border-border"} ${className}`} />;
}

function StarRating({ rating = 4.9, count = 0, size = "sm" }: { rating?: number; count?: number; size?: "sm" | "md" }) {
  const full = Math.floor(rating);
  const iconSize = size === "md" ? 14 : 11;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} size={iconSize} className={i <= full ? "fill-foreground text-foreground" : "text-[#c8c8c4]"} fill={i <= full ? "currentColor" : "none"} />
        ))}
      </div>
      {count > 0 && <span className={`${size === "md" ? "text-sm" : "text-[11px]"} text-muted-foreground`}>({count})</span>}
    </div>
  );
}


type Page = "home" | "artisan" | "product" | "cart" | "checkout" | "styleguide" | "flows" | "matrix";


function Navbar({ page, onNavigate }: { page: Page; onNavigate: (p: Page) => void }) {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <button onClick={() => onNavigate("home")} className="flex items-center gap-2 cursor-pointer hover:opacity-75 transition-opacity">
          <div className="w-7 h-7 border-2 border-foreground rounded-sm flex items-center justify-center">
            <div className="w-3 h-3 bg-foreground rounded-sm" />
          </div>
          <span className="font-display text-lg font-normal tracking-tight leading-none">
            ArtisanCrafts
          </span>
        </button>

        {/* Nav links — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <button
            onClick={() => onNavigate("home")}
            className={`hover:text-foreground transition-colors ${page === "home" ? "text-foreground font-medium" : ""}`}
          >
            Explore
          </button>
          <button
            onClick={() => onNavigate("home")}
            className="hover:text-foreground transition-colors"
          >
            Collections
          </button>
          <button
            onClick={() => onNavigate("artisan")}
            className={`hover:text-foreground transition-colors ${page === "artisan" ? "text-foreground font-medium" : ""}`}
          >
            Artisans
          </button>
          <button
            onClick={() => onNavigate("product")}
            className={`hover:text-foreground transition-colors ${page === "product" ? "text-foreground font-medium" : ""}`}
          >
            Our Story
          </button>
          <button
            onClick={() => onNavigate("styleguide")}
            className={`hover:text-foreground transition-colors ${page === "styleguide" ? "text-foreground font-medium" : ""}`}
          >
            Style Guide
          </button>
          <button
            onClick={() => onNavigate("flows")}
            className={`hover:text-foreground transition-colors ${page === "flows" ? "text-foreground font-medium" : ""}`}
          >
            UX Flows
          </button>
          <button
            onClick={() => onNavigate("matrix")}
            className={`hover:text-foreground transition-colors ${page === "matrix" ? "text-foreground font-medium" : ""}`}
          >
            Prioritization
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button className="hidden md:flex p-2 hover:bg-muted rounded-md transition-colors">
            <Search size={18} />
          </button>
          <button className="p-2 hover:bg-muted rounded-md transition-colors">
            <Heart size={18} />
          </button>
          <button className="p-2 hover:bg-muted rounded-md transition-colors relative" onClick={() => onNavigate("cart")}>
            <ShoppingBag size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-foreground rounded-full" />
          </button>
          <button className="hidden md:flex p-2 hover:bg-muted rounded-md transition-colors">
            <User size={18} />
          </button>
          <button className="md:hidden p-2 hover:bg-muted rounded-md transition-colors">
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Breadcrumb({
  onNavigate,
  trail,
}: {
  onNavigate: (p: Page) => void;
  trail: { label: string; page?: Page }[];
}) {
  return (
    <div className="border-b border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-1.5 text-[12px] text-muted-foreground">
        <button
          onClick={() => onNavigate("home")}
          className="hover:text-foreground transition-colors flex items-center gap-1"
        >
          <ChevronLeft size={12} />
          Back
        </button>
        <span>·</span>
        {trail.map((t, i) => {
          const isLast = i === trail.length - 1;
          return (
            <span key={t.label} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="text-foreground font-medium truncate">{t.label}</span>
              ) : (
                <button
                  onClick={() => t.page && onNavigate(t.page)}
                  className="hover:text-foreground transition-colors"
                >
                  {t.label}
                </button>
              )}
              {!isLast && <ChevronRight size={10} />}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Chip({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 px-4 py-1.5 rounded-full border text-sm font-medium transition-colors whitespace-nowrap
        ${active
          ? "bg-foreground text-background border-foreground"
          : "bg-card text-foreground border-border hover:bg-muted"
        }`}
    >
      {label}
    </button>
  );
}

// ─── Home page data ──────────────────────────────────────────────────────────
const moodFilters = ["All", "Rustic", "Minimalist", "Botanical", "Gifting", "New Arrivals"];

const collections = [
  { label: "For Her", sub: "34 items", icon: "❁" },
  { label: "Home & Living", sub: "52 items", icon: "⌂" },
  { label: "Under R500", sub: "28 items", icon: "◎" },
  { label: "Artisan Picks", sub: "19 items", icon: "✦" },
];

const products = [
  {
    title: "Hand-thrown Ceramic Mug",
    artisan: "Pottery by Lena K.",
    location: "Cape Town",
    price: "R385",
    rating: 4.8,
    reviews: 42,
    tag: "Bestseller",
  },
  {
    title: "Linen Tote Bag, Natural",
    artisan: "Thread & Stitch",
    location: "Johannesburg",
    price: "R290",
    rating: 4.6,
    reviews: 28,
    tag: "",
  },
  {
    title: "Beeswax Candle Set (3)",
    artisan: "The Wax Collective",
    location: "Stellenbosch",
    price: "R245",
    rating: 4.9,
    reviews: 61,
    tag: "New",
  },
  {
    title: "Pressed Botanicals Print",
    artisan: "Mara Studio",
    location: "Durban",
    price: "R480",
    rating: 4.7,
    reviews: 19,
    tag: "",
  },
  {
    title: "Macramé Wall Hanging",
    artisan: "Knotted by Siya",
    location: "Pretoria",
    price: "R620",
    rating: 4.5,
    reviews: 33,
    tag: "Handmade",
  },
  {
    title: "Rooibos Soap Bar Set",
    artisan: "Pure Roots Co.",
    location: "Paarl",
    price: "R175",
    rating: 4.8,
    reviews: 74,
    tag: "",
  },
  {
    title: "Recycled Glass Vase",
    artisan: "Glass & Grain",
    location: "Cape Town",
    price: "R395",
    rating: 4.4,
    reviews: 22,
    tag: "Eco",
  },
  {
    title: "Hand-dyed Silk Scarf",
    artisan: "Studio Indigo",
    location: "Knysna",
    price: "R540",
    rating: 4.9,
    reviews: 15,
    tag: "Limited",
  },
];

const sortOptions = ["Newest", "Price: Low–High", "Price: High–Low", "Most Reviewed"];

// ─── Home page sections ─────────────────────────────────────────────────────
function HeroBanner() {
  return (
    <section className="bg-card border-b border-border">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="grid md:grid-cols-[1fr_auto] gap-8 items-center">
          {/* Text block */}
          <div className="max-w-xl">
            <WireLabel className="mb-3 block">Ethical · Handmade · Authentic</WireLabel>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-tight tracking-tight text-foreground mb-4">
              Every piece tells<br />
              <em>a human story.</em>
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed mb-8 max-w-sm">
              Discover handcrafted goods made by independent artisans who care about their craft — and the people who receive it.
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="px-6 py-3 bg-foreground text-background text-sm font-medium rounded-sm hover:bg-foreground/90 transition-colors">
                Shop by Aesthetic
              </button>
              <button className="px-6 py-3 border border-foreground text-foreground text-sm font-medium rounded-sm hover:bg-muted transition-colors">
                Gift Ideas
              </button>
            </div>
          </div>

          {/* Hero image placeholder */}
          <div className="hidden md:block w-64 lg:w-80">
            <ImageBox
              aspect="aspect-[3/4]"
              label="Hero Visual — Artisan at work"
              className="rounded-sm"
            />
            {/* Trust badge strip */}
            <div className="mt-2 flex items-center justify-center gap-2 py-2 border border-border rounded-sm bg-muted/40">
              <span className="text-[11px] text-muted-foreground">Verified Artisan ·</span>
              <span className="text-[11px] text-muted-foreground">Ethical Materials ·</span>
              <span className="text-[11px] text-muted-foreground">Handmade</span>
            </div>
          </div>
        </div>

        {/* Trust strip below on mobile */}
        <div className="md:hidden mt-6 flex items-center justify-center gap-4 py-3 border border-border rounded-sm bg-muted/40">
          <span className="text-[11px] text-muted-foreground">✓ Verified Artisan</span>
          <span className="text-[11px] text-muted-foreground">✓ Ethical Materials</span>
          <span className="text-[11px] text-muted-foreground">✓ Handmade</span>
        </div>
      </div>
    </section>
  );
}

function SearchBar({ sticky = false }: { sticky?: boolean }) {
  return (
    <div
      className={`bg-background border-b border-border ${sticky ? "md:hidden sticky top-14 z-40" : "hidden md:block border-b border-border"}`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3 px-4 py-2.5 border border-border rounded-sm bg-card">
          <Search size={16} className="text-muted-foreground shrink-0" />
          <span className="text-sm text-muted-foreground flex-1">
            Search by product, artisan, or material...
          </span>
          <div className="hidden md:flex items-center gap-2 text-[11px] text-muted-foreground border-l border-border pl-3">
            <Filter size={12} />
            <span>Advanced</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MoodFilterBar({
  active,
  setActive,
}: {
  active: string;
  setActive: (f: string) => void;
}) {
  return (
    <div className="border-b border-border bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <WireLabel className="shrink-0 mr-1 hidden md:block">Browse by</WireLabel>
          {moodFilters.map((f) => (
            <Chip key={f} label={f} active={active === f} onClick={() => setActive(f)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CuratedCollections() {
  return (
    <section className="py-10 border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-display text-xl font-normal">Curated Collections</h2>
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
            View all <ChevronDown size={13} className="rotate-[-90deg]" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {collections.map((c) => (
            <button
              key={c.label}
              className="group border border-border rounded-sm bg-card hover:bg-muted transition-colors overflow-hidden text-left"
            >
              <ImageBox aspect="aspect-[4/3]" label={`${c.label} collection`} />
              <div className="p-3">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-base">{c.icon}</span>
                  <span className="text-sm font-medium">{c.label}</span>
                </div>
                <span className="text-[12px] text-muted-foreground">{c.sub}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductGrid({
  activeFilter,
  sortBy,
  setSortBy,
  onProductClick,
}: {
  activeFilter: string;
  sortBy: string;
  setSortBy: (s: string) => void;
  onProductClick: () => void;
}) {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <div>
            <h2 className="font-display text-xl font-normal">
              {activeFilter === "All" ? "All Products" : activeFilter}
            </h2>
            <WireLabel className="mt-0.5">
              {products.length} items · Showing handmade goods from verified artisans
            </WireLabel>
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="flex items-center gap-2 px-4 py-2 border border-border rounded-sm bg-card text-sm hover:bg-muted transition-colors"
            >
              <span>{sortBy}</span>
              <ChevronDown size={14} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-card border border-border rounded-sm shadow-sm z-20">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setSortBy(opt);
                      setSortOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 text-sm text-left hover:bg-muted transition-colors first:rounded-t-sm last:rounded-b-sm
                      ${opt === sortBy ? "font-medium bg-muted/60" : ""}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {products.map((p) => (
            <div
              key={p.title}
              onClick={onProductClick}
              className="group border border-border rounded-sm bg-card hover:shadow-sm transition-shadow overflow-hidden cursor-pointer"
            >
              {/* Image placeholder */}
              <div className="relative">
                <ImageBox aspect="aspect-square" label="Product image" />
                {/* Wishlist */}
                <button className="absolute top-2 right-2 p-1.5 bg-background/80 border border-border rounded-sm hover:bg-background transition-colors">
                  <Heart size={13} />
                </button>
                {/* Tag badge */}
                {p.tag && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-foreground text-background text-[10px] font-medium uppercase tracking-wide rounded-sm">
                    {p.tag}
                  </span>
                )}
              </div>

              {/* Product info */}
              <div className="p-3">
                <h3 className="text-sm font-medium leading-snug mb-1 line-clamp-2">{p.title}</h3>
                <div className="flex items-center gap-1 mb-1.5">
                  <span className="text-[12px] text-muted-foreground">{p.artisan}</span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <MapPin size={10} className="text-muted-foreground" />
                  <span className="text-[11px] text-muted-foreground">{p.location}</span>
                </div>
                <Divider className="mb-2" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{p.price}</span>
                  <StarRating rating={p.rating} count={p.reviews} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-10 flex justify-center">
          <button className="px-8 py-3 border border-border rounded-sm bg-card text-sm hover:bg-muted transition-colors">
            Load more products
          </button>
        </div>
      </div>
    </section>
  );
}

function ArtisanStripBanner({ onArtisanClick }: { onArtisanClick: () => void }) {
  const artisans = [
    { name: "Lena K.", craft: "Ceramics", location: "Cape Town", products: 14 },
    { name: "Thread & Stitch", craft: "Textiles", location: "Johannesburg", products: 8 },
    { name: "Mara Studio", craft: "Print & Paper", location: "Durban", products: 22 },
    { name: "Knotted by Siya", craft: "Fibre Art", location: "Pretoria", products: 11 },
  ];
  return (
    <section className="py-10 border-t border-border bg-muted/40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-baseline justify-between mb-5">
          <h2 className="font-display text-xl font-normal">Meet Our Artisans</h2>
          <button onClick={onArtisanClick} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            See all artisans →
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {artisans.map((a) => (
            <div
              key={a.name}
              onClick={onArtisanClick}
              className="border border-border rounded-sm bg-card p-4 hover:bg-muted/50 transition-colors cursor-pointer"
            >
              {/* Avatar placeholder */}
              <div className="w-12 h-12 rounded-full border border-border bg-muted flex items-center justify-center mb-3">
                <User size={16} className="text-muted-foreground" />
              </div>
              <p className="text-sm font-medium leading-tight">{a.name}</p>
              <p className="text-[12px] text-muted-foreground mt-0.5">{a.craft}</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={10} className="text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground">{a.location}</span>
              </div>
              <Divider className="my-2" />
              <span className="text-[11px] text-muted-foreground">{a.products} products</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const signals = [
    { icon: "◎", label: "Verified Artisans", desc: "Every seller is reviewed by our team" },
    { icon: "✦", label: "Ethically Sourced", desc: "Materials traced to their origin" },
    { icon: "❁", label: "Handmade Guarantee", desc: "No mass-produced goods" },
    { icon: "⌂", label: "Secure Checkout", desc: "SSL encrypted, multiple payment options" },
  ];
  return (
    <section className="border-t border-b border-border py-8 bg-card">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {signals.map((s) => (
            <div key={s.label} className="flex items-start gap-3">
              <span className="text-xl shrink-0 mt-0.5">{s.icon}</span>
              <div>
                <p className="text-sm font-medium">{s.label}</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeAnnotations() {
  const { mode } = useFidelity();
  if (mode !== "wireframe") return null;
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 border-t border-dashed border-[#c0c0bb]">
      <WireLabel className="block mb-4">Wireframe annotations — mid-fidelity</WireLabel>
      <div className="grid md:grid-cols-3 gap-4 text-[12px] text-muted-foreground">
        <div className="border border-dashed border-[#c0c0bb] rounded-sm p-3">
          <p className="font-medium text-foreground mb-1">Mobile behavior</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Search bar sticky below nav on mobile</li>
            <li>Filter chips horizontally scrollable</li>
            <li>Product grid: 2-col</li>
            <li>Collections: 2-col</li>
          </ul>
        </div>
        <div className="border border-dashed border-[#c0c0bb] rounded-sm p-3">
          <p className="font-medium text-foreground mb-1">Trust signals for Olivia</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Artisan name + location on every card</li>
            <li>Verified badge in hero image area</li>
            <li>Trust bar between artisans + products</li>
            <li>Ratings with review count visible</li>
          </ul>
        </div>
        <div className="border border-dashed border-[#c0c0bb] rounded-sm p-3">
          <p className="font-medium text-foreground mb-1">Discovery priorities</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Mood/aesthetic chips above product grid</li>
            <li>Collections use icon + label hierarchy</li>
            <li>Sort dropdown top-right of product grid</li>
            <li>Hero CTAs: mood-browse + gift intent</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {["Shop", "Sell on ArtisanCrafts", "About", "Support"].map((col) => (
            <div key={col}>
              <p className="text-sm font-medium mb-3">{col}</p>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-3 bg-border rounded-sm w-3/4" />
                ))}
              </div>
            </div>
          ))}
        </div>
        <Divider />
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-3 text-[12px] text-muted-foreground">
          <span>© 2025 ArtisanCrafts · Ethical goods marketplace</span>
          <div className="flex items-center gap-4">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Root ────────────────────────────────────────────────────────────────────

// ─── Artisan profile page sections ──────────────────────────────────────────
function ArtisanHero() {
  return (
    <section className="border-b border-border bg-card">
      {/* Cover image strip */}
      <div className="relative">
        <ImageBox aspect="aspect-[21/6] md:aspect-[21/5]" label="Studio cover photo — workshop / environment" dark className="rounded-none" />
        {/* Overlay annotation */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-background/80 border border-border text-[10px] uppercase tracking-widest text-muted-foreground rounded-sm hidden md:block">
          Full-width cover image
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Avatar + identity row */}
        <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-10 md:-mt-12 pb-6 md:pb-8">
          {/* Avatar — pulled up over cover */}
          <div className="relative z-10 shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-background bg-muted overflow-hidden">
              <ImageBox aspect="aspect-square" label="Artisan portrait" className="rounded-full" />
            </div>
            {/* Verified badge */}
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-foreground border-2 border-background flex items-center justify-center">
              <CheckCircle size={13} className="text-background" />
            </div>
          </div>

          {/* Name + meta */}
          <div className="flex-1 min-w-0 pt-2 md:pt-0">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
              <div>
                <WireLabel className="block mb-1">Verified artisan · Member since 2017</WireLabel>
                <h1 className="font-display text-3xl md:text-4xl font-normal leading-tight tracking-tight">
                  Lena Khumalo
                </h1>
                <p className="text-base text-muted-foreground mt-0.5 font-medium">Pottery by Lena K.</p>
                <div className="flex items-center gap-3 mt-2 flex-wrap">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin size={13} />
                    <span>Woodstock, Cape Town</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={4.9} count={340} size="sm" />
                  </div>
                </div>
              </div>
              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                <button className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-medium rounded-sm hover:bg-foreground/90 transition-colors">
                  <ShoppingBag size={14} />
                  Shop this maker
                </button>
                <button className="p-2 border border-border rounded-sm hover:bg-muted transition-colors"><Heart size={15} /></button>
                <button className="p-2 border border-border rounded-sm hover:bg-muted transition-colors"><Share2 size={15} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Short bio + trust stats — same row */}
        <div className="grid md:grid-cols-[2fr_1fr] gap-6 pb-8 border-t border-border pt-6">
          {/* Bio */}
          <div>
            <WireLabel className="block mb-2">About Lena</WireLabel>
            <p className="text-base text-foreground/80 leading-relaxed">
              I'm a ceramicist based in Woodstock, Cape Town. I've been throwing pots since 2017 — first as therapy, then obsession, now livelihood. Every piece is hand-formed on a kick wheel in my small studio. I work with local stoneware clay and lead-free glazes, and I believe in slow making: one piece at a time, made to last.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3 mt-4">
              <button className="flex items-center gap-1.5 text-[12px] text-muted-foreground border border-border px-3 py-1.5 rounded-sm hover:bg-muted transition-colors">
                <Instagram size={12} /> @potterybylenak
              </button>
              <button className="flex items-center gap-1.5 text-[12px] text-muted-foreground border border-border px-3 py-1.5 rounded-sm hover:bg-muted transition-colors">
                <Globe size={12} /> potterybylenak.co.za
              </button>
            </div>
          </div>

          {/* Trust stats panel */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: <Clock size={14} />, value: "8 yrs", label: "Years making" },
              { icon: <Package size={14} />, value: "340+", label: "Items sold" },
              { icon: <Award size={14} />, value: "4.9★", label: "Avg. rating" },
              { icon: <MessageCircle size={14} />, value: "96%", label: "Recommend" },
            ].map((s) => (
              <div key={s.label} className="border border-border rounded-sm p-3 bg-background flex flex-col items-center text-center gap-1">
                <span className="text-muted-foreground">{s.icon}</span>
                <span className="text-lg font-medium leading-none">{s.value}</span>
                <WireLabel>{s.label}</WireLabel>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Craft Process ────────────────────────────────────────────────────────────

function CraftProcess() {
  const steps = [
    { step: "01", title: "Sourcing the clay", desc: "Local stoneware from Paarl. Lena tests every new batch for workability before committing to a firing schedule." },
    { step: "02", title: "Centering & throwing", desc: "Each piece is centred by hand on a kick wheel — no electric assists. This takes years to develop feel for." },
    { step: "03", title: "Trimming & drying", desc: "Thrown pieces dry slowly for 48 hours under damp cloth before trimming. Rushing this stage cracks the clay." },
    { step: "04", title: "Glazing & firing", desc: "Lead-free glaze is applied by dipping or brushing. Each kiln load fires at 1280°C for 10 hours." },
  ];

  return (
    <section className="py-10 border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-baseline justify-between mb-2">
          <h2 className="font-display text-2xl md:text-3xl font-normal">Behind the Scenes</h2>
          <WireLabel>4-step craft process</WireLabel>
        </div>
        <p className="text-sm text-muted-foreground mb-8 max-w-xl">
          Lena opens her studio process so buyers can understand exactly what goes into every piece they receive.
        </p>

        {/* Wide process image with step overlay */}
        <div className="relative mb-8">
          <ImageBox aspect="aspect-[16/6]" label="Wide studio / process establishing shot" dark className="rounded-sm" />
          {/* Play button overlay — hints at video */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-2 border-[#8a8a84] bg-background/60 flex items-center justify-center">
              <Play size={20} className="text-foreground ml-1" />
            </div>
          </div>
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-background/80 border border-border text-[10px] text-muted-foreground uppercase tracking-widest rounded-sm">
            Optional: process video embed
          </div>
        </div>

        {/* Step grid */}
        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <div key={s.step} className="flex flex-col gap-3">
              {/* Step image */}
              <ImageBox aspect="aspect-[4/3]" label={`Step ${s.step} — ${s.title}`} className="rounded-sm" />
              {/* Step text */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-medium text-muted-foreground border border-border px-1.5 py-0.5 rounded-sm">
                    {s.step}
                  </span>
                  <p className="text-sm font-medium">{s.title}</p>
                </div>
                <p className="text-[12px] text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              {/* Connector line — between steps on desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute" />
              )}
            </div>
          ))}
        </div>

        {/* Process footnote */}
        <div className="mt-6 p-3 border border-dashed border-border rounded-sm flex items-start gap-2">
          <CheckCircle size={13} className="text-muted-foreground mt-0.5 shrink-0" />
          <p className="text-[12px] text-muted-foreground">
            Process steps are self-documented by the artisan. ArtisanCrafts conducts a studio visit review for all Verified members.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Artisan Journey & Values ─────────────────────────────────────────────────

function ArtisanStory() {
  const values = [
    { icon: "◎", label: "Slow making", desc: "Never rushing a piece. If it needs another day to dry, it gets another day." },
    { icon: "❁", label: "Local materials", desc: "Clay, glaze components, and packaging all sourced within 200km of Cape Town." },
    { icon: "✦", label: "Fair pricing", desc: "Prices reflect real labour and materials — never undercut, never inflated." },
    { icon: "⌂", label: "Community", desc: "10% of profits go to a Woodstock youth pottery programme." },
  ];

  return (
    <section className="py-10 border-b border-border bg-card">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-start">

          {/* Story column */}
          <div>
            <WireLabel className="block mb-3">Lena's journey</WireLabel>
            <h2 className="font-display text-2xl md:text-3xl font-normal leading-snug mb-5">
              From burnout to clay:<br />
              <em>"The wheel saved me."</em>
            </h2>

            {/* Pull quote */}
            <div className="border-l-2 border-foreground pl-4 mb-6">
              <Quote size={16} className="text-muted-foreground mb-2" />
              <p className="text-base italic text-foreground/80 leading-relaxed">
                "I was a graphic designer for 10 years. Burnt out by 32. A friend dragged me to a community pottery class and I never looked back. Clay is honest — it doesn't lie to you."
              </p>
              <p className="text-[12px] text-muted-foreground mt-2">— Lena Khumalo, 2023 interview</p>
            </div>

            {/* Body paragraphs — placeholder lines */}
            <div className="space-y-4 mb-6">
              {[[100, 93, 87, 95, 78], [100, 90, 96, 82]].map((group, gi) => (
                <div key={gi} className="space-y-1.5">
                  {group.map((w, i) => (
                    <div key={i} className="h-3.5 bg-muted rounded-sm" style={{ width: `${w}%` }} />
                  ))}
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Today Lena employs one part-time studio assistant and teaches a Saturday beginner class. She still throws every piece herself — delegating glazing prep but never the throwing.
            </p>

            <button className="inline-flex items-center gap-2 text-sm font-medium border border-foreground px-5 py-2.5 rounded-sm hover:bg-muted transition-colors">
              Watch studio documentary <ArrowRight size={13} />
            </button>
          </div>

          {/* Values + portrait column */}
          <div className="flex flex-col gap-5">
            {/* Portrait */}
            <ImageBox aspect="aspect-[4/5]" label="Artisan at work — portrait style" className="rounded-sm" />

            {/* Values grid */}
            <div>
              <WireLabel className="block mb-3">Values & commitments</WireLabel>
              <div className="grid grid-cols-2 gap-2">
                {values.map((v) => (
                  <div key={v.label} className="border border-border rounded-sm p-3 bg-background hover:bg-muted/40 transition-colors">
                    <span className="text-lg block mb-1">{v.icon}</span>
                    <p className="text-[12px] font-medium mb-0.5">{v.label}</p>
                    <p className="text-[11px] text-muted-foreground leading-snug">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Trust Signals Bar ────────────────────────────────────────────────────────

function TrustSignalsBar() {
  const signals = [
    { icon: <CheckCircle size={14} />, label: "Studio Verified", sub: "Physical visit by our team, 2024" },
    { icon: <Award size={14} />, label: "Top Seller", sub: "Top 5% of artisans on ArtisanCrafts" },
    { icon: <Package size={14} />, label: "340+ Items Sold", sub: "Since joining in 2017" },
    { icon: <MessageCircle size={14} />, label: "96% Recommend", sub: "Based on 340 verified reviews" },
    { icon: <Clock size={14} />, label: "Fast Response", sub: "Typically replies within 2 hours" },
  ];

  return (
    <section className="border-b border-border bg-background py-6">
      <div className="max-w-6xl mx-auto px-4">
        <WireLabel className="block mb-4">Trust & verification signals</WireLabel>
        <div className="flex gap-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {signals.map((s) => (
            <div key={s.label} className="flex items-center gap-2.5 border border-border rounded-sm px-4 py-3 bg-card shrink-0 min-w-[200px]">
              <span className="text-muted-foreground shrink-0">{s.icon}</span>
              <div>
                <p className="text-[12px] font-medium">{s.label}</p>
                <p className="text-[11px] text-muted-foreground">{s.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Product Grid ─────────────────────────────────────────────────────────────

function ArtisanProducts({ onProductClick }: { onProductClick: () => void }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Mugs & Cups", "Plates & Bowls", "Vases", "Sets & Gifts"];

  const products = [
    { title: "Hand-thrown Ceramic Mug", price: "R385", rating: 4.8, reviews: 42, tag: "Bestseller" },
    { title: "Ceramic Espresso Cup", price: "R220", rating: 4.7, reviews: 28, tag: "" },
    { title: "Stoneware Side Plate Set (4)", price: "R680", rating: 4.9, reviews: 19, tag: "New" },
    { title: "Raku Vase — Medium", price: "R540", rating: 4.6, reviews: 11, tag: "" },
    { title: "Breakfast Bowl, Speckled", price: "R295", rating: 4.8, reviews: 33, tag: "" },
    { title: "Gift Set — Mug + Espresso", price: "R560", rating: 5.0, reviews: 8, tag: "Limited" },
    { title: "Bud Vase, Dipped Glaze", price: "R310", rating: 4.7, reviews: 15, tag: "" },
    { title: "Handmade Serving Bowl", price: "R490", rating: 4.9, reviews: 22, tag: "" },
  ];

  return (
    <section className="py-10 border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <WireLabel className="block mb-1">14 products available</WireLabel>
            <h2 className="font-display text-2xl md:text-3xl font-normal">Shop this maker</h2>
          </div>
          <button
            onClick={onProductClick}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-sm hover:bg-foreground/90 transition-colors"
          >
            <ShoppingBag size={14} />
            View all by Lena
          </button>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6" style={{ scrollbarWidth: "none" }}>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-4 py-1.5 rounded-full border text-sm font-medium transition-colors whitespace-nowrap
                ${activeFilter === f
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-foreground border-border hover:bg-muted"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => (
            <div
              key={p.title}
              onClick={onProductClick}
              className="group border border-border rounded-sm bg-card hover:shadow-sm transition-shadow overflow-hidden cursor-pointer"
            >
              <div className="relative">
                <ImageBox aspect="aspect-square" label="Product" />
                <button className="absolute top-2 right-2 p-1.5 bg-background/80 border border-border rounded-sm hover:bg-background transition-colors">
                  <Heart size={12} />
                </button>
                {p.tag && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 bg-foreground text-background text-[10px] font-medium uppercase tracking-wide rounded-sm">
                    {p.tag}
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium leading-snug mb-1.5 line-clamp-2 group-hover:underline">{p.title}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{p.price}</span>
                  <div className="flex items-center gap-1">
                    <Star size={10} className="fill-foreground text-foreground" />
                    <span className="text-[11px] text-muted-foreground">{p.rating} ({p.reviews})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="mt-8 flex justify-center">
          <button className="px-8 py-3 border border-border rounded-sm text-sm hover:bg-muted transition-colors">
            Load more products (6 remaining)
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Customer Love ────────────────────────────────────────────────────────────

function CustomerLove() {
  const reviews = [
    {
      author: "Olivia C.", date: "Jun 2025", rating: 5, verified: true,
      body: "Lena's work is exceptional. I've bought from her three times now. The handwritten note she includes is such a thoughtful touch — you genuinely feel like you know her.",
      helpful: 24,
    },
    {
      author: "James M.", date: "Apr 2025", rating: 5, verified: true,
      body: "Bought the espresso set as a gift. My friend cried when she opened it — that is the highest compliment I can give handmade goods. The packaging was beautiful too.",
      helpful: 18,
    },
    {
      author: "Thandi N.", date: "Feb 2025", rating: 4, verified: true,
      body: "Beautiful work. Slightly longer lead time than expected but Lena communicated proactively and it was absolutely worth the wait. Would order again.",
      helpful: 9,
    },
  ];

  return (
    <section className="py-10 border-b border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <WireLabel className="block mb-1">Customer love</WireLabel>
            <h2 className="font-display text-2xl font-normal">What buyers say about Lena</h2>
          </div>
          <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            All 340 reviews →
          </button>
        </div>

        {/* Rating summary strip */}
        <div className="flex items-center gap-4 p-4 border border-border rounded-sm bg-card mb-6">
          <div className="text-center shrink-0 px-4 border-r border-border">
            <p className="font-display text-4xl font-normal">4.9</p>
            <div className="flex justify-center mt-1">
              <StarRating rating={4.9} size="sm" />
            </div>
            <WireLabel className="block mt-1">340 reviews</WireLabel>
          </div>
          <div className="flex flex-wrap gap-3 px-2">
            {["Exceptional quality", "Beautiful packaging", "Exactly as described", "Great communication", "Worth every rand"].map((tag) => (
              <span key={tag} className="px-3 py-1 border border-border rounded-full text-[12px] bg-muted/50">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Review cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <div key={r.author} className="border border-border rounded-sm p-4 bg-card flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
                    <User size={13} className="text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-medium">{r.author}</p>
                      {r.verified && <CheckCircle size={10} className="text-muted-foreground" />}
                    </div>
                    <p className="text-[11px] text-muted-foreground">{r.date}</p>
                  </div>
                </div>
                <StarRating rating={r.rating} />
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed flex-1">"{r.body}"</p>
              <div className="flex items-center gap-2 pt-2 border-t border-border">
                <button className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                  <ThumbsUp size={10} /> Helpful ({r.helpful})
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Follow / Contact CTA ─────────────────────────────────────────────────────

function FollowCTA() {
  return (
    <section className="py-10 border-b border-border">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <WireLabel className="block mb-2">Stay connected with Lena</WireLabel>
            <h2 className="font-display text-2xl font-normal mb-1">Follow the studio journey</h2>
            <p className="text-sm text-muted-foreground max-w-lg">
              Lena posts new work, kiln opens, and behind-the-scenes moments. Be the first to know when limited pieces drop.
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0">
            <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-foreground text-background text-sm font-medium rounded-sm hover:bg-foreground/90 transition-colors">
              <Heart size={14} /> Follow Lena
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-2 border border-border text-sm rounded-sm hover:bg-muted transition-colors">
              <MessageCircle size={14} /> Send a message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Wireframe Annotations ────────────────────────────────────────────────────

function ArtisanAnnotations() {
  const { mode } = useFidelity();
  if (mode !== "wireframe") return null;
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 border-t border-dashed border-[#c0c0bb]">
      <WireLabel className="block mb-4">Wireframe annotations — Artisan Profile page</WireLabel>
      <div className="grid md:grid-cols-4 gap-4 text-[12px] text-muted-foreground">
        {[
          {
            title: "Mobile behaviour",
            items: ["Cover image: full-width, 16:9 crop", "Avatar pulled up over cover", "Trust stats: 2×2 grid", "Craft steps: vertical stack", "Product grid: 2-col"],
          },
          {
            title: "Emotional hierarchy",
            items: ["Name + portrait above fold", "Short bio immediately below", "Pull quote anchors story section", "Process steps before products", "Reviews after product exposure"],
          },
          {
            title: "Trust signals for Olivia",
            items: ["Studio Verified badge on avatar", "Physical visit annotation", "Years making + sales count", "Response time shown", "Community/values cards"],
          },
          {
            title: "Discovery paths",
            items: ["'Shop this maker' CTA prominent", "Product category filter chips", "Follow + Message CTAs at tail", "Social links in bio area", "'All reviews' link in reviews"],
          },
        ].map((col) => (
          <div key={col.title} className="border border-dashed border-[#c0c0bb] rounded-sm p-3">
            <p className="font-medium text-foreground mb-1.5">{col.title}</p>
            <ul className="space-y-1 list-disc list-inside">
              {col.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Product detail page sections ──────────────────────────────────────────
function ImageGallery({ activeThumb, setActiveThumb }: { activeThumb: number; setActiveThumb: (i: number) => void }) {
  const thumbLabels = ["Main view", "Detail — rim", "Interior glaze", "Scale reference"];

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative">
        <ImageBox aspect="aspect-square" label="Main product image" className="rounded-sm" />
        {/* Nav arrows */}
        <button className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 border border-border rounded-sm flex items-center justify-center hover:bg-background transition-colors">
          <ChevronLeft size={14} />
        </button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/80 border border-border rounded-sm flex items-center justify-center hover:bg-background transition-colors">
          <ChevronRight size={14} />
        </button>
        {/* Image counter */}
        <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-background/80 border border-border text-[11px] rounded-sm">
          {activeThumb + 1} / {thumbLabels.length}
        </span>
        {/* Wishlist */}
        <button className="absolute top-2 right-2 p-2 bg-background/80 border border-border rounded-sm hover:bg-background transition-colors">
          <Heart size={14} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {thumbLabels.map((label, i) => (
          <button
            key={i}
            onClick={() => setActiveThumb(i)}
            className={`relative rounded-sm overflow-hidden transition-all ${activeThumb === i ? "ring-2 ring-foreground ring-offset-1" : "opacity-60 hover:opacity-90"
              }`}
          >
            <ImageBox aspect="aspect-square" label={label} className="rounded-sm" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Product Info Panel ───────────────────────────────────────────────────────

function ProductInfo({ quantity, setQuantity, onAddToCart }: { quantity: number; setQuantity: (n: number) => void; onAddToCart: () => void }) {
  const [selectedSize, setSelectedSize] = useState("Standard (350ml)");
  const sizes = ["Standard (350ml)", "Large (500ml)"];

  return (
    <div className="flex flex-col gap-5">
      {/* Tags row */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="px-2 py-0.5 border border-foreground text-[11px] font-medium uppercase tracking-wide rounded-sm">
          Handmade
        </span>
        <span className="px-2 py-0.5 border border-border text-[11px] text-muted-foreground uppercase tracking-wide rounded-sm">
          Ceramics
        </span>
        <span className="px-2 py-0.5 border border-border text-[11px] text-muted-foreground uppercase tracking-wide rounded-sm">
          Rustic
        </span>
      </div>

      {/* Title + price */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-normal leading-tight tracking-tight mb-3">
          Hand-thrown Ceramic Mug
        </h1>
        <div className="flex items-baseline gap-3">
          <span className="text-2xl font-medium">R385</span>
          <span className="text-sm text-muted-foreground line-through">R420</span>
          <span className="text-[12px] text-muted-foreground bg-muted px-2 py-0.5 rounded-sm">Save R35</span>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <StarRating rating={4.8} count={42} size="md" />
        <span className="text-[12px] text-muted-foreground">· 96% recommend</span>
      </div>

      <Divider />

      {/* Artisan link — prominent */}
      <div className="flex items-center gap-3 p-3 border border-border rounded-sm bg-card hover:bg-muted/40 transition-colors cursor-pointer group">
        <div className="w-10 h-10 rounded-full border border-border bg-muted flex items-center justify-center shrink-0">
          <User size={16} className="text-muted-foreground" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <WireLabel>Made by</WireLabel>
            <CheckCircle size={11} className="text-foreground" />
            <WireLabel>Verified artisan</WireLabel>
          </div>
          <p className="text-sm font-medium mt-0.5 group-hover:underline">Pottery by Lena K.</p>
          <div className="flex items-center gap-1 mt-0.5">
            <MapPin size={10} className="text-muted-foreground" />
            <span className="text-[11px] text-muted-foreground">Cape Town · 14 products · Est. 2017</span>
          </div>
        </div>
        <ExternalLink size={14} className="text-muted-foreground shrink-0" />
      </div>

      <Divider />

      {/* Size selector */}
      <div>
        <WireLabel className="block mb-2">Select Size</WireLabel>
        <div className="flex gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`px-4 py-2 border text-sm rounded-sm transition-colors ${selectedSize === s
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:bg-muted"
                }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity + Add to Cart — hidden on mobile (sticky bar handles it) */}
      <div className="hidden md:flex items-center gap-3">
        {/* Qty stepper */}
        <div className="flex items-center border border-border rounded-sm overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 flex items-center justify-center text-lg hover:bg-muted transition-colors border-r border-border"
          >
            −
          </button>
          <span className="w-10 h-10 flex items-center justify-center text-sm font-medium">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 flex items-center justify-center text-lg hover:bg-muted transition-colors border-l border-border"
          >
            +
          </button>
        </div>
        {/* Add to cart */}
        <button onClick={onAddToCart} className="flex-1 h-10 bg-foreground text-background text-sm font-medium rounded-sm hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2">
          <ShoppingBag size={15} />
          Add to Cart · R{385 * quantity}
        </button>
        {/* Wishlist */}
        <button className="w-10 h-10 border border-border rounded-sm flex items-center justify-center hover:bg-muted transition-colors">
          <Heart size={15} />
        </button>
        {/* Share */}
        <button className="w-10 h-10 border border-border rounded-sm flex items-center justify-center hover:bg-muted transition-colors">
          <Share2 size={15} />
        </button>
      </div>

      {/* Delivery estimate */}
      <div className="flex items-start gap-2 p-3 border border-border rounded-sm bg-muted/40">
        <Package size={14} className="text-muted-foreground mt-0.5 shrink-0" />
        <div>
          <p className="text-[12px] font-medium">Estimated delivery: 5–8 business days</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Made-to-order · Ships from Cape Town · Free shipping over R800
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Materials & Sourcing ─────────────────────────────────────────────────────

function MaterialsSection() {
  const details = [
    {
      icon: <Leaf size={14} />,
      label: "Clay",
      value: "Local stoneware clay, sourced from Paarl, Western Cape",
    },
    {
      icon: <Shield size={14} />,
      label: "Glaze",
      value: "Lead-free, food-safe ceramic glaze — lab tested",
    },
    {
      icon: <CheckCircle size={14} />,
      label: "Firing",
      value: "High-fired at 1280°C for durability and longevity",
    },
    {
      icon: <Package size={14} />,
      label: "Packaging",
      value: "Recycled kraft paper and compostable tissue wrap",
    },
  ];

  return (
    <section className="py-8 border-t border-border">
      <h2 className="font-display text-xl font-normal mb-1">Materials & Sourcing</h2>
      <WireLabel className="block mb-5">Transparent ingredient disclosure</WireLabel>
      <div className="grid md:grid-cols-2 gap-3">
        {details.map((d) => (
          <div
            key={d.label}
            className="flex items-start gap-3 p-3.5 border border-border rounded-sm bg-card"
          >
            <span className="text-muted-foreground mt-0.5 shrink-0">{d.icon}</span>
            <div>
              <p className="text-[12px] font-medium uppercase tracking-wide mb-0.5">{d.label}</p>
              <p className="text-sm text-muted-foreground">{d.value}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 p-3 border border-dashed border-border rounded-sm flex items-center gap-2">
        <Shield size={13} className="text-muted-foreground shrink-0" />
        <p className="text-[12px] text-muted-foreground">
          All material claims are self-reported by the artisan and verified by the ArtisanCrafts team on approval.
        </p>
      </div>
    </section>
  );
}

// ─── Artisan Story Teaser ─────────────────────────────────────────────────────

function ArtisanStoryTeaser({ onArtisanClick }: { onArtisanClick: () => void }) {
  return (
    <section className="py-8 border-t border-border">
      <div className="grid md:grid-cols-[1fr_2fr] gap-6 items-start">
        {/* Avatar + meta */}
        <div className="flex flex-col items-start gap-3 cursor-pointer" onClick={onArtisanClick}>
          <ImageBox
            aspect="aspect-square"
            label="Artisan portrait"
            className="rounded-sm w-full max-w-[160px]"
          />
          <div>
            <p className="font-medium text-base">Lena Khumalo</p>
            <p className="text-[12px] text-muted-foreground mt-0.5">
              Ceramicist · Cape Town
            </p>
            <div className="flex items-center gap-1 mt-1">
              <CheckCircle size={11} />
              <WireLabel>Verified since 2017</WireLabel>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 w-full max-w-[160px]">
            {["14\nProducts", "340+\nSales", "4.9★\nRating"].map((stat) => (
              <div key={stat} className="border border-border rounded-sm p-2 text-center bg-card">
                {stat.split("\n").map((line, i) => (
                  <p key={i} className={i === 0 ? "text-sm font-medium" : "text-[10px] text-muted-foreground"}>
                    {line}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Story text */}
        <div>
          <WireLabel className="block mb-2">The artisan behind this piece</WireLabel>
          <h2 className="font-display text-2xl font-normal mb-3 leading-snug">
            "Clay taught me patience.<br />Every piece carries that."
          </h2>
          {/* Text placeholder lines */}
          <div className="space-y-2 mb-4">
            {[100, 95, 90, 82, 96, 75].map((w, i) => (
              <div key={i} className="h-3.5 bg-muted rounded-sm" style={{ width: `${w}%` }} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mb-4 italic">
            — Lena hand-throws every mug on a kick wheel in her studio in Woodstock, Cape Town. Each piece takes 3 days from throwing to firing.
          </p>
          <button
            onClick={onArtisanClick}
            className="inline-flex items-center gap-2 text-sm font-medium border border-foreground px-4 py-2 rounded-sm hover:bg-muted transition-colors"
          >
            Read Lena's full story
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Reviews Section ──────────────────────────────────────────────────────────

function ReviewsSection() {
  const reviews = [
    {
      author: "Olivia C.",
      date: "14 Jun 2025",
      rating: 5,
      verified: true,
      helpful: 18,
      body: "Absolutely beautiful mug. The glaze has this lovely speckled texture that photographs look exactly like — actually even better in person. Lena sent a handwritten note too, which was such a thoughtful touch.",
    },
    {
      author: "James M.",
      date: "2 May 2025",
      rating: 5,
      verified: true,
      helpful: 11,
      body: "Bought this as a gift. The recipient was genuinely moved. You can tell it was made with real care — not mass-produced at all. Shipping was fast and packaging was beautiful.",
    },
    {
      author: "Thandi N.",
      date: "18 Mar 2025",
      rating: 4,
      verified: false,
      helpful: 6,
      body: "Great quality and love the design. Small note — the handle is slightly smaller than I expected from the photos, but still comfortable. The glaze colour is stunning.",
    },
  ];

  const breakdown = [5, 4, 3, 2, 1];
  const counts = [36, 4, 1, 1, 0];
  const total = counts.reduce((a, b) => a + b, 0);

  return (
    <section className="py-8 border-t border-border">
      <h2 className="font-display text-xl font-normal mb-6">Customer Reviews</h2>

      {/* Summary row */}
      <div className="grid md:grid-cols-[auto_1fr] gap-6 mb-8 pb-8 border-b border-border">
        {/* Score */}
        <div className="flex flex-col items-center justify-center p-6 border border-border rounded-sm bg-card min-w-[130px]">
          <p className="font-display text-5xl font-normal">4.8</p>
          <StarRating rating={4.8} size="md" />
          <p className="text-[12px] text-muted-foreground mt-1">{total} reviews</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">96% recommend</p>
        </div>

        {/* Breakdown bars */}
        <div className="flex flex-col justify-center gap-2">
          {breakdown.map((stars, i) => (
            <div key={stars} className="flex items-center gap-3 text-[12px]">
              <span className="text-muted-foreground w-6 text-right shrink-0">{stars}★</span>
              <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground rounded-full"
                  style={{ width: `${(counts[i] / total) * 100}%` }}
                />
              </div>
              <span className="text-muted-foreground w-5 shrink-0">{counts[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort + filter strip */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <WireLabel>{total} reviews</WireLabel>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-sm text-sm hover:bg-muted transition-colors">
            Most helpful
            <ChevronRight size={12} className="rotate-90" />
          </button>
          <button className="px-3 py-1.5 border border-border rounded-sm text-sm hover:bg-muted transition-colors">
            With photos
          </button>
          <button className="px-3 py-1.5 border border-border rounded-sm text-sm hover:bg-muted transition-colors">
            Verified only
          </button>
        </div>
      </div>

      {/* Review cards */}
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.author} className="border border-border rounded-sm p-4 bg-card">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center">
                  <User size={13} className="text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-medium">{r.author}</p>
                    {r.verified && (
                      <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                        <CheckCircle size={10} /> Verified purchase
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{r.date}</p>
                </div>
              </div>
              <StarRating rating={r.rating} />
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{r.body}</p>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
              <button className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                <ThumbsUp size={11} />
                Helpful ({r.helpful})
              </button>
              <span className="text-border">·</span>
              <button className="text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load more */}
      <div className="mt-6 flex justify-center">
        <button className="px-6 py-2.5 border border-border rounded-sm text-sm hover:bg-muted transition-colors">
          Load more reviews (39)
        </button>
      </div>
    </section>
  );
}

// ─── Related Products ─────────────────────────────────────────────────────────

function RelatedProducts() {
  const items = [
    { title: "Ceramic Espresso Cup", artisan: "Pottery by Lena K.", price: "R220", rating: 4.7 },
    { title: "Stoneware Side Plate", artisan: "Pottery by Lena K.", price: "R295", rating: 4.9 },
    { title: "Beeswax Candle Set", artisan: "The Wax Collective", price: "R245", rating: 4.8 },
    { title: "Linen Tote Bag", artisan: "Thread & Stitch", price: "R290", rating: 4.6 },
  ];

  return (
    <section className="py-8 border-t border-border">
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-display text-xl font-normal">You might also like</h2>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          View all →
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((p) => (
          <div key={p.title} className="border border-border rounded-sm bg-card overflow-hidden hover:shadow-sm transition-shadow group">
            <ImageBox aspect="aspect-square" label="Product image" />
            <div className="p-3">
              <p className="text-sm font-medium leading-snug mb-0.5 line-clamp-2 group-hover:underline">
                {p.title}
              </p>
              <p className="text-[11px] text-muted-foreground mb-1.5">{p.artisan}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{p.price}</span>
                <StarRating rating={p.rating} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Sticky Mobile CTA ────────────────────────────────────────────────────────

function StickyMobileCTA({ quantity, setQuantity, onAddToCart }: { quantity: number; setQuantity: (n: number) => void; onAddToCart: () => void }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border px-4 py-3 shadow-lg">
      <div className="flex items-center gap-3">
        {/* Qty stepper */}
        <div className="flex items-center border border-border rounded-sm overflow-hidden shrink-0">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors border-r border-border"
          >
            −
          </button>
          <span className="w-8 h-9 flex items-center justify-center text-sm font-medium">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors border-l border-border"
          >
            +
          </button>
        </div>
        {/* Add to cart */}
        <button onClick={onAddToCart} className="flex-1 h-9 bg-foreground text-background text-sm font-medium rounded-sm flex items-center justify-center gap-2">
          <ShoppingBag size={14} />
          Add to Cart · R{385 * quantity}
        </button>
        <button className="w-9 h-9 border border-border rounded-sm flex items-center justify-center hover:bg-muted transition-colors shrink-0">
          <Heart size={14} />
        </button>
      </div>
      {/* Mobile annotation */}
      <p className="text-center text-[10px] text-muted-foreground mt-1.5 tracking-wide uppercase">
        ↑ Sticky CTA — mobile only
      </p>
    </div>
  );
}

// ─── Wireframe Annotations ────────────────────────────────────────────────────

function ProductAnnotations() {
  const { mode } = useFidelity();
  if (mode !== "wireframe") return null;
  return (
    <div className="max-w-6xl mx-auto px-4 py-6 border-t border-dashed border-[#c0c0bb]">
      <WireLabel className="block mb-4">Wireframe annotations — Product Detail page</WireLabel>
      <div className="grid md:grid-cols-3 gap-4 text-[12px] text-muted-foreground">
        <div className="border border-dashed border-[#c0c0bb] rounded-sm p-3">
          <p className="font-medium text-foreground mb-1">Mobile behaviour</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Sticky "Add to Cart" bar at bottom</li>
            <li>Gallery thumbnails: horizontal scroll</li>
            <li>Artisan teaser collapses below image</li>
            <li>Reviews stack full-width</li>
          </ul>
        </div>
        <div className="border border-dashed border-[#c0c0bb] rounded-sm p-3">
          <p className="font-medium text-foreground mb-1">Trust signals for Olivia</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Artisan card above the fold</li>
            <li>Verified badge + location visible</li>
            <li>Materials section with provenance</li>
            <li>Review count + recommendation %</li>
            <li>Artisan story teaser below specs</li>
          </ul>
        </div>
        <div className="border border-dashed border-[#c0c0bb] rounded-sm p-3">
          <p className="font-medium text-foreground mb-1">Section hierarchy</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Image gallery + product info: above fold</li>
            <li>Materials & sourcing: disclosure layer</li>
            <li>Artisan story: emotional connection</li>
            <li>Reviews: social proof</li>
            <li>Related products: discovery tail</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  return (
    <>
      {/* Sticky search — mobile only */}
      <SearchBar sticky />

      <HeroBanner />

      {/* Desktop search below hero */}
      <SearchBar />

      <MoodFilterBar active={activeFilter} setActive={setActiveFilter} />

      <main>
        <CuratedCollections />
        <TrustBar />
        <ProductGrid
          activeFilter={activeFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onProductClick={() => onNavigate("product")}
        />
        <ArtisanStripBanner onArtisanClick={() => onNavigate("artisan")} />
      </main>

      <HomeAnnotations />
      <Footer />
    </>
  );
}

// ─── Artisan Profile Page ──────────────────────────────────────────────────────

function ArtisanPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <>
      <Breadcrumb
        onNavigate={onNavigate}
        trail={[
          { label: "Home", page: "home" },
          { label: "Artisans", page: "home" },
          { label: "Pottery by Lena K." },
        ]}
      />
      <main>
        <ArtisanHero />
        <TrustSignalsBar />
        <CraftProcess />
        <ArtisanStory />
        <ArtisanProducts onProductClick={() => onNavigate("product")} />
        <CustomerLove />
        <FollowCTA />
      </main>
      <ArtisanAnnotations />
    </>
  );
}

// ─── Product Detail Page ───────────────────────────────────────────────────────

function ProductPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [activeThumb, setActiveThumb] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <Breadcrumb
        onNavigate={onNavigate}
        trail={[
          { label: "Home", page: "home" },
          { label: "Ceramics", page: "home" },
          { label: "Hand-thrown Ceramic Mug" },
        ]}
      />

      <main className="max-w-6xl mx-auto px-4 pb-24 md:pb-10">
        {/* ── Above-the-fold: gallery + product info ── */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-8 lg:gap-12 py-8">
          <ImageGallery activeThumb={activeThumb} setActiveThumb={setActiveThumb} />
          <ProductInfo quantity={quantity} setQuantity={setQuantity} onAddToCart={() => onNavigate("cart")} />
        </div>

        <Divider />

        {/* ── Transparency section ── */}
        <MaterialsSection />

        {/* ── Artisan story teaser ── */}
        <ArtisanStoryTeaser onArtisanClick={() => onNavigate("artisan")} />

        {/* ── Social proof ── */}
        <ReviewsSection />

        {/* ── Discovery tail ── */}
        <RelatedProducts />
      </main>

      {/* ── Annotations ── */}
      <ProductAnnotations />

      {/* ── Mobile sticky CTA ── */}
      <StickyMobileCTA quantity={quantity} setQuantity={setQuantity} onAddToCart={() => onNavigate("cart")} />
    </>
  );
}

// ─── Shopping Cart Page ─────────────────────────────────────────────────────

function CartPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const { mode } = useFidelity();
  const [items, setItems] = useState([
    { id: 1, title: "Hand-thrown Ceramic Mug", artisan: "Pottery by Lena K.", price: 385, qty: 2 },
    { id: 2, title: "Ceramic Espresso Cup", artisan: "Pottery by Lena K.", price: 220, qty: 1 },
    { id: 3, title: "Linen Tote Bag, Natural", artisan: "Thread & Stitch", price: 290, qty: 1 },
  ]);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
    );
  };
  const removeItem = (id: number) => setItems((prev) => prev.filter((it) => it.id !== id));

  const subtotal = items.reduce((sum, it) => sum + it.price * it.qty, 0);
  const shipping = subtotal > 0 ? 65 : 0;
  const total = subtotal + shipping;

  return (
    <>
      <Breadcrumb
        onNavigate={onNavigate}
        trail={[{ label: "Home", page: "home" }, { label: "Shopping Cart" }]}
      />

      <main className="max-w-6xl mx-auto px-4 pb-32 md:pb-16">
        <div className="py-6 md:py-8">
          <WireLabel className="block mb-1">{items.length} items in your cart</WireLabel>
          <h1 className="font-display text-2xl md:text-3xl font-normal">Shopping Cart</h1>
        </div>

        {items.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-border rounded-sm">
            <p className="text-sm text-muted-foreground mb-4">Your cart is empty.</p>
            <button
              onClick={() => onNavigate("home")}
              className="px-6 py-2.5 bg-foreground text-background text-sm font-medium rounded-sm hover:bg-foreground/90 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-[1fr_320px] gap-8 lg:gap-12">
            {/* ── Line items ── */}
            <div>
              {/* Desktop table header */}
              <div className="hidden md:grid grid-cols-[80px_1fr_120px_100px_40px] gap-4 pb-3 border-b border-border text-[11px] uppercase tracking-wider text-muted-foreground">
                <span>Item</span>
                <span>Details</span>
                <span className="text-center">Quantity</span>
                <span className="text-right">Price</span>
                <span />
              </div>

              {items.map((it) => (
                <div
                  key={it.id}
                  className="grid grid-cols-[64px_1fr] md:grid-cols-[80px_1fr_120px_100px_40px] gap-3 md:gap-4 items-center py-4 border-b border-border"
                >
                  <ImageBox aspect="aspect-square" label="" className="rounded-sm" />

                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug line-clamp-2">{it.title}</p>
                    <p className="text-[12px] text-muted-foreground mt-0.5">{it.artisan}</p>
                    {/* Mobile-only qty + price row */}
                    <div className="md:hidden flex items-center justify-between mt-2">
                      <div className="flex items-center border border-border rounded-sm overflow-hidden">
                        <button
                          onClick={() => updateQty(it.id, -1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors border-r border-border"
                        >
                          −
                        </button>
                        <span className="w-7 h-8 flex items-center justify-center text-sm font-medium">
                          {it.qty}
                        </span>
                        <button
                          onClick={() => updateQty(it.id, 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors border-l border-border"
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">R{it.price * it.qty}</span>
                        <button onClick={() => removeItem(it.id)} className="text-muted-foreground hover:text-foreground">
                          <X size={15} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop-only qty stepper */}
                  <div className="hidden md:flex items-center justify-center border border-border rounded-sm overflow-hidden w-fit mx-auto">
                    <button
                      onClick={() => updateQty(it.id, -1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors border-r border-border"
                    >
                      −
                    </button>
                    <span className="w-7 h-8 flex items-center justify-center text-sm font-medium">{it.qty}</span>
                    <button
                      onClick={() => updateQty(it.id, 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-colors border-l border-border"
                    >
                      +
                    </button>
                  </div>

                  <span className="hidden md:block text-right text-sm font-medium">R{it.price * it.qty}</span>

                  <button
                    onClick={() => removeItem(it.id)}
                    className="hidden md:flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}

              <button
                onClick={() => onNavigate("home")}
                className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
              >
                <ChevronLeft size={14} /> Continue shopping
              </button>
            </div>

            {/* ── Order summary ── */}
            <div className="border border-border rounded-sm bg-card p-5 h-fit md:sticky md:top-20">
              <WireLabel className="block mb-3">Order Summary</WireLabel>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>R{subtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>R{shipping}</span>
                </div>
                <Divider className="my-1" />
                <div className="flex items-center justify-between text-base font-medium">
                  <span>Total</span>
                  <span>R{total}</span>
                </div>
              </div>

              {/* Promo code */}
              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Promo code"
                  className="flex-1 min-w-0 h-9 px-3 border border-border rounded-sm bg-background text-sm placeholder:text-muted-foreground"
                />
                <button className="px-4 h-9 border border-border rounded-sm text-sm hover:bg-muted transition-colors shrink-0">
                  Apply
                </button>
              </div>

              <button
                onClick={() => onNavigate("checkout")}
                className="hidden md:flex w-full mt-5 h-11 bg-foreground text-background text-sm font-medium rounded-sm hover:bg-foreground/90 transition-colors items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight size={14} />
              </button>

              <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
                <Shield size={12} /> Secure checkout · Ethically sourced materials
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile sticky checkout bar */}
      {items.length > 0 && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border px-4 py-3 shadow-lg">
          <button
            onClick={() => onNavigate("checkout")}
            className="w-full h-11 bg-foreground text-background text-sm font-medium rounded-sm flex items-center justify-center gap-2"
          >
            Checkout · R{total} <ArrowRight size={14} />
          </button>
        </div>
      )}

      {mode === "wireframe" && (
        <div className="max-w-6xl mx-auto px-4 py-6 border-t border-dashed border-[#c0c0bb]">
          <WireLabel className="block mb-4">Wireframe annotations — Shopping Cart page</WireLabel>
          <div className="grid md:grid-cols-3 gap-4 text-[12px] text-muted-foreground">
            {[
              { title: "Desktop layout", items: ["Table-style line items", "Order summary sticky in right rail", "Qty steppers inline per row"] },
              { title: "Mobile layout", items: ["Stacked card-style line items", "Qty + price inline under title", "Sticky checkout bar replaces summary CTA"] },
              { title: "Edge cases", items: ["Empty cart state with CTA back to shop", "Promo code field above checkout button", "Trust line reinforces secure checkout"] },
            ].map((col) => (
              <div key={col.title} className="border border-dashed border-[#c0c0bb] rounded-sm p-3">
                <p className="font-medium text-foreground mb-1.5">{col.title}</p>
                <ul className="space-y-1 list-disc list-inside">
                  {col.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Checkout Page ──────────────────────────────────────────────────────────

function CheckoutPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const { mode } = useFidelity();
  const [step, setStep] = useState<"shipping" | "payment" | "review">("shipping");

  const subtotal = 1280;
  const shipping = 65;
  const total = subtotal + shipping;

  const steps: { key: typeof step; label: string }[] = [
    { key: "shipping", label: "Shipping" },
    { key: "payment", label: "Payment" },
    { key: "review", label: "Review" },
  ];

  return (
    <>
      <Breadcrumb
        onNavigate={onNavigate}
        trail={[{ label: "Home", page: "home" }, { label: "Cart", page: "cart" }, { label: "Checkout" }]}
      />

      <main className="max-w-6xl mx-auto px-4 pb-32 md:pb-16">
        {/* Step indicator */}
        <div className="flex items-center gap-2 md:gap-4 py-6 md:py-8 overflow-x-auto">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2 md:gap-4 shrink-0">
              <button
                onClick={() => setStep(s.key)}
                className={`flex items-center gap-2 ${step === s.key ? "text-foreground" : "text-muted-foreground"}`}
              >
                <span
                  className={`w-6 h-6 rounded-full border flex items-center justify-center text-[11px] font-medium
                    ${step === s.key ? "bg-foreground text-background border-foreground" : "border-border"}`}
                >
                  {i + 1}
                </span>
                <span className="text-sm font-medium whitespace-nowrap">{s.label}</span>
              </button>
              {i < steps.length - 1 && <ChevronRight size={14} className="text-muted-foreground" />}
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-[1fr_320px] gap-8 lg:gap-12">
          {/* ── Step content ── */}
          <div>
            {step === "shipping" && (
              <div className="space-y-4">
                <WireLabel className="block">Shipping Address</WireLabel>
                <div className="grid sm:grid-cols-2 gap-3">
                  <input placeholder="Full name" className="h-11 px-3 border border-border rounded-sm bg-background text-sm placeholder:text-muted-foreground" />
                  <input placeholder="Phone number" className="h-11 px-3 border border-border rounded-sm bg-background text-sm placeholder:text-muted-foreground" />
                </div>
                <input placeholder="Street address" className="w-full h-11 px-3 border border-border rounded-sm bg-background text-sm placeholder:text-muted-foreground" />
                <div className="grid sm:grid-cols-3 gap-3">
                  <input placeholder="City" className="h-11 px-3 border border-border rounded-sm bg-background text-sm placeholder:text-muted-foreground" />
                  <input placeholder="Province" className="h-11 px-3 border border-border rounded-sm bg-background text-sm placeholder:text-muted-foreground" />
                  <input placeholder="Postal code" className="h-11 px-3 border border-border rounded-sm bg-background text-sm placeholder:text-muted-foreground" />
                </div>
                <div className="border border-border rounded-sm p-4 bg-card flex items-start gap-3 mt-2">
                  <Package size={16} className="mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Standard delivery · 3–5 business days</p>
                    <p className="text-[12px] text-muted-foreground mt-0.5">R65 · Tracked, ships from artisan's studio</p>
                  </div>
                </div>
                <button
                  onClick={() => setStep("payment")}
                  className="hidden md:flex w-full sm:w-auto px-8 h-11 bg-foreground text-background text-sm font-medium rounded-sm hover:bg-foreground/90 transition-colors items-center justify-center gap-2"
                >
                  Continue to Payment <ArrowRight size={14} />
                </button>
              </div>
            )}

            {step === "payment" && (
              <div className="space-y-4">
                <WireLabel className="block">Payment Method</WireLabel>
                <div className="grid sm:grid-cols-3 gap-2">
                  {["Card", "Instant EFT", "Mobile Pay"].map((m, i) => (
                    <button
                      key={m}
                      className={`h-11 border rounded-sm text-sm font-medium transition-colors
                        ${i === 0 ? "bg-foreground text-background border-foreground" : "border-border hover:bg-muted"}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <input placeholder="Card number" className="w-full h-11 px-3 border border-border rounded-sm bg-background text-sm placeholder:text-muted-foreground" />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="MM / YY" className="h-11 px-3 border border-border rounded-sm bg-background text-sm placeholder:text-muted-foreground" />
                  <input placeholder="CVC" className="h-11 px-3 border border-border rounded-sm bg-background text-sm placeholder:text-muted-foreground" />
                </div>
                <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                  <Shield size={13} /> Payment details are encrypted and never stored
                </div>
                <div className="hidden md:flex gap-3">
                  <button
                    onClick={() => setStep("shipping")}
                    className="px-6 h-11 border border-border rounded-sm text-sm hover:bg-muted transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep("review")}
                    className="flex-1 px-8 h-11 bg-foreground text-background text-sm font-medium rounded-sm hover:bg-foreground/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Review Order <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {step === "review" && (
              <div className="space-y-5">
                <WireLabel className="block">Review &amp; Place Order</WireLabel>

                <div className="border border-border rounded-sm p-4 bg-card flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Shipping to</p>
                    <p className="text-sm">123 Studio Lane, Woodstock, Cape Town, 7925</p>
                  </div>
                  <button onClick={() => setStep("shipping")} className="text-sm text-muted-foreground hover:text-foreground shrink-0">
                    Edit
                  </button>
                </div>

                <div className="border border-border rounded-sm p-4 bg-card flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">Payment</p>
                    <p className="text-sm">Card ending •••• 4242</p>
                  </div>
                  <button onClick={() => setStep("payment")} className="text-sm text-muted-foreground hover:text-foreground shrink-0">
                    Edit
                  </button>
                </div>

                <div className="space-y-3">
                  {[
                    { title: "Hand-thrown Ceramic Mug ×2", price: 770 },
                    { title: "Ceramic Espresso Cup", price: 220 },
                    { title: "Linen Tote Bag, Natural", price: 290 },
                  ].map((it) => (
                    <div key={it.title} className="flex items-center gap-3">
                      <ImageBox aspect="aspect-square" label="" className="w-12 h-12 rounded-sm shrink-0" />
                      <span className="text-sm flex-1">{it.title}</span>
                      <span className="text-sm font-medium">R{it.price}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onNavigate("home")}
                  className="hidden md:flex w-full h-12 bg-foreground text-background text-sm font-medium rounded-sm hover:bg-foreground/90 transition-colors items-center justify-center gap-2"
                >
                  <CheckCircle size={15} /> Place Order · R{total}
                </button>
              </div>
            )}
          </div>

          {/* ── Order summary (desktop sidebar) ── */}
          <div className="hidden md:block border border-border rounded-sm bg-card p-5 h-fit sticky top-20">
            <WireLabel className="block mb-3">Order Summary</WireLabel>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>R{subtotal}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>R{shipping}</span>
              </div>
              <Divider className="my-1" />
              <div className="flex items-center justify-between text-base font-medium">
                <span>Total</span>
                <span>R{total}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile sticky step CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border px-4 py-3 shadow-lg">
        <div className="flex items-center justify-between mb-2 text-sm">
          <span className="text-muted-foreground">Total</span>
          <span className="font-medium">R{total}</span>
        </div>
        {step === "shipping" && (
          <button onClick={() => setStep("payment")} className="w-full h-11 bg-foreground text-background text-sm font-medium rounded-sm flex items-center justify-center gap-2">
            Continue to Payment <ArrowRight size={14} />
          </button>
        )}
        {step === "payment" && (
          <button onClick={() => setStep("review")} className="w-full h-11 bg-foreground text-background text-sm font-medium rounded-sm flex items-center justify-center gap-2">
            Review Order <ArrowRight size={14} />
          </button>
        )}
        {step === "review" && (
          <button onClick={() => onNavigate("home")} className="w-full h-11 bg-foreground text-background text-sm font-medium rounded-sm flex items-center justify-center gap-2">
            <CheckCircle size={15} /> Place Order
          </button>
        )}
      </div>

      {mode === "wireframe" && (
        <div className="max-w-6xl mx-auto px-4 py-6 border-t border-dashed border-[#c0c0bb]">
          <WireLabel className="block mb-4">Wireframe annotations — Checkout page</WireLabel>
          <div className="grid md:grid-cols-3 gap-4 text-[12px] text-muted-foreground">
            {[
              { title: "Flow", items: ["3-step checkout: Shipping → Payment → Review", "Step indicator doubles as tab nav for this wireframe", "Edit links return user to earlier step"] },
              { title: "Desktop layout", items: ["Order summary persists in sticky right rail", "Primary CTA inline at bottom of each step"] },
              { title: "Mobile layout", items: ["Order summary collapses into sticky bottom bar", "Total + primary action always visible", "Form fields stack full-width"] },
            ].map((col) => (
              <div key={col.title} className="border border-dashed border-[#c0c0bb] rounded-sm p-3">
                <p className="font-medium text-foreground mb-1.5">{col.title}</p>
                <ul className="space-y-1 list-disc list-inside">
                  {col.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ─── UX Flows Page (Task 2) ───────────────────────────────────────────────────

function FlowNode({
  type, label, sub, x, y, w = 140,
}: {
  type: "oval" | "rect" | "diamond";
  label: string;
  sub?: string;
  x: number; y: number; w?: number;
}) {
  const h = type === "diamond" ? 52 : 44;
  const rx = type === "oval" ? h / 2 : 4;
  return (
    <g transform={`translate(${x},${y})`}>
      {type === "diamond" ? (
        <polygon
          points={`${w / 2},0 ${w},${h / 2} ${w / 2},${h} 0,${h / 2}`}
          fill="var(--card)" stroke="var(--foreground)" strokeWidth="1.5"
        />
      ) : (
        <rect x={0} y={0} width={w} height={h} rx={rx}
          fill={type === "oval" ? "var(--foreground)" : "var(--card)"}
          stroke="var(--foreground)" strokeWidth="1.5"
        />
      )}
      <text
        x={w / 2} y={sub ? h / 2 - 5 : h / 2 + 1}
        textAnchor="middle" dominantBaseline="middle"
        fontSize="11" fontWeight="500"
        fill={type === "oval" ? "var(--card)" : "var(--foreground)"}
        fontFamily="DM Sans, system-ui, sans-serif"
      >
        {label}
      </text>
      {sub && (
        <text x={w / 2} y={h / 2 + 10} textAnchor="middle" dominantBaseline="middle"
          fontSize="9" fill="var(--muted-foreground)"
          fontFamily="DM Sans, system-ui, sans-serif"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label?: string }) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  return (
    <g>
      <defs>
        <marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="var(--foreground)" />
        </marker>
      </defs>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="var(--foreground)" strokeWidth="1.25"
        markerEnd="url(#ah)"
      />
      {label && (
        <text x={mx + 4} y={my - 4} fontSize="9" fill="var(--muted-foreground)"
          fontFamily="DM Sans, system-ui, sans-serif"
        >
          {label}
        </text>
      )}
    </g>
  );
}

function FlowsPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 pb-24">
      {/* Header */}
      <div className="py-8 md:py-10">
        <WireLabel className="block mb-1">Task 2 — UX Diagrams</WireLabel>
        <h1 className="font-display text-3xl md:text-4xl font-normal">User &amp; Task Flows</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl">
          Standard UX flowchart symbols: <strong>Ovals</strong> = Start/End, <strong>Rectangles</strong> = Screens/Actions,
          <strong> Diamonds</strong> = Decisions, <strong>Arrows</strong> = Flow direction.
          Annotated labels describe the purpose of each step.
        </p>
      </div>

      {/* ── User Flow ── */}
      <section className="mb-12">
        <h2 className="font-display text-xl mb-1">User Flow — End-to-End Journey</h2>
        <p className="text-[12px] text-muted-foreground mb-4">
          Shows the full path a new visitor takes from landing on the site to completing a purchase.
          Branches cover key decision points: browsing vs searching, continuing to checkout vs abandoning cart.
        </p>
        <div className="border border-border rounded-sm bg-card overflow-x-auto p-4">
          <svg viewBox="0 0 980 540" xmlns="http://www.w3.org/2000/svg" className="w-full min-w-[780px]">
            {/* Row 1: Entry */}
            <FlowNode type="oval" label="START" x={20} y={14} w={100} />
            <Arrow x1={120} y1={36} x2={164} y2={36} />
            <FlowNode type="rect" label="Land on Home Page" x={164} y={14} w={150} />
            <Arrow x1={314} y1={36} x2={354} y2={36} />
            <FlowNode type="diamond" label="Browse or Search?" x={354} y={10} w={160} />

            {/* Browse branch (top) */}
            <Arrow x1={514} y1={36} x2={558} y2={36} label="Browse" />
            <FlowNode type="rect" label="View Collections /\nMood Filters" x={558} y={14} w={160} />
            <Arrow x1={718} y1={36} x2={762} y2={36} />
            <FlowNode type="rect" label="Product Grid" x={762} y={14} w={140} />

            {/* Search branch (below diamond) */}
            <Arrow x1={434} y1={62} x2={434} y2={130} label="Search" />
            <FlowNode type="rect" label="Enter Search Query" x={354} y={130} w={160} />
            <Arrow x1={514} y1={152} x2={762} y2={152} />
            <FlowNode type="rect" label="View Search Results" x={762} y={130} w={140} />

            {/* Merge into Product Detail */}
            <Arrow x1={832} y1={58} x2={832} y2={200} />
            <Arrow x1={832} y1={174} x2={832} y2={200} />
            <FlowNode type="rect" label="Product Detail Page" x={762} y={200} w={140} />

            {/* Decision: Add to Cart */}
            <FlowNode type="diamond" label="Add to Cart?" x={580} y={196} w={160} />
            <Arrow x1={762} y1={222} x2={740} y2={222} />

            {/* No branch: keep browsing */}
            <Arrow x1={660} y1={196} x2={660} y2={130} label="No (back)" />
            <Arrow x1={660} y1={130} x2={762} y2={130} />

            {/* Yes branch */}
            <Arrow x1={580} y1={222} x2={540} y2={222} label="Yes" />
            <FlowNode type="rect" label="Shopping Cart" x={380} y={200} w={140} />
            <Arrow x1={540} y1={222} x2={520} y2={222} />

            {/* Decision: Checkout */}
            <FlowNode type="diamond" label="Checkout?" x={200} y={196} w={160} />
            <Arrow x1={380} y1={222} x2={360} y2={222} />

            {/* Abandon branch */}
            <Arrow x1={280} y1={196} x2={280} y2={130} label="Abandon" />
            <FlowNode type="rect" label="Save Cart / Browse More" x={200} y={110} w={160} />

            {/* Proceed branch */}
            <Arrow x1={200} y1={222} x2={160} y2={222} label="Proceed" />
            <FlowNode type="rect" label="Checkout — Shipping" x={20} y={200} w={140} />

            {/* Checkout steps */}
            <Arrow x1={90} y1={244} x2={90} y2={300} />
            <FlowNode type="rect" label="Checkout — Payment" x={20} y={300} w={140} />
            <Arrow x1={90} y1={344} x2={90} y2={400} />
            <FlowNode type="rect" label="Checkout — Review" x={20} y={400} w={140} />
            <Arrow x1={90} y1={444} x2={90} y2={480} />

            {/* Decision: Payment OK */}
            <FlowNode type="diamond" label="Payment OK?" x={200} y={440} w={150} />
            <Arrow x1={160} y1={466} x2={200} y2={466} />

            {/* Failed */}
            <Arrow x1={350} y1={466} x2={380} y2={466} label="Fail" />
            <FlowNode type="rect" label="Error / Retry" x={380} y={444} w={130} />
            <Arrow x1={445} y1={444} x2={445} y2={422} />
            <Arrow x1={445} y1={422} x2={350} y2={400} />
            <FlowNode type="rect" label="Review Step" x={200} y={388} w={130} />

            {/* Success */}
            <Arrow x1={275} y1={492} x2={275} y2={520} label="Success" />
            <FlowNode type="rect" label="Order Confirmation" x={200} y={500} w={150} />
            <Arrow x1={350} y1={522} x2={400} y2={522} />
            <FlowNode type="oval" label="END" x={400} y={502} w={100} />

            {/* Artisan profile path from product */}
            <Arrow x1={762} y1={244} x2={762} y2={310} />
            <FlowNode type="rect" label="Artisan Profile Page" x={762} y={310} w={140} />
            <Arrow x1={762} y1={354} x2={762} y2={400} />
            <FlowNode type="rect" label="View Artisan Products" x={762} y={400} w={140} />
            <Arrow x1={762} y1={444} x2={762} y2={466} />
            <Arrow x1={762} y1={466} x2={740} y2={466} />
            <Arrow x1={580} y1={466} x2={520} y2={222} />

            {/* Legend */}
            <rect x={580} y={460} width={200} height={72} rx={4} fill="var(--muted)" stroke="var(--border)" strokeWidth="1" />
            <rect x={592} y={472} width={40} height={18} rx={9} fill="var(--foreground)" />
            <text x={640} y={484} fontSize="9" fill="var(--foreground)" fontFamily="DM Sans">Start/End (Oval)</text>
            <rect x={592} y={496} width={40} height={18} rx={3} fill="var(--card)" stroke="var(--foreground)" strokeWidth="1.2" />
            <text x={640} y={508} fontSize="9" fill="var(--foreground)" fontFamily="DM Sans">Screen/Action (Rect)</text>
            <polygon points="632,516 652,522 632,528 612,522" fill="var(--card)" stroke="var(--foreground)" strokeWidth="1.2" />
            <text x={660} y={525} fontSize="9" fill="var(--foreground)" fontFamily="DM Sans">Decision (Diamond)</text>
          </svg>
        </div>

        {/* Annotations */}
        <div className="mt-4 grid sm:grid-cols-3 gap-3 text-[12px] text-muted-foreground">
          {[
            { label: "Entry point", note: "Users arrive via organic search, social media, or direct link. They land on the Home page with mood filters and curated collections above the fold." },
            { label: "Browse vs Search decision", note: "Most users browse visually using mood filters (Rustic, Botanical, etc.). Power users use the search bar. Both paths converge at the Product Grid." },
            { label: "Artisan detour", note: "Users can detour from Product Detail to the Artisan Profile, see more products by that maker, and loop back into the purchase flow." },
          ].map((a) => (
            <div key={a.label} className="border border-dashed border-[#c0c0bb] rounded-sm p-3">
              <p className="font-medium text-foreground mb-1">{a.label}</p>
              <p>{a.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Task Flow ── */}
      <section>
        <h2 className="font-display text-xl mb-1">Task Flow — Purchase a Specific Product</h2>
        <p className="text-[12px] text-muted-foreground mb-4">
          Focused on one goal: a returning user purchases the Hand-thrown Ceramic Mug. No browsing detours — straight-line
          happy path from entry to confirmation, with the single critical decision point at payment.
        </p>
        <div className="border border-border rounded-sm bg-card overflow-x-auto p-4">
          <svg viewBox="0 0 900 160" xmlns="http://www.w3.org/2000/svg" className="w-full min-w-[700px]">
            <FlowNode type="oval" label="START" x={0} y={56} w={90} />
            <Arrow x1={90} y1={78} x2={120} y2={78} />
            <FlowNode type="rect" label="Home Page" x={120} y={56} w={120} />
            <Arrow x1={240} y1={78} x2={270} y2={78} />
            <FlowNode type="rect" label="Product Detail" x={270} y={56} w={130} />
            <Arrow x1={400} y1={78} x2={430} y2={78} />
            <FlowNode type="rect" label="Add to Cart" x={430} y={56} w={120} />
            <Arrow x1={550} y1={78} x2={580} y2={78} />
            <FlowNode type="rect" label="Checkout 3 steps" x={580} y={56} w={140} />
            <Arrow x1={720} y1={78} x2={750} y2={78} />
            <FlowNode type="diamond" label="Payment?" x={750} y={52} w={120} />

            {/* Success */}
            <Arrow x1={870} y1={78} x2={900} y2={78} label="OK" />
            {/* nudge: diamond right edge to end oval */}
            <FlowNode type="oval" label="Confirmed" x={794} y={120} w={106} />
            <Arrow x1={810} y1={104} x2={810} y2={120} label="OK" />

            {/* Fail */}
            <Arrow x1={810} y1={52} x2={810} y2={10} label="Fail" />
            <Arrow x1={810} y1={10} x2={580} y2={10} />
            <Arrow x1={580} y1={10} x2={580} y2={56} />

            {/* Step labels */}
            {[
              { x: 155, y: 50, t: "1. Browse/navigate" },
              { x: 310, y: 50, t: "2. Read + inspect" },
              { x: 455, y: 50, t: "3. Select qty" },
              { x: 615, y: 50, t: "4. Ship → Pay → Review" },
            ].map((l) => (
              <text key={l.t} x={l.x} y={l.y} fontSize="8.5" textAnchor="middle"
                fill="var(--muted-foreground)" fontFamily="DM Sans, system-ui, sans-serif"
              >
                {l.t}
              </text>
            ))}
          </svg>
        </div>

        <div className="mt-4 grid sm:grid-cols-3 gap-3 text-[12px] text-muted-foreground">
          {[
            { label: "Task goal", note: "User wants to buy the Hand-thrown Ceramic Mug they saw on social media. They land on the home page and navigate directly to the product." },
            { label: "Critical path", note: "Home → Product Detail → Add to Cart → Checkout (3 steps: Shipping, Payment, Review) → Confirmation. No detours." },
            { label: "Failure recovery", note: "If payment fails, the user is returned to the Payment step (not back to cart), preserving their shipping info and order details." },
          ].map((a) => (
            <div key={a.label} className="border border-dashed border-[#c0c0bb] rounded-sm p-3">
              <p className="font-medium text-foreground mb-1">{a.label}</p>
              <p>{a.note}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// ─── Prioritization Matrix Page (Task 3) ─────────────────────────────────────

function MatrixPage() {
  const features = [
    // { label, x: 0–100 effort, y: 0–100 value, quadrant note }
    { label: "Product Image Gallery", x: 30, y: 88, dot: "#b5582e" },
    { label: "Mood Filters", x: 25, y: 80, dot: "#b5582e" },
    { label: "Artisan Story Section", x: 35, y: 75, dot: "#b5582e" },
    { label: "Add to Cart + Cart Page", x: 40, y: 92, dot: "#b5582e" },
    { label: "3-Step Checkout", x: 55, y: 90, dot: "#b5582e" },
    { label: "Search Bar", x: 50, y: 70, dot: "#6f7a5e" },
    { label: "Related Products", x: 45, y: 65, dot: "#6f7a5e" },
    { label: "Trust & Provenance Badges", x: 38, y: 60, dot: "#6f7a5e" },
    { label: "Review System", x: 60, y: 72, dot: "#6f7a5e" },
    { label: "Promo Code Field", x: 30, y: 40, dot: "#aaa" },
    { label: "Wishlist / Save", x: 35, y: 42, dot: "#aaa" },
    { label: "Size Guide Modal", x: 50, y: 38, dot: "#aaa" },
    { label: "Live Chat Widget", x: 78, y: 55, dot: "#888" },
    { label: "AR Product Preview", x: 90, y: 68, dot: "#888" },
    { label: "Loyalty Programme", x: 85, y: 50, dot: "#888" },
    { label: "Native Mobile App", x: 92, y: 72, dot: "#888" },
  ];

  const W = 540; const H = 440;
  const pad = 50;
  const cw = (W - pad * 2) / 2;
  const ch = (H - pad * 2) / 2;

  const px = (x: number) => pad + (x / 100) * (W - pad * 2);
  const py = (y: number) => H - pad - (y / 100) * (H - pad * 2);

  const insights = [
    {
      rank: "01",
      title: "Prioritise the full purchase funnel first",
      body: "The product gallery, cart page, and 3-step checkout sit in the high-value / low-effort quadrant. Without them the site cannot convert. These were built before any discovery or social features.",
    },
    {
      rank: "02",
      title: "Mood filters over a raw search bar",
      body: "Handmade craft is an emotionally driven purchase. Mood filters (Rustic, Botanical, Gifting) guide intent better than keyword search for first-time buyers. Search can come later once the catalogue is large.",
    },
    {
      rank: "03",
      title: "Artisan story as trust infrastructure",
      body: "The artisan profile and provenance badges are moderate effort but deliver high perceived trust. Buyers of handmade goods consistently cite maker story as the deciding factor over price. This makes them high-value despite not being transactional.",
    },
    {
      rank: "04",
      title: "Defer high-effort, low-certainty features",
      body: "AR product preview, a native mobile app, and a loyalty programme are high-effort. Their incremental conversion lift is unproven at this stage of the product. Deferred to a future sprint after baseline analytics are established.",
    },
    {
      rank: "05",
      title: "Small delighters: wishlist and promo codes",
      body: "Wishlist and promo codes score low on both axes right now — they require backend work and the user base is too small to measure their effect. However, they are quick wins if the checkout flow is already stable, so they are queued for sprint 2.",
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-4 pb-24">
      {/* Header */}
      <div className="py-8 md:py-10">
        <WireLabel className="block mb-1">Task 3 — Feature Prioritisation</WireLabel>
        <h1 className="font-display text-3xl md:text-4xl font-normal">2×2 Prioritization Matrix</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl">
          Features plotted by <strong>Effort to build</strong> (x-axis, low → high) against
          <strong> User value / Impact</strong> (y-axis, low → high). Each quadrant drives a different strategic decision.
        </p>
      </div>

      {/* ── Matrix ── */}
      <div className="border border-border rounded-sm bg-card overflow-x-auto p-4 mb-4">
        <svg viewBox={`-10 -10 ${W + 60} ${H + 60}`} xmlns="http://www.w3.org/2000/svg"
          className="w-full min-w-[480px]" style={{ maxHeight: "480px" }}>

          {/* Quadrant fills */}
          <rect x={pad} y={pad} width={cw} height={ch} fill="#f0fdf4" opacity="0.7" />
          <rect x={pad + cw} y={pad} width={cw} height={ch} fill="#fef9c3" opacity="0.6" />
          <rect x={pad} y={pad + ch} width={cw} height={ch} fill="#f1f5f9" opacity="0.6" />
          <rect x={pad + cw} y={pad + ch} width={cw} height={ch} fill="#fef2f2" opacity="0.6" />

          {/* Quadrant labels */}
          <text x={pad + cw / 2} y={pad + 18} textAnchor="middle" fontSize="10" fontWeight="600"
            fill="#16a34a" fontFamily="DM Sans">Quick Wins — Do Now</text>
          <text x={pad + cw * 1.5} y={pad + 18} textAnchor="middle" fontSize="10" fontWeight="600"
            fill="#ca8a04" fontFamily="DM Sans">Big Bets — Plan Carefully</text>
          <text x={pad + cw / 2} y={pad + ch + ch - 12} textAnchor="middle" fontSize="10" fontWeight="600"
            fill="#64748b" fontFamily="DM Sans">Fill-ins — Later</text>
          <text x={pad + cw * 1.5} y={pad + ch + ch - 12} textAnchor="middle" fontSize="10" fontWeight="600"
            fill="#dc2626" fontFamily="DM Sans">Avoid / Reconsider</text>

          {/* Axes */}
          <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="#1c1c1c" strokeWidth="1.5" markerEnd="url(#mah)" />
          <line x1={pad} y1={H - pad} x2={pad} y2={pad} stroke="#1c1c1c" strokeWidth="1.5" markerEnd="url(#mah)" />
          {/* Midlines */}
          <line x1={pad + cw} y1={pad} x2={pad + cw} y2={H - pad} stroke="#c0c0bb" strokeWidth="1" strokeDasharray="4 3" />
          <line x1={pad} y1={pad + ch} x2={W - pad} y2={pad + ch} stroke="#c0c0bb" strokeWidth="1" strokeDasharray="4 3" />

          <defs>
            <marker id="mah" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#1c1c1c" />
            </marker>
          </defs>

          {/* Axis labels */}
          <text x={(W - pad * 2) / 2 + pad} y={H - pad + 28} textAnchor="middle" fontSize="11"
            fill="#1c1c1c" fontWeight="500" fontFamily="DM Sans">Effort to Build →</text>
          <text x={14} y={(H - pad * 2) / 2 + pad} textAnchor="middle" fontSize="11"
            fill="#1c1c1c" fontWeight="500" fontFamily="DM Sans"
            transform={`rotate(-90, 14, ${(H - pad * 2) / 2 + pad})`}
          >User Value / Impact →</text>

          {/* Tick labels */}
          <text x={pad} y={H - pad + 14} textAnchor="middle" fontSize="8" fill="#6b6b6b">Low</text>
          <text x={W - pad} y={H - pad + 14} textAnchor="middle" fontSize="8" fill="#6b6b6b">High</text>
          <text x={pad - 8} y={H - pad} textAnchor="end" fontSize="8" fill="#6b6b6b">Low</text>
          <text x={pad - 8} y={pad} textAnchor="end" fontSize="8" fill="#6b6b6b">High</text>

          {/* Feature dots + labels */}
          {features.map((f) => {
            const cx2 = px(f.x);
            const cy2 = py(f.y);
            const labelRight = f.x < 60;
            return (
              <g key={f.label}>
                <circle cx={cx2} cy={cy2} r="5.5" fill={f.dot} opacity="0.9" />
                <text
                  x={labelRight ? cx2 + 9 : cx2 - 9}
                  y={cy2 + 1}
                  textAnchor={labelRight ? "start" : "end"}
                  fontSize="8.5"
                  fill="#1c1c1c"
                  fontFamily="DM Sans"
                >
                  {f.label}
                </text>
              </g>
            );
          })}

          {/* Dot legend */}
          {[
            { dot: "#b5582e", label: "Priority — do now" },
            { dot: "#6f7a5e", label: "High value — plan" },
            { dot: "#aaa", label: "Fill-in later" },
            { dot: "#888", label: "Avoid / defer" },
          ].map((l, i) => (
            <g key={l.label} transform={`translate(${W - pad - 5}, ${pad + 20 + i * 18})`}>
              <circle cx={-110} cy={0} r="4.5" fill={l.dot} />
              <text x={-102} y={1} fontSize="8.5" dominantBaseline="middle"
                fill="#1c1c1c" fontFamily="DM Sans">{l.label}</text>
            </g>
          ))}
        </svg>
      </div>

      {/* ── Key Feature Insights ── */}
      <section className="mt-10">
        <h2 className="font-display text-xl mb-1">Key Feature Insights</h2>
        <p className="text-[12px] text-muted-foreground mb-5">
          Five decisions derived from the matrix, each with rationale grounded in the ArtisanCrafts user and business context.
        </p>
        <div className="space-y-4">
          {insights.map((ins) => (
            <div key={ins.rank} className="border border-border rounded-sm bg-card p-5 grid grid-cols-[36px_1fr] gap-4">
              <span className="font-display text-2xl text-muted-foreground/40 leading-none mt-0.5">{ins.rank}</span>
              <div>
                <p className="font-medium text-sm mb-1.5">{ins.title}</p>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{ins.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// ─── Style Guide / Component Library Page (Task 7) ─────────────────────────────

function SwatchRow({ name, hex, role }: { name: string; hex: string; role: string }) {
  return (
    <div className="flex items-center gap-3 border border-border rounded-sm p-3 bg-card">
      <div className="w-10 h-10 rounded-sm border border-border shrink-0" style={{ backgroundColor: hex }} />
      <div className="min-w-0">
        <p className="text-sm font-medium">{name}</p>
        <p className="text-[11px] text-muted-foreground">{role} · {hex}</p>
      </div>
    </div>
  );
}

function StyleGuidePage() {
  const { mode } = useFidelity();

  const colorGroups: { title: string; swatches: { name: string; hex: string; role: string }[] }[] = [
    {
      title: "Primary",
      swatches: [
        { name: "Primary", hex: mode === "wireframe" ? "#1c1c1c" : "#b5582e", role: "Buttons, links, emphasis" },
        { name: "Primary hover", hex: mode === "wireframe" ? "#0f0f0f" : "#9c4924", role: "Hover/active state" },
      ],
    },
    {
      title: "Secondary",
      swatches: [
        { name: "Secondary", hex: mode === "wireframe" ? "#efefed" : "#6f7a5e", role: "Secondary actions, tags" },
        { name: "Accent", hex: mode === "wireframe" ? "#d4d4d0" : "#e8c39e", role: "Highlights, badges" },
      ],
    },
    {
      title: "Neutral",
      swatches: [
        { name: "Background", hex: mode === "wireframe" ? "#f7f7f5" : "#fbf7f1", role: "Page background" },
        { name: "Card", hex: "#ffffff", role: "Surface / cards" },
        { name: "Muted", hex: mode === "wireframe" ? "#e8e8e6" : "#efe7da", role: "Subtle fills" },
        { name: "Border", hex: mode === "wireframe" ? "#c8c8c4" : "#e3d8c6", role: "Dividers, outlines" },
        { name: "Foreground", hex: mode === "wireframe" ? "#1c1c1c" : "#2b2420", role: "Body text" },
        { name: "Muted foreground", hex: mode === "wireframe" ? "#6b6b6b" : "#8a7d6c", role: "Secondary text" },
      ],
    },
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 pb-24">
      <div className="py-8 md:py-10">
        <WireLabel className="block mb-1">Design System</WireLabel>
        <h1 className="font-display text-3xl md:text-4xl font-normal">ArtisanCrafts Style Guide</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl">
          Shared color, typography, spacing, and component tokens used across all five screens.
          Switch fidelity modes above to see how these tokens drive the whole site's look.
        </p>
      </div>

      {/* ── Colors ── */}
      <section className="py-8 border-t border-border">
        <h2 className="font-display text-xl mb-4">Color Styles</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {colorGroups.map((g) => (
            <div key={g.title}>
              <WireLabel className="block mb-2">{g.title}</WireLabel>
              <div className="space-y-2">
                {g.swatches.map((s) => <SwatchRow key={s.name} {...s} />)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Typography ── */}
      <section className="py-8 border-t border-border">
        <h2 className="font-display text-xl mb-4">Typography Styles</h2>
        <div className="space-y-5 border border-border rounded-sm p-5 bg-card">
          <div>
            <p className="font-display text-4xl">Heading / Display</p>
            <p className="text-[11px] text-muted-foreground mt-1">DM Serif Display · 36–40px · used for page titles</p>
          </div>
          <div>
            <p className="font-display text-2xl">Heading / Section</p>
            <p className="text-[11px] text-muted-foreground mt-1">DM Serif Display · 24px · used for section headers</p>
          </div>
          <div>
            <p className="text-base font-medium">Body / Medium — DM Sans 16px, 500 weight</p>
            <p className="text-sm text-muted-foreground mt-1">Body / Regular — DM Sans 14px, used for descriptions and paragraph copy across product, artisan, and checkout pages.</p>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Label / Eyebrow — DM Sans 11px uppercase, wide tracking</p>
          </div>
        </div>
      </section>

      {/* ── Spacing & Radius ── */}
      <section className="py-8 border-t border-border">
        <h2 className="font-display text-xl mb-4">Spacing &amp; Radius Tokens</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="border border-border rounded-sm p-5 bg-card">
            <WireLabel className="block mb-3">Spacing scale</WireLabel>
            <div className="space-y-2">
              {[2, 3, 4, 6, 8, 12].map((s) => (
                <div key={s} className="flex items-center gap-3">
                  <div className="bg-muted-foreground/30" style={{ width: `${s * 4}px`, height: "10px" }} />
                  <span className="text-[12px] text-muted-foreground">{s * 4}px · spacing-{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border border-border rounded-sm p-5 bg-card">
            <WireLabel className="block mb-3">Radius scale</WireLabel>
            <div className="flex items-end gap-4">
              {[{ label: "sm", r: "2px" }, { label: "md", r: "6px" }, { label: "lg", r: "10px" }, { label: "full", r: "999px" }].map((r) => (
                <div key={r.label} className="text-center">
                  <div className="w-14 h-14 bg-muted border border-border" style={{ borderRadius: r.r }} />
                  <p className="text-[11px] text-muted-foreground mt-1">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Iconography & Imagery ── */}
      <section className="py-8 border-t border-border">
        <h2 className="font-display text-xl mb-4">Iconography &amp; Imagery</h2>
        <div className="flex flex-wrap gap-4 border border-border rounded-sm p-5 bg-card mb-4">
          {[Search, ShoppingBag, Heart, User, Star, MapPin, Package, Shield, CheckCircle, ArrowRight].map((Icon, i) => (
            <div key={i} className="w-10 h-10 border border-border rounded-sm flex items-center justify-center">
              <Icon size={16} />
            </div>
          ))}
        </div>
        <p className="text-[12px] text-muted-foreground mb-3">lucide-react, 16–18px default, 1.5px stroke. Photography mode below toggles with the fidelity switcher.</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {["Ceramics", "Linen", "Botanicals", "Macrame", "Soap"].map((l) => (
            <ImageBox key={l} label={l} aspect="aspect-square" className="rounded-sm" />
          ))}
        </div>
      </section>

      {/* ── Components: Buttons ── */}
      <section className="py-8 border-t border-border">
        <h2 className="font-display text-xl mb-4">Buttons</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          <div className="border border-border rounded-sm p-4 bg-card">
            <button className="w-full h-10 bg-foreground text-background text-sm font-medium rounded-sm">Default</button>
            <p className="text-[11px] text-muted-foreground mt-2">Default — solid fill, primary token</p>
          </div>
          <div className="border border-border rounded-sm p-4 bg-card">
            <button className="w-full h-10 bg-foreground text-background text-sm font-medium rounded-sm opacity-90 -translate-y-px shadow-sm">Hover</button>
            <p className="text-[11px] text-muted-foreground mt-2">Hover — darkens 10%, subtle lift</p>
          </div>
          <div className="border border-border rounded-sm p-4 bg-card">
            <button className="w-full h-10 bg-foreground text-background text-sm font-medium rounded-sm scale-95">Active</button>
            <p className="text-[11px] text-muted-foreground mt-2">Active — scales to 97%, no shadow</p>
          </div>
          <div className="border border-border rounded-sm p-4 bg-card">
            <button className="w-full h-10 border border-foreground text-foreground text-sm font-medium rounded-sm">Secondary</button>
            <p className="text-[11px] text-muted-foreground mt-2">Outline style, used for tertiary actions</p>
          </div>
          <div className="border border-border rounded-sm p-4 bg-card">
            <button className="w-full h-10 bg-muted text-muted-foreground text-sm font-medium rounded-sm cursor-not-allowed">Disabled</button>
            <p className="text-[11px] text-muted-foreground mt-2">Disabled — muted fill, no pointer events</p>
          </div>
          <div className="border border-border rounded-sm p-4 bg-card flex items-center justify-center">
            <button className="w-10 h-10 border border-border rounded-sm flex items-center justify-center hover:bg-muted transition-colors">
              <Heart size={15} />
            </button>
            <p className="text-[11px] text-muted-foreground mt-2 ml-3">Icon button</p>
          </div>
        </div>
      </section>

      {/* ── Components: Cards & Inputs ── */}
      <section className="py-8 border-t border-border">
        <h2 className="font-display text-xl mb-4">Cards &amp; Inputs</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <WireLabel className="block mb-2">Product card</WireLabel>
            <div className="border border-border rounded-sm bg-card overflow-hidden w-48">
              <ImageBox label="Ceramic Mug" aspect="aspect-square" />
              <div className="p-3">
                <p className="text-sm font-medium">Hand-thrown Ceramic Mug</p>
                <p className="text-[12px] text-muted-foreground">Pottery by Lena K.</p>
                <p className="text-sm font-medium mt-1">R385</p>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">Default → hover: shadow lift + image scale 1.05 (Interactive mode)</p>
          </div>
          <div>
            <WireLabel className="block mb-2">Form input</WireLabel>
            <div className="space-y-2 max-w-xs">
              <input placeholder="Default state" className="w-full h-10 px-3 border border-border rounded-sm bg-background text-sm placeholder:text-muted-foreground" />
              <input placeholder="Focus state" className="w-full h-10 px-3 border-2 border-foreground rounded-sm bg-background text-sm" />
              <input placeholder="Disabled state" disabled className="w-full h-10 px-3 border border-border rounded-sm bg-muted text-sm text-muted-foreground" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─── Root App ───────────────────────────────────────────────────────────────────

function FidelitySwitcher() {
  const { mode, setMode } = useFidelity();
  const [open, setOpen] = useState(false);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const options: { key: Fidelity; label: string }[] = [
    { key: "wireframe", label: "Wireframe" },
    { key: "hifi", label: "High-Fidelity" },
    { key: "interactive", label: "Interactive" },
  ];

  const handleEnter = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setOpen(true);
  };

  const handleLeave = () => {
    leaveTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="fixed bottom-5 left-3 z-[60] max-w-[calc(100vw-1rem)] sm:max-w-none">
      <div
        className="relative inline-flex"
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {/* Dropdown — opens upward */}
        {open && (
          <div className="absolute left-0 bottom-full mb-2 min-w-[11rem] overflow-hidden rounded-2xl border border-border bg-background/98 p-1 shadow-xl backdrop-blur-sm sm:min-w-[12rem]">
            {options.map((o) => (
              <button
                key={o.key}
                onClick={() => { setMode(o.key); setOpen(false); }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[12px] font-medium uppercase tracking-[0.08em] transition-colors ${
                  mode === o.key ? "bg-foreground text-background" : "text-foreground hover:bg-muted"
                }`}
              >
                <span>{o.label}</span>
                {mode === o.key ? <span className="text-[10px] font-semibold">Current</span> : null}
              </button>
            ))}
          </div>
        )}

        {/* Trigger pill */}
        <div className="flex cursor-pointer items-center gap-2 rounded-full border border-border bg-background/95 py-1 pl-2 pr-3 shadow-lg backdrop-blur-sm transition-all hover:border-foreground hover:bg-background">
          <span className="hidden sm:inline text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">Mode</span>
          <span className="rounded-full bg-foreground px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-background shadow-sm">
            {options.find((o) => o.key === mode)?.label}
          </span>
        </div>
      </div>
    </div>
  );
}

function InteractionLegend() {
  const { mode } = useFidelity();
  if (mode !== "interactive") return null;
  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-[260px] bg-foreground text-background rounded-sm shadow-lg p-3 text-[11px] leading-relaxed">
      <p className="font-medium uppercase tracking-wider mb-1.5">Interaction states live</p>
      <p className="text-background/80">
        Buttons darken on hover, scale slightly on press. Cards lift with a shadow on hover.
        Product images zoom on hover (Smart Animate–style scale transition). Try the cart,
        quantity steppers, and checkout steps.
      </p>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [mode, setMode] = useState<Fidelity>("wireframe");

  return (
    <FidelityContext.Provider value={{ mode, setMode }}>
      <div
        className={`min-h-screen bg-background text-foreground ${mode !== "wireframe" ? "hifi" : ""}`}
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {/* Display font for headings + fidelity theme overrides */}
        <style>{`
          .font-display { font-family: 'DM Serif Display', Georgia, serif; }
          ::-webkit-scrollbar { display: none; }
          * { scrollbar-width: none; }

          /* High-fidelity / Interactive theme — warm artisan palette replacing the
             grayscale wireframe tokens. Because every component is built on these
             CSS variables (bg-background, text-foreground, bg-card, border-border,
             bg-muted, etc.), this single override re-skins the whole site. */
          .hifi {
            --background: #fbf7f1;
            --foreground: #2b2420;
            --card: #ffffff;
            --card-foreground: #2b2420;
            --primary: #b5582e;
            --primary-foreground: #ffffff;
            --secondary: #6f7a5e;
            --secondary-foreground: #ffffff;
            --muted: #efe7da;
            --muted-foreground: #8a7d6c;
            --accent: #e8c39e;
            --accent-foreground: #2b2420;
            --border: #e3d8c6;
          }
          .hifi .font-display { color: #b5582e; }
          .hifi button.bg-foreground {
            background-color: #b5582e !important;
            color: #ffffff !important;
          }
          .hifi button.bg-foreground:hover { background-color: #9c4924 !important; }
          .hifi .border-foreground { border-color: #b5582e !important; }

          ${mode === "interactive" ? `
          .hifi button, .hifi a, .hifi [role="button"] { transition: all 0.18s ease; }
          .hifi button:active { transform: scale(0.97); }
          .hifi .cursor-pointer:hover { box-shadow: 0 6px 20px rgba(43,36,32,0.12); transform: translateY(-2px); transition: all 0.2s ease; }
          ` : ""}
        `}</style>

        <FidelitySwitcher />

        {/* ── Wireframe badge ── */}
        {mode === "wireframe" && (
          <div className="fixed bottom-4 right-4 z-50 px-3 py-1.5 bg-foreground text-background text-[11px] font-medium rounded-sm uppercase tracking-wider shadow-sm">
            Mid-fidelity wireframe — {
              page === "home" ? "Home" :
                page === "artisan" ? "Artisan Profile" :
                  page === "product" ? "Product Detail" :
                    page === "cart" ? "Shopping Cart" :
                      page === "checkout" ? "Checkout" :
                        page === "styleguide" ? "Style Guide" :
                          page === "flows" ? "UX Flows" :
                            "Prioritization Matrix"
            }
          </div>
        )}
        <InteractionLegend />

        <Navbar page={page} onNavigate={setPage} />

        {page === "home" && <HomePage onNavigate={setPage} />}
        {page === "artisan" && <ArtisanPage onNavigate={setPage} />}
        {page === "product" && <ProductPage onNavigate={setPage} />}
        {page === "cart" && <CartPage onNavigate={setPage} />}
        {page === "checkout" && <CheckoutPage onNavigate={setPage} />}
        {page === "styleguide" && <StyleGuidePage />}
        {page === "flows" && <FlowsPage />}
        {page === "matrix" && <MatrixPage />}
      </div>
    </FidelityContext.Provider>
  );
}
