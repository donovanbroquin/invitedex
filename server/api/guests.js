import axios from "axios";
import sortBy from "lodash.sortby";
import * as crypto from "crypto";

function ucFirst(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export default defineEventHandler(async () => {
    const {notionProject, notionToken} = useRuntimeConfig();

    const {
        data: {results},
    } = await axios.post(
        `https://api.notion.com/v1/databases/${notionProject}/query`,
        {page_size: 300},
        {
            headers: {
                "Notion-Version": "2021-08-16",
                Authorization: `Bearer ${notionToken}`,
            },
        }
    );

    let guests = results
        .sort((guest) => guest.properties.order.number)
        .map((guest) => {
            const name = guest.properties.Name.title[0].plain_text
                .split(" ")
                .map(ucFirst)
                .join(" ")

            return {
                id: guest.properties.order.number,
                name,
                relation: ucFirst(guest.properties.relation.rich_text[0].plain_text),
                sprite: guest.properties.sprite.rich_text[0].plain_text,
                coordinates:
                    guest.properties.coordinates.rich_text[0].plain_text.split(","),
                description: guest.properties.description.rich_text[0].plain_text,
                table: guest.properties.table.rich_text[0].plain_text,
                hash: crypto.createHash("sha256")
                    .update(name)
                    .digest("hex")
                    .substring(0, 6)
            };
        });

    return sortBy(guests, (guest) => guest.id);
});
