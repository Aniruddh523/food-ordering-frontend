import React from 'react'
import { useEffect, useState } from "react";
 import { Link }from "react-router-dom";
  import toast from "react-hot-toast"; 
  import API from "../services/api";
  import{useNavigate} from"react-router-dom"



   const Cart = () => {
    const Navigate = useNavigate();
     const [cartItems, setCartItems] = useState([]);

    const [loading, setLoading] = useState(true); 
    useEffect(() => { fetchCart(); }, []);
     const fetchCart = async () => {
       try
        { 
          const res = await API.get("/api/cart/getCart"); 
     setCartItems(res.data.carts);
     } catch (err) { 
      
      console.log(err); 
      toast.error("Failed to Load Cart");
    

     }
      finally { setLoading(false); } };
       const removeItem = async (id) => { 
        
        try 
        { 
          await API.delete(`/api/cart/removeFromCart/${id}`);

       toast.success("Item Removed");
       
       fetchCart(); 
      } catch (err) {
         console.log(err);
        toast.error("Remove Failed");
       } };
         const clearCart = async () => { 
          try {
             await API.delete("/api/cart/clearCart");
          toast.success("Cart Cleared"); setCartItems([]); 
        } catch (err) { 
          console.log(err);
           toast.error("Failed To Clear Cart"); 
          } };
          
          const totalPrice = cartItems.reduce((total, item) => 
           {
             return total + item.totalPrice; }, 0); if (loading)
               { 
            return ( <h2 className="text-center text-2xl mt-20"> Loading... </h2> );
           }
             return ( 
             <div className="max-w-7xl mx-auto px-6 py-10">
               <h1 className="text-4xl font-bold mb-8"> My Cart </h1>
              {
              cartItems.length === 0 ? ( 
              
              <div className="text-center"> 

                <h2 className="text-2xl font-semibold mb-5"> Your Cart is Empty </h2> 
              <Link to="/" className="bg-orange-500 text-white px-6 py-3 rounded-lg" > 
Continue Shopping </Link> 
</div>
 ) : ( 
 <>
 <div className="space-y-6"> 
  
  
  {cartItems.map((item) => 
( <div key={item._id} className="flex items-center justify-between bg-white shadow rounded-xl p-5" >
   <div className="flex items-center gap-5"> 

    
    <img src={item.food.image} alt={item.food.name} 
   className="w-28 h-28 rounded-lg object-cover" /> 
   <div> 
    
    <h2 className="text-xl font-bold"> {item.food.name}</h2>
     <p> ₹ {item.food.price} </p> 

    <p> Quantity : {item.quantity} </p> 
    
    <p className="font-semibold"> Total : ₹ {item.totalPrice} </p> 
    </div> 
    </div>
    
     <button onClick={() => 
      removeItem(item._id)} className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600" > Remove </button> 
    </div>
   ))}
    
     </div>
    
     <div className="mt-10 bg-gray-100 rounded-xl p-6"> <h2 className="text-3xl font-bold"> Total : ₹ {totalPrice} 
      </h2> 
      
      <div className="flex gap-5 mt-6">
        
        
         <button onClick={clearCart} className="bg-red-500 text-white px-6 py-3 rounded-lg" > Clear Cart </button> 
      <Link to="/checkout" className="bg-green-600 text-white px-6 py-3 rounded-lg" > Checkout </Link> 
      </div> 
      </div> 
      </>
    
    
    )} 
      
      
      </div> 
      
    
    
    ); }; 
      
      
      
      
      
      
      export default Cart;