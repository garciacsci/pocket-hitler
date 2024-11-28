// app/api/game/[gameId]/role/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readGames } from "@/utils/database";

export async function GET(req: NextRequest, { params }: any) {
    const { gameId } = params;
    const playerId = req.nextUrl.searchParams.get("playerId");

    const games = await readGames();

    if (!games[gameId]) {
        return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    const player = games[gameId].players.find(
        (p: any) => p.playerId === playerId
    );

    if (!player) {
        return NextResponse.json(
            { error: "Player not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ role: player.role });
}
