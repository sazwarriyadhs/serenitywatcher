'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
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
  in: {
    label: 'In',
    color: 'hsl(var(--chart-4))',
  },
  out: {
    label: 'Out',
    color: 'hsl(var(--chart-5))',
  },
};

export function NetworkChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network I/O</CardTitle>
        <CardDescription>Incoming vs. Outgoing traffic (MB/s)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <BarChart data={serverMetrics.network}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Bar dataKey="in" fill="var(--color-in)" radius={4} />
            <Bar dataKey="out" fill="var(--color-out)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
