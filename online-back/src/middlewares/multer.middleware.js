import multer, { memoryStorage } from "multer";

const storage = memoryStorage();

export const singleUpload = multer({ storage }).single("file");
export const multiUpload = multer({ storage }).array("files", 10); // Limit to 10 files
