import { PortfolioData } from "@/lib/types";
import React from "react";

interface TestimonialProps {
  data: PortfolioData;
}

export default function Testimonial({ data }: TestimonialProps) {
  return (
    <section className="space-y-12 md:space-y-16 reveal">
      <div className="border-b border-zinc-200 dark:border-zinc-900 pb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight uppercase">
          Verified Endorsements
        </h2>
        <p className="text-zinc-500 text-sm font-medium">
          End-to-end encrypted validation from industry partners.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        {data.testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-800 rounded-lg p-8 space-y-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4">
              <div className="flex items-center gap-2 text-[8px] font-mono text-emerald-500 uppercase bg-emerald-500/5 border border-emerald-500/20 px-2 py-1 rounded">
                <i className="fa-solid fa-shield-halved"></i>
                Hash_Verified
              </div>
            </div>
            <div className="space-y-4">
              <i className="fa-solid fa-quote-left text-2xl text-indigo-500/30"></i>
              <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed font-medium italic">
                "{testimonial.content}"
              </p>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-900">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-500 font-bold uppercase">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase">
                  {testimonial.name}
                </h4>
                <p className="text-[10px] text-zinc-500 font-mono uppercase">
                  {testimonial.role} @ {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
