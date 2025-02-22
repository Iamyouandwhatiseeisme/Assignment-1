import React, { useEffect, useState } from "react";
import { Product, SortOption } from "../types";
import { createClient } from "src/app/utils/supabase/client";
import { useLocale } from "../providers/LanguageContext";
export interface SideFilterPanelPorps {
  setSelectedCategories: (cateogires: Set<string>) => void;
  setItems: (items: Product[]) => void;
  refetchProducts: () => void;
  sortBy: SortOption;
  refetchCategories: boolean;
}

export default function FilterPael(props: SideFilterPanelPorps) {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const {
    dictionary: { products },
  } = useLocale();
  const {
    setItems,
    setSelectedCategories: setSelectedCategoriesProps,
    refetchProducts,
    sortBy,
    refetchCategories,
  } = props;

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
  }, [refetchCategories]);
  useEffect(() => {
    async function fetchProducts() {
      setSelectedCategoriesProps(selectedCategories);
      const response = await fetch("/api/filter/category", {
        headers: {
          categories: JSON.stringify(Array.from(selectedCategories)),
          tableName: "products",
          columnName: sortBy.value,
          orderBy: sortBy.order === "Ascending" ? "true" : "false",
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        if (responseData.status === 200) {
          setItems(responseData.data);
        }
      }
    }
    if (selectedCategories.size !== 0) {
      fetchProducts();
    }
    if (selectedCategories.size === 0) {
      setSelectedCategoriesProps(selectedCategories);
      refetchProducts();
    }
  }, [
    selectedCategories,
    setSelectedCategoriesProps,
    setItems,
    refetchProducts,
    sortBy,
  ]);

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
    <div className="flex flex-col sm:flex-row w-full min-h-24 mt-24 sm:mt-0  overflow-y-auto bg-white/30 dark:bg-black/20   items-center justify-center gap-4 shadow-lg p-4">
      <h2 className="font-bold text-lg text-gray-900 dark:text-gray-100 w-40 ">
        {products.SelectFilters} :
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <div
            key={category}
            className="border border-opacity-30 border-b-2 border-r-2 shadow-sm dark:shadow-white/10 shadow-black/10 rounded-lg hover:bg-gray-200/40 border-gray-400 dark:border-gray-700 p-2 transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                id={category}
                checked={selectedCategories.has(category)}
                onChange={() => handleCategoryChange(category)}
                className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400 border-gray-300 dark:border-gray-600 rounded"
              />
              <label
                htmlFor={category}
                className="text-gray-900 dark:text-gray-100"
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
