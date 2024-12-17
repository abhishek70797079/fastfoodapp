import React, { useState } from "react";
import { useDispatchCart, useCart } from "../ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(""); // State for size selection
  const [price, setPrice] = useState(
    props.options ? props.options[Object.keys(props.options)[0]] : 0
  ); // Default price

  let options = props.options || {}; // Safeguard for missing options
  let priceOptions = Object.keys(options);

  // Function to handle adding to cart
  const handleAddToCart = async () => {
    await dispatch({
      type: "ADD",
      id: props._id,
      name: props.name,
      price: price,
      quantity: quantity,
      size: size,
    });
    console.log(data);
  };

  // Function to calculate total price
  const calculateTotalPrice = () => {
    return quantity * price;
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      <div
        className="card"
        style={{
          maxWidthwidth: "800px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
          backgroundColor: "#e0ffe0",
          borderRadius: "8px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          maxHeight: "500px",
          margin: "10px",
          position: "relative", // Ensures the layout respects padding
        }}
      >
        {/* Image Section */}
        <img
          src={props.imgSrc || "https://via.placeholder.com/150"} // Default placeholder if img is missing
          className="card-img-top"
          alt={props.name || "Food Item"}
          style={{
            height: "150px",
            width: "100%",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />

        {/* Card Body */}
        <div
          className="card-body text-center"
          style={{ flexGrow: 1, width: "100%", textAlign: "center" }}
        >
          <h5 className="card-title mb-3" style={{ fontSize: "1.25rem" }}>
            {props.name || "Food Name"}
          </h5>

          {/* Quantity Selector */}
          <div className="container w-100 text-center">
            <select
              className="m-2 h-100 bg-success rounded text-white"
              style={{ padding: "5px 10px" }}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            {/* Price Selector */}
            <select
              className="m-2 h-100 bg-success rounded text-white"
              style={{ padding: "5px 10px" }}
              onChange={(e) => {
                setPrice(Number(options[e.target.value]));
                setSize(e.target.value); // Update size state
              }}
            >
              {priceOptions.map((option) => (
                <option key={option} value={option}>
                  {option} - ₹{options[option]}
                </option>
              ))}
            </select>
          </div>

          {/* Total Price */}
          <div className="d-inline h-100 fs-5 ">
            Total Price: ₹{calculateTotalPrice()}
          </div>
        </div>

        {/* Add to Cart Button */}
        <div style={{ width: "100%", textAlign: "center",  }}>
          <button
            className="btn btn-success"
            style={{
              width: "50%", // Button width to match card width
              margin: "0,0,0,8px", // Center align button
              marginBottom:"5px"
            
            }}
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
