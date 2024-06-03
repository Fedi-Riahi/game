"use client";
import React, { useState, useEffect } from "react";

const ConditionFilter = ({ selectedConditions = [], onChange }) => {
  const [conditions, setConditions] = useState([]);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/userproduct");
        if (!response.ok) {
          throw new Error("Failed to fetch conditions");
        }
        const data = await response.json();
        const allConditions = data.products.map((product) => product.condition);
        const uniqueConditions = Array.from(new Set(allConditions));
        setConditions(uniqueConditions);
      } catch (error) {
        console.error("Error fetching conditions:", error);
      }
    };

    fetchConditions();
  }, []);

  const handleConditionChange = (event, condition) => {
    const isChecked = event.target.checked;
    const updatedConditions = isChecked
      ? [...selectedConditions, condition]
      : selectedConditions.filter((cond) => cond !== condition);
    onChange(updatedConditions);
  };

  return (
    <div className="overflow-auto max-h-60">
      <ul className="flex md:flex-col flex-wrap items-start justify-start md:justify-center gap-2">
        {conditions.map((condition, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={`condition-${index}`}
              value={condition}
              checked={selectedConditions.includes(condition)}
              onChange={(event) => handleConditionChange(event, condition)}
              className="hidden"
            />
            <label
              htmlFor={`condition-${index}`}
              className={`inline-flex text-sm items-center w-full p-2 font-normal text-gray-900 cursor-pointer `}
              style={{ width: "100%" }}
            >
              <input
                type="checkbox"
                checked={selectedConditions.includes(condition)}
                onChange={(event) => handleConditionChange(event, condition)}
                className="accent-gray-800 w-6 h-6 text-white border-gray-300 rounded mr-2 peer peer-checked:bg-gray-500 peer-checked:text-gray-900"
              />
              <span className="text-md font-medium">{condition}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConditionFilter;
