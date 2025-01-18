import { SensorReading, SensorData } from '../types/sensor';

const SIMULATION_INTERVAL = 1000; // 1 second in ms

export class SensorSimulator {
  private flowBaseline = 100; // L/min
  private pressureBaseline = 50; // PSI
  private temperatureBaseline = 20; // °C
  private leakProbBaseline = 0.01; // 1% baseline probability

  private addNoise(value: number, noiseLevel: number): number {
    return value + (Math.random() - 0.5) * noiseLevel;
  }

  private simulateTimeSeriesData(
    baseline: number,
    noiseLevel: number,
    unit: string
  ): SensorReading {
    return {
      timestamp: Date.now(),
      value: this.addNoise(baseline, noiseLevel),
      unit,
    };
  }

  public generateReading(): SensorData {
    return {
      flow: [this.simulateTimeSeriesData(this.flowBaseline, 20, 'L/min')],
      pressure: [this.simulateTimeSeriesData(this.pressureBaseline, 5, 'PSI')],
      temperature: [this.simulateTimeSeriesData(this.temperatureBaseline, 2, '°C')],
      leakProbability: [this.simulateTimeSeriesData(this.leakProbBaseline, 0.005, '%')],
    };
  }
}