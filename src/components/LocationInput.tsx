import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Home, Building2 } from "lucide-react";

interface LocationInputProps {
  onSave: (locations: { home: string; office: string }) => void;
  initialData?: { home: string; office: string };
}

export const LocationInput = ({ onSave, initialData }: LocationInputProps) => {
  const [home, setHome] = useState(initialData?.home || "");
  const [office, setOffice] = useState(initialData?.office || "");

  const handleSave = () => {
    if (home.trim() && office.trim()) {
      onSave({ home: home.trim(), office: office.trim() });
    }
  };

  return (
    <Card className="shadow-card animate-fade-in-up">
      <CardHeader className="text-center bg-gradient-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center justify-center gap-2">
          <MapPin className="h-5 w-5" />
          Setup Your Commute
        </CardTitle>
        <p className="text-sm opacity-90">Enter your home and office locations to get started</p>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="space-y-2">
          <Label htmlFor="home" className="flex items-center gap-2 text-foreground">
            <Home className="h-4 w-4 text-primary" />
            Home Location
          </Label>
          <Input
            id="home"
            value={home}
            onChange={(e) => setHome(e.target.value)}
            placeholder="Enter your home address"
            className="transition-all duration-200 focus:shadow-optimal"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="office" className="flex items-center gap-2 text-foreground">
            <Building2 className="h-4 w-4 text-primary" />
            Office Location
          </Label>
          <Input
            id="office"
            value={office}
            onChange={(e) => setOffice(e.target.value)}
            placeholder="Enter your office address"
            className="transition-all duration-200 focus:shadow-optimal"
          />
        </div>

        <Button 
          onClick={handleSave}
          variant="primary"
          size="lg"
          className="w-full"
          disabled={!home.trim() || !office.trim()}
        >
          Save Locations
        </Button>
      </CardContent>
    </Card>
  );
};