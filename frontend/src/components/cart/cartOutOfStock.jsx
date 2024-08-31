// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { getAllProducts } from "../../redux/actions/product";

// const CartOutOfStock = () => {
//   const dispatch = useDispatch();
//   const { allProducts, isLoading } = useSelector((state) => state.products);
//  // const [outOfStockItems, setOutOfStockItems] = useState([]);
//   const navigate = useNavigate();
//   const outOfStockItems = JSON.parse(localStorage.getItem("outOfStock"));
//   let cartItems2 = JSON.parse(localStorage.getItem("cartItems"));

//   //if (outOfStockData &&outOfStockData.length>outOfStockItems.length) {
//     //setOutOfStockItems(JSON.parse(outOfStockData));
//  // }
// //   useEffect(() => {
// //     // const outOfStockData = localStorage.getItem("outOfStock");
// //     if (outOfStockData &&outOfStockData.length>outOfStockItems.length) {
// //       setOutOfStockItems(JSON.parse(outOfStockData));
// //     }
// //   }, [outOfStockItems]);
// useEffect(()=>{
//   dispatch(getAllProducts());
// },[])
     

// const filteredProducts = allProducts.filter(product =>
//   outOfStockItems.some(out => out._id === product._id)
// );


// // Update outOfStockItems based on the latest stock data
// outOfStockItems.forEach((outOfStockItem) => {
//   const product = allProducts.find(product => product._id === outOfStockItem._id);

//   if (product) {
//     // Update the stock quantities based on the latest data
//     outOfStockItem.stock.forEach((outOfStockSize) => {
//       const matchingProductSize = product.stock.find(productSize => productSize.size === outOfStockSize.size);

//       if (matchingProductSize && outOfStockSize.quantity === 0 && matchingProductSize.quantity !== 0) {
//         outOfStockSize.quantity = matchingProductSize.quantity;
//         //outOfStockSize.isSelected=true;
//         console.log("outOfStockItems",outOfStockItems)
//         console.log("outOfStockSize67",outOfStockSize)
// function abc(){
//   let z1=cartItems2.find((val)=>{
//     return val._id===outOfStockItem._id
//   })
//   console.log("lllllll",z1)
//   console.log("lllllll23",cartItems2)
//   if (z1) {
//     z1.stock = z1.stock.map(k1 => {
//       if (k1.size === outOfStockSize.size) {
//         return { ...k1, quantity: outOfStockSize.quantity, isSelected: true, qty: 1 };
//       }
//       return k1;
//     });

//     // Update the cartItems2 array with the modified item
//     cartItems2 = cartItems2.map(v1 => v1._id === z1._id ? z1 : v1);

//     console.log("jjj",cartItems2)
//     localStorage.setItem("cartItems", JSON.stringify(cartItems2));
//     localStorage.setItem("outOfStock", JSON.stringify(outOfStockItems));
//     // window.location.reload();
//   }else{
//     cartItems2.push(outOfStockItem)
//     localStorage.setItem("cartItems", JSON.stringify(cartItems2));
//     console.log("88888888888888",outOfStockItems)
//     localStorage.setItem("outOfStock", JSON.stringify(outOfStockItems));
//     // window.location.reload();

//   }
// }
// abc()
//         //  localStorage.setItem("cartItems", JSON.stringify(cartItems2));

//       }
//     });
//   }
// });

// // Save the updated outOfStockItems back to localStorage
// //  localStorage.setItem("outOfStock", JSON.stringify(outOfStockItems));

// // if(filteredProducts._id===outOfStockItems._id){
// //   filteredProducts.stock.map=(p)=>{
// //     outOfStockItems.stock.map=(q)=>{
// //       if(p.size==q.size&&q.quantity==0&&p.quantity!=0){
// //         q.quantity=p.quantity;
// //       }
// //     }
// //   }
// // }
// // localStorage.setItem("outOfStock",outOfStockItems)


// // outOfStockItems.forEach((outOfStockItem) => {
// //   outOfStockItem.stock.
// // })


// console.log("ljljljjll",filteredProducts)
//   const handleProductClick = (id) => {
//     navigate(`/product/${id}`);
//     window.location.reload();
//   };

//   return (
//     <>
//       {outOfStockItems &&outOfStockItems.length > 0 && (
//         <>
//           {outOfStockItems.map((item) => 
//             item.stock
//               .filter((data) => data.quantity === 0)
//               .map((data) => (
//                 <div
//                   key={data._id}
//                   className="border-[#928f8f] border-t-[1px] border-b-[1px] p-4 bg-red-100"
//                 >
//                   <div className="w-full flex items-center">
//                     <img
//                       src={`${item.images?.[0]?.url}`}
//                       alt=""
//                       className="w-[90px] h-min ml-1 mr-1 rounded-[5px] cursor-pointer"
//                       onClick={() => handleProductClick(item._id)}
//                     />
//                     <div
//                       className="flex-grow pl-[5px] cursor-pointer"
//                       onClick={() => handleProductClick(item._id)}
//                     >
//                       <h1 style={{ marginBottom: "10px" }}>
//                         {item.name.slice(0, 20)}
//                       </h1>
//                       <div>Size: {data.size}</div>
//                       <div className="flex items-center whitespace-nowrap">
//                         {item.originalPrice && (
//                           <span className="flex items-center mr-2">
//                             <del className="text-[14px] text-[#00000082]">
//                               ₹{item.originalPrice}
//                             </del>
//                           </span>
//                         )}
//                         <span className="font-[500] text-[15px] text-[#000000] font-Roboto">
//                           ₹{item.discountPrice}
//                         </span>
//                       </div>
//                       <h3 className="text-red-600 font-bold">Out of Stock</h3>
//                     </div>
//                   </div>
//                 </div>
//               ))
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default CartOutOfStock;
