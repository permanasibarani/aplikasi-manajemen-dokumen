import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//* open the database
const dbPath = join(__dirname, "../models/database.db");
let db = new Database(dbPath, { verbose: console.log });
db.pragma("journal_mode = WAL");

//* Pages
const getHomeIndex = (req, res) => {
  res.sendFile(join(__dirname, "..", "views", "home.html"));
};

//* Query 4 Ruangan
const getRuangan = (req, res) => {
  const sqlGetRuangan = db.prepare(
    "SELECT id_ruangan, nomor_ruangan FROM ruangan"
  );
  const resultGetRuangan = sqlGetRuangan.all();
  res.status(201).json(resultGetRuangan);
};

const postRuangan = (req, res) => {
  const sqlPost = db.prepare("INSERT INTO ruangan VALUES(?, ?, ?)");
  const sqlGet = db.prepare("SELECT id_ruangan, nomor_ruangan FROM ruangan");
  sqlPost.run(
    req.body.id_ruangan,
    req.body.nomor_ruangan,
    req.body.jenis_ruangan
  );
  const result = sqlGet.all();
  res.status(201).json(result);
};

//* Query 4 Lemari
const getLemari = (req, res) => {
  const sqlGetLemari = db.prepare(
    "SELECT id_lemari, nomor_lemari FROM lemari WHERE id_ruangan = ?"
  );
  const resultGetLemari = sqlGetLemari.all(req.query.id_ruangan);
  res.status(201).json(resultGetLemari);
};

const postLemari = (req, res) => {
  const sqlPost = db.prepare("INSERT INTO lemari VALUES(?,?,?)");
  const sqlGet = db.prepare(
    "SELECT id_lemari, nomor_lemari FROM lemari WHERE id_ruangan = ?"
  );
  sqlPost.run(req.body.id_lemari, req.body.nomor_lemari, req.body.id_ruangan);
  const result = sqlGet.all(req.body.id_ruangan);
  res.status(201).json(result);
};

//* Query 4 Rak
const getRak = (req, res) => {
  const sqlGetRak = db.prepare(
    "SELECT id_rak, nomor_rak FROM rak WHERE id_lemari = ?"
  );
  const result = sqlGetRak.all(req.query.id_lemari);
  res.status(201).json(result);
};

const postRak = (req, res) => {
  const sqlPost = db.prepare("INSERT INTO rak VALUES(?,?,?,?)");
  sqlPost.run(
    req.body.id_rak,
    req.body.nomor_rak,
    req.body.id_lemari,
    req.body.id_ruangan
  );
  const sqlGet = db.prepare(
    "SELECT id_rak, nomor_rak FROM rak WHERE id_lemari = ?"
  );
  const result = sqlGet.all(req.body.id_lemari);
  res.status(201).json(result);
};

const getTahun = (req, res) => {
  const sqlGetTahun = db.prepare(
    "SELECT id_tahun, tahun FROM tahun WHERE id_rak = ?"
  );
  const result = sqlGetTahun.all(req.query.id_rak);
  res.status(201).json(result);
};

const postTahun = (req, res) => {
  const sqlPost = db.prepare("INSERT INTO tahun VALUES(?,?,?,?,?)");
  sqlPost.run(
    req.body.id_tahun,
    req.body.tahun,
    req.body.id_rak,
    req.body.id_lemari,
    req.body.id_ruangan
  );
  const sqlGet = db.prepare(
    "SELECT id_tahun, tahun FROM tahun WHERE id_rak = ?"
  );
  const result = sqlGet.all(req.body.id_rak);
  res.status(201).json(result);
};

const getAllSameYearBundelan = (req, res) => {
  const sqlGet = db.prepare(
    "SELECT nomor_bundelan FROM bundelan WHERE tahun = ?"
  );
  const result = sqlGet.all(req.query.tahun);
  res.status(201).json(result);
};

const getBundelan = (req, res) => {
  const sqlGet = db.prepare(
    "SELECT id_bundelan, nomor_bundelan FROM bundelan WHERE id_tahun = ?"
  );
  const result = sqlGet.all(req.query.id_tahun);
  res.status(201).json(result);
};

const postBundelan = (req, res) => {
  const sqlPost = db.prepare("INSERT INTO bundelan VALUES (?,?,?,?,?,?,?)");
  sqlPost.run(
    req.body.id_bundelan,
    req.body.nomor_bundelan,
    req.body.id_tahun,
    req.body.id_rak,
    req.body.id_lemari,
    req.body.id_ruangan,
    req.body.tahun
  );
  const sqlGet = db.prepare(
    "SELECT id_bundelan, nomor_bundelan FROM bundelan WHERE id_tahun = ?"
  );
  const result = sqlGet.all(req.body.id_tahun);
  res.status(201).json(result);
};

const getAllSameYearWarkah = (req, res) => {
  const sqlGet = db.prepare("SELECT nomor_warkah FROM warkah WHERE tahun = ?");
  const result = sqlGet.all(req.query.tahun);
  res.status(201).json(result);
};

const getWarkah = (req, res) => {
  const sqlGet = db.prepare(
    "SELECT nomor_warkah, id_warkah FROM warkah WHERE id_bundelan = ?"
  );
  const result = sqlGet.all(req.query.id_bundelan);
  res.status(201).json(result);
};

const postWarkah = (req, res) => {
  const sqlPost = db.prepare("INSERT INTO warkah VALUES (?,?,?,?,?,?,?,?)");
  sqlPost.run(
    req.body.id_warkah,
    req.body.nomor_warkah,
    req.body.id_bundelan,
    req.body.id_tahun,
    req.body.id_rak,
    req.body.id_lemari,
    req.body.id_ruangan,
    req.body.tahun
  );
  const sqlGet = db.prepare(
    "SELECT id_warkah, nomor_warkah FROM warkah WHERE id_bundelan = ?"
  );
  const result = sqlGet.all(req.body.id_bundelan);
  res.status(201).json(result);
};

const getTableWarkah = (req, res) => {
  try {
    const sqlGet = db.prepare(
      "SELECT nomor_warkah, id_bundelan, tahun, id_rak, id_lemari, id_ruangan FROM warkah WHERE tahun = ? AND nomor_warkah = ?"
    );
    const result = sqlGet.all(+req.query.tahun, +req.query.nomor_warkah);
    const warkah = result[0].nomor_warkah;
    const bundelan = result[0].id_bundelan;
    const tahun = result[0].tahun;
    const rak = result[0].id_rak;
    const lemari = result[0].id_lemari;
    const ruangan = result[0].id_ruangan;
    const tableData = {
      headers: [
        "No.Warkah",
        "No.Bundelan",
        "Tahun",
        "No.Rak",
        "No.Lemari",
        "No.Ruangan",
      ],
      rows: [
        [
          warkah,
          bundelan.substring(bundelan.indexOf("B") + 1),
          tahun,
          rak.substring(rak.indexOf("R") + 1),
          lemari.substring(lemari.indexOf("L") + 1),
          ruangan.substring(ruangan.indexOf("W") + 1),
        ],
      ],
    };
    res.status(201).json(tableData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  postRuangan,
  getHomeIndex,
  postLemari,
  postRak,
  getRak,
  getRuangan,
  getLemari,
  getTahun,
  postTahun,
  getBundelan,
  postBundelan,
  getAllSameYearBundelan,
  getWarkah,
  postWarkah,
  getAllSameYearWarkah,
  getTableWarkah,
};
