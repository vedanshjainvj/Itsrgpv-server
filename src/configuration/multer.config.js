import multer from 'multer';
import path from 'path';
import APIError from '../utils/APIError';
import statusCodeUtility from '../utils/statusCodeUtility';

const imageConfiguratin = multer.memoryStorage({
    destinatin: (request, file, callback) => {
        const folder = path.resolve('./public/images');
        callback(null, folder)
    },
    filename: (request, file, callback) => {
        const extension = path.extname(file.originalname);
        callback(null, `image-${Date.now()}${extension}`)
    }
});

const isImage = (request, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true);
    } else {
        callback(new APIError(statusCodeUtility.BadRequest, "Please Upload a valid image type", null), false)
    }
}

const upload = multer({
    storage: imageConfiguratin,
    fileFilter: isImage
});

export default upload;