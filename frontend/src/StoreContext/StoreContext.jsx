import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  // Add to Cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
    }
  };

  // Remove from Cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }));

    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
    }
  };

  // Get total cart amount
  const getTotalCartAmount = () => {
    if (!cartItems || Object.keys(cartItems).length === 0) return 0; // Ensure cartItems is not null/undefined

    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const itemInfo = food_list.find((product) => product._id === itemId);
      return itemInfo ? total + itemInfo.price * quantity : total;
    }, 0);
  };

  // Fetch food list
  const fetchFoodlist = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data || []);
    } catch (error) {
      console.error("Error fetching food list:", error);
      setFoodList([]);
    }
  };

  // Load Cart Data
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        `${url}/api/cart/get`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setCartItems(response.data.cartData || {}); // Ensure it's never null/undefined
    } catch (error) {
      console.error("Error loading cart data:", error.response?.data || error);
      setCartItems({}); // Set empty object to avoid errors
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodlist();

      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
