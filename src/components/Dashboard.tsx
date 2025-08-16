import { useState } from "react";
import { LocationInput } from "./LocationInput";
import { TimeRangePicker } from "./TimeRangePicker";
import { RecommendationCard } from "./RecommendationCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Building2, Settings, BarChart3 } from "lucide-react";

interface LocationData {
  home: string;
  office: string;
}

interface TimeRange {
  start: string;
  end: string;
}

export const Dashboard = () => {
  const [locations, setLocations] = useState<LocationData | null>(null);
  const [officeTimeRange, setOfficeTimeRange] = useState<TimeRange | null>(null);
  const [homeTimeRange, setHomeTimeRange] = useState<TimeRange | null>(null);
  const [showSetup, setShowSetup] = useState(false);

  // Mock recommendation data
  const mockRecommendationToOffice = {
    bestTime: "08:45",
    eta: 28,
    trafficStatus: 'optimal' as const,
    weather: 'sunny' as const,
    confidence: 92
  };

  const mockRecommendationToHome = {
    bestTime: "18:15",
    eta: 35,
    trafficStatus: 'moderate' as const,
    weather: 'rainy' as const,
    confidence: 87
  };

  const isSetupComplete = locations && officeTimeRange && homeTimeRange;

  if (!isSetupComplete || showSetup) {
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">CommutePro</h1>
            <p className="text-muted-foreground">Your smart commute timing assistant for Bengaluru</p>
          </div>

          {!locations && (
            <LocationInput 
              onSave={(data) => {
                setLocations(data);
                console.log("Locations saved:", data);
              }}
              initialData={locations || undefined}
            />
          )}

          {locations && !officeTimeRange && (
            <TimeRangePicker
              title="Office Hours"
              subtitle="When would you like to arrive at office?"
              icon={<Building2 className="h-5 w-5 text-primary" />}
              onSave={(timeRange) => {
                setOfficeTimeRange(timeRange);
                console.log("Office time range saved:", timeRange);
              }}
              initialData={officeTimeRange || undefined}
            />
          )}

          {locations && officeTimeRange && !homeTimeRange && (
            <TimeRangePicker
              title="Home Hours"
              subtitle="When would you like to leave office for home?"
              icon={<Home className="h-5 w-5 text-primary" />}
              onSave={(timeRange) => {
                setHomeTimeRange(timeRange);
                setShowSetup(false);
                console.log("Home time range saved:", timeRange);
              }}
              initialData={homeTimeRange || undefined}
            />
          )}

          {isSetupComplete && (
            <div className="text-center">
              <Button 
                onClick={() => setShowSetup(false)}
                variant="primary"
                size="lg"
              >
                View Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">CommutePro</h1>
            <p className="text-sm opacity-90">Smart commute recommendations for Bengaluru</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowSetup(true)}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Quick Info */}
        <Card className="shadow-card">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Home</p>
                <p className="font-medium text-foreground truncate">{locations.home}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Office</p>
                <p className="font-medium text-foreground truncate">{locations.office}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <div className="grid md:grid-cols-2 gap-6">
          <RecommendationCard 
            data={mockRecommendationToOffice}
            direction="toOffice"
          />
          <RecommendationCard 
            data={mockRecommendationToHome}
            direction="toHome"
          />
        </div>

        {/* Chart Placeholder */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Traffic Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-muted/30 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">Traffic comparison chart coming soon</p>
                <p className="text-sm text-muted-foreground">Will show ETA variations throughout your time window</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};