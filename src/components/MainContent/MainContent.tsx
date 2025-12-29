import { useEffect, useState } from "react";
import { useFilter } from "../FilterContext/FilterContext";
import axios from "axios";
import { Tally3 } from "lucide-react";

export function MainContent() {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } = useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(true);

  const itemsPerpage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerpage}&skip=${(currentPage - 1) * itemsPerpage}`;
    if (keyword) {
      url = `https://dummyjson.com/products/search?q=${keyword}`;
    }
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data.products);
        console.log(response.data.products, "products data");
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [currentPage, keyword]);

  // Filter products based on category
  const getFilteredProducts = () => {
    let filteredProducts = products;
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) => product.category === selectedCategory);
    }

    return filteredProducts;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button className="border px-4 py-2 rounded-full flex items-center cursor-pointer ">
              <Tally3 className="mr-2" />
              {filter === "all" ? "Filter" : filter.charAt(0).toLowerCase() + filter.slice(1)}
            </button>
            {dropdownOpen && (
              <div className="absolute bg-white border-gray-300 rounded mt-2 w-full sm:w-40 ">
                <button
                  onClick={() => setFilter("cheap")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  Cheap
                </button>

                <button
                  onClick={() => setFilter("expensive")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  Expensive
                </button>

                <button
                  onClick={() => setFilter("popular")}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  Popular
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
         
        </div>
      </div>
    </section>
  );
}
