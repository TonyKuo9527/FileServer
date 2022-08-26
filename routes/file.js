const express = require('express');
const router = express.Router();

const service = require('../service/service_file');

router.get('/', (req, res) => {
  service.get_file_list(req, res);
});

router.get('/:fileName', (req, res) => {
  service.download_file(req, res);
});

router.post('/', (req, res) => {
  service.upload_file(req, res);
});

router.delete('/:fileName', (req, res) => {
  service.delete_file(req, res);
})

module.exports = router;