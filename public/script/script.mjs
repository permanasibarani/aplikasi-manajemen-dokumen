import {
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
} from "./utility.mjs";

import {
  changeButtonTextContent,
  changeButtonTextContentAfterAdd,
  rotateIcon,
  disableButton,
  enableButton,
  toolTip,
  removeClassList,
  addIdToButton,
} from "./style.mjs";

import {
  getLastNumber,
  getLastNumberBundelan,
  getLastNumberWarkah,
} from "./math.mjs";

const dropdownRuangan = document.querySelector("#dropdown-ruangan");
const buttonRuangan = document.querySelector("#button-ruangan");
const dropdownLemari = document.querySelector("#dropdown-lemari");
const buttonLemari = document.querySelector("#button-lemari");
const dropdownRak = document.querySelector("#dropdown-rak");
const buttonRak = document.querySelector("#button-rak");
const dropdownTahun = document.querySelector("#dropdown-tahun");
const buttonTahun = document.querySelector("#button-tahun");
const dropdownBundelan = document.querySelector("#dropdown-bundelan");
const buttonBundelan = document.querySelector("#button-bundelan");
const dropdownWarkah = document.querySelector("#dropdown-warkah");
const buttonWarkah = document.querySelector("#button-warkah");

//* Modal Selector
const confirmationModal = document.querySelector("#confirmation-modal");
const modal = new bootstrap.Modal(confirmationModal);
const inputtedTahun = document.querySelector("#input-tahun");

document.addEventListener("DOMContentLoaded", () => {
  displayRuanganOnPageLoad(dropdownRuangan);
  disableButton(buttonLemari, "Lemari");
  toolTip(
    true,
    document.querySelector("#tooltip-lemari"),
    `Harap pilih ruangan terlebih dahulu`
  );
  disableButton(buttonRak, "Rak");
  toolTip(
    true,
    document.querySelector("#tooltip-rak"),
    `Harap pilih lemari terlebih dahulu`
  );
  disableButton(buttonTahun, "Tahun");
  toolTip(
    true,
    document.querySelector("#tooltip-tahun"),
    `Harap pilih rak terlebih dahulu`
  );
  disableButton(buttonBundelan, "Bundelan");
  toolTip(
    true,
    document.querySelector("#tooltip-bundelan"),
    `Harap pilih tahun terlebih dahulu`
  );
  disableButton(buttonWarkah, "Warkah");
  toolTip(
    true,
    document.querySelector("#tooltip-warkah"),
    `Harap pilih bundelan terlebih dahulu`
  );
});

