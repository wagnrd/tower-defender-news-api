import { config } from "../config";
import { fetch } from "cross-fetch";

interface GetLoremIpsumRequest {
    paragraphs: number;
    paragraphLength: "short" | "medium" | "long" | "verylong";
    decorations: boolean;
}

async function getPlaceholderText({
                                      paragraphs,
                                      paragraphLength,
                                      decorations
                                  }: GetLoremIpsumRequest): Promise<string> {
    let url = `${config.placeholderApi.textUrl}/${paragraphs}/${paragraphLength}`;

    if (decorations) url += "/decorate/link/ul";

    const response = await fetch(url);

    if (!response.ok) {
        console.error(
            `Fetching lorem ipsum text was unsuccessful (Code: ${response.status}): ${await response.json()}`);

        return "Error";
    }

    return await response.text();
}

export { getPlaceholderText };