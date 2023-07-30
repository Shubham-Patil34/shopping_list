// list all the elements that are needed further
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

// It wil not alter when a item is added or removed => define in function scope
// const items = itemList.querySelectorAll('li');

//-***************** Load list items from storage *********************-//
function displayItems() {
  const itemsFromStorage = getItemFromLocalStorage();

  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  checkUI();
}

//-*************************** Add list item ***************************-//
// Trigger functionality
/**
 *
 * @param {*} event
 * @returns nothing
 * creates a list item in shoppinglist with list text, and a X button
 */
function onAddItemSubmit(event) {
  event.preventDefault();

  const newItem = itemInput.value;
  // Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // Check for edit mode

  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');

    // Remove old item from DOM and local storage
    itemToEdit.remove();
    removeItemFromLocalStorage(itemToEdit);

    // Add new value to DOM and local storage
    const updatedItem = itemInput.value;
    addItemToDOM(updatedItem);
    addItemToLocalStorage(updatedItem);

    itemToEdit.classList.remove('edit-mode');
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert('Item already added to list..!');
    } else {
      // Add item to DOM
      addItemToDOM(newItem);

      // Add item to local storage
      addItemToLocalStorage(newItem);
    }
  }
  checkUI();
}

function addItemToDOM(item) {
  // Create list item
  const li = document.createElement('li');

  // Add respective properties
  li.textContent = item;
  btn = createButton('remove-item btn-link text-red');

  li.appendChild(btn);

  itemList.appendChild(li);
}

/**
 *
 * @param {*} classes : The classes will have few styles attached to them
 * @returns A button element
 * Create a button with specified classes and with a x icon in it
 */
function createButton(classes) {
  // Create required elements
  const btn = document.createElement('button');
  const i = createIcon('fa-solid fa-xmark');

  // Add respective properties
  btn.className = classes;

  // Add respective children
  btn.appendChild(i);
  return btn;
}

/**
 *
 * @param {*} classes : The classes will have few styles attached to them
 * @returns An button element
 * Creates an icon with specified classes
 */
function createIcon(classes) {
  // Create required elements
  const i = document.createElement('i');

  // Add respective properties
  i.className = classes;

  return i;
}

function addItemToLocalStorage(item) {
  const itemsFromStorage = getItemFromLocalStorage();

  // Push new item to array
  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemFromLocalStorage() {
  let itemsFromStorage;

  // Get items from local storage into an array
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

//-****************** Prevent duplicate list item *********************-//
function checkIfItemExists(item) {
  const itemsFromStorage = getItemFromLocalStorage();
  if (itemsFromStorage.indexOf(item) !== -1) {
    return true;
  }
  return false;
}

//-************************* Remove list item *************************-//
function onClickItem(event) {
  if (event.target.parentElement.classList.contains('remove-item')) {
    removeItemFromDOM(event.target.parentElement.parentElement);
  } else {
    setItemToEdit(event.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;
  itemList
    .querySelectorAll('li')
    .forEach((item) => item.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update item';
  itemInput.value = item.textContent;
  formBtn.style.backgroundColor = '#228b22';
}

// Remove list item using delegation: Target parent and then child so if any child is added dynamically will also be considered
function removeItemFromDOM(item) {
  if (confirm('Are you sure?')) {
    // Remove item from local storage
    removeItemFromLocalStorage(item);

    // Remove item from UI
    item.remove();
    checkUI();
  }
}

function removeItemFromLocalStorage(item) {
  let itemsFromStorage = getItemFromLocalStorage();

  // const index = itemsFromStorage.indexOf(item.textContent);

  // itemsFromStorage = [
  //   ...itemsFromStorage.slice(0, index),
  //   ...itemsFromStorage.slice(index + 1),
  // ];

  // Alternate: Using filter
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item.textContent);

  // Re-set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function highLight(event) {
  if (event.target.className === 'fa-solid fa-xmark') {
    event.target.parentElement.parentElement.style.outlineStyle = 'solid';
    event.target.parentElement.parentElement.style.outlineWidth = '1px';
    event.target.parentElement.parentElement.style.outlineColor = 'red';
  }
}

function undoHighLight(event) {
  if (event.target.className === 'fa-solid fa-xmark') {
    event.target.parentElement.parentElement.style.outlineStyle = 'none';
  }
}

//-****************** Remove all list items: Clear *********************-//
function clearAllItems(event) {
  if (confirm('Are you sure?')) {
    while (itemList.firstChild) {
      // Remove all list items from local storage
      // localStorage.removeItem(itemList.firstChild.textContent.toLowerCase());
      itemList.removeChild(itemList.firstChild);
    }

    // Clear local storage
    localStorage.removeItem('items');
    // localStorage.clear(); Will clear all storage Not and issue for this application.. still avoid
    checkUI();
  }
}

//-************************** Check UI status ***************************-//
function checkUI() {
  // Reset value of input to empty string
  itemInput.value = '';

  // Hide filter and cliear all button when there is no item in list
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    itemFilter.style.display = 'none';
    clearBtn.style.display = 'none';
  } else {
    itemFilter.style.display = 'block';
    clearBtn.style.display = 'block';
  }

  // Reset form button after editing is finished
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = '#333';
  isEditMode = false;
}

//-***************************** filter items ****************************-//
function filterItems(event) {
  const items = itemList.querySelectorAll('li');
  const text = event.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    console.log(itemName.indexOf(text));
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });

  // Alternate way
  // const items = itemList.querySelectorAll('li');
  // const input = event.target.value.toLowerCase();
  // console.log(items);
  // if (items.length !== 0 && event.target.value !== '') {
  //   // console.log('value:', event.target.value);
  //   for (let item of items) {
  //     const itemName = item.firstChild.textContent.toLowerCase();
  //     if (itemName.includes(input)) {
  //       // console.log(item);
  //       item.style.display = 'flex';
  //     } else {
  //       item.style.display = 'none';
  //     }
  //   }
  // } else {
  //   for (let item of items) {
  //     item.style.display = 'flex';
  //   }
  // }
}

/**
 * Initialize application
 */
function init() {
  // Event listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemInput.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('submit', onAddItemSubmit);
  clearBtn.addEventListener('click', clearAllItems);
  itemFilter.addEventListener('keyup', filterItems);
  itemList.addEventListener('click', onClickItem);
  itemList.addEventListener('mouseover', highLight);
  itemList.addEventListener('mouseout', undoHighLight);
  document.addEventListener('DOMContentLoaded', displayItems);

  checkUI();
}

init();

//-****************** Load items from local storage *******************-//
// Alretnate way using item itself in lower case

// function loadItems(value) {
//   // Create list item
//   const li = document.createElement('li');

//   // Add respective properties
//   li.textContent = value;
//   btn = createButton('remove-item btn-link text-red');

//   li.appendChild(btn);

//   itemList.appendChild(li);
//   checkUI();
// }

// for (let i = 0; i < localStorage.length; i++) {
//   let key = localStorage.key(i);
//   // console.log(key);
//   loadItems(localStorage.getItem(key));
// }