//* Modal
confirmationModal.addEventListener("show.bs.modal", async (e) => {
  const button = e.relatedTarget;
  const tipeData = button.getAttribute("data-bs-tipe");
  const submitButton = confirmationModal.querySelector("#modal-submit");
  submitButton.setAttribute("tipe-modal", tipeData);
  submitButton.textContent = `Tambahkan ${tipeData}`;

  const currentNumber =
    tipeData === "ruangan"
      ? getLastNumber(dropdownRuangan)
      : tipeData === "lemari"
      ? getLastNumber(dropdownLemari)
      : tipeData === "rak"
      ? getLastNumber(dropdownRak)
      : tipeData === "tahun"
      ? button.getAttribute("data-bs-tahun")
      : tipeData === "bundelan"
      ? await getLastNumberBundelan(buttonTahun.getAttribute("data-id"))
      : tipeData === "warkah"
      ? [
          button.getAttribute("data-bs-warkah-awal"),
          button.getAttribute("data-bs-warkah-akhir"),
        ]
      : undefined;

  const modalTitle = confirmationModal.querySelector(".modal-title");
  modalTitle.textContent = `Konfirmasi menambah ${tipeData} `;

  const textBody = confirmationModal.querySelector(".modal-body");
  textBody.textContent =
    tipeData === "tahun"
      ? `Apakah Anda yakin ingin menambahkan tahun ${currentNumber}?`
      : tipeData === "warkah"
      ? `Apakah Anda yakin ingin menambahkan warkah no.${currentNumber[0]} - no.${currentNumber[1]}?`
      : `Apakah Anda yakin ingin menambahkan ${tipeData} ke ${currentNumber}?`;

  const cancelButton = confirmationModal.querySelector("#modal-cancel");
  cancelButton.textContent = "Batal";

  const cancel = confirmationModal.querySelectorAll(
    '[data-bs-dismiss="modal"]'
  );
  cancel.forEach((item) =>
    item.setAttribute("close-type", `close-${tipeData}-modal`)
  );
});
confirmationModal.addEventListener("click", (e) => {
  const tipeModal = e.target.getAttribute("tipe-modal");
  switch (tipeModal) {
    case "ruangan":
      displayRuanganOnAdd(dropdownRuangan).then(() => {
        //* Change on ruangan
        changeButtonTextContentAfterAdd(buttonRuangan, dropdownRuangan);
        addIdToButton(
          buttonRuangan,
          dropdownRuangan.children[dropdownRuangan.children.length - 3].id
        );

        //* Change on lemari
        removeClassList(buttonLemari, dropdownLemari, "show");
        changeButtonTextContent(buttonLemari, "Pilih Lemari");
        displayLemari(
          dropdownLemari,
          dropdownRuangan.children[dropdownRuangan.children.length - 3].id
        );
        enableButton(buttonLemari);
        toolTip(false, document.querySelector("#tooltip-lemari"));

        //* Change on rak
        removeClassList(buttonRak, dropdownRak, "show");
        disableButton(buttonRak);
        toolTip(
          true,
          document.querySelector("#tooltip-rak"),
          `Harap pilih lemari terlebih dahulu`
        );
        changeButtonTextContent(buttonRak, "Pilih Rak");

        //* Change on tahun
        removeClassList(buttonTahun, dropdownTahun, "show");
        disableButton(buttonTahun);
        toolTip(
          true,
          document.querySelector("#tooltip-tahun"),
          `Harap pilih rak terlebih dahulu`
        );
        changeButtonTextContent(buttonTahun, "Pilih Tahun");

        //* Change on bundelan
        removeClassList(buttonBundelan, dropdownBundelan, "show");
        disableButton(buttonBundelan);
        toolTip(
          true,
          document.querySelector("#tooltip-bundelan"),
          `Harap pilih tahun terlebih dahulu`
        );
        changeButtonTextContent(buttonBundelan, "Pilih Bundelan");

        //* Change on warkah
        removeClassList(buttonWarkah, dropdownWarkah, "show");
        disableButton(buttonWarkah);
        toolTip(
          true,
          document.querySelector("#tooltip-warkah"),
          `Harap pilih bundelan terlebih dahulu`
        );
        changeButtonTextContent(buttonWarkah, "Pilih Warkah");

        modal.hide();
      });
      break;
    case "lemari":
      const idRuangan = buttonRuangan.getAttribute("data-id");
      displayLemariOnAdd(dropdownLemari, idRuangan).then(() => {
        //* Change on lemari
        changeButtonTextContentAfterAdd(buttonLemari, dropdownLemari);
        addIdToButton(
          buttonLemari,
          dropdownLemari.children[dropdownLemari.children.length - 3].id
        );

        //* Change on rak
        removeClassList(buttonRak, dropdownRak, "show");
        changeButtonTextContent(buttonRak, "Pilih Rak");
        displayRak(
          dropdownRak,
          dropdownLemari.children[dropdownLemari.children.length - 3].id
        );
        enableButton(buttonRak);
        toolTip(false, document.querySelector("#tooltip-rak"));

        //* Change on tahun
        removeClassList(buttonTahun, dropdownTahun, "show");
        disableButton(buttonTahun);
        toolTip(
          true,
          document.querySelector("#tooltip-tahun"),
          "Harap pilih rak terlebih dahulu"
        );
        changeButtonTextContent(buttonTahun, "Pilih Tahun");

        //* Change on bundelan
        removeClassList(buttonBundelan, dropdownBundelan, "show");
        disableButton(buttonBundelan);
        toolTip(
          true,
          document.querySelector("#tooltip-bundelan"),
          `Harap pilih tahun terlebih dahulu`
        );
        changeButtonTextContent(buttonBundelan, "Pilih Bundelan");

        //* Change on warkah
        removeClassList(buttonWarkah, dropdownWarkah, "show");
        disableButton(buttonWarkah);
        toolTip(
          true,
          document.querySelector("#tooltip-warkah"),
          `Harap pilih bundelan terlebih dahulu`
        );
        changeButtonTextContent(buttonWarkah, "Pilih Warkah");

        modal.hide();
      });
      break;
    case "rak":
      const idLemari = buttonLemari.getAttribute("data-id");
      displayRakOnAdd(dropdownRak, idLemari).then(() => {
        //* Change on rak
        changeButtonTextContentAfterAdd(buttonRak, dropdownRak);
        addIdToButton(
          buttonRak,
          dropdownRak.children[dropdownRak.children.length - 3].id
        );

        //* Change on tahun
        removeClassList(buttonTahun, dropdownTahun, "show");
        changeButtonTextContent(buttonTahun, "Pilih Tahun");
        displayTahun(
          dropdownTahun,
          dropdownRak.children[dropdownRak.children.length - 3].id
        );
        enableButton(buttonTahun);
        toolTip(false, document.querySelector("#tooltip-tahun"));

        //* Change on bundelan
        removeClassList(buttonBundelan, dropdownBundelan, "show");
        disableButton(buttonBundelan);
        toolTip(
          true,
          document.querySelector("#tooltip-bundelan"),
          `Harap pilih tahun terlebih dahulu`
        );
        changeButtonTextContent(buttonBundelan, "Pilih Bundelan");

        //* Change on warkah
        removeClassList(buttonWarkah, dropdownWarkah, "show");
        disableButton(buttonWarkah);
        toolTip(
          true,
          document.querySelector("#tooltip-warkah"),
          `Harap pilih bundelan terlebih dahulu`
        );
        changeButtonTextContent(buttonWarkah, "Pilih Warkah");
        modal.hide();
      });
      break;
    case "tahun":
      const idRak = buttonRak.getAttribute("data-id");
      const tahunToPost = document
        .querySelector("#modal-tahun-submit")
        .getAttribute("data-bs-tahun");
      displayTahunOnAdd(dropdownTahun, idRak, Number(tahunToPost)).then(() => {
        changeButtonTextContentAfterAdd(buttonTahun, dropdownTahun);
        addIdToButton(
          buttonTahun,
          dropdownTahun.children[dropdownTahun.children.length - 3].id
        );
        //* Change on bundelan
        removeClassList(buttonBundelan, dropdownBundelan, "show");
        changeButtonTextContent(buttonBundelan, "Pilih Bundelan");
        displayBundelan(
          dropdownBundelan,
          dropdownTahun.children[dropdownTahun.children.length - 3].id
        );
        enableButton(buttonBundelan);
        toolTip(false, document.querySelector("#tooltip-bundelan"));

        //* Change on warkah
        removeClassList(buttonWarkah, dropdownWarkah, "show");
        disableButton(buttonWarkah);
        toolTip(
          true,
          document.querySelector("#tooltip-warkah"),
          `Harap pilih bundelan terlebih dahulu`
        );
        changeButtonTextContent(buttonWarkah, "Pilih Warkah");
        modal.hide();
      });
      break;
    case "bundelan":
      const idTahun = buttonTahun.getAttribute("data-id");
      displayBundelanOnAdd(dropdownBundelan, idTahun).then(() => {
        //* Change on bundelan
        changeButtonTextContentAfterAdd(buttonBundelan, dropdownBundelan);
        addIdToButton(
          buttonBundelan,
          dropdownBundelan.children[dropdownBundelan.children.length - 3].id
        );
        //* Change on warkah
        removeClassList(buttonWarkah, dropdownWarkah, "show");
        changeButtonTextContent(buttonWarkah, "Pilih Warkah");
        displayWarkah(
          dropdownWarkah,
          dropdownBundelan.children[dropdownBundelan.children.length - 3].id
        );
        enableButton(buttonWarkah);
        toolTip(false, document.querySelector("#tooltip-warkah"));
        modal.hide();
      });
      break;
    case "warkah":
      const idBundelan = buttonBundelan.getAttribute("data-id");
      const totalNumber = buttonWarkah.getAttribute("data-bs-warkah-total");
      displayWarkahOnAdd(dropdownWarkah, idBundelan, totalNumber).then(() => {
        //* Change on warkah
        changeButtonTextContentAfterAdd(buttonWarkah, dropdownWarkah);
        addIdToButton(
          buttonWarkah,
          dropdownWarkah.children[dropdownWarkah.children.length - 3].id
        );
        modal.hide();
      });
      break;
  }

  if (e.target.hasAttribute("data-bs-dismiss")) {
    const tipeButton = e.target.getAttribute("close-type");
    switch (tipeButton) {
      case "close-ruangan-modal":
        rotateIcon(buttonRuangan);
        break;
      case "close-lemari-modal":
        rotateIcon(buttonLemari);
        break;
      case "close-rak-modal":
        rotateIcon(buttonRak);
        break;
      case "close-tahun-modal":
        rotateIcon(buttonTahun);
        break;
      case "close-bundelan-modal":
        rotateIcon(buttonBundelan);
        break;
    }
  }
});

