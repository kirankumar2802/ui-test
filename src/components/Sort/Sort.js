import { ShopUI } from "../Shop/ShopUI";
import { Store } from "../../utils/storage";

(function () {
  let sortModal = document.querySelector(".shop__sort__modal");
  let sortActionBtns = document.querySelectorAll(".sort-action");
  let sortRadios = document.getElementsByName("sort-radio");

  sortActionBtns[0].onclick = function () {
    sortModal.style.display = "none";
  };
  sortActionBtns[1].onclick = function () {
    const [rad1, rad2, rad3] = sortRadios;
    let items = Store.getItemsFromStorage("items");

    if (rad1.checked) {
      items.sort((a, b) => Number(b.price.actual) - Number(a.price.actual));
      ShopUI.showItems(items);
      sortModal.style.display = "none";
    } else if (rad2.checked) {
      items.sort((a, b) => Number(a.price.actual) - Number(b.price.actual));
      ShopUI.showItems(items);
      sortModal.style.display = "none";
    } else if (rad3.checked) {
      items.sort((a, b) => Number(b.discount) - Number(a.discount));
      ShopUI.showItems(items);
      sortModal.style.display = "none";
    }
  };
})();
