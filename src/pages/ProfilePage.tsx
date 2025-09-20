import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Home, 
  Bell, 
  DollarSign, 
  Zap,
  Moon,
  Sun,
  Shield,
  Download,
  Trash2,
  LogOut,
  Mail,
  Phone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProfilePage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    homeSize: "2000",
    occupants: "3",
    utility: "pg-e",
    rate: "0.12",
    peakRate: "0.15",
    offPeakRate: "0.10",
    notifications: true,
    emailReports: true,
    budgetAlerts: true,
    peakAlerts: true,
    darkMode: false,
    dataRetention: "1year"
  });

  useEffect(() => {
    // Load user data from localStorage
    const storedEmail = localStorage.getItem('userEmail') || '';
    const storedName = localStorage.getItem('userName') || '';
    const storedPhone = localStorage.getItem('userPhone') || '';
    const [firstName, lastName] = storedName.split(' ');
    
    setProfile(prev => ({
      ...prev,
      firstName: firstName || '',
      lastName: lastName || '',
      email: storedEmail,
      phone: storedPhone
    }));
  }, []);

  const updateProfile = (key: string, value: any) => {
    setProfile(prev => ({ ...prev, [key]: value }));
    
    // Update localStorage for personal info
    if (key === 'firstName' || key === 'lastName') {
      localStorage.setItem('userName', `${key === 'firstName' ? value : profile.firstName} ${key === 'lastName' ? value : profile.lastName}`);
    } else if (key === 'email') {
      localStorage.setItem('userEmail', value);
    } else if (key === 'phone') {
      localStorage.setItem('userPhone', value);
    }
    
    toast({
      title: "Profile Updated",
      description: "Your information has been saved.",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userPhone');
    toast({
      title: "Logged Out",
      description: "You've been successfully logged out.",
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Profile
            </h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>

        {/* Personal Information */}
        <Card className="shadow-card-custom">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={profile.firstName}
                  onChange={(e) => updateProfile('firstName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={profile.lastName}
                  onChange={(e) => updateProfile('lastName', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  value={profile.email}
                  onChange={(e) => updateProfile('email', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="phone"
                  type="tel"
                  className="pl-10"
                  value={profile.phone}
                  onChange={(e) => updateProfile('phone', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Home Configuration */}
        <Card className="shadow-card-custom">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" />
              Home Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="homeSize">Home Size (sq ft)</Label>
                <Input
                  id="homeSize"
                  value={profile.homeSize}
                  onChange={(e) => updateProfile('homeSize', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="occupants">Number of Occupants</Label>
                <Select value={profile.occupants} onValueChange={(value) => updateProfile('occupants', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Person</SelectItem>
                    <SelectItem value="2">2 People</SelectItem>
                    <SelectItem value="3">3 People</SelectItem>
                    <SelectItem value="4">4 People</SelectItem>
                    <SelectItem value="5">5+ People</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="utility">Utility Provider</Label>
              <Select value={profile.utility} onValueChange={(value) => updateProfile('utility', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pg-e">Pacific Gas & Electric (PG&E)</SelectItem>
                  <SelectItem value="sce">Southern California Edison</SelectItem>
                  <SelectItem value="sdge">San Diego Gas & Electric</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Rate Configuration */}
        <Card className="shadow-card-custom">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Electricity Rates
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rate">Standard Rate ($/kWh)</Label>
                <Input
                  id="rate"
                  type="number"
                  step="0.01"
                  value={profile.rate}
                  onChange={(e) => updateProfile('rate', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="peakRate">Peak Rate ($/kWh)</Label>
                <Input
                  id="peakRate"
                  type="number"
                  step="0.01"
                  value={profile.peakRate}
                  onChange={(e) => updateProfile('peakRate', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">4 PM - 9 PM weekdays</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="offPeakRate">Off-Peak Rate ($/kWh)</Label>
                <Input
                  id="offPeakRate"
                  type="number"
                  step="0.01"
                  value={profile.offPeakRate}
                  onChange={(e) => updateProfile('offPeakRate', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">All other hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-card-custom">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive real-time alerts and updates</p>
              </div>
              <Switch 
                checked={profile.notifications}
                onCheckedChange={(checked) => updateProfile('notifications', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Reports</Label>
                <p className="text-sm text-muted-foreground">Weekly and monthly usage summaries</p>
              </div>
              <Switch 
                checked={profile.emailReports}
                onCheckedChange={(checked) => updateProfile('emailReports', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Budget Alerts</Label>
                <p className="text-sm text-muted-foreground">Alert when approaching monthly budget</p>
              </div>
              <Switch 
                checked={profile.budgetAlerts}
                onCheckedChange={(checked) => updateProfile('budgetAlerts', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Peak Usage Alerts</Label>
                <p className="text-sm text-muted-foreground">Notify during high-cost peak hours</p>
              </div>
              <Switch 
                checked={profile.peakAlerts}
                onCheckedChange={(checked) => updateProfile('peakAlerts', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Appearance & Privacy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-card-custom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {profile.darkMode ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch to dark theme</p>
                </div>
                <Switch 
                  checked={profile.darkMode}
                  onCheckedChange={(checked) => updateProfile('darkMode', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card-custom">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Privacy & Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Data Retention</Label>
                <Select value={profile.dataRetention} onValueChange={(value) => updateProfile('dataRetention', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="2years">2 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Management */}
        <Card className="shadow-card-custom">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Export Usage Data</h4>
                <p className="text-sm text-muted-foreground">Download your energy usage history as CSV</p>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border rounded-lg border-destructive/20">
              <div>
                <h4 className="font-medium text-destructive">Delete All Data</h4>
                <p className="text-sm text-muted-foreground">Permanently remove all your usage data</p>
              </div>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Status */}
        <Card className="shadow-card-custom">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Account Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Plan</h4>
                <p className="text-sm text-muted-foreground">Free Plan with AI Advisor</p>
              </div>
              <Badge variant="outline">Free</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Data Usage</h4>
                <p className="text-sm text-muted-foreground">45 MB of 100 MB used</p>
              </div>
              <div className="w-32 bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[45%]" />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">AI Queries</h4>
                <p className="text-sm text-muted-foreground">23 of 100 this month</p>
              </div>
              <div className="w-32 bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full w-[23%]" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save All Changes</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;