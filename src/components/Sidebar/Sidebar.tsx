import { useEffect, useState } from "react";
import { useFilter } from "../FilterContext/FilterContext.tsx";

interface Product {
  category: string;
}

interface FetchResponse {
  products: Product[];
}

const Sidebar = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    keyword,
    setKeyword,
  } = useFilter();

  const [categories, setCategories] = useState<string[]>([]);
  const [keywords] = useState<string[]>([
    "apple",
    "watch",
    "fashion",
    "trend",
    "shoes",
    "shirt",
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data: FetchResponse = await response.json();
        const uniqueCategories = Array.from(
          new Set(data.products.map((product) => product.category))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value ? parseFloat(value) : undefined);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value ? parseFloat(value) : undefined);
  };

  const handleRadioChangeCategories = (category: string) => {
    setSelectedCategory(category);
  };

  const handleKeywordClick = (keyword: string) => {
    setKeyword(keyword);
  };

  const handleResetFilter = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setKeyword("");
  };

  return (
    <aside
      className="
        p-3 sm:p-4 md:p-5
        bg-gray-100
         md:w-64
        h-auto md:h-screen
        w-
        overflow-y-auto
      "
    >
      {/* Title */}
      <h1 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-10 mt-2 sm:mt-4">
        React Store
      </h1>

      {/* Search */}
      <input
        type="text"
        className="
          border-2 rounded
          px-3 py-2 sm:py-3
          mb-3 w-full
          text-sm sm:text-base
        "
        placeholder="Search Product"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Min / Max Price */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          className="
            border-2
            px-3 py-2 sm:py-3
            w-full
            text-sm sm:text-base
          "
          placeholder="Min"
          value={minPrice ?? ""}
          onChange={handleMinPriceChange}
        />

        <input
          type="text"
          className="
            border-2
            px-3 py-2 sm:py-3
            w-full
            text-sm sm:text-base
          "
          placeholder="Max"
          value={maxPrice ?? ""}
          onChange={handleMaxPriceChange}
        />
      </div>

      {/* Categories */}
      <div className="mb-5">
        <h2 className="text-lg sm:text-xl font-semibold mb-3">
          Categories
        </h2>

        {categories.map((category, index) => (
          <label
            key={index}
            className="flex items-center gap-2 mb-2 text-sm sm:text-base cursor-pointer"
          >
            <input
              type="radio"
              name="category"
              value={category}
              className="w-4 h-4"
              checked={selectedCategory === category}
              onChange={() => handleRadioChangeCategories(category)}
            />
            {category.toUpperCase()}
          </label>
        ))}
      </div>

      {/* Keywords */}
      <div className="mb-5">
        <h2 className="text-lg sm:text-xl font-semibold mb-3">
          Keywords
        </h2>

        {keywords.map((keyword, index) => (
          <button
            key={index}
            className="
              block w-full text-left
              mb-2 px-3 py-2
              text-sm sm:text-base
              border rounded
              hover:bg-gray-200
              transition
            "
            onClick={() => handleKeywordClick(keyword)}
          >
            {keyword.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Reset */}
      <button
        onClick={handleResetFilter}
        className="
          w-full py-2 sm:py-3
          bg-black text-white
          rounded
          text-sm sm:text-base
          mt-4
        "
      >
        Reset Filters
      </button>
    </aside>
  );
};

export default Sidebar;
