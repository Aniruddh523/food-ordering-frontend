import { useState, useEffect } from "react";

import HeroSection from "../components/heroSection";
import SearchBar from "../components/searchBar";
import CategoryFilter from "../components/categoryFilter";
import SortDropdown from "../components/shortdown";
import FoodCard from "../components/foodCard";
import Pagination from "../components/pagenation";

import Footer from "../components/footer";

import API from "../services/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Home() {
  const Navigate = useNavigate()
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchFoods();
  }, [search, category, sort, page]);

  const fetchFoods = async () => {
    try {
      const res = await API.get("/api/food/getAllFood", {
        params:{
          search,
          category,
          sort,
          page,
          limit: 8,
        },
      });

      if (res.data.data) {
        setFoods(res.data.data);
      } else {
        setFoods(res.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load foods");
    }
  };

  const addToCart = async (food) => {
   try{
      await API.post("/api/cart/addCart", {
        food: food._id,
        quantity: 1,
        totalPrice:food.price,
      });

      toast.success("added to cart")
    } catch (err) {
      console.log(err);
      toast.error("Please Login First");
    Navigate("login")
     }
   };




  

  return (
    <>
      <HeroSection />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <CategoryFilter
        category={category}
        setCategory={setCategory}
      />

      <SortDropdown
        sort={sort}
        setSort={setSort}
      />

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {foods.length > 0 ? (
          foods.map((food) => (
            <FoodCard
              key={food._id}
              food={food}
              addToCart={addToCart}
            />
          ))
        ) : (
          <h2 className="col-span-full text-center text-2xl font-semibold text-gray-500">
            No Food Found
          </h2>
        )}
      </div>

      <Pagination
        page={page}
        setPage={setPage}
      />

      <Footer/>
    </>
  );
}

export default Home;