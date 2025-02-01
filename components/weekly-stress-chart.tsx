
'use client'

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const weeklyData = [
  { day: 'Mon', score: 3 },
  { day: 'Tue', score: 5 },
  { day: 'Wed', score: 4 },
  { day: 'Thu', score: 7 },
  { day: 'Fri', score: 6 },
  { day: 'Sat', score: 2 },
  { day: 'Sun', score: 1 },
]

const chartConfig = {
  score: {
    label: 'Stress Score',
    color: 'hsl(var(--chart-1))',
  },
}

export function WeeklyStressChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Stress Score</CardTitle>
        <CardDescription>Your stress levels over the past week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="day" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                domain={[0, 10]} 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="var(--color-score)" 
                strokeWidth={2} 
                dot={{ strokeWidth: 2, r: 4 }} 
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

