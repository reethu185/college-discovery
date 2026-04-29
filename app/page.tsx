"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -40px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function CollegeCard({
  c,
  index,
  selected,
  toggleCompare,
  onImageClick,
}: {
  c: any;
  index: number;
  selected: any[];
  toggleCompare: (c: any) => void;
  onImageClick: (c: any) => void;
}) {
  const { ref, visible } = useScrollReveal();
  const isSelected = !!selected.find((item) => item.id === c.id);

  return (
    <div
      ref={ref}
      className="group relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.55s cubic-bezier(.22,1,.36,1) ${
          index * 55
        }ms, transform 0.55s cubic-bezier(.22,1,.36,1) ${index * 55}ms`,
      }}
    >
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-orange-500/40 via-transparent to-blue-600/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />

      <div className="relative bg-white/[0.07] backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-xl group-hover:shadow-orange-500/10 group-hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
        <button
          onClick={() => onImageClick(c)}
          className="relative w-full h-36 rounded-2xl mb-5 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f35] via-[#0f1524] to-[#141929]" />
          <div
            className="absolute inset-0 opacity-60"
            style={{
              background: `radial-gradient(ellipse at 30% 50%, rgba(249,115,22,0.35) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 30%, rgba(59,130,246,0.35) 0%, transparent 55%)`,
            }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-black bg-gradient-to-br from-orange-300 to-blue-300 bg-clip-text text-transparent">
              {c.name
                .split(" ")
                .map((w: string) => w[0])
                .join("")
                .slice(0, 3)}
            </span>
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-xs font-semibold tracking-widest uppercase px-3 py-1 border border-white/30 rounded-full">
              View Details
            </span>
          </div>
        </button>

        <div className="flex justify-between items-start gap-3 mb-1">
          <Link href={`/college/${c.id}`}>
            <h2 className="text-lg font-bold group-hover:text-orange-400 transition cursor-pointer">
              {c.name}
            </h2>
          </Link>

          <span className="bg-orange-500/15 text-orange-300 border border-orange-500/20 px-2.5 py-1 rounded-full text-xs font-semibold">
            ⭐ {c.rating}
          </span>
        </div>

        <p className="text-blue-400 text-sm mb-5">{c.location}</p>

        <div className="mt-auto space-y-3 text-sm">
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-gray-400">Annual Fees</span>
            <span className="text-orange-300 font-bold">
              ₹{Number(c.fees).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Placement Rate</span>
            <span className="text-emerald-400 font-bold">{c.placement}%</span>
          </div>

          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
              style={{ width: `${c.placement}%` }}
            />
          </div>
        </div>

        <button
          onClick={() => toggleCompare(c)}
          className={`mt-5 w-full px-4 py-2.5 rounded-2xl text-sm font-semibold transition border ${
            isSelected
              ? "bg-orange-500/20 text-orange-300 border-orange-500/50"
              : "bg-blue-600/20 text-blue-300 border-blue-500/30"
          }`}
        >
          {isSelected ? "✓ Remove from Compare" : "+ Add to Compare"}
        </button>
      </div>
    </div>
  );
}

function CollegePopup({
  college,
  onClose,
}: {
  college: any;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#0c1120]/90 border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden">
        <div className="relative h-44 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#111827] to-[#0a0e1a]" />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-blue-600/30" />

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl font-black bg-gradient-to-br from-orange-300 to-blue-300 bg-clip-text text-transparent">
              {college.name
                .split(" ")
                .map((w: string) => w[0])
                .join("")
                .slice(0, 3)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20"
          >
            ✕
          </button>

          <div className="absolute bottom-4 right-4 bg-orange-500/20 border border-orange-500/30 text-orange-300 px-3 py-1 rounded-full text-sm font-semibold">
            ⭐ {college.rating} / 5
          </div>
        </div>

        <div className="p-7">
          <h2 className="text-2xl font-extrabold">{college.name}</h2>
          <p className="text-blue-400 text-sm mb-6">{college.location}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4">
              <p className="text-gray-400 text-xs uppercase">Annual Fees</p>
              <p className="text-2xl font-black text-orange-300">
                ₹{Number(college.fees).toLocaleString("en-IN")}
              </p>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
              <p className="text-gray-400 text-xs uppercase">Placement</p>
              <p className="text-2xl font-black text-emerald-400">
                {college.placement}%
              </p>
            </div>
          </div>

          <Link href={`/college/${college.id}`}>
            <button className="w-full py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold">
              View Full Profile →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [colleges, setColleges] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [maxFees, setMaxFees] = useState("");
  const [selected, setSelected] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState<any | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);

    fetch("https://college-discovery-faii.onrender.com/colleges")
      .then((res) => res.json())
      .then((data) => {
        setColleges(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR:", err);
        setLoading(false);
      });

    return () => clearTimeout(t);
  }, []);

  const filtered = colleges.filter((c: any) => {
    const matchesSearch =
      search === "" || c.name.toLowerCase().includes(search.toLowerCase());

    const matchesLocation =
      location === "" ||
      c.location.toLowerCase().includes(location.toLowerCase());

    const matchesFees =
      maxFees === "" || Number(c.fees) <= Number(maxFees);

    return matchesSearch && matchesLocation && matchesFees;
  });

  const toggleCompare = (college: any) => {
    const alreadySelected = selected.find((c) => c.id === college.id);

    if (alreadySelected) {
      setSelected(selected.filter((c) => c.id !== college.id));
    } else {
      if (selected.length >= 3) {
        alert("You can compare only 3 colleges");
        return;
      }
      setSelected([...selected, college]);
    }
  };

  return (
    <>
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes orb {
          0%, 100% { transform: scale(1) translate(0,0); }
          50% { transform: scale(1.08) translate(12px, -8px); }
        }
        .orb { animation: orb 8s ease-in-out infinite; }
        .orb-delay { animation: orb 10s ease-in-out 2s infinite; }
        .hero-line { opacity: 0; }
        .hero-line.in { animation: heroFadeUp 0.7s cubic-bezier(.22,1,.36,1) forwards; }
      `}</style>

      <main className="min-h-screen text-white bg-[#070B18]">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="orb absolute top-[-8%] left-[-4%] w-[480px] h-[480px] bg-orange-600 rounded-full blur-[160px] opacity-[0.18]" />
          <div className="orb-delay absolute top-[30%] right-[-6%] w-[520px] h-[520px] bg-blue-700 rounded-full blur-[180px] opacity-[0.15]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.8) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <section className="relative px-6 py-16 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className={`hero-line ${heroVisible ? "in" : ""}`}>
              <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full mb-6">
                ● Find Your Best College
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05]">
              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-white bg-clip-text text-transparent">
                College
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                Discovery Platform
              </span>
            </h1>

            <p className="text-gray-400 mt-6 max-w-xl mx-auto">
              Search, filter, explore and compare India&apos;s top colleges.
            </p>

            <div className="flex justify-center gap-8 mt-10 flex-wrap">
              <div>
                <p className="text-2xl font-black text-orange-300">
                  {colleges.length || "—"}
                </p>
                <p className="text-gray-500 text-xs uppercase">Colleges Listed</p>
              </div>
              <div>
                <p className="text-2xl font-black text-blue-300">9+</p>
                <p className="text-gray-500 text-xs uppercase">Cities</p>
              </div>
              <div>
                <p className="text-2xl font-black text-white">100%</p>
                <p className="text-gray-500 text-xs uppercase">Free to Use</p>
              </div>
            </div>
          </div>

          <div className="bg-white/[0.06] backdrop-blur-2xl border border-white/10 p-6 rounded-[2rem] shadow-2xl mb-12">
            <input
              type="text"
              placeholder="Search your dream college..."
              className="w-full bg-black/30 border border-white/10 px-4 py-3.5 rounded-2xl outline-none text-white placeholder-gray-500 focus:border-orange-500/60 mb-4"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                className="w-full bg-black/30 border border-white/10 px-4 py-3.5 rounded-2xl outline-none text-white"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="" className="text-black">All Locations</option>
                {[
                  "Delhi",
                  "Mumbai",
                  "Chennai",
                  "Bangalore",
                  "Karnataka",
                  "Tamil Nadu",
                  "Telangana",
                  "Hyderabad",
                  "Punjab",
                ].map((l) => (
                  <option key={l} value={l} className="text-black">
                    {l}
                  </option>
                ))}
              </select>

              <select
                className="w-full bg-black/30 border border-white/10 px-4 py-3.5 rounded-2xl outline-none text-white"
                value={maxFees}
                onChange={(e) => setMaxFees(e.target.value)}
              >
                <option value="" className="text-black">All Fees</option>
                <option value="100000" className="text-black">Below ₹1,00,000</option>
                <option value="150000" className="text-black">Below ₹1,50,000</option>
                <option value="200000" className="text-black">Below ₹2,00,000</option>
                <option value="250000" className="text-black">Below ₹2,50,000</option>
                <option value="300000" className="text-black">Below ₹3,00,000</option>
              </select>
            </div>

            {!loading && (
              <p className="text-gray-500 text-xs mt-3 text-right">
                {filtered.length} colleges found
              </p>
            )}
          </div>

          {loading && (
            <p className="text-center text-gray-400">Fetching colleges...</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c: any, i: number) => (
              <CollegeCard
                key={c.id}
                c={c}
                index={i}
                selected={selected}
                toggleCompare={toggleCompare}
                onImageClick={setPopup}
              />
            ))}
          </div>

          {selected.length >= 2 && (
            <div className="mt-16 bg-white/[0.06] border border-white/10 p-8 rounded-[2rem] overflow-x-auto">
              <h2 className="text-2xl font-extrabold mb-6">
                Side-by-Side Comparison
              </h2>

              <table className="w-full text-left text-sm">
                <thead>
                  <tr>
                    {["College", "Location", "Fees", "Rating", "Placement"].map(
                      (h) => (
                        <th key={h} className="p-4 border border-white/10">
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>

                <tbody>
                  {selected.map((c: any) => (
                    <tr key={c.id}>
                      <td className="p-4 border border-white/10">{c.name}</td>
                      <td className="p-4 border border-white/10">{c.location}</td>
                      <td className="p-4 border border-white/10">
                        ₹{Number(c.fees).toLocaleString("en-IN")}
                      </td>
                      <td className="p-4 border border-white/10">⭐ {c.rating}</td>
                      <td className="p-4 border border-white/10">
                        {c.placement}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {popup && <CollegePopup college={popup} onClose={() => setPopup(null)} />}
    </>
  );
}