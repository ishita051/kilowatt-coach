import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp } from "lucide-react";
import { type EnergyData } from "@/lib/mockData";

interface EnergyChartProps {
  data: EnergyData[];
}

export const EnergyChart = ({ data }: EnergyChartProps) => {
  // Get last 24 hours of data for the chart
  const chartData = data.slice(-48).map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    usage: item.usage,
    cost: item.usage * 0.12
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg border shadow-lg">
          <p className="font-medium">{label}</p>
          <p className="text-primary">
            Usage: {payload[0].value.toFixed(2)} kW
          </p>
          <p className="text-muted-foreground">
            Cost: ${(payload[0].value * 0.12).toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  const averageUsage = chartData.length > 0 
    ? chartData.reduce((sum, item) => sum + item.usage, 0) / chartData.length 
    : 0;

  return (
    <Card className="shadow-card-custom">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Energy Usage - Last 24 Hours
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Average: {averageUsage.toFixed(2)} kW
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="time" 
                fontSize={12}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                interval="preserveStartEnd"
              />
              <YAxis 
                fontSize={12}
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                label={{ value: 'kW', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="usage"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#energyGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};