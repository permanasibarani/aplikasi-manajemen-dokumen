import {
  getRuangan,
  postRuangan,
  getLemari,
  postLemari,
  getRak,
  postRak,
  getTahun,
  postTahun,
  getBundelan,
  postBundelan,
  getWarkah,
  postWarkah,
} from "./httpRequests.js";

const createElements = (data, jenisData) => {
  const NOMOR =
    jenisData === "Tahun"
      ? jenisData.toLowerCase()
      : `nomor_${jenisData.toLowerCase()}`;
  const ID = `id_${jenisData.toLowerCase()}`;
  const newLists = data.map((item) => {
    const list = document.createElement("li");
    list.setAttribute("id", item[ID]);
    list.setAttribute("class", "dropdown-item");
    list.textContent = `${jenisData} ${item[NOMOR]}`;
    return list;
  });
  return newLists;
};

const resetElements = (parentElement, jenis) => {
  parentElement.innerHTML = "";
  const tambahElement = document.createElement("li");
  const dividerElement = document.createElement("li");
  const divider = document.createElement("hr");

  tambahElement.setAttribute("class", "dropdown-item");
  tambahElement.setAttribute("id", `button-tambah-${jenis.toLowerCase()}`);
  tambahElement.setAttribute("data-bs-toggle", "modal");
  jenis === "Tahun"
    ? tambahElement.setAttribute("data-bs-target", "#tahun-modal")
    : jenis === "Warkah"
    ? tambahElement.setAttribute("data-bs-target", "#warkah-modal")
    : tambahElement.setAttribute("data-bs-target", "#confirmation-modal");
  tambahElement.setAttribute("data-bs-tipe", `${jenis.toLowerCase()}`);
  tambahElement.textContent = `Tambah ${jenis}`;

  divider.setAttribute("class", "dropdown-divider");

  parentElement.append(dividerElement, tambahElement);
  dividerElement.append(divider);
};

const displayRuanganOnPageLoad = async (parentElement) => {
  try {
    const ruanganData = await getRuangan();
    const ruanganElements = createElements(ruanganData, "Ruangan");
    parentElement.prepend(...ruanganElements);
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};

const displayRuanganOnAdd = async (parentElement) => {
  try {
    const ruanganData = await postRuangan();
    const ruanganElements = createElements(ruanganData, "Ruangan");
    resetElements(parentElement, "Ruangan");
    parentElement.prepend(...ruanganElements);
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};

const displayLemari = async (parentElement, idRuangan) => {
  try {
    const lemariData = await getLemari(idRuangan);
    const lemariElements = createElements(lemariData, "Lemari");
    resetElements(parentElement, "Lemari");
    parentElement.prepend(...lemariElements);
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};

const displayLemariOnAdd = async (parentElement, idRuangan) => {
  try {
    const lemariData = await postLemari(idRuangan);
    const lemariElements = createElements(lemariData, "Lemari");
    resetElements(parentElement, "Lemari");
    parentElement.prepend(...lemariElements);
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};

const displayRak = async (dropdownParent, idLemari) => {
  try {
    const rakData = await getRak(idLemari);
    const rakElements = createElements(rakData, "Rak");
    resetElements(dropdownParent, "Rak");
    dropdownParent.prepend(...rakElements);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const displayRakOnAdd = async (dropdownParent, idLemari) => {
  try {
    const rakData = await postRak(idLemari);
    const rakElements = createElements(rakData, "Rak");
    resetElements(dropdownParent, "Rak");
    dropdownParent.prepend(...rakElements);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const displayTahun = async (dropdownParent, idRak) => {
  try {
    const tahunData = await getTahun(idRak);
    const tahunElements = createElements(tahunData, "Tahun");
    resetElements(dropdownParent, "Tahun");
    dropdownParent.prepend(...tahunElements);
  } catch (error) {
    throw error;
  }
};

const tahunError = () => {
  console.log("error hehe");
};

const displayTahunOnAdd = async (dropdownParent, idRak, tahunToPost) => {
  try {
    const tahunData = await postTahun(idRak, tahunToPost, tahunError);
    const tahunElements = createElements(tahunData, "Tahun");
    resetElements(dropdownParent, "Tahun");
    dropdownParent.prepend(...tahunElements);
  } catch (error) {
    throw error;
  }
};

const displayBundelan = async (dropdownParent, idTahun) => {
  try {
    const bundelanData = await getBundelan(idTahun);
    const bundelanElements = createElements(bundelanData, "Bundelan");
    resetElements(dropdownParent, "Bundelan");
    dropdownParent.prepend(...bundelanElements);
  } catch (error) {
    throw error;
  }
};

const displayBundelanOnAdd = async (dropdownParent, idTahun) => {
  try {
    const bundelanData = await postBundelan(idTahun);
    const bundelanElements = createElements(bundelanData, "Bundelan");
    resetElements(dropdownParent, "Bundelan");
    dropdownParent.prepend(...bundelanElements);
  } catch (error) {
    throw error;
  }
};

const displayWarkah = async (dropdownParent, idBundelan) => {
  try {
    const warkahData = await getWarkah(idBundelan);
    const warkahElements = createElements(warkahData, "Warkah");
    resetElements(dropdownParent, "Warkah");
    dropdownParent.prepend(...warkahElements);
  } catch (error) {
    throw error;
  }
};

const displayWarkahOnAdd = async (dropdownParent, idBundelan, totalWarkah) => {
  try {
    let warkahData;
    for (let i = 0; i <= totalWarkah; i++) {
      warkahData = await postWarkah(idBundelan);
    }
    const warkahElements = createElements(warkahData, "Warkah");
    resetElements(dropdownParent, "Warkah");
    dropdownParent.prepend(...warkahElements);
  } catch (error) {
    throw error;
  }
};

export {
  displayRuanganOnPageLoad,
  displayRuanganOnAdd,
  displayLemari,
  displayLemariOnAdd,
  displayRak,
  displayRakOnAdd,
  displayTahun,
  displayTahunOnAdd,
  displayBundelan,
  displayBundelanOnAdd,
  displayWarkah,
  displayWarkahOnAdd,
};
