export const serverMetrics = {
  cpu: Array.from({ length: 30 }, (_, i) => ({
    time: `-${30 - i}min`,
    usage: Math.floor(Math.random() * (i < 20 ? 40 : 85) + 10),
  })),
  memory: Array.from({ length: 30 }, (_, i) => ({
    time: `-${30 - i}min`,
    usage: Math.floor(Math.random() * (i < 25 ? 60 : 50) + 20),
  })),
  network: Array.from({ length: 30 }, (_, i) => ({
    time: `-${30 - i}min`,
    in: Math.floor(Math.random() * 80 + 10),
    out: Math.floor(Math.random() * 60 + 5),
  })),
};

export const pipelines = [
  {
    id: "pl_3x4mp1e1",
    name: "production-api-deploy",
    status: "Success",
    duration: "5m 32s",
    triggeredBy: "user_a",
    commit: "a1b2c3d",
    timestamp: "2023-10-27T10:00:00Z",
  },
  {
    id: "pl_3x4mp1e2",
    name: "staging-web-build",
    status: "Failed",
    duration: "2m 10s",
    triggeredBy: "user_b",
    commit: "e4f5g6h",
    timestamp: "2023-10-27T09:45:00Z",
  },
  {
    id: "pl_3x4mp1e3",
    name: "feature-branch-tests",
    status: "Running",
    duration: "8m 15s",
    triggeredBy: "user_c",
    commit: "i7j8k9l",
    timestamp: "2023-10-27T10:05:00Z",
  },
  {
    id: "pl_3x4mp1e4",
    name: "ui-library-publish",
    status: "Success",
    duration: "12m 45s",
    triggeredBy: "user_a",
    commit: "m0n1p2q",
    timestamp: "2023-10-27T08:30:00Z",
  },
  {
    id: "pl_3x4mp1e5",
    name: "nightly-backup",
    status: "Success",
    duration: "1h 15m",
    triggeredBy: "cron",
    commit: "r3s4t5u",
    timestamp: "2023-10-27T03:00:00Z",
  },
];

export const anomalyDetectionSample = {
  historicalData: JSON.stringify([
    {"timestamp": "2023-10-27T10:00:00Z", "cpu_usage": 0.85, "memory_usage": 0.92},
    {"timestamp": "2023-10-27T10:05:00Z", "cpu_usage": 0.88, "memory_usage": 0.93},
    {"timestamp": "2023-10-27T10:10:00Z", "cpu_usage": 0.90, "memory_usage": 0.95},
    {"timestamp": "2023-10-27T10:15:00Z", "cpu_usage": 0.50, "memory_usage": 0.60},
    {"timestamp": "2023-10-27T10:20:00Z", "cpu_usage": 0.95, "memory_usage": 0.98}
  ], null, 2),
  metrics: "cpu_usage, memory_usage",
};
