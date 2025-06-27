'use server';

/**
 * @fileOverview AI-powered anomaly detection for infrastructure monitoring data.
 *
 * - detectAnomalies - Analyzes historical monitoring data to detect anomalies and predict potential infrastructure issues.
 * - DetectAnomaliesInput - The input type for the detectAnomalies function.
 * - DetectAnomaliesOutput - The return type for the detectAnomalies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectAnomaliesInputSchema = z.object({
  historicalData: z.string().describe('Historical monitoring data in JSON format.'),
  metrics: z.string().describe('The metrics to analyze, such as CPU usage, memory usage, etc.'),
});
export type DetectAnomaliesInput = z.infer<typeof DetectAnomaliesInputSchema>;

const DetectAnomaliesOutputSchema = z.object({
  anomalies: z.array(
    z.object({
      timestamp: z.string().describe('Timestamp of the anomaly.'),
      metric: z.string().describe('The metric that has the anomaly.'),
      value: z.number().describe('The value of the metric at the time of the anomaly.'),
      description: z.string().describe('A description of the anomaly.'),
    })
  ).describe('List of anomalies detected.'),
  predictedIssues: z.array(
    z.object({
      timeframe: z.string().describe('The timeframe when the issue is predicted to occur.'),
      potentialIssue: z.string().describe('A description of the predicted issue.'),
      severity: z.string().describe('Severity of the predicted issue (e.g., low, medium, high).'),
    })
  ).describe('List of potential infrastructure issues predicted.'),
});
export type DetectAnomaliesOutput = z.infer<typeof DetectAnomaliesOutputSchema>;

export async function detectAnomalies(input: DetectAnomaliesInput): Promise<DetectAnomaliesOutput> {
  return detectAnomaliesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectAnomaliesPrompt',
  input: {schema: DetectAnomaliesInputSchema},
  output: {schema: DetectAnomaliesOutputSchema},
  prompt: `You are an expert in analyzing infrastructure monitoring data to detect anomalies and predict potential issues.

Analyze the following historical data and identify any anomalies. Also, predict potential infrastructure issues based on the historical data.

Metrics to analyze: {{{metrics}}}

Historical Data: {{{historicalData}}}

Present your findings clearly and concisely.

Ensure that the output strictly adheres to the defined JSON schema for anomalies and predicted issues.
`,
});

const detectAnomaliesFlow = ai.defineFlow(
  {
    name: 'detectAnomaliesFlow',
    inputSchema: DetectAnomaliesInputSchema,
    outputSchema: DetectAnomaliesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
