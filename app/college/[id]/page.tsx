"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";

export default function CollegeDetail() {
  const params = useParams();
  const router = useRouter();
  const [college, setCollege] = useState<any>(null);

  useEffect(() => {
    if (!params?.id) return;

    axios
      .get(`http://localhost:5000/colleges/${params.id}`)
      .then((res) => setCollege(res.data))
      .catch((err) => console.log(err));
  }, [params]);

  if (!college) {
    return (
      <div className="min-h-screen bg-[#070B18] text-white flex flex-col items-center justify-center gap-4">
        <div className="relative w-14 h-14">
          <div className="absolute inset-0 rounded-full border-2 border-orange-500/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-t-orange-400 border-r-orange-400 border-b-transparent border-l-transparent animate-spin" />
          <div className="absolute inset-4 rounded-full bg-orange-500/20 animate-pulse" />
        </div>
        <p className="text-white/40 text-sm tracking-[0.2em] uppercase font-light">
          Loading profile
        </p>
      </div>
    );
  }

  const placementVal = Math.min(Math.max(Number(college.placement) || 0, 0), 100);

  return (
    <main className="min-h-screen bg-[#070B18] text-white overflow-x-hidden">

      {/* ── Ambient orbs ── */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-80px] left-[-60px] w-[420px] h-[420px] bg-orange-500 rounded-full blur-[160px] opacity-[0.12]" />
        <div className="absolute bottom-[-60px] right-[-40px] w-[480px] h-[480px] bg-blue-600 rounded-full blur-[180px] opacity-[0.14]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-900/40 rounded-full blur-[120px] opacity-50" />
        {/* subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

        {/* ── Back button ── */}
        <button
          onClick={() => router.push("/")}
          className="group inline-flex items-center gap-2 mb-10 px-5 py-2.5 rounded-full
            bg-white/5 border border-white/10 text-white/60 text-sm font-medium
            hover:bg-orange-500/15 hover:border-orange-400/40 hover:text-orange-300
            transition-all duration-300 ease-out backdrop-blur-sm"
        >
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Colleges
        </button>

        {/* ── Hero ── */}
        <div className="relative rounded-3xl overflow-hidden mb-6 border border-white/8 shadow-2xl">
          {/* hero gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f1628] via-[#0d111f] to-[#070B18]" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-blue-600/20" />
          {/* decorative ring */}
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full border border-orange-400/10" />
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full border border-orange-400/8" />

          <div className="relative p-8 sm:p-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-400/25 text-orange-300 text-xs tracking-[0.18em] font-semibold uppercase mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              College Profile
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4
              bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent">
              {college.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 mt-2">
              <span className="inline-flex items-center gap-2 text-blue-300/80 text-base font-medium">
                {/* map-pin icon */}
                <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {college.location}
              </span>
              <span className="hidden sm:block w-px h-4 bg-white/15" />
              <span className="inline-flex items-center gap-1.5 text-white/30 text-sm">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Academic Year 2024–25
              </span>
            </div>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

          {/* Fees */}
          <div className="group relative rounded-2xl overflow-hidden border border-orange-400/20
            bg-gradient-to-br from-white/5 to-black/30 backdrop-blur-xl
            hover:border-orange-400/50 hover:shadow-[0_0_32px_-4px_rgba(251,146,60,0.25)]
            transition-all duration-400 ease-out cursor-default">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white/40 text-xs font-semibold tracking-[0.15em] uppercase">Annual Fees</p>
                <span className="w-9 h-9 rounded-xl bg-orange-500/15 border border-orange-400/20 flex items-center justify-center
                  group-hover:bg-orange-500/25 group-hover:scale-110 transition-all duration-300">
                  {/* currency icon */}
                  <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>
              <h2 className="text-3xl font-black text-orange-400 tracking-tight">
                ₹{college.fees}
              </h2>
              <p className="text-white/25 text-xs mt-1.5">per academic year</p>
            </div>
          </div>

          {/* Rating */}
          <div className="group relative rounded-2xl overflow-hidden border border-blue-400/20
            bg-gradient-to-br from-white/5 to-black/30 backdrop-blur-xl
            hover:border-blue-400/50 hover:shadow-[0_0_32px_-4px_rgba(96,165,250,0.2)]
            transition-all duration-400 ease-out cursor-default">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white/40 text-xs font-semibold tracking-[0.15em] uppercase">Rating</p>
                <span className="w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center
                  group-hover:bg-yellow-400/20 group-hover:scale-110 transition-all duration-300">
                  <svg className="w-4 h-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </span>
              </div>
              <div className="flex items-end gap-2">
                <h2 className="text-3xl font-black text-yellow-300 tracking-tight">
                  {college.rating}
                </h2>
                <span className="text-white/25 text-sm mb-1">/ 5.0</span>
              </div>
              {/* mini star row */}
              <div className="flex gap-0.5 mt-2">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className={`w-3 h-3 ${s <= Math.round(Number(college.rating)) ? "text-yellow-400" : "text-white/10"}`} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>

          {/* Placement */}
          <div className="group relative rounded-2xl overflow-hidden border border-green-400/20
            bg-gradient-to-br from-white/5 to-black/30 backdrop-blur-xl
            hover:border-green-400/50 hover:shadow-[0_0_32px_-4px_rgba(74,222,128,0.18)]
            transition-all duration-400 ease-out cursor-default">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white/40 text-xs font-semibold tracking-[0.15em] uppercase">Placement</p>
                <span className="w-9 h-9 rounded-xl bg-green-400/10 border border-green-400/20 flex items-center justify-center
                  group-hover:bg-green-400/20 group-hover:scale-110 transition-all duration-300">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </span>
              </div>
              <h2 className="text-3xl font-black text-green-300 tracking-tight">
                {college.placement}%
              </h2>
              {/* progress bar */}
              <div className="mt-3 space-y-1.5">
                <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-300
                      transition-all duration-700 ease-out"
                    style={{ width: `${placementVal}%` }}
                  />
                </div>
                <p className="text-white/25 text-xs">{placementVal >= 80 ? "Excellent" : placementVal >= 60 ? "Good" : "Average"} placement rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Overview ── */}
        <div className="relative rounded-2xl overflow-hidden border border-white/8
          bg-gradient-to-br from-white/5 to-black/20 backdrop-blur-xl p-8">
          <div className="absolute top-0 left-0 w-48 h-px bg-gradient-to-r from-orange-400/50 to-transparent" />
          <div className="absolute top-0 left-0 h-16 w-px bg-gradient-to-b from-orange-400/50 to-transparent" />

          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-400/25 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            <h2 className="text-xl font-bold text-orange-200 tracking-tight">Overview</h2>
          </div>

          <p className="text-white/50 leading-8 text-[0.95rem]">
            {college.name} is one of the listed colleges in this discovery platform. Students can
            check important decision-making details like location, fees, rating and placement
            percentage before comparing it with other colleges.
          </p>

          {/* divider */}
          <div className="mt-6 pt-6 border-t border-white/6 flex flex-wrap gap-4">
            {[
              { label: "Location", value: college.location, icon: "📍" },
              { label: "Fees", value: `₹${college.fees}`, icon: "💰" },
              { label: "Rating", value: `${college.rating} / 5`, icon: "⭐" },
              { label: "Placement", value: `${college.placement}%`, icon: "🎓" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 px-3.5 py-2 rounded-xl
                bg-white/4 border border-white/8 text-sm">
                <span>{item.icon}</span>
                <span className="text-white/35">{item.label}:</span>
                <span className="text-white/70 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}