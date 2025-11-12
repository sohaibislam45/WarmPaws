// src/components/layout/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral text-neutral-content mt-12">
      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-linear-to-br from-amber-300 to-rose-300 flex items-center justify-center text-white font-bold">
                WP
              </div>
              <div>
                <h3 className="text-lg font-semibold">WarmPaws</h3>
                <p className="text-sm text-neutral-300">
                  Cozy winter care for your furry friends.
                </p>
              </div>
            </Link>

            <p className="mt-4 text-sm text-neutral-300">
              Need help? Reach out — we love talking pets. Find local services,
              grooming, and winter outfits carefully curated for comfort.
            </p>

            <div className="flex items-center gap-3 mt-4">
              <a
                href="mailto:info@warmpaws.example"
                className="link link-hover text-sm text-neutral-200"
                aria-label="Email WarmPaws"
              >
                info@warmpaws.example
              </a>
              <span className="text-neutral-400">|</span>
              <a
                href="tel:+1234567890"
                className="text-sm text-neutral-200"
                aria-label="Call WarmPaws"
              >
                +1 (234) 567-890
              </a>
            </div>
          </div>

          <div className="flex justify-between md:justify-center">
            <div>
              <h4 className="font-medium">Explore</h4>
              <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                <li>
                  <Link to="/" className="link link-hover">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="link link-hover">
                    Services
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="link link-hover">
                    My Profile
                  </Link>
                </li>
              </ul>
            </div>

            <div className="ml-8 md:ml-12">
              <h4 className="font-medium">Legal</h4>
              <ul className="mt-3 space-y-2 text-sm text-neutral-300">
                <li>
                  <Link to="/privacy" className="link link-hover">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="link link-hover">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="link link-hover">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-sm">
            <h4 className="font-medium">Stay connected</h4>
            <p className="mt-3 text-neutral-300">
              Follow us for tips, seasonal offers and pet care advice.
            </p>

            <div className="flex items-center gap-3 mt-4">
              <a
                href="#"
                aria-label="WarmPaws on Facebook"
                className="p-2 rounded-lg bg-opacity-10 bg-white hover:bg-opacity-20"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                aria-label="WarmPaws on Twitter"
                className="p-2 rounded-lg bg-opacity-10 bg-white hover:bg-opacity-20"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                aria-label="WarmPaws on Instagram"
                className="p-2 rounded-lg bg-opacity-10 bg-white hover:bg-opacity-20"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="WarmPaws on LinkedIn"
                className="p-2 rounded-lg bg-opacity-10 bg-white hover:bg-opacity-20"
              >
                <FaLinkedin />
              </a>
            </div>

            <div className="mt-6 text-neutral-400">
              <div>Customer support: Mon–Fri, 9am–6pm</div>
              <div className="mt-3">
                © {currentYear} WarmPaws. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
