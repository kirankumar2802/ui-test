import "./sass/main.scss";
import { getProducts, addToCart, cartUpdateHandler } from "./App";

document.addEventListener("DOMContentLoaded", getProducts);

//add to cart
document.querySelector(".shop__items").addEventListener("click", addToCart);
document
  .querySelector(".shop__table")
  .addEventListener("click", cartUpdateHandler);

if (process.env.NODE_ENV === "production") {
  console.log("Production mode");
} else if (process.env.NODE_ENV === "development") {
  console.log("Development mode");
}
