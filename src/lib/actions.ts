'use server';

import { detectAnomalies, DetectAnomaliesOutput } from "@/ai/flows/detect-anomalies";
import { z } from 'zod';

const ActionInputSchema = z.object({
  historicalData: z.string().min(1, 'Historical data cannot be empty.'),
  metrics: z.string().min(1, 'Metrics cannot be empty.'),
});

export async function detectAnomaliesAction(
  prevState: any,
  formData: FormData,
): Promise<{
  data: DetectAnomaliesOutput | null;
  error: string | null;
  message: string;
}> {
  const validatedFields = ActionInputSchema.safeParse({
    historicalData: formData.get('historicalData'),
    metrics: formData.get('metrics'),
  });

  if (!validatedFields.success) {
    return {
      data: null,
      error: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid input.',
    };
  }

  try {
    const { historicalData, metrics } = validatedFields.data;
    
    // Validate if historicalData is valid JSON
    try {
      JSON.parse(historicalData);
    } catch (e) {
      return { data: null, error: 'Historical data is not valid JSON.', message: 'Invalid JSON format.' };
    }

    const result = await detectAnomalies({ historicalData, metrics });
    
    return { data: result, error: null, message: 'Anomalies detected successfully.' };

  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return { data: null, error: errorMessage, message: 'Failed to detect anomalies.' };
  }
}
