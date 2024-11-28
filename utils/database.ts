
import { promises as fs } from "fs";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "games.json");

export async function readGames(): Promise<Record<string, any>> {
    try {
        const data = await fs.readFile(dataFilePath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code === "ENOENT") {
            return {};
        }
        throw err;
    }
}

export async function writeGames(games: Record<string, any>): Promise<void> {
    const data = JSON.stringify(games, null, 2);
    await fs.writeFile(dataFilePath, data, "utf8");
}