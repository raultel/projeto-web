/*
 * NOTA: código foi copiado do github da professora Bruna (com pequenas alterações):
 * https://github.com/brunaru/AulaBackEnd-2025/blob/main/media/media.uploader.js
 */

import * as Minio from "minio"
import dotenv from "dotenv"
import multer from "multer"
import multerS3 from "multer-s3"
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3"
import mime from "mime"

dotenv.config()
const MINIO_ACCESS_KEY = process.env['MINIO_ACCESS_KEY']
const MINIO_SECRET_KEY = process.env['MINIO_SECRET_KEY']
const BUCKET_NAME = process.env['MINIO_BUCKET']

const s3 = new S3Client({
    endpoint: 'http://127.0.0.1:9000',
    region: 'us-east-1',
    credentials: {
        accessKeyId: MINIO_ACCESS_KEY,
        secretAccessKey: MINIO_SECRET_KEY,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
})

const uploadFile = multer({
    storage: multerS3({
        s3: s3,
        bucket: BUCKET_NAME,
        key: function (request, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        },
        contentType: function (req, file, cb) {
            // Automatically detect MIME type from file extension
            const type = mime.getType(file.originalname) || "application/octet-stream";
            cb(null, type);
        },
    }),
})

const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false, // set to true if using SSL
    accessKey: MINIO_ACCESS_KEY,
    secretKey: MINIO_SECRET_KEY
})

function getFileUrl(objectName) {
    return minioClient.presignedUrl('GET', BUCKET_NAME, objectName, 24 * 60 * 60)
}

function extractKeyFromUrl(url) {
    const encoded = url.split('/').pop();
    return decodeURIComponent(encoded);
}


async function deleteFile(fileUrl) {
    try {
        const key = extractKeyFromUrl(fileUrl);

        const command = new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
        });

        await s3.send(command);
        return true;

    } catch (err) {
        console.error("MinIO delete error:", err);
        throw err; // rethrow to be handled by controller
    }
}

export default { uploadFile, getFileUrl, deleteFile }