inputtedTahun.addEventListener("input", () => {
  const nilaiTahun = inputtedTahun.value;
  if (nilaiTahun.length === 4) {
    document
      .querySelector("#modal-tahun-submit")
      .setAttribute("data-bs-tahun", nilaiTahun);
  }
});

document.querySelector("#tahun-modal").addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-bs-dismiss")) {
    rotateIcon(buttonTahun);
  }
});

//* Warkah Modal
const warkahModal = document.querySelector("#warkah-modal");

warkahModal.addEventListener("show.bs.modal", async () => {
  const tahun = buttonTahun.getAttribute("data-id");
  const jumlahAwalDokumen = warkahModal.querySelector("#jumlah-awal-warkah");
  const jumlahAwal = await getLastNumberWarkah(tahun);
  jumlahAwalDokumen.value = jumlahAwal;
  toolTip(
    true,
    document.querySelector("#tooltip-modal-warkah"),
    `Nomor terakhir pada bundelan sebelumnya + 1`
  );
});

warkahModal.addEventListener("input", () => {
  const jumlahAkhir = +warkahModal.querySelector("#jumlah-akhir-warkah").value;
  const jumlahAwal = +warkahModal.querySelector("#jumlah-awal-warkah").value;
  const buttonSubmit = warkahModal.querySelector("#modal-warkah-submit");
  if (jumlahAkhir > jumlahAwal) {
    buttonSubmit.setAttribute("data-bs-warkah-awal", jumlahAwal);
    buttonSubmit.setAttribute("data-bs-warkah-akhir", jumlahAkhir);
    buttonWarkah.setAttribute("data-bs-warkah-total", jumlahAkhir - jumlahAwal);
  }
});

