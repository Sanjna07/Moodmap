"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { getServerSession } from "next-auth"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function ProfilePage() {
  const session=useSession();
  console.log(session)
return (
  <>
    {session.status=="unauthenticated" ? redirect('/signin') : (
      session.data?.user&&(
        <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white shadow-lg">
            <CardHeader className="bg-green-600 text-white">
              <CardTitle className="text-2xl font-bold text-center">User Profile</CardTitle>
            </CardHeader>
            <CardContent className="mt-6 space-y-6">
              <div className="flex justify-center">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={session.data.user.image || ""} alt={session.data.user.name||" "} />
                  <AvatarFallback>{session.data.user.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-green-700 font-semibold">Name</Label>
                  <p className="text-gray-700">{session.data.user.name}</p>
                </div>
                <div>
                  <Label className="text-green-700 font-semibold">Email</Label>
                  <p className="text-gray-700">{session?.data.user?.email}</p>
                </div>
                <div>
                  <Label className="text-green-700 font-semibold">Age</Label>
                  <p className="text-gray-700">{session?.data.user?"age":"age"  }</p>
                </div>
                <div>
                  <Label className="text-green-700 font-semibold">Gender</Label>
                  <p className="text-gray-700">{session?.data.user?"gender":""}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    )}
  </>
);
}
