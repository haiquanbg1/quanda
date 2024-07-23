const minioClient = require("../utils/minio");

const upload = async (bucketName, objectName, filePath) => {
    const checkBucketExists = await minioClient.bucketExists(bucketName);

    if (!checkBucketExists) {
        // Tạo một bucket mới
        await minioClient.makeBucket(bucketName, 'us-east-1', (err) => {
            if (err) return console.log('Error creating bucket.', err);
            console.log('Bucket created successfully.');
        });
    }

    // Tải lên một file
    await minioClient.fPutObject(bucketName, objectName, filePath, (err, etag) => {
        if (err) return console.log('Error uploading file.', err);
        console.log('File uploaded successfully.');
    });
}

const getUrl = (bucketName, fileName) => {
    return new Promise(async (resolve, reject) => {
        await minioClient.statObject(bucketName, fileName, (error, stat) => {
            if (!stat) {
                return resolve(null);
            }

            if (error) {
                console.error('Error in check object exists: ', error);
                reject(error);
            }
        });

        try {
            // Tạo URL đã ký trước cho file
            const url = await minioClient.presignedUrl('GET', bucketName, fileName, 24 * 60 * 60); // URL có hiệu lực trong 24 giờ
            resolve(url);
        } catch (error) {
            console.error('Error in get url object: ', error);
            reject(error);
        }
    });
}

const deleteFile = async (bucketName, fileName) => {
    await minioClient.statObject(bucketName, fileName, (error, stat) => {
        if (stat) {
            minioClient.removeObject(bucketName, fileName, (err) => {
                if (err) {
                    console.log(err);
                    return err;
                }
            });
        }

        if (error) {
            console.log(error);
            return error;
        }
    });

    return null;
}

module.exports = {
    upload,
    getUrl,
    deleteFile
}