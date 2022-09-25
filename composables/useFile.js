import {GetObjectCommand, ListObjectsCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import sortBy from "lodash.sortby";

function getClient(runtime) {
    const {s3Region, s3Id, s3Secret} = runtime

    return new S3Client({
        region: s3Region,
        credentials: {
            accessKeyId: s3Id,
            secretAccessKey: s3Secret,
        }
    });
}

export async function useStoreFile(runtime, {hash, catches}) {
    const {s3BucketName} = runtime

    try {
        await getClient(runtime).send(new PutObjectCommand({
            Bucket: s3BucketName,
            Key: `${hash}.json`,
            ACL: "private",
            Body: JSON.stringify(catches),
        }));
    } catch (error) {
        console.log(error)
    }
}

export async function useGetWinner(runtime) {
    const {s3BucketName} = runtime
    const client = await getClient(runtime)
    const clientInput = {Bucket: s3BucketName}

    try {
        const files = await client.send(new ListObjectsCommand(clientInput))
        const resultsPerGuest = await Promise.all(files.Contents.map(async file => {
            const [hash] = file.Key.split('.')
            const content = await client.send(new GetObjectCommand({...clientInput, Key: file.Key}))
            const catches = await (new Response(content.Body)).json()

            return {
                hash,
                catches,
                catchesCount: catches.length,
                lastCatch: sortBy(catches, 'date').at(-1)
            }
        }))

        const currentWinner = sortBy(resultsPerGuest, 'catchesCount')

        return currentWinner?.at(-1)
    } catch (e) {
        console.log(e)
    }
}
