import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Navigation, CloudRain, Sun, AlertTriangle } from "lucide-react";

interface RecommendationData {
  bestTime: string;
  eta: number;
  trafficStatus: 'optimal' | 'moderate' | 'congested';
  weather: 'sunny' | 'rainy';
  confidence: number;
}

interface RecommendationCardProps {
  data: RecommendationData;
  direction: 'toOffice' | 'toHome';
}

export const RecommendationCard = ({ data, direction }: RecommendationCardProps) => {
  const { bestTime, eta, trafficStatus, weather, confidence } = data;
  
  const getTrafficBadgeVariant = (status: string) => {
    switch (status) {
      case 'optimal': return 'optimal';
      case 'moderate': return 'moderate';
      case 'congested': return 'congested';
      default: return 'secondary';
    }
  };

  const getTrafficLabel = (status: string) => {
    switch (status) {
      case 'optimal': return 'Clear Roads';
      case 'moderate': return 'Light Traffic';
      case 'congested': return 'Heavy Traffic';
      default: return 'Unknown';
    }
  };

  const gradientClass = `bg-gradient-${trafficStatus}`;
  const shadowClass = trafficStatus === 'optimal' ? 'shadow-optimal' : 'shadow-card';

  return (
    <Card className={`${shadowClass} animate-fade-in-up hover:animate-pulse-glow transition-all duration-300`}>
      <CardHeader className={`${gradientClass} text-white rounded-t-lg`}>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            {direction === 'toOffice' ? 'To Office' : 'To Home'}
          </span>
          <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
            {confidence}% confident
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Clock className="h-6 w-6 text-primary" />
            <span className="text-3xl font-bold text-foreground">{bestTime}</span>
          </div>
          <p className="text-lg text-muted-foreground">Best time to leave</p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
          <div className="text-center space-y-1">
            <div className="flex items-center justify-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground">{eta} min</span>
            </div>
            <p className="text-xs text-muted-foreground">Journey time</p>
          </div>
          
          <div className="text-center space-y-1">
            <Badge variant={getTrafficBadgeVariant(trafficStatus)} className="flex items-center gap-1 justify-center">
              {trafficStatus === 'congested' && <AlertTriangle className="h-3 w-3" />}
              {getTrafficLabel(trafficStatus)}
            </Badge>
            <p className="text-xs text-muted-foreground">Traffic status</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 pt-2">
          {weather === 'sunny' ? (
            <Sun className="h-4 w-4 text-sunny" />
          ) : (
            <CloudRain className="h-4 w-4 text-rainy" />
          )}
          <span className="text-sm text-muted-foreground">
            {weather === 'sunny' ? 'Clear weather' : 'Rain expected'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};