import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, TrendingDown, Lightbulb, DollarSign, Activity } from "lucide-react";
import { EnergyChart } from "./EnergyChart";
import { BillPredictor } from "./BillPredictor";
import { ApplianceBreakdown } from "./ApplianceBreakdown";
import { SmartRecommendations } from "./SmartRecommendations";
import { generateMockEnergyData, type EnergyData } from "@/lib/mockData";

export const EnergyDashboard = () => {
  const [energyData, setEnergyData] = useState<EnergyData[]>([]);
  const [currentUsage, setCurrentUsage] = useState(0);
  const [dailyTotal, setDailyTotal] = useState(0);
  const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('stable');

  useEffect(() => {
    // Generate initial mock data
    const mockData = generateMockEnergyData();
    setEnergyData(mockData);
    
    // Set initial current usage
    const latestReading = mockData[mockData.length - 1];
    setCurrentUsage(latestReading?.usage || 0);
    
    // Calculate daily total
    const today = new Date().toDateString();
    const todayData = mockData.filter(d => new Date(d.timestamp).toDateString() === today);
    const total = todayData.reduce((sum, d) => sum + d.usage, 0);
    setDailyTotal(total);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newReading = generateMockEnergyData(1)[0];
      setCurrentUsage(newReading.usage);
      
      // Update trend based on recent readings
      const recentReadings = mockData.slice(-10);
      const avgRecent = recentReadings.reduce((sum, d) => sum + d.usage, 0) / recentReadings.length;
      
      if (newReading.usage > avgRecent * 1.1) {
        setTrend('up');
      } else if (newReading.usage < avgRecent * 0.9) {
        setTrend('down');
      } else {
        setTrend('stable');
      }
      
      setEnergyData(prev => [...prev.slice(-100), newReading]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getUsageLevel = (usage: number) => {
    if (usage < 2) return { level: 'low', color: 'success' };
    if (usage < 4) return { level: 'medium', color: 'warning' };
    return { level: 'high', color: 'destructive' };
  };

  const usageLevel = getUsageLevel(currentUsage);
  const efficiencyScore = Math.max(20, Math.min(100, 100 - (currentUsage * 15)));

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Energy Dashboard
            </h1>
            <p className="text-muted-foreground">Monitor your home's energy consumption in real-time</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-2">
              <Activity className="w-4 h-4" />
              Live Monitoring
            </Badge>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-primary text-primary-foreground shadow-energy">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Current Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentUsage.toFixed(2)} kW</div>
              <div className="flex items-center gap-1 text-xs opacity-90">
                {trend === 'up' && <TrendingUp className="w-3 h-3" />}
                {trend === 'down' && <TrendingDown className="w-3 h-3" />}
                {trend === 'stable' && <Activity className="w-3 h-3" />}
                {trend === 'up' ? 'Increasing' : trend === 'down' ? 'Decreasing' : 'Stable'}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-custom">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Daily Total</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dailyTotal.toFixed(1)} kWh</div>
              <div className="text-xs text-muted-foreground">
                ${(dailyTotal * 0.12).toFixed(2)} estimated cost
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-custom">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{efficiencyScore.toFixed(0)}%</div>
                <Lightbulb className={`w-5 h-5 ${efficiencyScore > 75 ? 'text-success' : efficiencyScore > 50 ? 'text-warning' : 'text-destructive'}`} />
              </div>
              <Progress value={efficiencyScore} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="shadow-card-custom">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Today's Cost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(dailyTotal * 0.12).toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">
                Peak rate: $0.15/kWh
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Energy Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <EnergyChart data={energyData} />
          </div>

          {/* Bill Predictor */}
          <BillPredictor currentUsage={currentUsage} dailyTotal={dailyTotal} />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ApplianceBreakdown />
          <SmartRecommendations currentUsage={currentUsage} trend={trend} />
        </div>
      </div>
    </div>
  );
};