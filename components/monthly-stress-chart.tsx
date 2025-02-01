
'use client'

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const monthlyData = [
  { date: '1', score: 4 },
  { date: '5', score: 6 },
  { date: '10', score: 3 },
  { date: '15', score: 5 },
  { date: '20', score: 7 },
  { date: '25', score: 2 },
  { date: '30', score: 4 },
]

const chartConfig = {
  score: {
    label: 'Stress Score',
    color: 'hsl(var(--chart-2))',
  },
}

export function MonthlyStressChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Stress Score</CardTitle>
        <CardDescription>Your stress levels over the past month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
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

