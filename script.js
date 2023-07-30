// list all the elements that are needed further
const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
// It wil not alter when a item is added or removed => define in function scope
// const items = itemList.querySelectorAll('li');

//-******************************* Add list item *******************************-//
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
  itemInput.value = '';
  checkUI();
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

//-******************************* Remove list item *******************************-//

// Remove list item using delegation: Target parent and then child so if any child is added dynamically will also be considered
function removeItem(event) {
  if (event.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      event.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
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

//-******************************* Remove all list items: Clear *******************************-//
function clearAllItems(event) {
  if (confirm('Are you sure?')) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
    checkUI();
  }
}

clearBtn.addEventListener('click', clearAllItems);

//-******************************* Check UI status *******************************-//
function checkUI() {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    itemFilter.style.display = 'none';
    clearBtn.style.display = 'none';
  } else {
    itemFilter.style.display = 'block';
    clearBtn.style.display = 'block';
  }
}

//-******************************* filter items *******************************-//
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

// Event listeners
itemForm.addEventListener('submit', additem);
itemInput.addEventListener('submit', additem);
itemList.addEventListener('submit', additem);
itemFilter.addEventListener('keyup', filterItems);
itemList.addEventListener('click', removeItem);
itemList.addEventListener('mouseover', highLight);
itemList.addEventListener('mouseout', undoHighLight);

checkUI();
