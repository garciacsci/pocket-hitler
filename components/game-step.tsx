"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Users, Shield } from "lucide-react";
import { useState } from "react";

export function GameStep() {
    const [identity, setIdentity] = useState("Pookie");
    const [faction, setFaction] = useState("Liberal");

    const router = useRouter();

    const handleBack = () => {
        router.push("/lobby");
    };
    const toggleFaction = () => {
        setFaction((prevFaction) =>
            prevFaction === "Liberal" ? "Faction" : "Liberal"
        );
    };
    const toggleIdentity = () => {};

    return (
        <Card className="w-[320px] bg-gray-900/50 border-gray-800">
            {/* <CardHeader>
                <CardTitle className="text-xl text-center text-white"></CardTitle>
            </CardHeader> */}
            <CardContent className="space-y-4 pt-4">
                <Button
                    variant="outline"
                    className="w-full bg-gray-800 border-gray-700 hover:bg-gray-700 text-white py-10"
                    onClick={toggleFaction}
                >
                    <Shield className="mr-2 h-4 w-4" />
                    {faction}
                </Button>
                <Button
                    variant="outline"
                    className="w-full bg-gray-800 border-gray-700 hover:bg-gray-700 text-white py-10"
                    onClick={toggleIdentity}
                >
                    <Users className="mr-2 h-4 w-4" />
                    {identity}
                </Button>
            </CardContent>
            {/* <CardFooter>
                <Button
                    variant="outline"
                    onClick={handleBack}
                    className="w-full bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
                >
                    Back to Lobby
                </Button>
            </CardFooter> */}
        </Card>
    );
}
