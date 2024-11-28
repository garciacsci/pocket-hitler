// app/api/game/[gameId]/role/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readGames } from "@/utils/database";

export async function GET(req: NextRequest, context: any) {
    const { gameId } = await context.params;
    const playerName = req.nextUrl.searchParams.get("name");

    const games = await readGames();

    if (!games[gameId]) {
        return NextResponse.json(
            { error: "Game not found" },
            { status: 404 }
        );
    }

    const game = games[gameId];

    if (game.state !== "started") {
        return NextResponse.json(
            { error: "Game has not started yet" },
            { status: 400 }
        );
    }

    const player = game.players.find((p: any) => p.name === playerName);

    if (!player) {
        return NextResponse.json(
            { error: "Player not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ role: player.role });
}
