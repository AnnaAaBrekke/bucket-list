// Select form, input, and list elements
const form = document.getElementById("bucket-form");
const input = document.getElementById("bucket-input");
const imageUrlInput = document.getElementById("bucket-image-url");
const dateInput = document.getElementById("bucket-date");
const list = document.getElementById("bucket-list");

// Load existing items from local storage when the page loads
window.addEventListener("DOMContentLoaded", loadItems);

// Event listener for form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const itemText = input.value.trim();
  const imageUrl = imageUrlInput.value.trim();
  const dateCreated = dateInput.value;

  if (itemText !== "" && dateCreated !== "") {
    addItem(itemText, imageUrl, dateCreated);
    input.value = ""; // Clear the item input
    imageUrlInput.value = ""; // Clear the image URL input
    dateInput.value = ""; // Clear the date input
  }
});

function addItem(text, imageUrl, dateCreated) {
  const listItem = document.createElement("li");
  listItem.className =
    "bg-white p-4 rounded-lg shadow-md flex justify-between items-center"; // Set flex and justify-between

  // Create a container for the text content
  const contentContainer = document.createElement("div");
  contentContainer.className = "flex flex-col space-y-1";

  // Add item text
  const itemText = document.createElement("span");
  itemText.textContent = text;
  itemText.className = "font-semibold text-lg";
  contentContainer.appendChild(itemText);

  // Display the date created
  const dateText = document.createElement("span");
  dateText.textContent = `Created on: ${dateCreated}`;
  dateText.className = "text-sm text-gray-500";
  contentContainer.appendChild(dateText);

  // Add image if URL is provided
  if (imageUrl) {
    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = text;
    image.className = "w-20 h-20 object-cover rounded-lg";
    listItem.appendChild(image);
  }

  // Append content container to the list item
  listItem.appendChild(contentContainer);

  // Add a delete button with icon to the right side
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "font-medium flex items-center p-3";

  const deleteIcon = document.createElement("i");
  deleteIcon.className = "fas fa-trash-alt"; // Font Awesome trash icon class
  deleteBtn.appendChild(deleteIcon);

  deleteBtn.addEventListener("click", () => {
    listItem.remove();
    saveItems();
  });

  // Append delete button to the right side of the list item
  listItem.appendChild(deleteBtn);

  // Append list item to the list
  list.appendChild(listItem);
  saveItems();
}

// Save items to local storage
function saveItems() {
  const items = Array.from(list.children).map((li) => {
    const text = li.querySelector(".font-semibold").textContent;
    const dateCreated = li
      .querySelector(".text-sm")
      .textContent.replace("Created on: ", "");
    const imageUrl = li.querySelector("img")
      ? li.querySelector("img").src
      : null;
    return { text, imageUrl, dateCreated };
  });
  localStorage.setItem("bucketList", JSON.stringify(items));
}

// Load items from local storage
function loadItems() {
  const items = JSON.parse(localStorage.getItem("bucketList")) || [];
  items.forEach((item) => addItem(item.text, item.imageUrl, item.dateCreated));
}
