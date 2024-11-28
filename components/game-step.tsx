"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Users, Shield } from "lucide-react";
import { useState, useEffect } from "react";

export function GameStep() {
    const [identity, setIdentity] = useState("");
    const [faction, setFaction] = useState("");
    const [showIdentity, setShowIdentity] = useState(false);
    const [showFaction, setShowFaction] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const room = searchParams.get("room");
    const playerName = searchParams.get("name");

    useEffect(() => {
        if (!room || !playerName) return;

        const fetchRole = async () => {
            try {
                const response = await fetch(
                    `/api/game/${room}/role?name=${encodeURIComponent(
                        playerName
                    )}`
                );
                if (response.ok) {
                    const data = await response.json();
                    setIdentity(data.identity);
                    setFaction(data.faction);
                } else {
                    const data = await response.json();
                    if (data.error === "Game has not started yet") {
                        alert(
                            "The game has not started yet. Please wait for the host to start the game."
                        );
                        router.push(
                            `/lobby?room=${room}&name=${encodeURIComponent(
                                playerName || ""
                            )}`
                        );
                    } else {
                        alert(data.error || "Failed to fetch role.");
                        router.push("/");
                    }
                }
            } catch (error) {
                console.error("Error fetching role:", error);
                alert("An error occurred while fetching your role.");
                router.push("/");
            }
        };

        fetchRole();
    }, [room, playerName]);

    const handleBack = () => {
        router.push(
            `/lobby?room=${room}&name=${encodeURIComponent(playerName || "")}`
        );
    };
    const toggleFaction = () => {
        setShowFaction((prev) => !prev);
    };

    const toggleIdentity = () => {
        setShowIdentity((prev) => !prev);
    };

    return (
        <Card className="w-[320px] bg-gray-900/50 border-gray-800">
            <CardContent className="space-y-4 pt-4">
                <Button
                    variant="outline"
                    className="w-full bg-gray-800 border-gray-700 hover:bg-gray-700 text-white py-10"
                    onClick={toggleFaction}
                >
                    <Shield className="mr-2 h-4 w-4" />
                    {showFaction ? faction : "Reveal Faction"}
                </Button>
                <Button
                    variant="outline"
                    className="w-full bg-gray-800 border-gray-700 hover:bg-gray-700 text-white py-10"
                    onClick={toggleIdentity}
                >
                    <Users className="mr-2 h-4 w-4" />
                    {showIdentity ? identity : "Reveal Identity"}
                </Button>
            </CardContent>
        </Card>
    );
}
