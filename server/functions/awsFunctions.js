import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3"
import { config as configDotenv } from "dotenv";
configDotenv()


const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_S3_OR,
        secretAccessKey: process.env.AWS_S3_OR_SECRET_KEY
    }
})

const bucketName = 'cacaaaaaaaaaaaaaaa'
const prefix = 'userPictures'

export async function getProfileUrl() {
    try {
        let img = []
        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: prefix
        })

        const res = await s3.send(command)
        const content = res.Contents
        content.map((p)=>{
            img.push(`https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${p.Key}`)
        })
        img.shift()
        return img


    } catch (error) {
        console.log(error);
    }
}