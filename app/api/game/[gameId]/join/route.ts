// app/api/game/[gameId]/join/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readGames, writeGames } from "@/utils/database";

export async function POST(req: NextRequest, context: any) {
    const { gameId } = await context.params;
    const { playerName } = await req.json();

    const games = await readGames();

    if (!games[gameId]) {
        return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    // Check if player already exists
    const playerExists = games[gameId].players.some(
        (p: any) => p.name === playerName
    );

    if (games[gameId].players.length >= 10) {
        return NextResponse.json(
            { error: "Lobby is full" },
            { status: 400 }
        );
    }

    if (!playerExists) {
        games[gameId].players.push({ name: playerName });
        await writeGames(games);
    }
    // Allow rejoin without error if the player already exists

    return NextResponse.json({ success: true });
}
