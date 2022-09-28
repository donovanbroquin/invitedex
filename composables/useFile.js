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

export async function useStoreFile(runtime, {hash, catches, id}) {
    const {s3BucketName} = runtime

    try {
        await getClient(runtime).send(new PutObjectCommand({
            Bucket: s3BucketName,
            Key: `${id}-${hash}.json`,
            ACL: "private",
            Body: JSON.stringify(catches),
        }));
    } catch (error) {
        console.log(error)
    }
}

export async function useGetWinner(runtime) {
    const config = runtime
    const client = await getClient(runtime)
    const clientInput = {Bucket: config.s3BucketName}
    const contestExclusion = config.contestExclusion.split(',').map(id => id.trim())

    try {
        const files = await client.send(new ListObjectsCommand(clientInput))

        if (!files.hasOwnProperty('Contents')) return

        const resultsPerGuest = await Promise.all(files.Contents.map(async file => {
            const [id, hash] = file.Key.split('.')[0].split('-')
            const content = await client.send(new GetObjectCommand({...clientInput, Key: file.Key}))
            const catches = await (new Response(content.Body)).json()
            const lastCatch = sortBy(catches, 'date').at(-1)

            return {
                hash,
                id,
                catches,
                catchesCount: catches.length,
                lastCatch,
                lastCatchAt: lastCatch.date
            }
        }))

        const maxCatches = sortBy(resultsPerGuest, 'catchesCount')[0].catchesCount
        const resultsForMaxCatches = resultsPerGuest.filter(res => res.catchesCount === maxCatches)
        const currentWinner = sortBy(resultsForMaxCatches, 'lastCatchAt').filter(guest => !contestExclusion.includes(guest.id))

        return currentWinner?.at(0)
    } catch (e) {
        console.log(e)
    }
}
