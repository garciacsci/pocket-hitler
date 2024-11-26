'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function NameStep() {
  const [playerName, setPlayerName] = useState('')
  const router = useRouter()

  const handleNext = () => {
    // Here you would typically save the player name
    // For now, we'll just navigate to the next step
    router.push('/lobby')
  }

  return (
    <Card className="w-[320px] bg-gray-900/50 border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl text-center text-white">Enter Your Name</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          placeholder="Your name..."
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
        />
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-primary hover:bg-primary/90" 
          onClick={handleNext}
        >
          Continue
        </Button>
      </CardFooter>
    </Card>
  )
}

