import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bot, 
  Send, 
  User, 
  Lightbulb,
  DollarSign,
  Zap,
  TrendingDown,
  Clock,
  ThermometerSun
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Suggestion {
  icon: React.ElementType;
  title: string;
  description: string;
  savings: string;
}

const AIAdvisorPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your Energy AI Advisor. I can help you understand your energy usage, predict costs, and provide personalized recommendations to save money. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions: Suggestion[] = [
    {
      icon: DollarSign,
      title: "Peak Hour Savings",
      description: "Shift 30% of your usage to off-peak hours",
      savings: "Save $18/month"
    },
    {
      icon: ThermometerSun,
      title: "HVAC Optimization", 
      description: "Adjust thermostat by 2°F during peak hours",
      savings: "Save $25/month"
    },
    {
      icon: Clock,
      title: "Smart Scheduling",
      description: "Run dishwasher and laundry after 9 PM",
      savings: "Save $12/month"
    },
    {
      icon: Lightbulb,
      title: "LED Upgrade",
      description: "Replace remaining incandescent bulbs",
      savings: "Save $8/month"
    }
  ];

  const quickQuestions = [
    "Why is my bill higher this month?",
    "When should I run my dishwasher?",
    "How can I save $50 per month?",
    "What's using the most energy?",
    "Is my usage normal for my home size?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('bill') && lowerMessage.includes('high')) {
      return "Your bill is higher this month primarily due to increased HVAC usage during peak hours. Your AC ran 23% more than last month, contributing an extra $15.30. I recommend adjusting your thermostat by 2°F during peak hours (4-9 PM) to reduce costs.";
    }
    
    if (lowerMessage.includes('dishwasher') || lowerMessage.includes('when')) {
      return "The best time to run your dishwasher is after 9 PM when rates drop to $0.10/kWh (vs $0.15 during peak). Running it off-peak can save you about $3-4 per month. Your dishwasher uses approximately 1.8 kWh per cycle.";
    }
    
    if (lowerMessage.includes('save') && lowerMessage.includes('50')) {
      return "To save $50/month, try these strategies: 1) Shift 40% of usage to off-peak hours ($22 savings), 2) Raise AC by 3°F during peak ($18 savings), 3) Use smart power strips for electronics ($8 savings), 4) Replace remaining incandescent bulbs ($7 savings). This would total approximately $55 in monthly savings!";
    }
    
    if (lowerMessage.includes('using') && lowerMessage.includes('energy')) {
      return "Your top energy consumers are: 1) HVAC System (45% - $65/month), 2) Water Heater (19% - $27/month), 3) EV Charger (13% - $18/month). The HVAC is your biggest opportunity for savings through smart scheduling and temperature adjustments.";
    }
    
    if (lowerMessage.includes('normal') || lowerMessage.includes('average')) {
      return "Your current usage of 1,214 kWh/month is about 8% above average for similar homes in your area (1,125 kWh). However, this is reasonable given your home size and EV charging. You're actually doing well compared to homes with similar features!";
    }
    
    return "I understand you're asking about energy management. Based on your current usage patterns, I'd recommend focusing on peak-hour optimization and smart scheduling of major appliances. Would you like specific recommendations for any particular appliance or usage pattern?";
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: simulateAIResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI Energy Advisor
            </h1>
            <p className="text-muted-foreground">Get personalized energy insights and recommendations</p>
          </div>
          <Badge variant="outline" className="gap-2 bg-success/10 text-success border-success/20">
            <Bot className="w-4 h-4" />
            AI Online
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="shadow-card-custom h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-primary" />
                  Energy Assistant
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                          <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            {message.type === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                          </div>
                          <div className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                            <p className="text-sm">{message.content}</p>
                            <span className="text-xs opacity-70 mt-1 block">
                              {message.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex gap-3">
                          <div className="p-2 rounded-full bg-muted">
                            <Bot className="w-4 h-4" />
                          </div>
                          <div className="p-3 rounded-lg bg-muted">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                              <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div ref={messagesEndRef} />
                </ScrollArea>
                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ask me about your energy usage..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={sendMessage} disabled={!inputMessage.trim() || isTyping}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar with Suggestions */}
          <div className="space-y-6">
            {/* Smart Recommendations */}
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary" />
                  Smart Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestions.map((suggestion, index) => {
                  const Icon = suggestion.icon;
                  return (
                    <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{suggestion.title}</h4>
                          <p className="text-xs text-muted-foreground mb-2">{suggestion.description}</p>
                          <Badge variant="outline" className="text-xs">{suggestion.savings}</Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Questions */}
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle>Quick Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-xs h-auto p-3"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Current Stats */}
            <Card className="shadow-card-custom">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-success" />
                  This Month's Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Recommendations Followed</span>
                  <Badge variant="default">3/5</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Estimated Savings</span>
                  <span className="font-medium text-success">$32.50</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Efficiency Score</span>
                  <span className="font-medium">87%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisorPage;