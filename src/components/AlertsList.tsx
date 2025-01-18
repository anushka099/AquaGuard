import React from 'react';
import { Alert } from '../types/sensor';
import { AlertTriangle, Info } from 'lucide-react';

interface AlertsListProps {
  alerts: Alert[];
}

export function AlertsList({ alerts }: AlertsListProps) {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">System Alerts</h3>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-3 p-4 rounded-lg bg-gray-800/50 border border-gray-700"
          >
            {getAlertIcon(alert.type)}
            <div>
              <p className="text-gray-200">{alert.message}</p>
              <p className="text-sm text-gray-400">
                {new Date(alert.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No alerts at this time
          </div>
        )}
      </div>
    </div>
  );
}