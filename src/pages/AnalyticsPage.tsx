import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Zap,
  Clock,
  Home,
  Thermometer,
  Sun
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";

const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");

  const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
    hour: `${hour}:00`,
    usage: Math.random() * 3 + 1 + (hour >= 16 && hour <= 21 ? Math.random() * 2 : 0),
    cost: 0
  })).map(item => ({ ...item, cost: item.usage * (item.hour >= "16:00" && item.hour <= "21:00" ? 0.15 : 0.10) }));

  const dailyData = Array.from({ length: 30 }, (_, day) => ({
    day: day + 1,
    usage: Math.random() * 15 + 20,
    weather: Math.random() * 20 + 65,
    cost: 0
  })).map(item => ({ ...item, cost: item.usage * 0.12 }));

  const applianceData = [
    { name: "HVAC", usage: 45, cost: 65.20, color: "#ef4444" },
    { name: "Water Heater", usage: 19, cost: 27.50, color: "#f97316" },
    { name: "EV Charger", usage: 13, cost: 18.80, color: "#eab308" },
    { name: "Lighting", usage: 8, cost: 11.60, color: "#22c55e" },
    { name: "Electronics", usage: 6, cost: 8.70, color: "#3b82f6" },
    { name: "Other", usage: 9, cost: 13.00, color: "#8b5cf6" }
  ];

  const weeklyComparison = [
    { week: "Week 1", thisYear: 285, lastYear: 310 },
    { week: "Week 2", thisYear: 292, lastYear: 305 },
    { week: "Week 3", thisYear: 278, lastYear: 318 },
    { week: "Week 4", thisYear: 301, lastYear: 295 }
  ];

  const peakAnalysis = [
    { timeSlot: "Morning (6-9 AM)", usage: 2.8, percentage: 15 },
    { timeSlot: "Midday (9-4 PM)", usage: 1.9, percentage: 35 },
    { timeSlot: "Peak (4-9 PM)", usage: 4.2, percentage: 30 },
    { timeSlot: "Evening (9 PM-12 AM)", usage: 2.1, percentage: 15 },
    { timeSlot: "Night (12-6 AM)", usage: 1.2, percentage: 5 }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Energy Analytics
            </h1>
            <p className="text-muted-foreground">Detailed insights and patterns</p>
          </div>
          <div className="flex gap-2">
            {["7d", "30d", "90d", "1y"].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedPeriod(period)}
              >
                {period}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="shadow-card-custom">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Average Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4 kW</div>
              <div className="flex items-center gap-1 text-xs text-success">
                <TrendingUp className="w-3 h-3" />
                8% better than average
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-custom">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                Peak Hours Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">35%</div>
              <div className="text-xs text-muted-foreground">
                Of daily consumption
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-custom">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-primary" />
                Weather Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+15%</div>
              <div className="text-xs text-muted-foreground">
                Due to temperature
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-custom">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Home className="w-4 h-4 text-primary" />
                Efficiency Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">87%</div>
              <div className="text-xs text-muted-foreground">
                Above neighborhood avg
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="hourly" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="hourly">Hourly Patterns</TabsTrigger>
            <TabsTrigger value="appliances">Appliance Usage</TabsTrigger>
            <TabsTrigger value="comparison">Comparisons</TabsTrigger>
            <TabsTrigger value="peak">Peak Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="hourly" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card-custom">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    24-Hour Usage Pattern
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={hourlyData}>
                        <defs>
                          <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="hour" interval={2} />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="usage"
                          stroke="hsl(var(--primary))"
                          fill="url(#usageGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card-custom">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="w-5 h-5 text-primary" />
                    Daily Usage vs Weather
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dailyData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis dataKey="day" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Line 
                          yAxisId="left"
                          type="monotone" 
                          dataKey="usage" 
                          stroke="hsl(var(--primary))" 
                          name="Usage (kWh)"
                        />
                        <Line 
                          yAxisId="right"
                          type="monotone" 
                          dataKey="weather" 
                          stroke="hsl(var(--warning))" 
                          name="Temperature (°F)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appliances" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card-custom">
                <CardHeader>
                  <CardTitle>Appliance Usage Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={applianceData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="usage"
                          label={({ name, usage }) => `${name}: ${usage}%`}
                        >
                          {applianceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card-custom">
                <CardHeader>
                  <CardTitle>Monthly Cost by Appliance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={applianceData} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={80} />
                        <Tooltip formatter={(value) => [`$${value}`, 'Monthly Cost']} />
                        <Bar dataKey="cost" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle>Year-over-Year Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="thisYear" fill="hsl(var(--primary))" name="2024" />
                      <Bar dataKey="lastYear" fill="hsl(var(--muted))" name="2023" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="peak" className="space-y-6">
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle>Peak Usage Analysis</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Usage patterns by time of day
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {peakAnalysis.map((period, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <span className="font-medium">{period.timeSlot}</span>
                        <div className="text-sm text-muted-foreground">
                          {period.usage.toFixed(1)} kW avg
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${period.percentage * 2}%` }}
                          />
                        </div>
                        <Badge variant="outline">{period.percentage}%</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsPage;