// list all the elements that are needed further
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

// Trigger functionality
/**
 *
 * @param {*} event
 * @returns nothing
 * creates a list item in shoppinglist with list text, and a X button
 */
function additem(event) {
  event.preventDefault();
  // Validate Input
  if (itemInput.value === '') {
    alert('Please add an item');
    return;
  }

  // Create list item
  const li = document.createElement('li');

  // Add respective properties
  li.textContent = itemInput.value;
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

// Event listeners
itemForm.addEventListener('submit', additem);
itemInput.addEventListener('submit', additem);
itemList.addEventListener('submit', additem);
