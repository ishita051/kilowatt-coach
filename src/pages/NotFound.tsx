import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, Zap } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-6">
      <Card className="w-full max-w-md shadow-card-custom text-center">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-primary rounded-xl text-primary-foreground">
              <Zap className="w-8 h-8" />
            </div>
          </div>
          <CardTitle className="text-2xl bg-gradient-primary bg-clip-text text-transparent">
            Page Not Found
          </CardTitle>
          <p className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="text-6xl font-bold text-muted-foreground/20 mb-4">
            404
          </div>
          
          <div className="space-y-3">
            <Link to="/">
              <Button className="w-full gap-2">
                <Home className="w-4 h-4" />
                Go to Dashboard
              </Button>
            </Link>
            
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
