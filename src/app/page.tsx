"use client";

import { useEffect, useMemo } from "react";
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  Bookmark,
  Building2,
  CalendarCheck,
  ChevronDown,
  CircleDollarSign,
  Home,
  KeyRound,
  Mail,
  MapPin,
  MoveRight,
  Phone,
  Ruler,
  Search,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import {
  closeListing,
  closeWishlist,
  hydrateWishlist,
  openListing,
  openWishlist,
  setBudget,
  setHomeType,
  setInquiryType,
  setNeighborhood,
  setSortBy,
  toggleWishlist,
} from "@/features/realty/realtySlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

const listings = [
  {
    id: "glassline-villa",
    name: "Glassline Villa",
    area: "Marina Bend",
    type: "House",
    budgetBand: "$1.5m+",
    address: "42 Glassline Drive",
    price: "$1,850,000",
    beds: "4 beds",
    baths: "3.5 baths",
    size: "3,180 sqft",
    year: "Built 2019",
    status: "For sale",
    description:
      "A light-filled modern residence with quiet entertaining spaces, an open kitchen, and a sheltered terrace for long evenings.",
    highlights: ["Pool terrace", "Two-car garage", "Chef kitchen"],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "pine-court-house",
    name: "Pine Court House",
    area: "North Slope",
    type: "House",
    budgetBand: "$900k-$1.5m",
    address: "8 Pine Court",
    price: "$920,000",
    beds: "3 beds",
    baths: "2 baths",
    size: "1,960 sqft",
    year: "Built 2017",
    status: "For sale",
    description:
      "A composed hillside home with warm wood, tall glass, and easy indoor-outdoor flow for daily living.",
    highlights: ["Tree views", "Covered deck", "Flexible den"],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "atelier-loft",
    name: "Atelier Loft",
    area: "Old Mill",
    type: "Loft",
    budgetBand: "$600k-$900k",
    address: "16 Foundry Lane, Unit 4",
    price: "$780,000",
    beds: "2 beds",
    baths: "2 baths",
    size: "1,420 sqft",
    year: "Converted 2021",
    status: "New",
    description:
      "A refined loft with high windows, generous wall space, and calm finishes in the district's most walkable pocket.",
    highlights: ["Corner windows", "Gallery wall", "Private storage"],
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "saltwater-cottage",
    name: "Saltwater Cottage",
    area: "Harbor Point",
    type: "Cottage",
    budgetBand: "$1.5m+",
    address: "5 Saltwater Walk",
    price: "$2,400,000",
    beds: "5 beds",
    baths: "4 baths",
    size: "4,100 sqft",
    year: "Built 2015",
    status: "For sale",
    description:
      "A private coastal cottage with generous guest rooms, a resort-style pool court, and relaxed garden entries.",
    highlights: ["Guest suite", "Pool court", "Garden entry"],
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "elm-stone-home",
    name: "Elm & Stone Home",
    area: "Garden Row",
    type: "Townhome",
    budgetBand: "$600k-$900k",
    address: "73 Elm Row",
    price: "$625,000",
    beds: "3 beds",
    baths: "2.5 baths",
    size: "1,680 sqft",
    year: "Built 2012",
    status: "For sale",
    description:
      "A charming townhome with mature landscaping, soft natural light, and a sensible plan for everyday routines.",
    highlights: ["Front porch", "Mature trees", "Updated baths"],
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "orchard-house",
    name: "Orchard House",
    area: "Willow Vale",
    type: "House",
    budgetBand: "$900k-$1.5m",
    address: "22 Orchard Bend",
    price: "$1,480,000",
    beds: "4 beds",
    baths: "3 baths",
    size: "2,860 sqft",
    year: "Built 2018",
    status: "Sold",
    description:
      "A finished family home with a dramatic evening profile, layered living spaces, and a quiet edge-of-woods setting.",
    highlights: ["Woodland edge", "Media room", "Large mudroom"],
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80",
  },
];

