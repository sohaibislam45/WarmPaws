import React from "react";
import clothingData from "../data/clothing.json";
import toast from "react-hot-toast";

/**
 * ExtraShop — Winter Clothing Shop
 * - Displays a responsive grid of product cards
 * - "Add to Cart" shows a toast (no backend)
 * - "View" button can link to a product details route (optional)
 */

export default function ExtraShop() {
  const handleAddToCart = (item) => {
    // placeholder action
    toast.success(`${item.name} added to cart`);
  };

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Winter Clothing Shop</h3>
            <p className="text-sm text-gray-500">
              Keep your pet cozy — curated winter wear for comfort and safety.
            </p>
          </div>
          <div>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => toast("Shop updated!")}
            >
              See all
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clothingData.map((item) => (
            <article
              key={item.id}
              className="card bg-white shadow-sm rounded-lg overflow-hidden"
            >
              <div className="h-44 bg-gray-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h4 className="font-semibold">{item.name}</h4>
                <div className="text-xs text-gray-500">{item.brand}</div>

                <p className="text-sm text-gray-600 mt-2 flex-1">
                  {item.description}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold">${item.price}</div>
                    <div className="text-xs text-yellow-500">
                      ★ {item.rating}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="btn btn-sm btn-primary"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => toast.info("View details not implemented")}
                      className="btn btn-sm btn-ghost"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
