// app/api/game/[gameId]/join/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readGames, writeGames } from "@/utils/database";

export async function POST(req: NextRequest, { params }: any) {
    const { gameId } = params;
    const { playerId } = await req.json();

    const games = await readGames();

    if (!games[gameId]) {
        return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    games[gameId].players.push({ playerId, role: null });
    await writeGames(games);

    return NextResponse.json({ success: true });
}
