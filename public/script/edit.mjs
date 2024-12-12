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
      `/edit/getTableWarkah?tahun=${tahun}&nomor_warkah=${noWarkah}`
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
