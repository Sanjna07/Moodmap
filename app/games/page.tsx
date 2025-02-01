"use client"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { redirect } from 'next/navigation'
import { RedirectType } from 'next/navigation'

const games = [
  {
    title: "Mindfulness Breathing",
    description: "Follow the animation of a circle expanding and contracting to sync your breathing.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Puzzle Game",
    description: "Simple jigsaw puzzles with serene landscapes to help you relax and focus.",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    title: "Relaxation Adventure",
    description: "Explore a calming virtual forest or ocean to unwind and de-stress.",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function Games() {
  return (
    <div className="min-h-screen bg-soft-gray py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Stress Relief Games</h1>
        <p className="text-xl mb-8">Take a break and relax with these stress-relief games.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{game.title}</CardTitle>
                <CardDescription>{game.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={game.image || "/placeholder.svg"}
                  alt={game.title}
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={()=>redirect('/breathing')}>Play Now</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

