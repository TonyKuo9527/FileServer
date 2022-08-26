const fs      = require('fs');
const multer  = require('multer');
const path    = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './storage');
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  limit: {
    // 限制上傳檔案的大小為 1MB
    fileSize: 1000000
  },

  fileFilter(req, file, cb) {
    // 限制上傳檔案格式
    console.log(file.mimetype)
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "text/plain") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg .txt format allowed!'));
    }
  },

  storage
}).single('file');

module.exports = {
  get_file_list: (req, res) => {
    let file_list = [];
    fs.readdirSync('./storage').forEach(file => {
      file_list.push(file);
    });
    res.json(file_list);
  },

  download_file: (req, res) => {
    const file = req.params.fileName
    var file_path = './storage/' + file;
    res.download(file_path);
  },

  upload_file: (req, res) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.json({
          'status': 0,
          'msg': err
        })
        return;
      } else if (err) {
        res.json({
          'status': 0,
          'msg': err
        })
        return;
      }

      res.json({
        'status': 1,
        'msg': 'Finish'
      })
    });
  },

  delete_file: (req, res) => {
    const file = req.params.fileName
    fs.unlink('./storage/' + file, (err) => {
      if (err) {
        res.json({
          'status': 0,
          'msg': '刪除失敗!'
        })
      } else {
        res.json({
          'status': 1,
          'msg': '刪除成功!'
        })
      }
    })
  }
};