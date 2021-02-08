//Init th instance
let instance = null;

//Only accept 1 instance create at a time

class UI {
  constructor() {
    if (UI.instance) {
      return UI.instance;
    }
    UI.instance = this;
    this.items = [];
    this.table = document.querySelector(".shop__table");
    this.summaryHead = document.querySelector("#shop__summary-head");
    this.quantInput = document.querySelector("#number");

    this.undiscountedTotal = document.querySelector(
      "#shop__summary-undiscounted"
    );
    this.discount = document.querySelector("#shop__summary-discount");
    this.discountedTotal = document.querySelector("#shop__summary-discounted");

    return this;
  }
  add(product, quantity = 1, manual = false) {
    //Discount is percent %. ex: 25%
    let addItem = { ...product, quantity };
    let isProductExists = false;
    if (this.items.length === 0) return this.items.push(addItem);

    this.items.map((item, index) => {
      if (item.id === product.id && !manual) {
        quantity += item.quantity;
        this.items[index].quantity = quantity;
        isProductExists = true;
      }
      if (item.id === product.id && manual) {
        this.items[index].quantity = quantity;
        isProductExists = true;
      }
    });

    if (!isProductExists) this.items.push(addItem);
    return this.items;
  }
  show() {
    let totalCountQty = this.items.map((item) => {
      return item.quantity;
    });

    totalCountQty = this.conditionCheckHelper(totalCountQty);

    let output = `
    <tr>
        <th>Items (${totalCountQty})</th>
        <th>Qty</th>
        <th>Price</th>
    </tr>
    `;
    this.items.map((item) => {
      output += `
      <tr>
      <td>
        <span class="shop__table__item"
          ><span
            ><img
              src="${item.image}"
              alt=""
            />
            <h5>${item.name}</h5></span
          >
          <span class="shop__table__remove-item" data-id="${item.id}">x</span></span
        >
      </td>
      <td>
        <span class="shop__table__quantity">
          <div class="quantity-button" id="decrease" data-id="${item.id}">-</div>
          <input type="number" data-id="${item.id}" id="number" value="${item.quantity}" />
          <div class="quantity-button" id="increase" data-id="${item.id}">+</div>
        </span>
      </td>
      <td>₹${item.price.display}</td>
    </tr>
        `;
    });
    this.table.innerHTML = output;
  }

  conditionCheckHelper(prop) {
    if (prop.length > 1) {
      return prop.reduce((total, curr) => {
        return total + curr;
      });
    } else if (prop.length === 1) {
      return prop[0];
    } else {
      return 0;
    }
  }
  updateCartSummary() {
    let totalCountQty = this.items.map((item) => {
      return item.quantity;
    });
    totalCountQty = this.conditionCheckHelper(totalCountQty);

    let totalUndiscounted = this.items.map((item) => {
      return item.price.display * item.quantity;
    });
    totalUndiscounted = this.conditionCheckHelper(totalUndiscounted);
    let discount = this.items.map((item) => {
      return (
        item.price.display * item.quantity - item.price.actual * item.quantity
      );
    });
    discount = this.conditionCheckHelper(discount);
    let totalDiscounted = this.items.map((item) => {
      return item.price.actual * item.quantity;
    });
    totalDiscounted = this.conditionCheckHelper(totalDiscounted);
    this.summaryHead.innerHTML = `items(${totalCountQty})`;
    this.undiscountedTotal.innerHTML = `₹${totalUndiscounted}`;
    this.discount.innerHTML = `-₹${discount}`;
    this.discountedTotal.innerHTML = `₹${totalDiscounted}`;
    // if (this.items.length) {
    //   const totalUndiscounted = this.items.reduce((total, item) => {
    //     console.log(total.price.display, item.price.display);
    //   });
    //   console.log(totalUndiscounted);
    // }
  }

  removeItemWithQuantity(id, quantity) {
    if (!quantity) {
      this.removeItem(id);
    } else {
      this.items = this.items.map((item) => {
        if (item.id === id) {
          if (quantity >= item.quantity) {
            this.removeItem(id);
          } else {
            item.quantity -= quantity;
          }
        }
        return item;
      });
    }

    return this.items;
  }

  removeItem(id) {
    this.items = this.items.filter((item) => item.id != id);

    return this.items;
  }
  getItem(id) {
    return this.items.filter((item) => item.attributes.id === id)[0];
  }
  removeAll() {
    this.items = [];
  }
  getTotalCost() {
    let total = 0;
    let totalAfterDiscount = 0;
    let saving = 0;
    this.items.map((item) => {
      let itemTotalCost = item.quantity * item.attributes.price;
      let itemTotalSave =
        (item.quantity * item.attributes.price * item.discount) / 100;
      total += itemTotalCost;
      if (item.discount === 1) {
        totalAfterDiscount += itemTotalCost;
      } else {
        totalAfterDiscount += itemTotalCost - itemTotalSave;
        saving += itemTotalSave;
      }
    });

    return { total, totalAfterDiscount, saving };
  }
}

export const CartUI = new UI();
