'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { detectAnomaliesAction } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AnomalyResults } from './anomaly-results';
import { anomalyDetectionSample } from '@/lib/placeholder-data';
import { Loader2, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  data: null,
  error: null,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Analyze Data
    </Button>
  );
}

export function AnomalyDetectionForm() {
  const [state, formAction] = useFormState(detectAnomaliesAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: typeof state.error === 'string' ? state.error : 'An unexpected error occurred.',
      });
    }
  }, [state.error, toast]);


  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Submit Monitoring Data</CardTitle>
          <CardDescription>
            Provide historical data in JSON format and specify the metrics to analyze.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="historicalData">Historical Data (JSON)</Label>
                <Textarea
                  id="historicalData"
                  name="historicalData"
                  placeholder='[{"timestamp": "...", "cpu_usage": 0.85}]'
                  className="h-64 font-code"
                  defaultValue={anomalyDetectionSample.historicalData}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="metrics">Metrics to Analyze</Label>
                <Input
                  id="metrics"
                  name="metrics"
                  placeholder="e.g., cpu_usage, memory_usage"
                  defaultValue={anomalyDetectionSample.metrics}
                  className="font-code"
                  required
                />
                <p className="text-sm text-muted-foreground">
                    Comma-separated list of metrics from the JSON data.
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <SubmitButton />
            </div>
          </form>
        </CardContent>
      </Card>
      
      {state.data && <AnomalyResults results={state.data} />}

    </div>
  );
}
