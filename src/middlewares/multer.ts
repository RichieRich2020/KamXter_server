import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../../public/uploads")
    cb(null, uploadPath)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname)
  },
})

// const upload = multer({ storage: storage })
// exports.doc = upload.single("file")

export const upload = multer({
  storage,
})
