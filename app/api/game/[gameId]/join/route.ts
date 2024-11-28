// app/api/game/[gameId]/join/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readGames, writeGames } from "@/utils/database";

export async function POST(req: NextRequest, { params }: any) {
    const { gameId } = params;
    const { playerName } = await req.json();

    const games = await readGames();

    if (!games[gameId]) {
        return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    // Check if player already joined
    if (games[gameId].players.some((p: any) => p.name === playerName)) {
        return NextResponse.json(
            { error: "Player name already taken in this game" },
            { status: 400 }
        );
    }

    games[gameId].players.push({ name: playerName });
    await writeGames(games);

    return NextResponse.json({ success: true });
}
