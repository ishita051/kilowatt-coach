import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  AirVent, 
  Thermometer, 
  Car, 
  Lightbulb, 
  Monitor, 
  Refrigerator,
  Zap 
} from "lucide-react";

export const ApplianceBreakdown = () => {
  const appliances = [
    {
      name: "HVAC System",
      icon: AirVent,
      usage: 2.8,
      percentage: 45,
      cost: 8.40,
      status: "running",
      color: "energy-high"
    },
    {
      name: "Water Heater",
      icon: Thermometer,
      usage: 1.2,
      percentage: 19,
      cost: 3.60,
      status: "standby",
      color: "energy-medium"
    },
    {
      name: "EV Charger",
      icon: Car,
      usage: 0.8,
      percentage: 13,
      cost: 2.40,
      status: "charging",
      color: "energy-medium"
    },
    {
      name: "Lighting",
      icon: Lightbulb,
      usage: 0.5,
      percentage: 8,
      cost: 1.50,
      status: "active",
      color: "energy-low"
    },
    {
      name: "Electronics",
      icon: Monitor,
      usage: 0.4,
      percentage: 6,
      cost: 1.20,
      status: "active",
      color: "energy-low"
    },
    {
      name: "Refrigerator",
      icon: Refrigerator,
      usage: 0.3,
      percentage: 5,
      cost: 0.90,
      status: "running",
      color: "energy-low"
    },
    {
      name: "Other",
      icon: Zap,
      usage: 0.2,
      percentage: 4,
      cost: 0.60,
      status: "various",
      color: "energy-low"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge variant="default" className="text-xs">Running</Badge>;
      case "charging":
        return <Badge variant="default" className="text-xs bg-primary/90">Charging</Badge>;
      case "standby":
        return <Badge variant="secondary" className="text-xs">Standby</Badge>;
      case "active":
        return <Badge variant="outline" className="text-xs">Active</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">Various</Badge>;
    }
  };

  const totalUsage = appliances.reduce((sum, app) => sum + app.usage, 0);
  const totalCost = appliances.reduce((sum, app) => sum + app.cost, 0);

  return (
    <Card className="shadow-card-custom">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            Appliance Breakdown
          </span>
          <Badge variant="outline">${totalCost.toFixed(2)}/day</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appliances.map((appliance, index) => {
            const IconComponent = appliance.icon;
            return (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className={`p-2 rounded-lg bg-${appliance.color}/10`}>
                  <IconComponent className={`w-4 h-4 text-${appliance.color}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{appliance.name}</span>
                    {getStatusBadge(appliance.status)}
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-muted-foreground">
                      {appliance.usage.toFixed(1)} kW
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      ${appliance.cost.toFixed(2)}/day
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={appliance.percentage} 
                      className="h-1.5 flex-1" 
                    />
                    <span className="text-xs text-muted-foreground min-w-[3rem] text-right">
                      {appliance.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Total Current Usage</span>
            <span className="font-bold">{totalUsage.toFixed(1)} kW</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};