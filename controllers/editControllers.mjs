import Database from "better-sqlite3";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//* open the database
const dbPath = join(__dirname, "../models/database.db");
let db = new Database(dbPath, { verbose: console.log });
db.pragma("journal_mode = WAL");

//* Page
const getEditPage = (req, res) => {
  res.sendFile(join(__dirname, "..", "views", "edit.html"));
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

export { getEditPage, getTableWarkah };
