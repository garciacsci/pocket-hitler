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

    const handleNext = () => {
        // Here you would typically handle the game code (create or join)
        // For now, we'll just navigate to the next step
        router.push("/lobby");
    };

    const validateRoomCode = () => {};

    const handleCreateRoom = () => {};

    const handleJoinRoom = () => {};

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
                        onClick={handleNext}
                        className="bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
                    >
                        <UserPlus className="mr-2 h-4 w-4" />
                        Create
                    </Button>
                    <Button
                        variant="outline"
                        onClick={handleNext}
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
