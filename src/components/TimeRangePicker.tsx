import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight } from "lucide-react";

interface TimeRange {
  start: string;
  end: string;
}

interface TimeRangePickerProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onSave: (timeRange: TimeRange) => void;
  initialData?: TimeRange;
}

export const TimeRangePicker = ({ 
  title, 
  subtitle, 
  icon, 
  onSave, 
  initialData 
}: TimeRangePickerProps) => {
  const [startTime, setStartTime] = useState(initialData?.start || "");
  const [endTime, setEndTime] = useState(initialData?.end || "");

  const handleSave = () => {
    if (startTime && endTime) {
      onSave({ start: startTime, end: endTime });
    }
  };

  const isValidTimeRange = startTime && endTime && startTime < endTime;

  return (
    <Card className="shadow-card animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          {icon}
          {title}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 space-y-2">
            <Label htmlFor="start-time" className="text-sm font-medium">From</Label>
            <Input
              id="start-time"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="transition-all duration-200 focus:shadow-optimal"
            />
          </div>
          
          <ArrowRight className="h-4 w-4 text-muted-foreground mt-6" />
          
          <div className="flex-1 space-y-2">
            <Label htmlFor="end-time" className="text-sm font-medium">To</Label>
            <Input
              id="end-time"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="transition-all duration-200 focus:shadow-optimal"
            />
          </div>
        </div>

        <Button 
          onClick={handleSave}
          variant="secondary"
          className="w-full"
          disabled={!isValidTimeRange}
        >
          <Clock className="h-4 w-4 mr-2" />
          Save Time Range
        </Button>
        
        {startTime && endTime && startTime >= endTime && (
          <p className="text-sm text-destructive text-center">
            End time must be after start time
          </p>
        )}
      </CardContent>
    </Card>
  );
};