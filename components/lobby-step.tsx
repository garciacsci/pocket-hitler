"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Users } from "lucide-react";

interface Player {
    id: number;
    name: string;
}

export function LobbyStep() {
    const [players, setPlayers] = useState<Player[]>([]);
    const router = useRouter();

    const searchParams = useSearchParams();
    const room = searchParams.get("room");
    const playerName = searchParams.get("name");

    if (!room) {
        return <div>Room not specified</div>;
    }

    const handleStartGame = () => {};

    return (
        <Card className="w-[320px] bg-gray-900/50 border-gray-800">
            <CardHeader>
                <CardTitle className="text-xl text-center text-white">
                    Game Lobby ({players.length}/10 Players)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div
                            key={i}
                            className={`p-2 rounded ${
                                players[i]
                                    ? "bg-gray-800 text-white"
                                    : "bg-gray-800/50 text-gray-500"
                            }`}
                        >
                            {players[i]?.name || "Empty"}
                        </div>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={handleStartGame}
                >
                    <Users className="mr-2 h-4 w-4" />
                    Start Game
                </Button>
            </CardFooter>
        </Card>
    );
}
