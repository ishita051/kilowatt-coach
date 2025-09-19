import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Lightbulb, 
  Clock, 
  TrendingDown, 
  Zap, 
  DollarSign, 
  AlertCircle,
  CheckCircle 
} from "lucide-react";

interface SmartRecommendationsProps {
  currentUsage: number;
  trend: 'up' | 'down' | 'stable';
}

export const SmartRecommendations = ({ currentUsage, trend }: SmartRecommendationsProps) => {
  const recommendations = [
    {
      id: 1,
      type: "timing",
      icon: Clock,
      title: "Shift Dishwasher to Off-Peak",
      description: "Run your dishwasher after 9 PM to save $0.18 per cycle",
      savings: "$15/month",
      priority: "high",
      action: "Schedule Now"
    },
    {
      id: 2,
      type: "efficiency",
      icon: TrendingDown,
      title: "AC Temperature Adjustment",
      description: "Increase thermostat by 2°F during peak hours",
      savings: "$23/month",
      priority: "medium",
      action: "Set Schedule"
    },
    {
      id: 3,
      type: "behavior",
      icon: Lightbulb,
      title: "LED Lighting Upgrade",
      description: "5 remaining incandescent bulbs using excess energy",
      savings: "$8/month",
      priority: "low",
      action: "View Products"
    },
    {
      id: 4,
      type: "alert",
      icon: AlertCircle,
      title: "Water Heater Efficiency",
      description: "Lower temperature setting from 140°F to 120°F",
      savings: "$12/month",
      priority: "medium",
      action: "Learn How"
    }
  ];

  // Dynamic recommendations based on current usage and trend
  const dynamicRecs = [];
  
  if (currentUsage > 4) {
    dynamicRecs.push({
      id: 'dynamic-1',
      type: 'alert',
      icon: AlertCircle,
      title: 'High Usage Detected',
      description: 'Current usage is 40% above your average. Check HVAC settings.',
      savings: 'Immediate',
      priority: 'high',
      action: 'Check Now'
    });
  }
  
  if (trend === 'up') {
    dynamicRecs.push({
      id: 'dynamic-2',
      type: 'timing',
      icon: Clock,
      title: 'Usage Trending Up',
      description: 'Consider delaying non-essential appliances until after 9 PM.',
      savings: '$5/day',
      priority: 'medium',
      action: 'Set Reminders'
    });
  }

  const allRecommendations = [...dynamicRecs, ...recommendations.slice(0, 4 - dynamicRecs.length)];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'warning';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return AlertCircle;
      case 'medium': return Zap;
      case 'low': return CheckCircle;
      default: return CheckCircle;
    }
  };

  return (
    <Card className="shadow-card-custom">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-accent" />
          Smart Recommendations
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          AI-powered suggestions to optimize your energy usage
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {allRecommendations.map((rec) => {
            const IconComponent = rec.icon;
            const PriorityIcon = getPriorityIcon(rec.priority);
            
            return (
              <div key={rec.id} className="p-4 rounded-lg border bg-gradient-to-r from-background to-muted/20 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <IconComponent className="w-4 h-4 text-accent" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{rec.title}</h4>
                      <Badge 
                        variant={getPriorityColor(rec.priority) as any}
                        className="text-xs px-2 py-0.5 gap-1"
                      >
                        <PriorityIcon className="w-3 h-3" />
                        {rec.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">
                      {rec.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-success">
                        <DollarSign className="w-3 h-3" />
                        <span className="text-xs font-medium">{rec.savings}</span>
                      </div>
                      
                      <Button size="sm" variant="outline" className="text-xs h-7">
                        {rec.action}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-success">
              $58
            </div>
            <div className="text-xs text-muted-foreground">
              Total Monthly Savings Potential
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};