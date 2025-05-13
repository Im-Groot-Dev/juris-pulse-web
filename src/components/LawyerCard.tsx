
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

interface LawyerCardProps {
  lawyer: {
    id: string;
    first_name: string;
    last_name: string;
    age?: number;
    gender: string;
    experience: number;
    total_cases?: number;
    cases_won?: number;
    domain: string;
    fees_per_hearing: number;
    rating: number;
    city: string;
    law_school?: string;
    bar_association?: string;
    profileImage?: string;
  };
}

const LawyerCard = ({ lawyer }: LawyerCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  
  const {
    id,
    first_name,
    last_name,
    experience,
    domain,
    fees_per_hearing,
    rating,
    city,
    law_school,
    profileImage,
    cases_won,
    total_cases
  } = lawyer;

  const successRate = total_cases && cases_won ? Math.round((cases_won / total_cases) * 100) : null;
  
  return (
    <Card 
      className={`overflow-hidden transition-all duration-700 tilt-card card-3d ${isHovered ? 'shadow-xl shadow-accent/20' : 'shadow-md'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={isHovered ? {
        transform: 'translateY(-8px)'
      } : {}}
    >
      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-b from-accent/20 to-transparent opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-100' : ''}`} />
        
        <CardHeader className="pt-6">
          <div className="flex items-center justify-between">
            <Avatar className={`h-16 w-16 ring-2 ring-accent/50 transition-all duration-300 ${isHovered ? 'ring-4 ring-accent' : ''}`}>
              <AvatarImage src={profileImage || `https://api.dicebear.com/7.x/initials/svg?seed=${first_name} ${last_name}`} />
              <AvatarFallback>{first_name[0]}{last_name[0]}</AvatarFallback>
            </Avatar>
            <Badge className="bg-accent text-accent-foreground">{domain}</Badge>
          </div>
          <CardTitle className="mt-4 flex items-center">
            {first_name} {last_name}
            {rating >= 4.5 && (
              <Badge variant="outline" className="ml-2 bg-amber-500/10 text-amber-500 border-amber-500/20">
                Top Rated
              </Badge>
            )}
          </CardTitle>
          <CardDescription className="flex items-center space-x-1">
            <span>
              {city} • {experience} years experience 
            </span>
          </CardDescription>
        </CardHeader>
      </div>
      
      <CardContent className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Rating</span>
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-amber-500' : 'text-muted'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 15.585l-7.07 3.714 1.35-7.872-5.72-5.574 7.903-1.15L10 .585l3.537 7.169 7.903 1.15-5.72 5.574 1.35 7.872z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>

        {successRate !== null && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Success Rate</span>
              <span className="font-medium">{successRate}%</span>
            </div>
            <Progress value={successRate} className="h-1.5" />
          </div>
        )}

        {law_school && (
          <div className="flex items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1.5 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="truncate text-muted-foreground">{law_school}</span>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border pt-3">
          <span className="font-medium">₹{fees_per_hearing.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground">per hearing</span>
        </div>
      </CardContent>

      <div className={`transform transition-all duration-700 ${isHovered ? 'opacity-100' : 'opacity-0 translate-y-4'}`}>
        <CardFooter className="px-6 pb-6">
          <Button
            className="w-full"
            onClick={() => navigate(`/lawyer/${id}`)}
          >
            View Profile
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default LawyerCard;
