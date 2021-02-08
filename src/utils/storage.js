class StorageUtil {
  constructor() {
    this.items = [];
    this.cart = [];
  }
  initStorage(items, key) {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, JSON.stringify(items));
    }
    if (key === "items") {
      this.items = items;
    }
    if (key === "cart") {
      this.cart = items;
    }
  }
  storeItem(item, key) {
    let items;
    // Check if any items in ls
    if (localStorage.getItem(key) === null) {
      items = [];
      // Push new item
      items.push(item);
      if (key === "cart") {
        this.cart.push(item);
      }
      // Set ls
      localStorage.setItem(key, JSON.stringify(items));
    } else {
      // Get what is already in ls
      items = JSON.parse(localStorage.getItem(key));
      // Push new item
      items.push(item);
      // Re set ls
      localStorage.setItem(key, JSON.stringify(items));
    }
  }
  getItemsFromStorage(key) {
    let items;
    if (localStorage.getItem(key) === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem(key));
    }
    return items;
  }
  updateItemStorage(updatedItem, key) {
    let items = JSON.parse(localStorage.getItem(key));

    items.forEach(function (item, index) {
      if (updatedItem.id === item.id) {
        items.splice(index, 1, updatedItem);
      }
    });
    localStorage.setItem(key, JSON.stringify(items));
  }
  getItemFromStorage(id, key) {
    let items = JSON.parse(localStorage.getItem(key));
    let currentItem;
    items.forEach(function (item, index) {
      if (id === item.id) {
        currentItem = item;
      }
    });
    return currentItem;
  }
  deleteItemFromStorage(id, key) {
    let items = JSON.parse(localStorage.getItem(key));

    items.forEach(function (item, index) {
      if (id === item.id) {
        items.splice(index, 1);
      }
    });
    localStorage.setItem(key, JSON.stringify(items));
  }
  clearItemsFromStorage(key) {
    localStorage.removeItem(key);
  }
}
export const Store = new StorageUtil();
