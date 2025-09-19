import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Lightbulb, 
  DollarSign, 
  Clock, 
  Thermometer,
  Zap,
  Sun,
  Moon,
  Snowflake,
  Home,
  CheckCircle,
  Star,
  TrendingUp,
  Leaf
} from "lucide-react";

interface Tip {
  id: string;
  title: string;
  description: string;
  savings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  impact: 'Low' | 'Medium' | 'High';
  icon: React.ElementType;
  completed?: boolean;
}

const TipsPage = () => {
  const [completedTips, setCompletedTips] = useState<string[]>(['1', '3', '7']);

  const tips: Tip[] = [
    {
      id: '1',
      title: 'Run Dishwasher During Off-Peak Hours',
      description: 'Schedule your dishwasher to run after 9 PM when electricity rates are lower.',
      savings: '$4-6/month',
      difficulty: 'Easy',
      category: 'timing',
      impact: 'Medium',
      icon: Clock,
      completed: true
    },
    {
      id: '2', 
      title: 'Adjust Thermostat During Peak Hours',
      description: 'Raise temperature by 2-3°F during 4-9 PM peak hours to reduce HVAC costs.',
      savings: '$15-25/month',
      difficulty: 'Easy',
      category: 'hvac',
      impact: 'High',
      icon: Thermometer
    },
    {
      id: '3',
      title: 'Use Smart Power Strips',
      description: 'Eliminate phantom loads from electronics in standby mode.',
      savings: '$8-12/month',
      difficulty: 'Easy',
      category: 'electronics',
      impact: 'Medium',
      icon: Zap,
      completed: true
    },
    {
      id: '4',
      title: 'LED Lighting Upgrade',
      description: 'Replace remaining incandescent bulbs with LED alternatives.',
      savings: '$6-10/month',
      difficulty: 'Easy',
      category: 'lighting',
      impact: 'Medium',
      icon: Lightbulb
    },
    {
      id: '5',
      title: 'Water Heater Temperature Adjustment',
      description: 'Lower water heater temperature to 120°F for safety and savings.',
      savings: '$10-15/month',
      difficulty: 'Medium',
      category: 'water',
      impact: 'Medium',
      icon: Thermometer
    },
    {
      id: '6',
      title: 'Install Programmable Thermostat',
      description: 'Automatically adjust temperature based on your schedule.',
      savings: '$20-30/month',
      difficulty: 'Medium',
      category: 'hvac',
      impact: 'High',
      icon: Home
    },
    {
      id: '7',
      title: 'EV Charging Schedule',
      description: 'Charge your electric vehicle during off-peak hours for lower rates.',
      savings: '$15-20/month',
      difficulty: 'Easy',
      category: 'timing',
      impact: 'High',
      icon: Zap,
      completed: true
    },
    {
      id: '8',
      title: 'Seal Air Leaks',
      description: 'Use caulk and weatherstripping to seal gaps around windows and doors.',
      savings: '$25-40/month',
      difficulty: 'Hard',
      category: 'hvac',
      impact: 'High',
      icon: Home
    }
  ];

  const seasonalTips = [
    {
      season: 'Summer',
      icon: Sun,
      tips: [
        'Use fans to circulate air and raise thermostat setting',
        'Close blinds during hottest parts of the day',
        'Run pool pumps during off-peak hours',
        'Set AC to 78°F when home, 85°F when away'
      ]
    },
    {
      season: 'Winter',
      icon: Snowflake,
      tips: [
        'Lower thermostat to 68°F during day, 60°F at night',
        'Use ceiling fans in reverse to push warm air down',
        'Let sunlight in during the day, close curtains at night',
        'Ensure proper insulation in attic and basement'
      ]
    }
  ];

  const toggleTip = (tipId: string) => {
    setCompletedTips(prev => 
      prev.includes(tipId) 
        ? prev.filter(id => id !== tipId)
        : [...prev, tipId]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-success text-success-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'Hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Low': return 'text-muted-foreground';
      case 'Medium': return 'text-warning';
      case 'High': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const categoryTips = {
    timing: tips.filter(tip => tip.category === 'timing'),
    hvac: tips.filter(tip => tip.category === 'hvac'),
    electronics: tips.filter(tip => tip.category === 'electronics'),
    lighting: tips.filter(tip => tip.category === 'lighting'),
    water: tips.filter(tip => tip.category === 'water')
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Energy Saving Tips
            </h1>
            <p className="text-muted-foreground">Actionable advice to reduce your energy costs</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">{completedTips.length}</div>
              <div className="text-xs text-muted-foreground">Tips Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">$67</div>
              <div className="text-xs text-muted-foreground">Potential Savings</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Tips</TabsTrigger>
            <TabsTrigger value="quick-wins">Quick Wins</TabsTrigger>
            <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.map((tip) => {
                const Icon = tip.icon;
                const isCompleted = completedTips.includes(tip.id);
                return (
                  <Card key={tip.id} className={`shadow-card-custom transition-all hover:shadow-lg ${isCompleted ? 'border-success' : ''}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${isCompleted ? 'bg-success text-success-foreground' : 'bg-primary/10 text-primary'}`}>
                            {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                          </div>
                          <Badge className={getDifficultyColor(tip.difficulty)}>
                            {tip.difficulty}
                          </Badge>
                        </div>
                        <div className={`flex items-center gap-1 ${getImpactColor(tip.impact)}`}>
                          <Star className="w-3 h-3" />
                          <span className="text-xs font-medium">{tip.impact}</span>
                        </div>
                      </div>
                      <CardTitle className="text-base">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="gap-1">
                          <DollarSign className="w-3 h-3" />
                          {tip.savings}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant={isCompleted ? "secondary" : "default"}
                          onClick={() => toggleTip(tip.id)}
                        >
                          {isCompleted ? 'Completed' : 'Mark Done'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="quick-wins" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.filter(tip => tip.difficulty === 'Easy').map((tip) => {
                const Icon = tip.icon;
                const isCompleted = completedTips.includes(tip.id);
                return (
                  <Card key={tip.id} className={`shadow-card-custom transition-all hover:shadow-lg ${isCompleted ? 'border-success' : ''}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${isCompleted ? 'bg-success text-success-foreground' : 'bg-primary/10 text-primary'}`}>
                            {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                          </div>
                          <Badge className="bg-success text-success-foreground">
                            Quick Win
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-base">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="gap-1">
                          <DollarSign className="w-3 h-3" />
                          {tip.savings}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant={isCompleted ? "secondary" : "default"}
                          onClick={() => toggleTip(tip.id)}
                        >
                          {isCompleted ? 'Completed' : 'Mark Done'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="seasonal" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {seasonalTips.map((season) => {
                const Icon = season.icon;
                return (
                  <Card key={season.season} className="shadow-card-custom">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon className="w-5 h-5 text-primary" />
                        {season.season} Tips
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {season.tips.map((tip, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 rounded-lg hover:bg-muted/50">
                            <Leaf className="w-4 h-4 text-success mt-0.5" />
                            <span className="text-sm">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tips.filter(tip => tip.difficulty === 'Hard').map((tip) => {
                const Icon = tip.icon;
                const isCompleted = completedTips.includes(tip.id);
                return (
                  <Card key={tip.id} className={`shadow-card-custom transition-all hover:shadow-lg ${isCompleted ? 'border-success' : ''}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${isCompleted ? 'bg-success text-success-foreground' : 'bg-primary/10 text-primary'}`}>
                            {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                          </div>
                          <Badge className="bg-destructive text-destructive-foreground">
                            Advanced
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-success">
                          <TrendingUp className="w-3 h-3" />
                          <span className="text-xs font-medium">{tip.impact}</span>
                        </div>
                      </div>
                      <CardTitle className="text-base">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="gap-1">
                          <DollarSign className="w-3 h-3" />
                          {tip.savings}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant={isCompleted ? "secondary" : "default"}
                          onClick={() => toggleTip(tip.id)}
                        >
                          {isCompleted ? 'Completed' : 'Mark Done'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tips.filter(tip => completedTips.includes(tip.id)).map((tip) => {
                const Icon = tip.icon;
                return (
                  <Card key={tip.id} className="shadow-card-custom border-success">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-success text-success-foreground">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <Badge variant="outline" className="border-success text-success">
                            Completed
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-base">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{tip.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="gap-1">
                          <DollarSign className="w-3 h-3" />
                          {tip.savings}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => toggleTip(tip.id)}
                        >
                          Undo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            {completedTips.length === 0 && (
              <Card className="shadow-card-custom">
                <CardContent className="text-center py-8">
                  <Lightbulb className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No completed tips yet</h3>
                  <p className="text-muted-foreground">
                    Start implementing energy-saving tips to track your progress here.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TipsPage;