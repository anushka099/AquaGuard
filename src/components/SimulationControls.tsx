import React from 'react';
import { Play, Pause, MapPin } from 'lucide-react';

interface SimulationControlsProps {
  isRunning: boolean;
  selectedArea: string;
  interval: number;
  onToggleSimulation: () => void;
  onAreaChange: (area: string) => void;
  onIntervalChange: (interval: number) => void;
}

const areas = [
  { id: 'Residential', name: 'Residential Area' },
  { id: 'Commercial', name: 'Commercial District' },
  { id: 'Industrial', name: 'Industrial Zone' },
  { id: 'Recreational', name: 'Recreational Zone' },
  { id: 'Agricultural', name: 'Agricultural Zone' },
  { id: 'Educational', name: 'Educational Zone' },
];

export function SimulationControls({
  isRunning,
  selectedArea,
  interval,
  onToggleSimulation,
  onAreaChange,
  onIntervalChange,
}: SimulationControlsProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Simulation Control
          </label>
          <button
            onClick={onToggleSimulation}
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border ${
              isRunning
                ? 'bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30'
                : 'bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30'
            } transition-colors duration-200`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                Stop Simulation
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Start Simulation
              </>
            )}
          </button>
        </div>

        <div>
          <label htmlFor="area" className="block text-sm font-medium text-gray-300 mb-2">
            Select Area
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              id="area"
              value={selectedArea}
              onChange={(e) => onAreaChange(e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-700 text-gray-300 rounded-lg pl-10 pr-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              {areas.map((area) => (
                <option key={area.id} value={area.id}>
                  {area.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="interval" className="block text-sm font-medium text-gray-300 mb-2">
            Update Interval (ms)
          </label>
          <input
            type="number"
            id="interval"
            min="100"
            max="5000"
            step="100"
            value={interval}
            onChange={(e) => onIntervalChange(Number(e.target.value))}
            className="w-full bg-gray-800/50 border border-gray-700 text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          />
        </div>
      </div>
    </div>
  );
}