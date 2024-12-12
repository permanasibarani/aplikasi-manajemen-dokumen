import {} from "./httpRequests.js";
const getLastNumber = (dropdown) => {
  if (dropdown.children.length < 3) {
    return 1;
  }
  const element = dropdown.children[dropdown.children.length - 3];
  const text = element.textContent;
  const match = /\d+/.exec(text);
  const number = match ? match[0] : null;
  return Number(number) + 1;
};

const getLastNumberBundelan = async (tahunId) => {
  const tahun = tahunId.slice(-4);
  const response = await fetch(`/home/getAllBundelan?tahun=${tahun}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const jsonData = await response.json();

  if (jsonData.length < 1) {
    return 1;
  }

  const number = (await jsonData[jsonData.length - 1].nomor_bundelan) + 1;
  return number;
};

const getLastNumberWarkah = async (tahunId) => {
  const tahun = tahunId.slice(-4);
  const response = await fetch(`/home/getAllWarkah?tahun=${tahun}`);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const jsonData = await response.json();

  if (jsonData.length < 1) {
    return 1;
  }

  const number = (await jsonData[jsonData.length - 1].nomor_warkah) + 1;
  return number;
};

export { getLastNumber, getLastNumberBundelan, getLastNumberWarkah };
