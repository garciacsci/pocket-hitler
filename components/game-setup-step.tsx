'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Shield } from 'lucide-react'

export function GameSetupStep() {
  const router = useRouter()

  const handleBack = () => {
    router.push('/lobby')
  }

  return (
    <Card className="w-[320px] bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl text-center text-white">Game Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          variant="outline" 
          className="w-full bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
        >
          <Shield className="mr-2 h-4 w-4" />
          Choose Faction
        </Button>
        <Button 
          variant="outline" 
          className="w-full bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
        >
          <Users className="mr-2 h-4 w-4" />
          Select Identity
        </Button>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          onClick={handleBack}
          className="w-full bg-gray-800 border-gray-700 hover:bg-gray-700 text-white"
        >
          Back to Lobby
        </Button>
      </CardFooter>
    </Card>
  )
}

