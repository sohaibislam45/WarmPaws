import React from "react";
import HeroSlider from "../../components/HeroSlider";
import ServiceList from "../../components/ServiceList";
import experts from "../../data/experts.json";
import tips from "../../data/tips.json";
import ExtraShop from "../../components/ExtraShop";
import WinterTips from "../../components/WinterTips";

export default function Home() {
  return (
    <div className="space-y-10">
      <HeroSlider />

      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Popular Winter Care Services
        </h2>
        <ServiceList limit={6} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">
          Winter Care Tips for Pets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tips.map((t, i) => (
            <div key={i} className="p-4 bg-base-100 shadow rounded">
              <h4 className="font-medium">{t.title}</h4>
              <p className="text-sm text-gray-500 mt-2">{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Meet Our Expert Vets</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {experts.map((e) => (
            <div
              key={e.email}
              className="p-4 bg-base-100 rounded shadow text-center"
            >
              <img
                src={e.photo}
                alt={e.name}
                className="w-24 h-24 rounded-full mx-auto object-cover"
              />
              <div className="mt-3 font-medium">{e.name}</div>
              <div className="text-sm text-gray-500">{e.title}</div>
            </div>
          ))}
        </div>
      </section>

      <section className=" mb-4">
        <ExtraShop/>
      </section>
      <section>
        <WinterTips/>
      </section>
    </div>
  );
}
