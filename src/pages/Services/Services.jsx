import React from "react";
import ServiceList from "../../components/ServiceList";

export default function Services() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">All Services</h1>
      <ServiceList limit={20} />
    </div>
  );
}
