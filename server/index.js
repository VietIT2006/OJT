const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const PORT = process.env.FILE_SERVER_PORT || 4000;
const DATA_FILE = path.join(__dirname, "cv-files.json");
const UPLOAD_DIR = path.join(__dirname, "uploads");

const ensureUploadsDir = () => {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
};

const readData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }
  try {
    const content = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(content);
  } catch (error) {
    console.error("Failed to read cv data file", error);
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
};

ensureUploadsDir();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`;
    cb(null, unique);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type"));
    }
  },
});

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(UPLOAD_DIR));

app.get("/cv-files", (req, res) => {
  const candidateId = req.query.candidateId;
  const data = readData();
  const items = candidateId ? data.filter((entry) => entry.candidateId === candidateId) : data;
  res.json(items.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)));
});

app.post("/cv-files", upload.single("cv"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Missing file" });
  }
  const candidateId = req.body.candidateId;
  if (!candidateId) {
    return res.status(400).json({ message: "Missing candidateId" });
  }

  const data = readData();
  const uploadedAt = new Date().toISOString();
  const fileEntry = {
    id: randomUUID(),
    candidateId,
    fileName: req.file.originalname,
    storedName: req.file.filename,
    fileType: req.file.mimetype,
    fileSize: req.file.size,
    fileUrl: `/uploads/${req.file.filename}`,
    uploadedAt,
    isPrimary: req.body.isPrimary === "false" ? false : true,
  };

  if (fileEntry.isPrimary) {
    data.forEach((item) => {
      if (item.candidateId === candidateId) {
        item.isPrimary = false;
      }
    });
  }

  data.push(fileEntry);
  writeData(data);
  res.status(201).json(fileEntry);
});

app.patch("/cv-files/:id", (req, res) => {
  const { id } = req.params;
  const { isPrimary } = req.body;
  const data = readData();
  const index = data.findIndex((entry) => entry.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "File not found" });
  }

  if (typeof isPrimary === "boolean") {
    if (isPrimary) {
      data.forEach((entry) => {
        if (entry.candidateId === data[index].candidateId) {
          entry.isPrimary = false;
        }
      });
    }
    data[index].isPrimary = isPrimary;
  }

  writeData(data);
  res.json(data[index]);
});

app.delete("/cv-files/:id", (req, res) => {
  const { id } = req.params;
  const data = readData();
  const index = data.findIndex((entry) => entry.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "File not found" });
  }

  const [removed] = data.splice(index, 1);
  writeData(data);
  const filePath = path.join(UPLOAD_DIR, removed.storedName);
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Failed to remove uploaded file", err);
      }
    });
  }
  res.json({ success: true });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  if (err.message === "Unsupported file type") {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`File upload server running on port ${PORT}`);
});
