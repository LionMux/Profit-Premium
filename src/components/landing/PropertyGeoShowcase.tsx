'use client';

import { ArrowRight, Building2, CircleDot, MapPin, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

type DistrictId = 'central' | 'harbor' | 'garden';

type District = {
  id: DistrictId;
  name: string;
  tag: string;
  summary: string;
  transit: string;
  demand: string;
  position: string;
};

const districts: District[] = [
  {
    id: 'central',
    name: 'Central District',
    tag: 'Prime / walkable',
    summary: 'Blue-chip demand near transit, jobs, and daily essentials.',
    transit: '6 min to CBD',
    demand: 'Highest liquidity',
    position: 'left-8 top-16',
  },
  {
    id: 'harbor',
    name: 'Harbor Edge',
    tag: 'Waterfront / views',
    summary: 'Premium positioning with a quieter, lifestyle-led profile.',
    transit: '9 min to CBD',
    demand: 'Strong upsell potential',
    position: 'right-8 top-12',
  },
  {
    id: 'garden',
    name: 'Garden Quarter',
    tag: 'Family / value',
    summary: 'More space, calmer streets, and resilient owner-occupier demand.',
    transit: '12 min to CBD',
    demand: 'Stable rental depth',
    position: 'left-12 bottom-10',
  },
];

type PropertyGeoShowcaseProps = {
  className?: string;
};

export default function PropertyGeoShowcase({ className }: PropertyGeoShowcaseProps) {
  const [active, setActive] = useState<DistrictId>('central');
  const current = districts.find((district) => district.id === active) ?? districts[0];

  const metrics = [
    { label: 'Transit', value: current.transit, icon: MapPin },
    { label: 'Demand', value: current.demand, icon: ShieldCheck },
    { label: 'Profile', value: current.summary, icon: Building2 },
  ];

  return (
    <section className={`h-full w-full ${className ?? ''}`}>
      <div className="grid h-full gap-5 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative overflow-hidden rounded-[2rem] border border-[#d7beb5] bg-[linear-gradient(180deg,#fcf7f2_0%,#f4e6db_100%)] p-6 shadow-[0_24px_70px_rgba(95,32,44,0.16)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,27,44,0.15),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(160,117,101,0.14),transparent_36%)]" />
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(120,27,44,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(120,27,44,0.09)_1px,transparent_1px)] [background-size:42px_42px]" />

          <div className="relative flex h-full min-h-[360px] flex-col justify-between">
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d8b7b0] bg-[#fff8f2]/90 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em] text-[#7c3641] backdrop-blur">
                <CircleDot className="h-3.5 w-3.5" />
                Geo insight
              </div>
              <div className="rounded-full border border-[#d8b7b0] bg-[#fff8f2]/90 px-3 py-1 text-xs font-medium text-[#7a514b] backdrop-blur">
                Selected: {current.name}
              </div>
            </div>

            <div className="relative flex-1">
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#c78991] bg-[#fff5ee] shadow-[0_16px_40px_rgba(114,29,44,0.22)]">
                  <MapPin className="h-7 w-7 text-[#8a2435]" />
                </div>
                <div className="mt-3 rounded-full bg-[#7f2231] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#f8eee6]">
                  Core demand zone
                </div>
              </div>

              {districts.map((district) => {
                const isActive = district.id === active;
                return (
                  <button
                    key={district.id}
                    type="button"
                    onClick={() => setActive(district.id)}
                    className={`absolute ${district.position} w-40 rounded-2xl border px-3 py-3 text-left shadow-sm backdrop-blur transition duration-200 ${
                      isActive
                        ? 'border-[#8a2435] bg-[#fff6f0]/95 text-[#5a1d27] shadow-[0_14px_30px_rgba(122,34,49,0.18)]'
                        : 'border-[#dbc6bf] bg-[#fffdfb]/80 text-[#6f534f] hover:border-[#bf9ea0] hover:bg-[#fffaf7]'
                    }`}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]">
                      <CircleDot className={`h-3.5 w-3.5 ${isActive ? 'text-[#8a2435]' : 'text-[#ad8b85]'}`} />
                      {district.tag}
                    </div>
                    <p className="mt-2 text-sm font-semibold">{district.name}</p>
                  </button>
                );
              })}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#d9c4bb] bg-[#fffaf6]/90 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b5c56]">District</p>
                <p className="mt-2 text-sm font-medium text-[#4a2b31]">{current.name}</p>
              </div>
              <div className="rounded-2xl border border-[#d9c4bb] bg-[#fffaf6]/90 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b5c56]">Access</p>
                <p className="mt-2 text-sm font-medium text-[#4a2b31]">{current.transit}</p>
              </div>
              <div className="rounded-2xl border border-[#d9c4bb] bg-[#fffaf6]/90 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8b5c56]">Demand</p>
                <p className="mt-2 text-sm font-medium text-[#4a2b31]">{current.demand}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex h-full flex-col justify-between rounded-[2rem] border border-[#d7beb5] bg-[#fbf4ed] p-6 shadow-[0_20px_60px_rgba(95,32,44,0.1)]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8f5d56]">District selection</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#3d2026]">{current.name}</h3>
            <p className="mt-3 max-w-md text-sm leading-6 text-[#6c534f]">
              Compare neighborhoods at a glance. The selected district is highlighted by access,
              demand, and long-term liquidity.
            </p>

            <div className="mt-6 grid gap-3">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-[#e0cdc5] bg-white/80 p-4 shadow-[0_10px_30px_rgba(95,32,44,0.06)]"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 rounded-xl bg-[#f2e1d8] p-2 text-[#7c2434]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8e6660]">
                          {metric.label}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-[#4d3035]">{metric.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#8f5d56]">
              Compare districts
            </p>
            <div className="grid gap-2">
              {districts.map((district) => {
                const isActive = district.id === active;
                return (
                  <button
                    key={district.id}
                    type="button"
                    onClick={() => setActive(district.id)}
                    className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-left transition ${
                      isActive
                        ? 'border-[#8a2435] bg-[#8a2435] text-[#fff6ef]'
                        : 'border-[#e0cdc5] bg-white/70 text-[#50343a] hover:border-[#b88e8c] hover:bg-white'
                    }`}
                  >
                    <div>
                      <p className="text-sm font-semibold">{district.name}</p>
                      <p className={`mt-1 text-xs ${isActive ? 'text-[#f6d9d3]' : 'text-[#8b6a66]'}`}>
                        {district.summary}
                      </p>
                    </div>
                    <ArrowRight className={`h-4 w-4 ${isActive ? 'text-[#f8e9e4]' : 'text-[#aa7d7a]'}`} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}