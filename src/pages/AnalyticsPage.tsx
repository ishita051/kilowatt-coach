import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import EnergyChart from "@/components/EnergyChart";
import ApplianceBreakdown from "@/components/ApplianceBreakdown";
import { mockApplianceData, mockHistoricalData } from "@/lib/mockData";
import { DateRangePicker } from "@/components/ui/date-range-picker"; // Assuming this component exists
import { useEnergyData } from "@/hooks/useEnergyData"; // Import the new hook
import { Skeleton } from "@/components/ui/skeleton";

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  // Format dates for the API call
  const formattedStartDate = dateRange.from?.toISOString().split('T')[0];
  const formattedEndDate = dateRange.to?.toISOString().split('T')[0];
  
  // Use the hook to fetch data
  const { data: energyData, isLoading, error } = useEnergyData(formattedStartDate, formattedEndDate);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid gap-6">
          <Card><CardHeader><Skeleton className="h-8 w-1/2" /></CardHeader><CardContent><Skeleton className="h-72 w-full" /></CardContent></Card>
          <Card><CardHeader><Skeleton className="h-8 w-1/2" /></CardHeader><CardContent><Skeleton className="h-64 w-full" /></CardContent></Card>
        </div>
      );
    }
    
    if (error) {
      return (
        <Card className="text-center p-8 bg-destructive/10 border-destructive/20">
          <CardTitle className="text-destructive">Failed to Load Data</CardTitle>
          <p className="text-muted-foreground mt-2">{error}</p>
        </Card>
      );
    }

    if (energyData) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Energy Consumption (kWh)</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Pass real data to the chart */}
              <EnergyChart data={energyData.timeseries_data.map(d => ({...d, date: d.timestamp}))} />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Appliance Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Keep mock data for now, or create a new endpoint for this */}
              <ApplianceBreakdown data={mockApplianceData} />
            </CardContent>
          </Card>
        </div>
      );
    }
    
    return null; // Should not be reached
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Analyze your energy consumption patterns.
          </p>
        </div>
        <div>
            {/* You may need to create or adjust this component */}
            {/* <DateRangePicker range={dateRange} onRangeChange={setDateRange} /> */}
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default AnalyticsPage;
