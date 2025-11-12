import React from "react";
import ServiceCard from "./ServiceCard";
import useFetchJSON from "../hooks/useFetchJSON";
import LoadingSpinner from "./LoadingSpinner";

export default function ServiceList({ limit = 6 }) {
  const { data, loading, error } = useFetchJSON("/data.json");

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">Failed to load services</div>;

  const list = Array.isArray(data) ? data : [data];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {list.slice(0, limit).map((s) => (
        <ServiceCard key={s.serviceId} service={s} />
      ))}
    </div>
  );
}
