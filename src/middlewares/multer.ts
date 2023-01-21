import multer from 'multer'

const upload = multer().single('image')

export default upload