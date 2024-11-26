import { GameSetupStep } from '@/components/game-setup-step'

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <GameSetupStep />
    </div>
  )
}

