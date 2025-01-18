import React from 'react';
import { Recommendation } from '../types/sensor';
import { Lightbulb } from 'lucide-react';

interface RecommendationsListProps {
  recommendations: Recommendation[];
}

export function RecommendationsList({ recommendations }: RecommendationsListProps) {
  const getPriorityColor = (priority: Recommendation['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-lg rounded-xl border border-gray-800 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recommendations</h3>
      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="flex items-start gap-3 p-4 rounded-lg bg-gray-800/50 border border-gray-700"
          >
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-200">{rec.title}</h4>
                <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(rec.priority)}`}>
                  {rec.priority}
                </span>
              </div>
              <p className="text-gray-400">{rec.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(rec.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
        {recommendations.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No recommendations at this time
          </div>
        )}
      </div>
    </div>
  );
}