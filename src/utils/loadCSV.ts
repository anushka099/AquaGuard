import * as d3 from 'd3';
import { SensorReading } from '../types/sensor';

export async function loadCSVData(filePath: string): Promise<SensorReading[]> {
    const rawData = await d3.csv(filePath);
    
    return rawData.map((row: any) => ({
        timestamp: new Date(row.Timestamp).getTime(),
        value: parseFloat(row.Value),
        unit: row.Unit,
    }));
}
