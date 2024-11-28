// app/api/game/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readGames, writeGames } from "@/utils/database";

export async function POST(req: NextRequest) {
    const { roles, gameId } = await req.json();

    const games = await readGames();

    const newGameId = gameId || crypto.randomUUID();

    if (games[newGameId]) {
        return NextResponse.json(
            { error: "Game ID already exists" },
            { status: 400 }
        );
    }

    games[newGameId] = {
        roles: roles || [],
        players: [],
        state: "waiting"
    };
    await writeGames(games);

    return NextResponse.json({ gameId: newGameId });
}
