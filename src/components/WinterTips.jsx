import React from "react";
import tipsData from "../data/tips.json";


export default function WinterTips() {
  return (
    <section className="py-10 bg-slate-50">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold mb-3">Winter Care Tips for Pets</h3>
        <p className="text-sm text-gray-500 mb-6">
          Quick and practical tips to keep your pet safe and comfortable during
          the cold months.
        </p>

        <div className="space-y-3">
          {tipsData.map((t) => (
            <details key={t.id} className="bg-white p-4 rounded-lg shadow-sm">
              <summary className="font-medium cursor-pointer list-none">
                {t.title}
              </summary>
              <div className="mt-2 text-sm text-gray-600">{t.text}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
