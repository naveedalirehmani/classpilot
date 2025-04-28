"use strict";
// import multer, { StorageEngine, FileFilterCallback } from "multer";
// import path from "path";
// import fs from "fs";
// import { Request } from "express";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
// const __basedir = path.resolve();
// interface MulterFile extends Express.Multer.File {
//   originalname: string;
// }
// interface Image {
//   path: string;
// }
// const storage: StorageEngine = multer.diskStorage({
//   // destination: function (req: Request, file: MulterFile, cb) {
//   //   cb(null, __basedir + "/src/Uploads");
//   // },
//   filename: function (req: Request, file: MulterFile, cb) {
//     cb(null, new Date().getTime() + path.extname(file.originalname));
//   },
// });
// const fileFilter = (req: Request, file: MulterFile, cb: FileFilterCallback) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     cb(null, true);
//   } else {
//     // cb(new Error("unsupported file"), false);
//     cb(null, false);
//   }
// };
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 10,
//   },
//   fileFilter: fileFilter,
// });
// const deleteImages = (images: Image[]) => {
//   for (const image of images) {
//     const imagePath = path.join(__basedir, "src", image.path);
//     if (fs.existsSync(imagePath)) {
//       fs.unlinkSync(imagePath);
//     }
//   }
// };
// export { upload, deleteImages };
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
exports.upload = (0, multer_1.default)({ storage });
