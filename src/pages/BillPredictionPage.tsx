import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  Zap,
  AlertCircle,
  Target
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const BillPredictionPage = () => {
  const currentMonthData = {
    estimated: 145.67,
    lastMonth: 132.45,
    difference: 13.22,
    progress: 68
  };

  const monthlyHistory = [
    { month: "Jan", amount: 128.50, usage: 1071 },
    { month: "Feb", amount: 142.30, usage: 1185 },
    { month: "Mar", amount: 135.20, usage: 1127 },
    { month: "Apr", amount: 118.90, usage: 991 },
    { month: "May", amount: 132.45, usage: 1104 },
    { month: "Jun", amount: 145.67, usage: 1214 }
  ];

  const projectionData = [
    { day: 1, actual: 4.2, projected: 4.5 },
    { day: 5, actual: 22.1, projected: 22.5 },
    { day: 10, actual: 45.3, projected: 45.0 },
    { day: 15, actual: 68.9, projected: 67.5 },
    { day: 20, actual: 92.4, projected: 90.0 },
    { day: 25, actual: null, projected: 112.5 },
    { day: 30, actual: null, projected: 145.67 }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Bill Prediction
            </h1>
            <p className="text-muted-foreground">Monthly cost forecasting and analysis</p>
          </div>
        </div>

        {/* Current Month Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-primary text-primary-foreground shadow-energy">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                Estimated This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentMonthData.estimated}</div>
              <div className="flex items-center gap-1 text-xs opacity-90">
                <TrendingUp className="w-3 h-3" />
                +${currentMonthData.difference.toFixed(2)} vs last month
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-custom">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Last Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${currentMonthData.lastMonth}</div>
              <div className="text-xs text-muted-foreground">Final bill amount</div>
            </CardContent>
          </Card>

          <Card className="shadow-card-custom">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Monthly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{currentMonthData.progress}%</div>
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <Progress value={currentMonthData.progress} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="shadow-card-custom">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-success">94%</div>
                <Target className="w-5 h-5 text-success" />
              </div>
              <div className="text-xs text-muted-foreground">Prediction accuracy</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Projection Chart */}
          <Card className="shadow-card-custom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Monthly Projection
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Actual vs predicted spending this month
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, '']} />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      name="Actual"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="projected" 
                      stroke="hsl(var(--success))" 
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Projected"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Historical Comparison */}
          <Card className="shadow-card-custom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="w-5 h-5 text-primary" />
                6-Month History
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Monthly bill amounts and usage
              </p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyHistory}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Bill Amount']} />
                    <Bar 
                      dataKey="amount" 
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Rate Structure */}
          <Card className="shadow-card-custom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                Rate Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Peak Hours (4-9 PM)</span>
                <Badge variant="destructive">$0.15/kWh</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Off-Peak</span>
                <Badge variant="default">$0.10/kWh</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Base Charge</span>
                <span className="text-sm font-medium">$12.50/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Taxes & Fees</span>
                <span className="text-sm font-medium">8.5%</span>
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card className="shadow-card-custom">
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Energy Charges</span>
                <span className="text-sm font-medium">$115.20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Base Charge</span>
                <span className="text-sm font-medium">$12.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Taxes & Fees</span>
                <span className="text-sm font-medium">$10.87</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Green Energy Fee</span>
                <span className="text-sm font-medium">$7.10</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-medium">
                <span>Total Estimated</span>
                <span className="text-primary">${currentMonthData.estimated}</span>
              </div>
            </CardContent>
          </Card>

          {/* Savings Opportunities */}
          <Card className="shadow-card-custom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                Savings Alert
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <p className="text-sm font-medium text-warning mb-1">
                  Peak Usage High
                </p>
                <p className="text-xs text-muted-foreground">
                  45% of usage during peak hours. Potential savings: $18/month
                </p>
              </div>
              <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
                <p className="text-sm font-medium text-success mb-1">
                  Efficiency Improved
                </p>
                <p className="text-xs text-muted-foreground">
                  3% reduction in usage vs last month
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BillPredictionPage;