warkahModal.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-bs-dismiss")) {
    rotateIcon(buttonWarkah);
  }
});

dropdownRuangan.addEventListener("click", (e) => {
  const target = e.target;
  if (target.id.startsWith("W", 0)) {
    //* Change on ruangan
    changeButtonTextContent(buttonRuangan, target.textContent);
    addIdToButton(buttonRuangan, target.id);

    //* Change on lemari
    displayLemari(dropdownLemari, target.id);
    removeClassList(buttonLemari, dropdownLemari, "show");
    enableButton(buttonLemari);
    toolTip(false, document.querySelector("#tooltip-lemari"));
    changeButtonTextContent(buttonLemari, "Pilih Lemari");

    //* Change on rak
    removeClassList(buttonRak, dropdownRak, "show");
    disableButton(buttonRak);
    toolTip(
      true,
      document.querySelector("#tooltip-rak"),
      `Harap pilih lemari terlebih dahulu`
    );
    changeButtonTextContent(buttonRak, "Pilih Rak");

    //* Change on tahun
    removeClassList(buttonTahun, dropdownTahun, "show");
    disableButton(buttonTahun);
    toolTip(
      true,
      document.querySelector("#tooltip-tahun"),
      `Harap pilih rak terlebih dahulu`
    );
    changeButtonTextContent(buttonTahun, "Pilih Tahun");

    //* Change on bundelan
    removeClassList(buttonBundelan, dropdownBundelan, "show");
    disableButton(buttonBundelan);
    toolTip(
      true,
      document.querySelector("#tooltip-bundelan"),
      `Harap pilih tahun terlebih dahulu`
    );
    changeButtonTextContent(buttonBundelan, "Pilih Bundelan");

    //* Change on warkah
    removeClassList(buttonWarkah, dropdownWarkah, "show");
    disableButton(buttonWarkah);
    toolTip(
      true,
      document.querySelector("#tooltip-warkah"),
      `Harap pilih bundelan terlebih dahulu`
    );
    changeButtonTextContent(buttonWarkah, "Pilih Warkah");
  }
});
buttonRuangan.addEventListener("click", () => {
  rotateIcon(buttonRuangan);
});

