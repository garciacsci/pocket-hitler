// app/api/game/[gameId]/assign-roles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readGames, writeGames } from "@/utils/database";

export async function POST(req: NextRequest, { params }: any) {
    const { gameId } = params;

    const games = await readGames();

    if (!games[gameId]) {
        return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    const { roles, players } = games[gameId];
    const shuffledRoles = [...roles].sort(() => Math.random() - 0.5);

    players.forEach((player: any, index: number) => {
        player.role = shuffledRoles[index];
    });

    games[gameId].state = "roles_assigned";
    await writeGames(games);

    return NextResponse.json({ success: true });
}
