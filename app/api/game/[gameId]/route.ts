
import { NextRequest, NextResponse } from "next/server";
import { readGames } from "@/utils/database";

export async function GET(req: NextRequest, { params }: any) {
    const { gameId } = params;

    const games = await readGames();

    if (!games[gameId]) {
        return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(games[gameId]);
}