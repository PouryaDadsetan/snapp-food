import fs from 'fs'

const saveFile = (file: Express.Multer.File): string => {
  if(file && file.mimetype.includes('image')) {
    const parts = file.originalname.split('.')
    const fileName = parts[0].split(' ').join('_') + '-' + Date.now() + '.' + parts[parts.length - 1]
    const targetPath = 'static/' + fileName
    fs.writeFileSync(targetPath, file.buffer)
  
    return fileName
  }

  return ''
}

const deleteFile = (fileName: string) => {
  if(fileName) {
    const targetPath = 'static/' + fileName
    if(fs.existsSync(targetPath)) {
      fs.unlinkSync(targetPath)
    }
  }
}

export default {
  saveFile, 
  deleteFile
}