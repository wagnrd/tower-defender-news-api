import { config } from "../config";
import { fetch } from "cross-fetch";

interface GetLoremIpsumRequest {
    paragraphs: number;
    paragraphLength: "short" | "medium" | "long" | "verylong";
    decorations: boolean;
    links: boolean;
    lists: boolean;
}

async function getLoremIpsumText({
                                     paragraphs,
                                     paragraphLength,
                                     decorations,
                                     links,
                                     lists
                                 }: GetLoremIpsumRequest): Promise<string> {
    let url = `${config.loremIpsumUrl}/${paragraphs}/${paragraphLength}`;

    if (decorations) url += "/decorate";
    if (links) url += "/link";
    if (lists) url += "/ul";

    const response = await fetch(url);

    if (!response.ok) {
        console.error(
            `Fetching lorem ipsum text was unsuccessful (Code: ${response.status}): ${await response.json()}`);

        return "Error";
    }

    return await response.text();
}

export { getLoremIpsumText };