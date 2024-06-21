import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'contacts',
    allowedFormats: ['jpg', 'png', 'pdf', 'docx'],
  },
});

const upload = multer({ storage });

export default upload;
