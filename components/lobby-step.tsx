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

    useEffect(() => {
        if (!room || !playerName) return;

        const joinGame = async () => {
            try {
                // Join the game
                const response = await fetch(`/api/game/${room}/join`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ playerName })
                });

                const data = await response.json();

                if (!response.ok) {
                    alert(data.error || "Failed to join game.");
                    router.push("/");
                    return;
                }

                // Fetch the game state
                await fetchGameState();
            } catch (error) {
                console.error("Error joining game:", error);
                alert("An error occurred while joining the game.");
                router.push("/");
            }
        };

        const fetchGameState = async () => {
            try {
                const response = await fetch(`/api/game/${room}`);
                const data = await response.json();

                if (response.ok) {
                    setPlayers(data.players);
                } else {
                    alert(data.error || "Failed to fetch game state.");
                }
            } catch (error) {
                console.error("Error fetching game state:", error);
                alert("An error occurred while fetching the game state.");
            }
        };

        joinGame();

        // Optionally, set up polling or WebSocket for real-time updates
    }, [room, playerName]);

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
