//* Fetch 4 Ruangan
const getRuangan = async () => {
  try {
    const response = await fetch("/home/getRuangan", { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};
const postRuangan = async () => {
  try {
    const currentData = await getRuangan();
    let newData;
    if (currentData.length > 0) {
      newData = {
        id_ruangan: `W${currentData[currentData.length - 1].nomor_ruangan + 1}`,
        nomor_ruangan: currentData[currentData.length - 1].nomor_ruangan + 1,
        jenis_ruangan: "Warkah",
      };
    } else {
      newData = {
        id_ruangan: "W1",
        nomor_ruangan: 1,
        jenis_ruangan: "Warkah",
      };
    }
    const response = await fetch("/home/postRuangan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};

//* Fetch 4 Lemari
const getLemari = async (idRuangan) => {
  try {
    const response = await fetch(`/home/getLemari?id_ruangan=${idRuangan}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};

const postLemari = async (idRuangan) => {
  try {
    const currentData = await getLemari(idRuangan);
    let newData;
    if (currentData.length > 0) {
      newData = {
        id_lemari: `${idRuangan}L${
          currentData[currentData.length - 1].nomor_lemari + 1
        }`,
        nomor_lemari: currentData[currentData.length - 1].nomor_lemari + 1,
        id_ruangan: idRuangan,
      };
    } else {
      newData = {
        id_lemari: `${idRuangan}L1`,
        nomor_lemari: 1,
        id_ruangan: idRuangan,
      };
    }
    const response = await fetch("/home/postLemari", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

//* Fetch 4 Rak
const getRak = async (lemariId) => {
  try {
    const response = await fetch(`/home/getRak?id_lemari=${lemariId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};

const postRak = async (lemariId) => {
  try {
    const currentData = await getRak(lemariId);
    const ruanganId = lemariId.substring(0, lemariId.indexOf("L"));
    let dataToPost;
    if (currentData.length > 0) {
      dataToPost = {
        id_rak: `${lemariId}R${
          currentData[currentData.length - 1].nomor_rak + 1
        }`,
        nomor_rak: currentData[currentData.length - 1].nomor_rak + 1,
        id_lemari: lemariId,
        id_ruangan: ruanganId,
      };
    } else {
      dataToPost = {
        id_rak: `${lemariId}R1`,
        nomor_rak: 1,
        id_lemari: lemariId,
        id_ruangan: ruanganId,
      };
    }
    const response = await fetch("/home/postRak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToPost),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error(`Error: ${error}`);
    throw error;
  }
};

const getTahun = async (rakId) => {
  try {
    const response = await fetch(`/home/getTahun?id_rak=${rakId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw error;
  }
};

const postTahun = async (rakId, tahunToPost, errorHandling) => {
  try {
    const currentData = await getRak(rakId);

    if (currentData.find((objek) => objek.id_tahun === targetIdTahun)) {
      errorHandling();
      return;
    }

    const lemariId = rakId.substring(0, rakId.indexOf("R"));
    const ruanganId = rakId.substring(0, rakId.indexOf("L"));

    const dataToPost = {
      id_tahun: `${rakId}T${tahunToPost}`,
      tahun: tahunToPost,
      id_rak: rakId,
      id_lemari: lemariId,
      id_ruangan: ruanganId,
    };

    const response = await fetch("/home/postTahun", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToPost),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw error;
  }
};

const getBundelan = async (tahunId) => {
  try {
    const response = await fetch(`/home/getBundelan?id_tahun=${tahunId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw error;
  }
};

const getAllBundelan = async (tahunId) => {
  try {
    const tahun = tahunId.slice(-4);
    const response = await fetch(`/home/getAllBundelan?tahun=${tahun}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw error;
  }
};

const postBundelan = async (tahunId) => {
  try {
    const currentData = await getAllBundelan(tahunId);
    let dataToPost;

    const rakId = tahunId.substring(0, tahunId.indexOf("T"));
    const lemariId = tahunId.substring(0, tahunId.indexOf("R"));
    const ruanganId = tahunId.substring(0, tahunId.indexOf("L"));
    const tahun = +tahunId.substring(tahunId.length - 4);

    if (currentData.length >= 1) {
      dataToPost = {
        id_bundelan: `${tahunId}B${
          currentData[currentData.length - 1].nomor_bundelan + 1
        }`,
        nomor_bundelan: currentData[currentData.length - 1].nomor_bundelan + 1,
        id_tahun: tahunId,
        id_rak: rakId,
        id_lemari: lemariId,
        id_ruangan: ruanganId,
        tahun: tahun,
      };
    } else {
      dataToPost = {
        id_bundelan: `${tahunId}B1`,
        nomor_bundelan: 1,
        id_tahun: tahunId,
        id_rak: rakId,
        id_lemari: lemariId,
        id_ruangan: ruanganId,
        tahun: tahun,
      };
    }
    const response = await fetch("/home/postBundelan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToPost),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw error;
  }
};

const getWarkah = async (bundelanId) => {
  try {
    const response = await fetch(`/home/getWarkah?id_bundelan=${bundelanId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw error;
  }
};

const getAllWarkah = async (tahunId) => {
  try {
    const tahun = tahunId.slice(-4);
    const response = await fetch(`/home/getAllWarkah?tahun=${tahun}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw error;
  }
};

const postWarkah = async (bundelanId) => {
  try {
    const tahunId = bundelanId.substring(0, bundelanId.indexOf("B"));
    const rakId = bundelanId.substring(0, bundelanId.indexOf("T"));
    const lemariId = bundelanId.substring(0, bundelanId.indexOf("R"));
    const ruanganId = bundelanId.substring(0, bundelanId.indexOf("L"));
    const tahun = +bundelanId.substring(
      bundelanId.indexOf("T") + 1,
      bundelanId.indexOf("B")
    );

    const currentData = await getAllWarkah(tahunId);
    let dataToPost;

    if (currentData.length >= 1) {
      dataToPost = {
        id_warkah: `${bundelanId}W${
          currentData[currentData.length - 1].nomor_warkah + 1
        }`,
        nomor_warkah: currentData[currentData.length - 1].nomor_warkah + 1,
        id_bundelan: bundelanId,
        id_tahun: tahunId,
        id_rak: rakId,
        id_lemari: lemariId,
        id_ruangan: ruanganId,
        tahun: tahun,
      };
    } else {
      dataToPost = {
        id_warkah: `${bundelanId}W1`,
        nomor_warkah: 1,
        id_bundelan: bundelanId,
        id_tahun: tahunId,
        id_rak: rakId,
        id_lemari: lemariId,
        id_ruangan: ruanganId,
        tahun: tahun,
      };
    }
    const response = await fetch("/home/postWarkah", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToPost),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    throw error;
  }
};

export {
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
};
