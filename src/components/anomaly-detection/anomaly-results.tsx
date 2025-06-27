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
import { type DetectAnomaliesOutput } from "@/ai/flows/detect-anomalies"
import { AlertTriangle, TrendingUp, Cpu, MemoryStick } from "lucide-react"

type Props = {
  results: DetectAnomaliesOutput;
};

const severityColors = {
  low: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  medium: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  high: 'bg-red-500/20 text-red-300 border-red-500/30',
}

export function AnomalyResults({ results }: Props) {
  if (!results || (!results.anomalies.length && !results.predictedIssues.length)) {
    return (
        <Card className="text-center py-12">
            <CardContent>
                <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">No Anomalies Detected</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                    The provided data appears to be within normal operational parameters.
                </p>
            </CardContent>
        </Card>
    )
  }

  return (
    <div className="space-y-6">
      {results.anomalies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Detected Anomalies</CardTitle>
            <CardDescription>
              Specific data points that deviate from normal patterns.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Metric</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.anomalies.map((anomaly, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-code">{new Date(anomaly.timestamp).toLocaleString()}</TableCell>
                    <TableCell className="font-code">{anomaly.metric}</TableCell>
                    <TableCell className="text-right font-code">{anomaly.value}</TableCell>
                    <TableCell>{anomaly.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {results.predictedIssues.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Predicted Issues</CardTitle>
            <CardDescription>
              Potential future problems based on current trends.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {results.predictedIssues.map((issue, index) => (
              <Card key={index} className="flex flex-col">
                <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-primary/10">
                        <AlertTriangle className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <CardTitle className="text-lg">{issue.potentialIssue}</CardTitle>
                        <div className="flex items-center gap-2">
                            <Badge variant="outline" className={severityColors[issue.severity.toLowerCase() as keyof typeof severityColors]}>
                                {issue.severity}
                            </Badge>
                            <span className="text-sm text-muted-foreground">Prediction for: {issue.timeframe}</span>
                        </div>
                    </div>
                </CardHeader>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
