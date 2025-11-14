import * as Minio from "minio"
import dotenv from "dotenv"
import multer from "multer"
import multerS3 from "multer-s3"
import { S3Client } from "@aws-sdk/client-s3"

dotenv.config()

const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY
const BUCKET_NAME = "devweb2025"

const s3 = new S3Client({
    endpoint: "http://127.0.0.1:9000",
    region: "us-east-1",
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
            cb(null, Date.now() + "-" + file.originalname)
        },
    }),
})

const minioClient = new Minio.Client({
    endPoint: "localhost",
    port: 9000,
    useSSL: false,
    accessKey: MINIO_ACCESS_KEY,
    secretKey: MINIO_SECRET_KEY,
})

function getFileUrl(objectName) {
    return new Promise((resolve, reject) => {
        minioClient.presignedUrl(
            "GET",
            BUCKET_NAME,
            objectName,
            24 * 60 * 60,
            (err, url) => {
                if (err) return reject(err)
                    resolve(url)
            }
        )
    })
}

export default { uploadFile, getFileUrl }
