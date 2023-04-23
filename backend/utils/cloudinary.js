const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dnqlxmbhc",
  api_key: "155776553453193",
  api_secret: "4cpYxtW94W4-hzAgbNVV6zICQrM"
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
    resource_type: 'auto'
  },
});

const upload = multer({ storage: storage });
module.exports = upload;