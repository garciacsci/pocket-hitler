"use client";

import { useState } from "react";
import { createLobby, joinLobby } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LobbyPage() {
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleCreate = async () => {
        setIsLoading(true);
        try {
            const result = await createLobby(code);
            if (result.success) {
                toast({
                    title: "Lobby created!",
                    description: `Your lobby code is: ${result.code}`
                });
                setCode("");
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.error
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "An unexpected error occurred."
            });
        }
        setIsLoading(false);
    };

    const handleCreateRandom = async () => {
        setIsLoading(true);
        try {
            const result = await createLobby();
            if (result.success) {
                toast({
                    title: "Lobby created!",
                    description: `Your lobby code is: ${result.code}`
                });
                setCode("");
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.error
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "An unexpected error occurred."
            });
        }
        setIsLoading(false);
    };

    const handleJoin = async () => {
        if (!code) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Please enter a lobby code."
            });
            return;
        }

        setIsLoading(true);
        try {
            const result = await joinLobby(code);
            if (result.success) {
                toast({
                    title: "Success!",
                    description: `Joined lobby: ${result.code}`
                });
                setCode("");
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: result.error
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "An unexpected error occurred."
            });
        }
        setIsLoading(false);
    };

    return (
        <main className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">
                        Pocket Helper
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Enter lobby code..."
                        value={code}
                        onChange={(e) => setCode(e.target.value.toUpperCase())}
                        maxLength={6}
                        className="text-center uppercase"
                        disabled={isLoading}
                    />
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            onClick={code ? handleCreate : handleCreateRandom}
                            disabled={isLoading}
                            className="w-full"
                        >
                            Create
                        </Button>
                        <Button
                            onClick={handleJoin}
                            disabled={isLoading}
                            variant="secondary"
                            className="w-full"
                        >
                            Join
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    );
}
