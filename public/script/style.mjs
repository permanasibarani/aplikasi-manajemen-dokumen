const changeButtonTextContent = (element, text) => {
  element.textContent = "";

  const textNode = document.createTextNode(text);
  const iconElement = document.createElement("i");
  iconElement.className = "fa-solid fa-caret-down fa-lg rotate-icon";

  element.appendChild(textNode);
  element.appendChild(iconElement);
};

const changeButtonTextContentAfterAdd = (element, lists) => {
  element.textContent = "";

  const lastElement = lists.children[lists.children.length - 3];
  const text = lastElement.textContent;

  const textNode = document.createTextNode(text);
  const iconElement = document.createElement("i");
  iconElement.className = "fa-solid fa-caret-down fa-lg rotate-icon";

  element.appendChild(textNode);
  element.appendChild(iconElement);
};

const rotateIcon = (element) => {
  const icon = element.children[0];
  let iconIsRotated = icon.classList.contains("rotated");
  icon.style.transform = iconIsRotated ? "rotate(0deg)" : "rotate(180deg)";
  icon.classList.toggle("rotated");
};

const disableButton = (element) => {
  element.disabled = true;
};

const enableButton = (element) => {
  element.disabled = false;
};

const toolTip = (disableORenable, element, textToWrite) => {
  const config = {
    "data-bs-placement": "top",
    "data-bs-title": textToWrite,
    tabindex: 0,
  };
  if (disableORenable === true) {
    for (const keyName in config) {
      element.setAttribute(keyName, config[keyName]);
    }
    new bootstrap.Tooltip(element);
  }
  if (disableORenable === false) {
    for (const keyName in config) {
      element.removeAttribute(`${keyName}`);
    }
    const tooltip = bootstrap.Tooltip.getInstance(element);
    tooltip.disable();
  }
};

const removeClassList = (button, dropdown, className) => {
  button.classList.remove(className);
  dropdown.classList.remove(className);
};

const addIdToButton = (button, id) => {
  button.setAttribute("data-id", id);
};

export {
  changeButtonTextContent,
  changeButtonTextContentAfterAdd,
  rotateIcon,
  disableButton,
  enableButton,
  toolTip,
  removeClassList,
  addIdToButton,
};
