import { ShopUI } from "../Shop/ShopUI";
import { Store } from "../../utils/storage";

(function () {
  let sortModalBtn = document.getElementById("shop__sort__modal-btn");
  let filterModalBtn = document.getElementById("shop__filter__modal-btn");

  let sortModal = document.querySelector(".shop__sort__modal");
  let filterModal = document.querySelector(".shop__filter__modal");
  let filterActionBtns = document.querySelectorAll(".filter-action");

  let sortCloseBtn = document.querySelector(".shop__sort__modal__close-btn");
  let filterCloseBtn = document.querySelector(
    ".shop__filter__modal__close-btn"
  );

  sortModalBtn.onclick = function () {
    sortModal.style.display = "block";
  };
  filterModalBtn.onclick = function () {
    filterModal.style.display = "block";
  };
  sortCloseBtn.onclick = function () {
    sortModal.style.display = "none";
  };
  filterCloseBtn.onclick = function () {
    filterModal.style.display = "none";
  };
  window.onclick = function (e) {
    if (e.target == sortModal) {
      sortModal.style.display = "none";
    } else if (e.target == filterModal) {
      filterModal.style.display = "none";
    }
  };
  const parent = document.querySelector(".shop__range-slider");

  if (!parent) {
    return;
  }

  const rangeS = parent.querySelectorAll(".shop__range"),
    numberS = parent.querySelectorAll(".shop__range-number");
  rangeS.forEach((el) => {
    el.oninput = () => {
      let slide1 = parseFloat(rangeS[0].value),
        slide2 = parseFloat(rangeS[1].value);

      if (slide1 > slide2) {
        [slide1, slide2] = [slide2, slide1];
      }

      numberS[0].innerHTML = `₹${slide1}`;
      numberS[1].innerHTML = `₹${slide2}`;
    };
  });

  filterActionBtns[0].onclick = function () {
    numberS[0].innerHTML = `₹0`;
    numberS[1].innerHTML = `₹100000`;
    rangeS[0].value = 0;
    rangeS[1].value = 100000;
    filterModal.style.display = "none";
  };
  filterActionBtns[1].onclick = function () {
    console.log(rangeS[0].value, rangeS[1].value);
    let items = Store.getItemsFromStorage("items");
    items = items.filter(
      (item) =>
        item.price.actual >= rangeS[0].value &&
        item.price.actual <= rangeS[1].value
    );
    ShopUI.showItems(items);
  };
})();