const neighborhoods = [
  {
    name: "Harbor Point",
    note: "Townhomes, water views, and quiet blocks close to the pier.",
    homes: "42 homes",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "North Slope",
    note: "Wide streets, leafy corners, and quick access to the shoreline.",
    homes: "31 homes",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Old Mill",
    note: "Brick lofts, pocket cafes, and converted workspaces.",
    homes: "18 homes",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Willow Vale",
    note: "Established gardens, larger lots, and calm residential lanes.",
    homes: "54 homes",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80",
  },
];

const services = [
  {
    icon: KeyRound,
    title: "Buy with clarity",
    text: "Private tours, sharp shortlists, and calm guidance from first look to final signature.",
  },
  {
    icon: CircleDollarSign,
    title: "Sell with restraint",
    text: "Pricing, staging, and negotiation handled without noisy pressure or inflated promises.",
  },
  {
    icon: MoveRight,
    title: "Relocate smoothly",
    text: "Neighborhood matching for schools, commute, daily rituals, and future plans.",
  },
  {
    icon: Sparkles,
    title: "Know the number",
    text: "Plain-spoken valuation notes before you list, bid, renovate, or wait.",
  },
];

const testimonials = [
  {
    quote:
      "They treated the search like craft. We saw fewer homes, understood more, and never felt rushed.",
    name: "Mira Sloan",
    role: "Buyer",
  },
  {
    quote:
      "The listing was quiet, polished, and exactly placed. We had serious offers in the first week.",
    name: "Julian Reed",
    role: "Seller",
  },
  {
    quote:
      "They translated a cross-country move into a set of sane choices. That was the difference.",
    name: "Nadia Chen",
    role: "Relocation client",
  },
];

const selectClass =
  "h-12 w-full appearance-none rounded-xl border border-[#ded5c7] bg-[#fffaf1] px-4 pr-9 text-sm text-[#2b261f] outline-none transition focus:border-[#31594c] focus:ring-4 focus:ring-[#31594c]/10";

type Listing = (typeof listings)[number];

function priceToNumber(price: string) {
  return Number(price.replace(/[^0-9]/g, ""));
}

function Field({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative block min-w-0">
      <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6d6458]">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={selectClass}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute bottom-3.5 right-3 h-4 w-4 text-[#6d6458]" />
    </label>
  );
}

