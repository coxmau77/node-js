import multer from "multer";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Las imágenes se guardarán en la carpeta 'public/uploads/products'
    // Asumimos que esta carpeta está al mismo nivel que 'src'
    const uploadPath = join(__dirname, '../../public/images/products');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generar un nombre de archivo único para evitar sobreescrituras
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
  }
});

// Filtro de archivos para aceptar solo imágenes
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('El archivo no es una imagen!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
