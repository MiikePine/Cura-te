import React from "react";
import Link from "next/link";
import { therapies } from "../data/homeData";

export default function TherapiesGrid() {
  return (
    <section className="py-20 bg-[#F8F5F1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-[#4A6670] mb-10 text-center">
          Explore Our Practices
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {therapies.map((therapy) => (
            <Link
              href={therapy.path}
              key={therapy.name}
              className="group bg-white rounded-lg p-4 shadow-sm hover:shadow-md hover:bg-[#E6B17E]/10 transition-all duration-300"
            >
              <div className="text-center">
                <div className="bg-[#7C9A92]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
                  <therapy.icon className="h-6 w-6 text-[#7C9A92] group-hover:text-[#E6B17E] transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-[#4A6670] group-hover:text-[#E6B17E] transition-colors">
                  {therapy.name}
                </h3>
                <p className="text-xs text-[#7C9A92]">{therapy.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}