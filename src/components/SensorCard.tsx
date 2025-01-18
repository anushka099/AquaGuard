import React from 'react';
import { SensorReading } from '../types/sensor';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import { formatDistanceToNow } from 'date-fns';

interface SensorCardProps {
  title: string;
  icon: React.ReactNode;
  data: SensorReading[];
  color: string;
  gradient: string;
}

export function SensorCard({ title, icon, data, color, gradient }: SensorCardProps) {
  const latestReading = data[data.length - 1];

  if (!latestReading) {
    return (
      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gray-800/50 text-gray-400">
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
          </div>
        </div>
        <div className="mb-4">
          <div className="text-3xl font-bold text-gray-400">Loading...</div>
        </div>
        <div className="h-24" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br opacity-10 z-0" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${color} text-white`}>
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
          </div>
          <span className="text-sm text-gray-400">
            {formatDistanceToNow(latestReading.timestamp, { addSuffix: true })}
          </span>
        </div>
        
        <div className="mb-4">
          <div className="text-3xl font-bold text-white">
            {latestReading.value.toFixed(2)} {latestReading.unit}
          </div>
        </div>

        <div className="h-24">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={`url(#${title.replace(/\s+/g, '')}-gradient)`}
                strokeWidth={2}
                dot={false}
              />
              <defs>
                <linearGradient id={`${title.replace(/\s+/g, '')}-gradient`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={color.split(' ')[1].replace('to-', '')} />
                  <stop offset="100%" stopColor={color.split(' ')[1].replace('to-', '')} />
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.8)',
                  border: '1px solid rgba(75, 85, 99, 0.4)',
                  borderRadius: '0.5rem',
                  color: '#fff',
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}