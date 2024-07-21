const Minio = require('minio');

// Khởi tạo MinIO client
const minioClient = new Minio.Client({
  endPoint: process.env.minio_endpoint,
  port: 9000,
  useSSL: false,
  accessKey: process.env.minio_accesskey,
  secretKey: process.env.minio_secretkey
});

module.exports = minioClient;