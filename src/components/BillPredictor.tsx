import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Calendar, TrendingUp, AlertTriangle } from "lucide-react";

interface BillPredictorProps {
  currentUsage: number;
  dailyTotal: number;
}

export const BillPredictor = ({ currentUsage, dailyTotal }: BillPredictorProps) => {
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const currentDay = new Date().getDate();
  const monthProgress = (currentDay / daysInMonth) * 100;
  
  // Calculate projections
  const avgDailyUsage = dailyTotal || 25; // Fallback to reasonable default
  const projectedMonthlyUsage = avgDailyUsage * daysInMonth;
  const projectedMonthlyBill = projectedMonthlyUsage * 0.12; // $0.12 per kWh
  
  // Last month comparison (simulated)
  const lastMonthBill = 142.50;
  const difference = projectedMonthlyBill - lastMonthBill;
  const percentageChange = ((difference / lastMonthBill) * 100);
  
  // Peak usage warning
  const isPeakTime = new Date().getHours() >= 16 && new Date().getHours() <= 21;
  const isHighUsage = currentUsage > 3.5;

  return (
    <Card className="shadow-card-custom">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-primary" />
          Bill Prediction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Monthly Projection */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Projected Monthly Bill</span>
            <Badge variant={difference > 0 ? "destructive" : "default"}>
              {difference > 0 ? '+' : ''}{difference.toFixed(0)}%
            </Badge>
          </div>
          <div className="text-2xl font-bold text-primary">
            ${projectedMonthlyBill.toFixed(0)}
          </div>
          <div className="text-sm text-muted-foreground">
            vs ${lastMonthBill.toFixed(0)} last month
          </div>
        </div>

        {/* Month Progress */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Month Progress</span>
            <span>{currentDay}/{daysInMonth} days</span>
          </div>
          <Progress value={monthProgress} className="h-2" />
        </div>

        {/* Usage Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm">Daily Average</span>
            <span className="text-sm font-medium">{avgDailyUsage.toFixed(1)} kWh</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Rate (avg)</span>
            <span className="text-sm font-medium">$0.12/kWh</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Est. Usage</span>
            <span className="text-sm font-medium">{projectedMonthlyUsage.toFixed(0)} kWh</span>
          </div>
        </div>

        {/* Warnings */}
        {(isPeakTime && isHighUsage) && (
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center gap-2 text-warning mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">Peak Time Alert</span>
            </div>
            <p className="text-xs text-muted-foreground">
              High usage during peak hours (4-9 PM). Consider shifting non-essential appliances.
            </p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-success">
              ${(projectedMonthlyBill * 0.15).toFixed(0)}
            </div>
            <div className="text-xs text-muted-foreground">Potential Savings</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">
              {Math.ceil((daysInMonth - currentDay))}
            </div>
            <div className="text-xs text-muted-foreground">Days Remaining</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};