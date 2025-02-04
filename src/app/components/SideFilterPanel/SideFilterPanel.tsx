import React, { useEffect, useState } from "react";
import { Product } from "../types";
import { createClient } from "src/app/utils/supabase/client";

export interface SideFilterPanelProps {
  setSelectedCategories: (categories: Set<string>) => void;
  setItems: (items: Product[]) => void;
  refetchProducts: () => void;
}

export default function SideFilterPanel(props: SideFilterPanelProps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    async function fetchCategories() {
      const supabase = createClient();
      const { data: categoryData, error: categoryError } = await supabase
        .from("products")
        .select("category");
      const categories = new Set(categoryData?.map((item) => item.category));
      if (categoryError) {
        console.error("Error fetching categories:", categoryError);
      } else {
        setCategories(Array.from(categories));
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      props.setSelectedCategories(selectedCategories);
      const response = await fetch("/api/filter/category", {
        headers: {
          categories: JSON.stringify(Array.from(selectedCategories)),
          tableName: "products",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status === 200) {
          props.setItems(responseData.data);
        }
      }
    }
    if (selectedCategories.size !== 0) {
      fetchProducts();
    }
    if (selectedCategories.size === 0) {
      props.setSelectedCategories(selectedCategories);
      props.refetchProducts();
    }
  }, [selectedCategories]);

  async function handleCategoryChange(category: string) {
    setSelectedCategories((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(category)) {
        newSelected.delete(category);
      } else {
        newSelected.add(category);
      }
      return newSelected;
    });
  }

  return (
    <div className="flex flex-col md:flex-row items-center w-full p-4 border-r-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg transition-colors duration-300">
      <h2 className="font-bold text-xl text-gray-700 dark:text-gray-300 cursor-pointer pr-2">
        Select Filters:
      </h2>
      <div
        className={`flex flex-col md:flex-row fixed md:static top-[200px] md:top-auto space-y-2 md:space-y-0 md:space-x-4   z-50 `}
      >
        {categories.map((category) => (
          <div
            key={category}
            className="border-r border-gray/20 pr-2 dark:border-gray/20"
          >
            <div className="flex items-center p-2 border-r-2 border-b bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200">
              <input
                type="checkbox"
                id={category}
                checked={selectedCategories.has(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label
                htmlFor={category}
                className="text-gray-700 dark:text-gray-300"
              >
                {category}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
