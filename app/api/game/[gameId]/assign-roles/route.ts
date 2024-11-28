// app/api/game/[gameId]/assign-roles/route.ts
import { NextRequest, NextResponse } from "next/server";
import { readGames, writeGames } from "@/utils/database";

export async function POST(req: NextRequest, context: any) {
    const { gameId } = context.params;

    const games = await readGames();

    if (!games[gameId]) {
        return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    const game = games[gameId];

    if (game.players.length < 5) {
        return NextResponse.json(
            { error: "At least 5 players are required to start the game" },
            { status: 400 }
        );
    }

    // Generate and shuffle roles
    const roles = generateRoles(game.players.length);
    const shuffledRoles = roles.sort(() => Math.random() - 0.5);

    // Assign roles to players
    game.players.forEach((player: any, index: number) => {
        const { faction, identity } = shuffledRoles[index];
        player.role = { faction, identity };
    });

    // Update game state
    game.state = "started";
    await writeGames(games);

    return NextResponse.json({ success: true });
}

function generateRoles(
    playerCount: number
): { faction: string; identity: string }[] {
    const roles: { faction: string; identity: string }[] = [];

    // Determine number of roles
    const liberalCount =
        playerCount === 5
            ? 3
            : playerCount === 6
            ? 4
            : playerCount >= 7 && playerCount <= 8
            ? 5
            : 6;

    const fascistCount = playerCount - liberalCount - 1; // Subtract one for Hitler

    // Add Hitler
    roles.push({ faction: "Fascist", identity: "Hitler" });

    // Add Fascists
    for (let i = 0; i < fascistCount; i++) {
        roles.push({ faction: "Fascist", identity: "Fascist" });
    }

    // Add Liberals
    for (let i = 0; i < liberalCount; i++) {
        roles.push({ faction: "Liberal", identity: "Liberal" });
    }

    return roles;
}
