export interface SensorReading {
  timestamp: number;
  value: number;
  unit: string;
}

export interface SensorData {
  flow: SensorReading[];
  pressure: SensorReading[];
  temperature: SensorReading[];
  leakProbability: SensorReading[];
}

export interface SystemStatus {
  isHealthy: boolean;
  alerts: Alert[];
  recommendations: Recommendation[];
}

export interface Alert {
  id: string;
  type: 'warning' | 'danger' | 'info';
  message: string;
  timestamp: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: number;
}