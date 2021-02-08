class UI {
  constructor() {
    this.items = document.querySelector(".shop__items");
  }

  showItems(items) {
    let output = "";
    items.map((item) => {
      output += `
        <div class="shop__item">
          <span class="shop__item__discount">${item.discount}% off</span>
          <div class="shop__item__img">
            <img
              src='${item.image}'
              alt="img1"
            />
          </div>
          <div class="shop__item__desc">
            <div class="shop__item__title"><h4>${item.name}</h4></div>
            <div class="shop__item__details">
              <span class="shop__item__price"><span>₹${item.price.display}</span>₹${item.price.actual}</span
              ><span data-id="${item.id}" class="shop__item__submit btn">Add to cart</span>
            </div>
          </div>
        </div>
        `;
    });
    this.items.innerHTML = output;
  }
}

export const ShopUI = new UI();