dropdownLemari.addEventListener("click", (e) => {
  const target = e.target;
  if (target.id.startsWith("W", 0)) {
    //* Change on lemari
    changeButtonTextContent(buttonLemari, target.textContent);
    addIdToButton(buttonLemari, target.id);

    //* Change on rak
    displayRak(dropdownRak, target.id);
    removeClassList(buttonRak, dropdownRak, "show");
    enableButton(buttonRak);
    toolTip(false, document.querySelector("#tooltip-rak"));
    changeButtonTextContent(buttonRak, "Pilih Rak");

    //* Change on tahun
    removeClassList(buttonTahun, dropdownTahun, "show");
    disableButton(buttonTahun);
    toolTip(
      true,
      document.querySelector("#tooltip-tahun"),
      "Harap pilih rak terlebih dahulu"
    );
    changeButtonTextContent(buttonTahun, "Pilih Tahun");

    //* Change on bundelan
    removeClassList(buttonBundelan, dropdownBundelan, "show");
    disableButton(buttonBundelan);
    toolTip(
      true,
      document.querySelector("#tooltip-bundelan"),
      `Harap pilih tahun terlebih dahulu`
    );
    changeButtonTextContent(buttonBundelan, "Pilih Bundelan");

    //* Change on warkah
    removeClassList(buttonWarkah, dropdownWarkah, "show");
    disableButton(buttonWarkah);
    toolTip(
      true,
      document.querySelector("#tooltip-warkah"),
      `Harap pilih bundelan terlebih dahulu`
    );
    changeButtonTextContent(buttonWarkah, "Pilih Warkah");
  }
});

buttonLemari.addEventListener("click", () => {
  rotateIcon(buttonLemari);
});

dropdownRak.addEventListener("click", (e) => {
  const target = e.target;
  if (target.id.startsWith("W", 0)) {
    //* Change on rak
    changeButtonTextContent(buttonRak, target.textContent);
    addIdToButton(buttonRak, target.id);

    //* Change on tahun
    displayTahun(dropdownTahun, target.id);
    removeClassList(buttonTahun, dropdownTahun, "show");
    enableButton(buttonTahun);
    toolTip(false, document.querySelector("#tooltip-tahun"));
    changeButtonTextContent(buttonTahun, "Pilih Tahun");

    //* Change on bundelan
    removeClassList(buttonBundelan, dropdownBundelan, "show");
    disableButton(buttonBundelan);
    toolTip(
      true,
      document.querySelector("#tooltip-bundelan"),
      `Harap pilih tahun terlebih dahulu`
    );
    changeButtonTextContent(buttonBundelan, "Pilih Bundelan");

    //* Change on warkah
    removeClassList(buttonWarkah, dropdownWarkah, "show");
    disableButton(buttonWarkah);
    toolTip(
      true,
      document.querySelector("#tooltip-warkah"),
      `Harap pilih bundelan terlebih dahulu`
    );
    changeButtonTextContent(buttonWarkah, "Pilih Warkah");
  }
});

