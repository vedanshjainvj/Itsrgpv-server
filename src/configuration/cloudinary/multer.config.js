import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.config.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    try {
      // Determine the folder based on form type
      const formType = req.body.formType || "general";
      // Sanitize the filename
      const sanitizedFilename = file.originalname
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w.-]/g, "");

      // Generate a unique public ID
      const publicId = `${Date.now()}-${sanitizedFilename}`;

      return {
        // new folder for each section of dashboard
        folder: `uploads/${formType}`,
        allowed_formats: ["jpg", "jpeg", "png", "webp", "pdf"],
        public_id: publicId,
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      };
    } catch (error) {
      console.error("Error in CloudinaryStorage params:", error.message);
      throw error;
    }
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpg|jpeg|png|webp|pdf/;
    const mimetype = filetypes.test(file.mimetype);
    console.log(filetypes)
    const extname = filetypes.test(file.originalname.toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Invalid file type. Only JPG, JPEG, PNG, WEBP and PDF are allowed."));
  }
});

export default upload;