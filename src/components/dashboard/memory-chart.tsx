'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { serverMetrics } from '@/lib/placeholder-data';

const chartConfig = {
  usage: {
    label: 'Memory Usage',
    color: 'hsl(var(--chart-2))',
  },
};

export function MemoryChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Memory Usage</CardTitle>
        <CardDescription>Last 30 minutes</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart data={serverMetrics.memory}>
            <defs>
              <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-usage)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--color-usage)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
             <YAxis
              tickFormatter={(value) => `${value}%`}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
             />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="usage"
              type="monotone"
              stroke="var(--color-usage)"
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorMemory)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