buttonRak.addEventListener("click", () => {
  rotateIcon(buttonRak);
});

dropdownTahun.addEventListener("click", (e) => {
  const target = e.target;
  if (target.id.startsWith("W", 0)) {
    //* Change on tahun
    changeButtonTextContent(buttonTahun, target.textContent);
    addIdToButton(buttonTahun, target.id);

    //* Change on bundelan
    displayBundelan(dropdownBundelan, target.id);
    removeClassList(buttonBundelan, dropdownBundelan, "show");
    enableButton(buttonBundelan);
    toolTip(false, document.querySelector("#tooltip-bundelan"));
    changeButtonTextContent(buttonBundelan, "Pilih Bundelan");

    //* Change on warkah
    removeClassList(buttonWarkah, dropdownWarkah, "show");
    disableButton(buttonWarkah);
    toolTip(
      true,
      document.querySelector("#tooltip-warkah"),
      `Harap pilih bundelan terlebih dahulu`
    );
    changeButtonTextContent(buttonWarkah, "Pilih Warkah");
  }
});

buttonTahun.addEventListener("click", () => {
  rotateIcon(buttonTahun);
});

dropdownBundelan.addEventListener("click", (e) => {
  const target = e.target;
  if (target.id.startsWith("W", 0)) {
    //* Change on bundelan
    changeButtonTextContent(buttonBundelan, target.textContent);
    addIdToButton(buttonBundelan, target.id);

    //* Change on warkah
    displayWarkah(dropdownWarkah, target.id);
    removeClassList(buttonWarkah, dropdownWarkah, "show");
    enableButton(buttonWarkah);
    toolTip(false, document.querySelector("#tooltip-warkah"));
    changeButtonTextContent(buttonWarkah, "Pilih Warkah");
  }
});

buttonBundelan.addEventListener("click", () => {
  rotateIcon(buttonBundelan);
});

dropdownWarkah.addEventListener("click", (e) => {
  const target = e.target;
  if (target.id.startsWith("W", 0)) {
    //* Change on bundelan
    changeButtonTextContent(buttonWarkah, target.textContent);
    addIdToButton(buttonWarkah, target.id);
  }
});

buttonWarkah.addEventListener("click", () => {
  rotateIcon(buttonWarkah);
});

const formInputTahun = document.querySelector("#search-tahun");
const formInputWarkah = document.querySelector("#search-warkah");

formInputWarkah.addEventListener("input", async () => {
  if (formInputTahun.value.length === 4 && formInputWarkah.value) {
    const rows = await loadIntoTable(
      document.querySelector("table"),
      +formInputTahun.value,
      +formInputWarkah.value
    );
    if (!rows) {
      document.querySelector("thead").innerHTML = "";
      document.querySelector("tbody").innerHTML = "";
    }
  }
});

const loadIntoTable = async (table, tahun, noWarkah) => {
  try {
    const tableHead = table.querySelector("thead");
    const tableBody = table.querySelector("tbody");

    const response = await fetch(
      `/home/getTableWarkah?tahun=${tahun}&nomor_warkah=${noWarkah}`
    );

    if (!response) {
      //* Clear the table
      tableHead.innerHTML = "";
      tableBody.innerHTML = "";
    }
    const { headers, rows } = await response.json();

    //* Clear the table
    tableHead.innerHTML = "<tr></tr>";
    tableBody.innerHTML = "";

    //* Populate the header
    for (const headerText of headers) {
      const headerElement = document.createElement("th");
      headerElement.setAttribute("scope", "col");
      headerElement.textContent = headerText;
      tableHead.querySelector("tr").appendChild(headerElement);
    }

    //* Populate the body
    for (const row of rows) {
      const rowElement = document.createElement("tr");

      for (const rowText of row) {
        const tableData = document.createElement("td");
        tableData.textContent = rowText;
        rowElement.appendChild(tableData);
      }
      tableBody.appendChild(rowElement);
    }
    return rows;
  } catch (error) {
    console.error(error);
  }
};