export default function HomePage() {
  const dispatch = useAppDispatch();
  const {
    neighborhood,
    homeType,
    budget,
    sortBy,
    inquiryType,
    selectedListingId,
    wishlistIds,
    isWishlistOpen,
  } = useAppSelector((state) => state.realty);

  useEffect(() => {
    const savedWishlist = window.localStorage.getItem("north-nest-wishlist");
    if (savedWishlist) {
      try {
        dispatch(hydrateWishlist(JSON.parse(savedWishlist) as string[]));
      } catch {
        window.localStorage.removeItem("north-nest-wishlist");
      }
    }
  }, [dispatch]);

  useEffect(() => {
    window.localStorage.setItem(
      "north-nest-wishlist",
      JSON.stringify(wishlistIds),
    );
  }, [wishlistIds]);

  useEffect(() => {
    const hasOverlay = Boolean(selectedListingId) || isWishlistOpen;

    if (!hasOverlay) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dispatch(closeListing());
        dispatch(closeWishlist());
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, isWishlistOpen, selectedListingId]);

  const filteredListings = useMemo(() => {
    const filtered = listings.filter((listing) => {
      const matchesNeighborhood =
        neighborhood === "Any neighborhood" || listing.area === neighborhood;
      const matchesType = homeType === "Any home" || listing.type === homeType;
      const matchesBudget = budget === "Any price" || listing.budgetBand === budget;

      return matchesNeighborhood && matchesType && matchesBudget;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "Price high") return priceToNumber(b.price) - priceToNumber(a.price);
      if (sortBy === "Price low") return priceToNumber(a.price) - priceToNumber(b.price);
      if (sortBy === "Newest") return b.year.localeCompare(a.year);
      return listings.findIndex((item) => item.id === a.id) - listings.findIndex((item) => item.id === b.id);
    });
  }, [budget, homeType, neighborhood, sortBy]);

  const selectedListing = listings.find((listing) => listing.id === selectedListingId);
  const wishlistListings = listings.filter((listing) => wishlistIds.includes(listing.id));

  const handleWishlistToggle = (listingId: string) => {
    dispatch(toggleWishlist(listingId));
  };

  const handleShare = async (listing: Listing) => {
    const shareUrl = `${window.location.origin}/#homes`;
    const shareText = `${listing.name} in ${listing.area} is listed for ${listing.price}.`;

    if (navigator.share) {
      await navigator.share({
        title: listing.name,
        text: shareText,
        url: shareUrl,
      });
      return;
    }

    await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
  };

  return (
    <main className="min-h-screen bg-[#f5efe5] text-[#252018]">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#e6ded1]/80 bg-[#fffaf1]/92 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#" className="flex items-center gap-3" aria-label="North and Nest home">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#e7eadf] font-serif text-lg font-bold text-[#31594c]">
              N
            </span>
            <span className="font-editorial text-xl font-bold">
              North & Nest
            </span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-medium text-[#6d6458] md:flex">
            <a href="#homes" className="hover:text-[#31594c]">
              Homes
            </a>
            <a href="#neighborhoods" className="hover:text-[#31594c]">
              Neighborhoods
            </a>
            <a href="#practice" className="hover:text-[#31594c]">
              Practice
            </a>
            <a href="#studio" className="hover:text-[#31594c]">
              Studio
            </a>
          </div>
          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={() => dispatch(openWishlist())}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-[#ded5c7] text-[#31594c] transition hover:bg-[#eef1e9]"
              aria-label={`Open wishlist with ${wishlistIds.length} saved homes`}
            >
              <Bookmark className="h-4 w-4" />
              {wishlistIds.length > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#31594c] px-1 text-[10px] font-bold text-white">
                  {wishlistIds.length}
                </span>
              )}
            </button>
            <a
              href="tel:5550150148"
              className="flex items-center gap-2 text-sm font-medium text-[#6d6458]"
            >
              <Phone className="h-4 w-4" />
              (555) 015-0148
            </a>
            <a
              href="#inquire"
              className="rounded-full bg-[#31594c] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#26463c]"
            >
              Request a showing
            </a>
          </div>
          <button
            onClick={() => dispatch(openWishlist())}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-[#ded5c7] md:hidden"
            aria-label={`Open wishlist with ${wishlistIds.length} saved homes`}
          >
            <Bookmark className="h-5 w-5 text-[#31594c]" />
            {wishlistIds.length > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#31594c] px-1 text-[10px] font-bold text-white">
                {wishlistIds.length}
              </span>
            )}
          </button>
        </nav>
      </header>

      <section className="relative min-h-[760px] overflow-visible pt-16 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=85')",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,12,10,0.82),rgba(11,12,10,0.52)_48%,rgba(11,12,10,0.18)),linear-gradient(0deg,rgba(11,12,10,0.46),transparent_50%)]" />
        <div className="relative mx-auto flex min-h-[650px] max-w-6xl flex-col justify-end px-5 pb-28">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#d9d2c3]">
            Harbor homes | thoughtful moves | est. 2011
          </p>
          <h1 className="font-editorial max-w-3xl text-6xl font-bold leading-[0.95] tracking-normal sm:text-7xl lg:text-8xl">
            Find a place that feels considered.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#eee8dd]">
            A boutique residential studio for buyers and sellers who want taste,
            timing, and negotiation handled with care.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#homes"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-[#252018] transition hover:bg-[#f0eadf]"
            >
              View current homes
            </a>
            <a
              href="#inquire"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Talk with an advisor
            </a>
          </div>
        </div>
        <div className="relative z-10 -mt-20 px-5 pb-8 md:absolute md:bottom-[-58px] md:left-0 md:right-0 md:mt-0 md:pb-0">
          <div className="mx-auto max-w-5xl rounded-3xl border border-[#ded5c7] bg-[#fffaf1] p-4 text-[#252018] shadow-2xl shadow-black/15">
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_170px] md:items-end">
              <Field
                label="Neighborhood"
                value={neighborhood}
                options={[
                  "Any neighborhood",
                  "Harbor Point",
                  "North Slope",
                  "Old Mill",
                  "Willow Vale",
                ]}
                onChange={(value) => dispatch(setNeighborhood(value))}
              />
              <Field
                label="Home type"
                value={homeType}
                options={["Any home", "House", "Townhome", "Loft", "Cottage"]}
                onChange={(value) => dispatch(setHomeType(value))}
              />
              <Field
                label="Budget"
                value={budget}
                options={["Any price", "$600k-$900k", "$900k-$1.5m", "$1.5m+"]}
                onChange={(value) => dispatch(setBudget(value))}
              />
              <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#31594c] px-5 text-sm font-bold text-white transition hover:bg-[#26463c]">
                <Search className="h-4 w-4" />
                Search homes
              </button>
            </div>
            <p className="mt-3 text-xs text-[#6d6458]">
              Showing a curated demo selection. Filters are powered by Redux Toolkit.
            </p>
          </div>
        </div>
      </section>

      <section id="homes" className="mx-auto max-w-6xl px-5 pb-20 pt-32">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#7b7164]">
              Current homes
            </p>
            <h2 className="font-editorial mt-2 text-5xl font-bold leading-none">
              Selected residences
            </h2>
            <p className="mt-2 text-sm text-[#6d6458]">
              Six original sample listings for a polished portfolio demo.
            </p>
          </div>
          <Field
            label="Sort"
            value={sortBy}
            options={["Featured", "Newest", "Price high", "Price low"]}
            onChange={(value) => dispatch(setSortBy(value))}
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredListings.map((listing) => {
            const isSaved = wishlistIds.includes(listing.id);

            return (
            <article
              key={listing.name}
              role="button"
              tabIndex={0}
              onClick={() => dispatch(openListing(listing.id))}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  dispatch(openListing(listing.id));
                }
              }}
              className="cursor-pointer overflow-hidden rounded-2xl border border-[#e2d9cc] bg-[#fffaf1] text-left shadow-sm outline-none transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#2b261f]/10 focus:ring-4 focus:ring-[#31594c]/20"
            >
              <div
                className="relative h-56 bg-cover bg-center"
                style={{ backgroundImage: `url('${listing.image}')` }}
              >
                <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-bold text-[#31594c]">
                  {listing.status}
                </span>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleWishlistToggle(listing.id);
                  }}
                  className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full transition ${
                    isSaved
                      ? "bg-[#31594c] text-white"
                      : "bg-white/95 text-[#31594c] hover:bg-[#eef1e9]"
                  }`}
                  aria-pressed={isSaved}
                  aria-label={`${isSaved ? "Remove" : "Save"} ${listing.name}`}
                >
                  <Bookmark className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
                </button>
              </div>
              <div className="p-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#7b7164]">
                  {listing.area}
                </p>
                <h3 className="font-editorial mt-1 text-2xl font-bold leading-tight">
                  {listing.name}
                </h3>
                <p className="mt-1 text-sm font-bold">{listing.price}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-[#6d6458]">
                  <span className="flex items-center gap-1.5">
                    <BedDouble className="h-4 w-4" />
                    {listing.beds}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bath className="h-4 w-4" />
                    {listing.baths}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Home className="h-4 w-4" />
                    {listing.size}
                  </span>
                </div>
              </div>
            </article>
          );
          })}
        </div>
        {filteredListings.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[#cfc3b3] bg-[#fffaf1] p-8 text-center">
            <p className="font-editorial text-3xl font-bold">No matching homes yet.</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6d6458]">
              Try a wider neighborhood, home type, or budget range to see more
              demo residences.
            </p>
          </div>
        )}
      </section>

      <section id="neighborhoods" className="bg-[#e9e1d3] py-20">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#7b7164]">
            The map
          </p>
          <h2 className="font-editorial mt-2 max-w-lg text-5xl font-bold leading-none">
            Four neighborhoods we know by front door.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {neighborhoods.map((place) => (
              <article
                key={place.name}
                className="group relative min-h-48 overflow-hidden rounded-2xl bg-cover bg-center p-6 text-white"
                style={{ backgroundImage: `url('${place.image}')` }}
              >
                <div className="absolute inset-0 bg-black/45 transition group-hover:bg-black/35" />
                <div className="relative flex h-full min-h-36 flex-col justify-end">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#e5ddd0]">
                    {place.homes}
                  </p>
                  <h3 className="font-editorial text-3xl font-bold">
                    {place.name}
                  </h3>
                  <p className="mt-1 max-w-md text-sm leading-6 text-[#f4eee4]">
                    {place.note}
                  </p>
                  <a
                    href="#homes"
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]"
                  >
                    View homes <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="practice" className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#7b7164]">
          The practice
        </p>
        <h2 className="font-editorial mt-2 text-5xl font-bold leading-none">
          Four ways we work with you.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="rounded-2xl border border-[#e2d9cc] bg-[#fffaf1] p-7"
              >
                <Icon className="h-5 w-5 text-[#31594c]" />
                <h3 className="font-editorial mt-6 text-2xl font-bold">
                  {service.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-[#6d6458]">
                  {service.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="studio" className="bg-[#11110f] py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div
            className="min-h-[360px] rounded-3xl bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80')",
            }}
          />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#b9ad9a]">
              The studio
            </p>
            <h2 className="font-editorial mt-2 max-w-xl text-5xl font-bold leading-none">
              A small desk for moves that matter.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#d8d0c3]">
              North & Nest is a demo boutique practice built around practical
              market sense, original presentation, and steady communication.
            </p>
            <div className="mt-8 grid max-w-lg grid-cols-3 gap-6">
              {[
                ["13 yrs", "Market study"],
                ["420", "Homes reviewed"],
                ["9 days", "Avg. prep time"],
              ].map(([value, label]) => (
                <div key={label}>
                  <p className="font-editorial text-3xl font-bold">
                    {value}
                  </p>
                  <p className="mt-1 text-xs text-[#b9ad9a]">{label}</p>
                </div>
              ))}
            </div>
            <a
              href="#inquire"
              className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-[#11110f]"
            >
              Meet the principal
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#7b7164]">
          From the table
        </p>
        <h2 className="font-editorial mt-2 text-5xl font-bold leading-none">
          What clients remember.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="rounded-2xl border border-[#e2d9cc] bg-[#fffaf1] p-7"
            >
              <blockquote className="font-editorial text-xl font-bold leading-7">
                {item.quote}
              </blockquote>
              <figcaption className="mt-8 text-sm">
                <span className="block font-bold">{item.name}</span>
                <span className="text-[#6d6458]">{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="inquire" className="bg-[#e9e1d3] py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#7b7164]">
              Inquire
            </p>
            <h2 className="font-editorial mt-2 max-w-md text-5xl font-bold leading-none">
              Tell us the home you have in mind.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#6d6458]">
              Share what you are seeking, selling, or still weighing. This demo
              form is styled for production but does not submit data anywhere.
            </p>
            <div className="mt-8 space-y-3 text-sm font-medium text-[#4f463d]">
              <p className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-[#31594c]" />
                18 Lantern Walk, Harbor Point
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-[#31594c]" />
                (555) 015-0148
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-[#31594c]" />
                hello@northnest.demo
              </p>
            </div>
          </div>
          <form className="rounded-3xl border border-[#e2d9cc] bg-[#fffaf1] p-5 shadow-xl shadow-[#2b261f]/8">
            <div className="grid gap-4 sm:grid-cols-2">
              {["Name", "Email", "Phone"].map((label) => (
                <label key={label}>
                  <span className="mb-2 block text-xs font-semibold text-[#6d6458]">
                    {label}
                  </span>
                  <input
                    className="h-12 w-full rounded-xl border border-[#ded5c7] bg-white px-4 text-sm outline-none focus:border-[#31594c] focus:ring-4 focus:ring-[#31594c]/10"
                    placeholder={label}
                  />
                </label>
              ))}
              <Field
                label="I am"
                value={inquiryType}
                options={["Buying", "Selling", "Relocating", "Still exploring"]}
                onChange={(value) => dispatch(setInquiryType(value))}
              />
            </div>
            <label className="mt-4 block">
              <span className="mb-2 block text-xs font-semibold text-[#6d6458]">
                Note
              </span>
              <textarea
                className="min-h-36 w-full resize-none rounded-xl border border-[#ded5c7] bg-white px-4 py-3 text-sm outline-none focus:border-[#31594c] focus:ring-4 focus:ring-[#31594c]/10"
                placeholder="Neighborhoods, timing, or addresses you are considering."
              />
            </label>
            <button className="mt-4 inline-flex rounded-full bg-[#31594c] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#26463c]">
              Send inquiry
            </button>
          </form>
        </div>
      </section>

      <footer className="bg-[#11110f] py-16 text-[#d8d0c3]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <h2 className="font-editorial text-2xl font-bold text-white">
              North & Nest
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-6">
              A fictional real-estate brand created for this Next.js demo.
            </p>
            <div className="mt-5 space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Harbor Point, CA
              </p>
              <p className="flex items-center gap-2">
                <CalendarCheck className="h-4 w-4" /> By appointment
              </p>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8e8374]">
              Explore
            </p>
            <div className="mt-4 grid gap-2 text-sm">
              <a href="#homes">Current homes</a>
              <a href="#practice">How we work</a>
              <a href="#studio">The studio</a>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8e8374]">
              Areas
            </p>
            <div className="mt-4 grid gap-2 text-sm">
              <a href="#neighborhoods">Harbor Point</a>
              <a href="#neighborhoods">North Slope</a>
              <a href="#neighborhoods">Willow Vale</a>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8e8374]">
              New listings
            </p>
            <p className="mt-4 text-sm leading-6">
              Receive a quiet weekly note with homes worth seeing.
            </p>
            <div className="mt-4 flex gap-2">
              <input
                className="h-11 min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 text-sm outline-none"
                placeholder="Email"
              />
              <button className="h-11 rounded-full bg-white px-5 text-sm font-bold text-[#11110f]">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-12 flex max-w-6xl justify-between border-t border-white/10 px-5 pt-6 text-xs text-[#8e8374]">
          <span>2026 North & Nest demo</span>
          <a href="#">Back to top</a>
        </div>
      </footer>

      {selectedListing && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-black/55 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="listing-dialog-title"
          onClick={() => dispatch(closeListing())}
        >
          <article
            className="max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-[#fffaf1] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="grid max-h-[90vh] overflow-y-auto lg:grid-cols-[1.08fr_0.92fr]">
              <div
                className="min-h-[320px] bg-cover bg-center lg:min-h-[620px]"
                style={{ backgroundImage: `url('${selectedListing.image}')` }}
              />
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7b7164]">
                      {selectedListing.area}
                    </p>
                    <h2
                      id="listing-dialog-title"
                      className="font-editorial mt-2 text-5xl font-bold leading-none"
                    >
                      {selectedListing.name}
                    </h2>
                    <p className="mt-3 text-lg font-bold">{selectedListing.price}</p>
                  </div>
                  <button
                    onClick={() => dispatch(closeListing())}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#ded5c7] text-[#4f463d] transition hover:bg-[#f1eadf]"
                    aria-label="Close listing details"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-[#5f564b] sm:grid-cols-4">
                  {[
                    [BedDouble, selectedListing.beds],
                    [Bath, selectedListing.baths],
                    [Ruler, selectedListing.size],
                    [Home, selectedListing.type],
                  ].map(([Icon, label]) => {
                    const DetailIcon = Icon as typeof BedDouble;
                    return (
                      <div
                        key={label as string}
                        className="rounded-2xl border border-[#e2d9cc] bg-white p-4"
                      >
                        <DetailIcon className="mb-3 h-4 w-4 text-[#31594c]" />
                        <p className="font-semibold">{label as string}</p>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-6 text-sm leading-7 text-[#5f564b]">
                  {selectedListing.description}
                </p>
                <div className="mt-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7b7164]">
                    Highlights
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selectedListing.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full border border-[#d8cebf] px-3 py-1.5 text-xs font-semibold text-[#4f463d]"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-[#e9e1d3] p-5">
                  <p className="flex items-center gap-2 text-sm font-semibold text-[#4f463d]">
                    <MapPin className="h-4 w-4 text-[#31594c]" />
                    {selectedListing.address}
                  </p>
                  <p className="mt-2 text-sm text-[#6d6458]">
                    {selectedListing.year} | Demo listing record
                  </p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => handleWishlistToggle(selectedListing.id)}
                    className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition ${
                      wishlistIds.includes(selectedListing.id)
                        ? "bg-[#31594c] text-white"
                        : "border border-[#31594c] text-[#31594c] hover:bg-[#eef1e9]"
                    }`}
                    aria-pressed={wishlistIds.includes(selectedListing.id)}
                  >
                    <Bookmark
                      className={`h-4 w-4 ${
                        wishlistIds.includes(selectedListing.id) ? "fill-current" : ""
                      }`}
                    />
                    {wishlistIds.includes(selectedListing.id)
                      ? "Saved to wishlist"
                      : "Add to wishlist"}
                  </button>
                  <a
                    href="#inquire"
                    onClick={() => dispatch(closeListing())}
                    className="inline-flex h-12 items-center justify-center rounded-full bg-[#31594c] px-5 text-sm font-bold text-white transition hover:bg-[#26463c]"
                  >
                    Request showing
                  </a>
                  <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#ded5c7] px-5 text-sm font-bold text-[#4f463d]">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      )}

      {isWishlistOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/45 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="wishlist-title"
          onClick={() => dispatch(closeWishlist())}
        >
          <aside
            className="ml-auto flex h-full w-full max-w-md flex-col bg-[#fffaf1] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#e2d9cc] p-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7b7164]">
                  Wishlist
                </p>
                <h2 id="wishlist-title" className="font-editorial text-3xl font-bold">
                  Saved homes
                </h2>
              </div>
              <button
                onClick={() => dispatch(closeWishlist())}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#ded5c7] text-[#4f463d]"
                aria-label="Close wishlist"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {wishlistListings.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <Bookmark className="mx-auto h-10 w-10 text-[#31594c]" />
                    <p className="font-editorial mt-5 text-3xl font-bold">
                      No saved homes yet.
                    </p>
                    <p className="mt-2 text-sm leading-6 text-[#6d6458]">
                      Tap the bookmark on any residence to build your shortlist.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-4">
                  {wishlistListings.map((listing) => (
                    <article
                      key={listing.id}
                      className="overflow-hidden rounded-2xl border border-[#e2d9cc] bg-white"
                    >
                      <button
                        onClick={() => {
                          dispatch(openListing(listing.id));
                          dispatch(closeWishlist());
                        }}
                        className="grid w-full grid-cols-[120px_1fr] text-left"
                      >
                        <span
                          className="min-h-32 bg-cover bg-center"
                          style={{ backgroundImage: `url('${listing.image}')` }}
                        />
                        <span className="p-4">
                          <span className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#7b7164]">
                            {listing.area}
                          </span>
                          <span className="font-editorial mt-1 block text-2xl font-bold">
                            {listing.name}
                          </span>
                          <span className="mt-1 block text-sm font-bold">
                            {listing.price}
                          </span>
                        </span>
                      </button>
                      <button
                        onClick={() => handleWishlistToggle(listing.id)}
                        className="flex w-full items-center justify-center gap-2 border-t border-[#e2d9cc] px-4 py-3 text-sm font-bold text-[#31594c]"
                      >
                        <X className="h-4 w-4" />
                        Remove from wishlist
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
