import multer from 'multer';
import path from 'path';

// ✅ Use a single dynamic storage handler
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'photos') {
      cb(null, 'uploads/'); // For images
    } else if (file.fieldname === 'homeDetails') {
      cb(null, 'homeInfoPdfs/'); // For PDF
    } else {
      cb(new Error('Unexpected field name'), false);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});

// ✅ Allow only image or PDF
const fileFilter = (req, file, cb) => {
  const imageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  const pdfTypes = ['application/pdf'];

  if (
    (file.fieldname === 'photos' && imageTypes.includes(file.mimetype)) ||
    (file.fieldname === 'homeDetails' && pdfTypes.includes(file.mimetype))
  ) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type or field'), false);
  }
};

// ✅ Combined middleware
export const uploadFields = (req, res, next) => {
  const upload = multer({ storage, fileFilter }).fields([
    { name: 'photos', maxCount: 4 },
    { name: 'homeDetails', maxCount: 1 }
  ]);

  upload(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).send({ error: err.message });
    }
    next();
  });
};
