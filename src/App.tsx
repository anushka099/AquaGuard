import React, { useEffect, useState, useCallback } from 'react';
import { Droplets, Gauge, Thermometer, AlertTriangle } from 'lucide-react';
import { SensorSimulator } from './utils/sensorSimulation';
import { SensorCard } from './components/SensorCard';
import { AlertsList } from './components/AlertsList';
import { RecommendationsList } from './components/RecommendationsList';
import { SimulationControls } from './components/SimulationControls';
import ChartComponent from './components/ChartComponent';
import type { SensorData, SystemStatus, Alert, Recommendation } from './types/sensor';

const simulator = new SensorSimulator();
const initialReading = simulator.generateReading();

const sampleAlerts = [
  { id: '1', type: 'warning', message: 'High water pressure detected. Inspect the system.', timestamp: Date.now() },
  { id: '2', type: 'info', message: 'Sensor calibration completed successfully.', timestamp: Date.now() },
  { id: '3', type: 'warning', message: 'Leak probability above threshold. Investigate leak source.', timestamp: Date.now() },
];

const sampleRecommendations = [
  { id: '1', title: 'Inspect System for Clogging', description: 'Check pipes for obstructions to ensure optimal flow.', priority: 'high', timestamp: Date.now() },
  { id: '2', title: 'Verify Sensor Calibration', description: 'Perform sensor calibration for accurate readings.', priority: 'medium', timestamp: Date.now() },
  { id: '3', title: 'Regular Maintenance Check', description: 'Schedule periodic maintenance for system longevity.', priority: 'low', timestamp: Date.now() },
];

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedArea, setSelectedArea] = useState('residential');
  const [interval, setInterval] = useState(1000);
  const [simulationInterval, setSimulationInterval] = useState<number | null>(null);

  const [sensorData, setSensorData] = useState<SensorData>({
    flow: initialReading.flow,
    pressure: initialReading.pressure,
    temperature: initialReading.temperature,
    leakProbability: initialReading.leakProbability,
  });

  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    isHealthy: true,
    alerts: sampleAlerts, 
    recommendations: sampleRecommendations, 
  });

  const updateSimulation = useCallback(() => {
    const newReading = simulator.generateReading();

    setSensorData(prev => ({
      flow: [...prev.flow, ...newReading.flow].slice(-10),
      pressure: [...prev.pressure, ...newReading.pressure].slice(-10),
      temperature: [...prev.temperature, ...newReading.temperature].slice(-10),
      leakProbability: [...prev.leakProbability, ...newReading.leakProbability].slice(-10),
    }));

    const latestLeakProb = newReading.leakProbability[0].value;
    if (latestLeakProb > 0.02) {
      const alert: Alert = {
        id: Date.now().toString(),
        type: 'warning',
        message: `Elevated leak probability detected: ${(latestLeakProb * 100).toFixed(2)}%`,
        timestamp: Date.now(),
      };

      const recommendation: Recommendation = {
        id: Date.now().toString(),
        title: 'Investigate Potential Leak',
        description: 'Recent sensor data indicates an increased probability of a leak. Schedule an inspection of the system.',
        priority: 'high',
        timestamp: Date.now(),
      };

      setSystemStatus(prev => ({
        ...prev,
        isHealthy: false,
        alerts: [...prev.alerts, alert].slice(-5),
        recommendations: [...prev.recommendations, recommendation].slice(-5),
      }));
    }
  }, []);

  const handleToggleSimulation = useCallback(() => {
    if (isRunning) {
      if (simulationInterval) {
        clearInterval(simulationInterval);
        setSimulationInterval(null);
      }
    } else {
      const newInterval = setInterval(updateSimulation, interval);
      setSimulationInterval(Number(newInterval));
    }
    setIsRunning(!isRunning);
  }, [isRunning, interval, updateSimulation, simulationInterval]);

  const handleIntervalChange = useCallback((newInterval: number) => {
    setInterval(newInterval);
    if (isRunning && simulationInterval) {
      clearInterval(simulationInterval);
      const newSimulationInterval = setInterval(updateSimulation, newInterval);
      setSimulationInterval(Number(newSimulationInterval));
    }
  }, [isRunning, simulationInterval, updateSimulation]);

  useEffect(() => {
    return () => {
      if (simulationInterval) {
        clearInterval(simulationInterval);
      }
    };
  }, [simulationInterval]);

  const labels = sensorData.flow.map((_, index) => `T-${sensorData.flow.length - index}`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">AquaGuard Dashboard</h1>
          <p className="text-blue-200">Real-time Water Management System</p>
        </header>

        <SimulationControls
          isRunning={isRunning}
          selectedArea={selectedArea}
          interval={interval}
          onToggleSimulation={handleToggleSimulation}
          onAreaChange={setSelectedArea}
          onIntervalChange={handleIntervalChange}
        />

      {/* Adjusted Grid Layout for Sensors (Vertical Stack) */}
    <div className="grid grid-cols-1 gap-6 mb-8">
      <div className="flex justify-center">
        <ChartComponent
          title="Water Flow (L/min)"
          labels={labels}
          data={sensorData.flow.map((reading) => reading.value)}
          type="line"
          color="rgba(0, 123, 255, 0.8)"
          height={250}  // Adjusted height for better spacing and consistency
        />
      </div>

      <div className="flex justify-center">
        <ChartComponent
          title="Pressure (psi)"
          labels={labels}
          data={sensorData.pressure.map((reading) => reading.value)}
          type="line"
          color="rgba(255, 99, 132, 0.8)"
          height={250}  // Adjusted height for visual consistency
        />
      </div>

      <div className="flex justify-center">
        <ChartComponent
          title="Temperature (°C)"
          labels={labels}
          data={sensorData.temperature.map((reading) => reading.value)}
          type="bar"
          color="rgba(75, 192, 192, 0.8)"
          height={250}  // Adjusted height for visual consistency
        />
      </div>
    </div>


        {/* Sensor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SensorCard
            title="Water Flow"
            icon={<Droplets className="w-6 h-6" />}
            data={sensorData.flow}
            color="from-blue-500 to-blue-600"
            gradient="from-blue-500/20 to-blue-600/20"
          />
          <SensorCard
            title="Pressure"
            icon={<Gauge className="w-6 h-6" />}
            data={sensorData.pressure}
            color="from-purple-500 to-purple-600"
            gradient="from-purple-500/20 to-purple-600/20"
          />
          <SensorCard
            title="Temperature"
            icon={<Thermometer className="w-6 h-6" />}
            data={sensorData.temperature}
            color="from-red-500 to-red-600"
            gradient="from-red-500/20 to-red-600/20"
          />
          <SensorCard
            title="Leak Probability"
            icon={<AlertTriangle className="w-6 h-6" />}
            data={sensorData.leakProbability}
            color="from-yellow-500 to-yellow-600"
            gradient="from-yellow-500/20 to-yellow-600/20"
          />
        </div>

        {/* Alerts and Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AlertsList alerts={systemStatus.alerts} />
          <RecommendationsList recommendations={systemStatus.recommendations} />
        </div>
      </div>
    </div>
  );
}

export default App;
