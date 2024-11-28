"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, UserPlus2 } from "lucide-react";

export function InitialStep() {
    const [gameCode, setGameCode] = useState("");
    const [playerName, setPlayerName] = useState("");

    const router = useRouter();

    const validateGameCode = (code: string) => /^[a-zA-Z0-9]+$/.test(code);

    const handleCreateRoom = async () => {
        let newGameCode = gameCode;
        if (!newGameCode) {
            newGameCode = Math.random().toString(36).substr(2, 6).toUpperCase();
        } else if (!validateGameCode(newGameCode)) {
            alert("Game code must be alphanumeric.");
            return;
        }

        if (!playerName) {
            alert("Player name is required.");
            return;
        }

        try {
            const response = await fetch("/api/game", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ gameId: newGameCode })
            });

            const data = await response.json();

            if (response.ok) {
                router.push(`/lobby?room=${newGameCode}&name=${encodeURIComponent(playerName)}`);
            } else {
                alert(data.error || "Failed to create game.");
            }
        } catch (error) {
            console.error("Error creating game:", error);
            alert("An error occurred while creating the game.");
        }
    };

    const handleJoinRoom = () => {
        
    };

    return (
        <Card className="w-[320px] bg-gray-900/50 border-gray-800">
            <CardHeader>
                <CardTitle className="text-2xl text-center text-white">
                    Pocket Helper
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input
                    placeholder="Your name..."
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <Input
                    placeholder="Enter game code..."
                    value={gameCode}
                    onChange={(e) => setGameCode(e.target.value)}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <div className="grid grid-cols-2 gap-2">
                    <Button
                        variant="outline"
                        onClick={handleCreateRoom}
                        className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
                    >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleJoinRoom}
                        className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
                    >
                        <UserPlus2 className="mr-2 h-4 w-4" />
                        Join
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
