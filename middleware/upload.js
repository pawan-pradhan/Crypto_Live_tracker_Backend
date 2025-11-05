import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const allowedTypes = [
  "application/zip",
  "application/x-zip-compressed",
  "application/x-rar-compressed",
  "application/octet-stream", // often used for .zip or .rar
];

const fileFilter = (req, file, cb) => {
  if (file.originalname.match(/\.(zip|rar)$/i)) {
    cb(null, true);
  } else {
    cb(new Error("Only .zip or .rar files allowed!"), false);
  }
};


export const upload = multer({ storage, fileFilter });
