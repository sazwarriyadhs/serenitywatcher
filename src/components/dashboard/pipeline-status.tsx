import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { pipelines } from "@/lib/placeholder-data"
import { cn } from "@/lib/utils"
import { CircleCheck, CircleX, Hourglass, GitBranch } from "lucide-react"

const statusIcons = {
  Success: <CircleCheck className="h-4 w-4 text-green-500" />,
  Failed: <CircleX className="h-4 w-4 text-red-500" />,
  Running: <Hourglass className="h-4 w-4 text-blue-500 animate-spin" />,
}

export function PipelineStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>CI/CD Pipelines</CardTitle>
        <CardDescription>
          Status and performance of recent builds and deployments.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead>Pipeline</TableHead>
              <TableHead className="hidden md:table-cell">Triggered by</TableHead>
              <TableHead className="hidden lg:table-cell">Commit</TableHead>
              <TableHead className="text-right">Duration</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pipelines.map((pipeline) => (
              <TableRow key={pipeline.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {statusIcons[pipeline.status as keyof typeof statusIcons]}
                    <span className="hidden sm:inline">{pipeline.status}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{pipeline.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {pipeline.triggeredBy}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                    <div className="flex items-center gap-2">
                        <GitBranch className="h-4 w-4 text-muted-foreground" />
                        <span className="font-code">{pipeline.commit}</span>
                    </div>
                </TableCell>
                <TableCell className="text-right font-code">{pipeline.duration}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
