import { useState, useEffect } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface TimeSeriesData {
  timestamp: string;
  energy_consumption_kWh: number;
}

interface EnergyData {
  household_id: number;
  timeseries_data: TimeSeriesData[];
  statistics: {
    total_consumption_kWh: number;
    average_daily_consumption_kWh: number;
    peak_consumption_kWh: number;
  };
}

export const useEnergyData = (startDate?: string, endDate?: string) => {
  const [data, setData] = useState<EnergyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Authentication error: No token found.');
        setIsLoading(false);
        return;
      }

      // Build query string for date range
      const params = new URLSearchParams();
      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);
      const queryString = params.toString();

      try {
        const response = await fetch(`${API_BASE_URL}/api/energy-data?${queryString}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.msg || 'Failed to fetch energy data');
        }

        const result: EnergyData = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [startDate, endDate]); // Rerun effect if date range changes

  return { data, isLoading, error };
};
