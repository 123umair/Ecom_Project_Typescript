import { useEffect, useState } from "react";
import { useFilter } from "../FilterContext/FilterContext";
import axios from "axios";
import { Tally3 } from "lucide-react";
import { BookCard } from "../BookCard/BookCart";

export function MainContent() {
  const { searchQuery, selectedCategory, minPrice, maxPrice, keyword } =
    useFilter();

  const [products, setProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const itemsPerpage = 12;

  useEffect(() => {
    let url = `https://dummyjson.com/products?limit=${itemsPerpage}&skip=${
      (currentPage - 1) * itemsPerpage
    }`;
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
      filteredProducts = filteredProducts.filter(
        (product) => product.category === selectedCategory
      );
      console.log(filteredProducts, "filterproducts");
    }

    if (minPrice != undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
      console.log(filteredProducts, "filterProducts");
    }

    if (maxPrice != undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
      console.log(filteredProducts, "filterProducts");
    }

    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    switch (filter) {
      case "expensive":
        return filteredProducts.sort((a, b) => b.price - a.price);

      case "cheap":
        return filteredProducts.sort((a, b) => b.price - a.price);

      case "popular":
        return filteredProducts.sort((a, b) => b.price - a.price);

      default:
        return filteredProducts;
    }
  };

  const filteredProducts = getFilteredProducts();

  const totalProducts = 100;

  const totalPages = Math.ceil(totalProducts / itemsPerpage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  const getPaginationButtons = () => {

    const buttons: number[] = []
    
    let startPage: number = Math.max(1,currentPage - 2)

    let endPage: number = Math.min(totalPages, currentPage + 2)


    if (currentPage - 2 < 1)
    {
      endPage = Math.min(totalPages, endPage + (2 - currentPage - 1))
    }

    if (currentPage + 2 > totalPages)
      {
        startPage = Math.min(1, startPage - (2 - totalPages - currentPage))
      }

    for (let page = startPage; page <= endPage; page++) {
      
      buttons.push(page)

    }

    return buttons


  }
  return (
    <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
      <div className="mb-5">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="relative mb-5 mt-5">
            <button 

             className="border px-4 py-2 rounded-full flex items-center cursor-pointer"
             
             onClick={()=>{setDropdownOpen(!dropdownOpen)}}
             >
              <Tally3 className="mr-2" />
              {filter === "all"
                ? "Filter"
                : filter.charAt(0).toLowerCase() + filter.slice(1)}
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
          {filteredProducts.map((product) => (
            <BookCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.thumbnail}
              price={product.price}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
        {/* previous */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="border px-4 py-2 mx-2 rounded-full"
        >
          Previous
        </button>
        {/* 1,2,3,4,5  */}

        <div className="flex flex-wrap justify-center">
          {
            getPaginationButtons().map(page => (
              <button key={page} onClick={() => handlePageChange(page)} className={`border px-4 py-2 mx-1 rounded-full ${ page === currentPage ? "bg-black text-white" :""}`}> 
              {page}
               </button>
            ))
          }
        </div>

        {/* next */}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="border px-4 py-2 mx-2 rounded-full"
        >
          Next
        </button>
      </div>
    </section>
  );
}
