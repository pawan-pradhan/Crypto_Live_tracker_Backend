import express from "express";
import FileModel from "../models/File.js";

const router = express.Router();
 
// 📦 Save Cloudinary file data (name + url)
router.post("/files/save", async (req, res) => {
  try {
    const { name, url } = req.body;

    if (!name || !url) {
      return res.status(400).json({ error: "Missing name or url" });
    }

    const newFile = await FileModel.create({ name, url });
    res.json({ success: true, file: newFile });
  } catch (err) {
    console.error("Error saving file:", err);
    res.status(500).json({ error: "Failed to save file" });
  }
});

// 📄 Get list of files
router.get("/files", async (req, res) => {
  try {
    const files = await FileModel.find().sort({ createdAt: -1 });
    res.json(files);
  } catch (err) {
    console.error("Error fetching files:", err);
    res.status(500).json({ error: "Failed to fetch files" });
  }
});

export default router;





// import express from "express";
// import { upload } from "../middleware/upload.js";
// import cloudinary from "../utils/cloudinary.js";
// import File from "../models/File.js";
// import fs from "fs";

// const router = express.Router();

// // Upload file
// router.post("/upload", upload.single("file"), async (req, res) => {
//     console.log("called")
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       resource_type: "raw",
//       folder: "compressed_files",
//     });

//     const newFile = await File.create({
//       name: req.file.originalname,
//       url: result.secure_url,
//     });

//     fs.unlinkSync(req.file.path);
//     res.json(newFile);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // List files
// router.get("/", async (req, res) => {
//   const files = await File.find().sort({ uploadedAt: -1 });
//   res.json(files);
// });

// export default router;
