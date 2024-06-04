"use client";
import React, { useState, useEffect } from "react";
import CategoryFilter from "@/components/categoryFilter/CategoryFilter";
import ConditionFilter from "@/components/conditionFilter/ConditionFilter";
import PriceFilter from "@/components/priceFilter/PriceFilter";
import ProductCard from "@/components/productCard/ProductCard";
import Intro from "@/components/intro/Intro";

const Listings = () => {
  const [listings, setListings] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [filteredConditions, setFilteredConditions] = useState([]);
  const [filteredPriceRange, setFilteredPriceRange] = useState([0, 10000]);
  const [displayedListings, setDisplayedListings] = useState(6);
  const [showFilters, setShowFilters] = useState(false);

  const handleCategoryFilterChange = (selectedCategories) => {
    setFilteredCategories(selectedCategories);
  };

  const handleConditionFilterChange = (selectedConditions) => {
    setFilteredConditions(selectedConditions);
  };

  const handlePriceFilterChange = (selectedPriceRange) => {
    setFilteredPriceRange(selectedPriceRange);
  };

  useEffect(() => {
    const getListings = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/userproduct");

        if (!res.ok) {
          throw new Error("Failed to fetch listings");
        }

        const data = await res.json();

        let filteredListings = data.products;

        if (filteredCategories.length > 0) {
          filteredListings = filteredListings.filter((product) =>
            filteredCategories.includes(product.category)
          );
        }

        if (filteredConditions.length > 0) {
          filteredListings = filteredListings.filter((product) =>
            filteredConditions.includes(product.condition)
          );
        }

        filteredListings = filteredListings.filter(
          (product) =>
            product.price >= filteredPriceRange[0] &&
            product.price <= filteredPriceRange[1]
        );

        setListings(filteredListings);
      } catch (error) {
        console.log("Error loading listings", error);
      }
    };

    getListings();
  }, [filteredCategories, filteredConditions, filteredPriceRange]);

  const loadMoreListings = () => {
    setDisplayedListings((prev) => prev + 6);
    const listingsContainer = document.getElementById("listings-container");
    if (listingsContainer) {
      listingsContainer.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  return (
    <div className="bg-white w-full">
      <Intro title="Marketplace Products"/>
      <div className="md:px-10 sm:px-5 w-full">
        <div className="flex items-center justify-between w-fit mt-4 mb-5">
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
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Categories</h3>
                <CategoryFilter
                  selectedCategories={filteredCategories}
                  onChange={handleCategoryFilterChange}
                />
                <h3 className="text-lg font-semibold mb-2 mt-4">Condition</h3>
                <ConditionFilter
                  selectedConditions={filteredConditions}
                  onChange={handleConditionFilterChange}
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
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4 mb-4 md:mr-4">
            <div className="bg-white">
              <div className="p-5 border-b border-gray-200">
                <h3 className="text-lg font-semibold mb-2">Categories</h3>
                <CategoryFilter
                  selectedCategories={filteredCategories}
                  onChange={handleCategoryFilterChange}
                />
                <h3 className="text-lg font-semibold mb-2 mt-4">Condition</h3>
                <ConditionFilter
                  selectedConditions={filteredConditions}
                  onChange={handleConditionFilterChange}
                />
                <h3 className="text-lg font-semibold mb-2 mt-4">Price</h3>
                <PriceFilter
                  selectedPriceRange={filteredPriceRange}
                  onChange={handlePriceFilterChange}
                />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-5">
              {listings.slice(0, displayedListings).map((listing) => (
                <ProductCard listing={listing} key={listing._id} />
              ))}
            </div>
            {displayedListings < listings.length && (
              <div className="flex justify-center">
                <button
                  className="bg-zinc text-white py-2 px-4 mt-4"
                  onClick={loadMoreListings}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
