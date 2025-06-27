import { AnomalyDetectionForm } from "@/components/anomaly-detection/anomaly-form";

export default function AnomalyDetectionPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold font-headline">AI Anomaly Detection</h1>
        <p className="text-muted-foreground">Analyze historical data to detect anomalies and predict potential issues.</p>
      </div>
      <AnomalyDetectionForm />
    </div>
  );
}
