import { config } from "../config";
import { fetch } from "cross-fetch";

const veryShortMaxLength = 200;

interface GetLoremIpsumRequest {
    paragraphs: number;
    paragraphLength: "veryshort" | "short" | "medium" | "long" | "verylong";
    decorations: boolean;
}

async function getPlaceholderText({
                                      paragraphs,
                                      paragraphLength,
                                      decorations
                                  }: GetLoremIpsumRequest): Promise<string> {
    let isVeryShort = false;

    if (paragraphLength === "veryshort") {
        isVeryShort = true;
        paragraphLength = "short";
    }

    let url = `${config.placeholderTextApiUrl}/${paragraphs}/${paragraphLength}`;

    if (decorations)
        url += "/decorate/link/ul";
    else
        url += "/plaintext";

    const response = await fetch(url);

    if (!response.ok) {
        console.error(
            `Fetching lorem ipsum text was unsuccessful (Code: ${response.status}): ${await response.json()}`);

        return "Error";
    }

    let text = await response.text();

    if (isVeryShort && text.length > veryShortMaxLength) {
        text = text.slice(0, veryShortMaxLength) + ".";
    }

    return text;
}

export { getPlaceholderText };