"use client";
import React, { useState, useEffect } from "react";
import GiftCard from "@/components/giftCard/GiftCard";
import PlatformFilter from "@/components/platformFilter/PlatformFilter";
import CurrencyFilter from "@/components/currencyFilter/CurrencyFilter";
import PriceFilter from "@/components/priceFilter/PriceFilter"; // Import the PriceFilter component
import Intro from "@/components/intro/Intro";

function GiftCardListings() {
  const [gifts, setGifts] = useState([]);
  const [filteredPlatforms, setFilteredPlatforms] = useState([]);
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const [filteredPriceRange, setFilteredPriceRange] = useState([0, 10000]); // State for price range filter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayedGifts, setDisplayedGifts] = useState(6);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchGifts = async () => {
      try {
        const response = await fetch("/api/product");
        if (!response.ok) {
          throw new Error("Failed to fetch gifts");
        }
        const data = await response.json();
        setGifts(data.products);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchGifts();
  }, []);

  const handlePlatformFilterChange = (selectedPlatforms) => {
    setFilteredPlatforms(selectedPlatforms);
  };

  const handleCurrencyFilterChange = (selectedCurrencies) => {
    setFilteredCurrencies(selectedCurrencies);
  };

  const handlePriceFilterChange = (selectedPriceRange) => {
    setFilteredPriceRange(selectedPriceRange);
  };

  const loadMoreGifts = () => {
    setDisplayedGifts((prev) => prev + 6);
    const giftListContainer = document.getElementById("gift-list-container");
    if (giftListContainer) {
      giftListContainer.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white w-full">
      <Intro title="Digital Products"/>
      <div className="md:px-10 sm:px-5 w-full">
        <div className="flex items-center justify-between w-full mt-4 mb-5">
          <div className="flex flex-col gap-1 w-2/5">
            <button
              className="block md:hidden bg-zinc text-white py-2 px-4"
              onClick={() => setShowFilters(true)}
            >
              Filters
            </button>
          </div>
        </div>
        {showFilters && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Filters</h2>
              <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold mb-2 mt-4">Platforms</h3>
                <PlatformFilter
                  selectedPlatforms={filteredPlatforms}
                  onChange={handlePlatformFilterChange}
                />
                <h3 className="text-lg font-semibold mb-2 mt-4">Currencies</h3>
                <CurrencyFilter
                  selectedCurrencies={filteredCurrencies}
                  onChange={handleCurrencyFilterChange}
                />
                <h3 className="text-lg font-semibold mb-2 mt-4">Price</h3>
                <PriceFilter
                  selectedPriceRange={filteredPriceRange}
                  onChange={handlePriceFilterChange}
                />
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="bg-zinc text-white py-2 px-4 mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row md:gap-5">
          <div className="md:w-1/4 mb-4">
            
            <div className="bg-white">
            <h2 className="text-2xl px-5 font-bold mb-4">Filters</h2>
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Platform</h3>
                <PlatformFilter
                  selectedPlatforms={filteredPlatforms}
                  onChange={handlePlatformFilterChange}
                />
                <h3 className="text-lg font-semibold mb-2 mt-4">Currency</h3>
                <CurrencyFilter
                  selectedCurrencies={filteredCurrencies}
                  onChange={handleCurrencyFilterChange}
                />
                <h3 className="text-lg font-semibold mb-2 mt-4">Price</h3>
                <PriceFilter
                  selectedPriceRange={filteredPriceRange}
                  onChange={handlePriceFilterChange}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <div
              className="grid md:grid-cols-4 grid-cols-1 gap-5"
              id="gift-list-container"
            >
              {gifts
                .filter(
                  (gift) =>
                    (filteredPlatforms.length === 0 ||
                      filteredPlatforms.includes(gift.platform)) &&
                    (filteredCurrencies.length === 0 ||
                      filteredCurrencies.includes(gift.currency)) &&
                    gift.price >= filteredPriceRange[0] &&
                    gift.price <= filteredPriceRange[1]
                )
                .slice(0, displayedGifts)
                .map((gift) => (
                  <GiftCard gift={gift} key={gift._id} />
                ))}
            </div>
            {displayedGifts < gifts.length && (
              <button
                className="bg-zinc text-white py-2 px-4 mt-4 self-center"
                onClick={loadMoreGifts}
              >
                Load More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiftCardListings;
