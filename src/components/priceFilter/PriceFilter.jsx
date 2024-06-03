"use client";
import React, { useState } from "react";

const PriceFilter = ({ selectedPriceRange = [0, 10000], onChange }) => {
  const [minPrice, setMinPrice] = useState(selectedPriceRange[0]);
  const [maxPrice, setMaxPrice] = useState(selectedPriceRange[1]);

  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(value);
    onChange([value, maxPrice]);
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
    onChange([minPrice, value]);
  };

  return (
    <div className="overflow-auto max-h-60">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Min Price</label>
        <input
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          className="w-1/2 p-2 border border-gray-300 rounded"
        />
        <label className="text-sm font-medium">Max Price</label>
        <input
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          className="w-1/2 p-2 border border-gray-300 rounded"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
