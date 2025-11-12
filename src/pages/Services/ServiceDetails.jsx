import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import toast from "react-hot-toast";
import Rating from "../../components/ui/Rating";

export default function ServiceDetails() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  // booking form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch("/data.json")
      .then((r) => r.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : [data];
        const found = list.find((s) => String(s.serviceId) === String(id));
        if (!cancelled) setService(found || null);
      })
      .catch(() => setService(null))
      .finally(() => !cancelled && setLoading(false));

    return () => (cancelled = true);
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!service) return <div className="text-red-500">Service not found</div>;

  const handleBook = (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Provide name & email");
      return;
    }
    toast.success("Booking confirmed (demo)");
    setName("");
    setEmail("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <img
          src={service.image}
          alt={service.serviceName}
          className="rounded w-full h-80 object-cover"
        />
        <div className="mt-4">
          <h1 className="text-2xl font-semibold">{service.serviceName}</h1>
          <div className="flex items-center justify-between mt-2">
            <Rating value={service.rating} />
            <div className="text-xl font-bold">${service.price}</div>
          </div>
          <p className="mt-4 text-gray-600">{service.description}</p>

          <div className="mt-6">
            <h3 className="font-medium">Provider</h3>
            <div className="text-sm text-gray-600">
              {service.providerName} — {service.providerEmail}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Slots available: {service.slotsAvailable}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Category: {service.category}
            </div>
          </div>
        </div>
      </div>

      <aside className="p-4 bg-base-100 rounded shadow">
        <h3 className="font-semibold mb-3">Book Service</h3>
        <form onSubmit={handleBook} className="space-y-3">
          <div>
            <label className="text-sm">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Book Now
          </button>
        </form>
      </aside>
    </div>
  );
}
