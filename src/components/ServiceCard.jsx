// src/components/ServiceCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import Rating from "./ui/Rating";

export default function ServiceCard({ service }) {
  return (
    <div className="card card-compact bg-base-100 shadow">
      <figure>
        <img
          src={service.image}
          alt={service.serviceName}
          className="object-cover w-full h-48"
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title">{service.serviceName}</h3>
        <div className="flex items-center justify-between">
          <Rating value={service.rating} />
          <div className="text-lg font-semibold">${service.price}</div>
        </div>
        <p className="text-sm text-gray-500">
          {service.description?.slice(0, 100)}...
        </p>
        <div className="card-actions justify-end">
          <Link
            to={`/services/${service.serviceId}`}
            className="btn btn-sm btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
