
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StarIcon, MapPinIcon, ExternalLinkIcon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getLawyerData } from "@/utils/machineLearningSim";

const SavedLawyers = () => {
  const { userProfile, unsaveLawyer } = useAuth();
  const navigate = useNavigate();
  const [savedLawyersData, setSavedLawyersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userProfile?.savedLawyers && userProfile.savedLawyers.length > 0) {
      // Get all lawyers from the utility function
      const allLawyers = getLawyerData();
      
      // Filter out only the saved lawyers
      const savedLawyers = allLawyers.filter(lawyer => 
        userProfile.savedLawyers.includes(lawyer.id)
      );
      
      // Format the lawyers data
      const formattedLawyers = savedLawyers.map(lawyer => ({
        id: lawyer.id,
        name: `${lawyer.first_name} ${lawyer.last_name}`,
        profileImage: lawyer.profileImage,
        domain: lawyer.domain,
        experience: lawyer.experience,
        fees_per_hearing: lawyer.fees_per_hearing,
        rating: lawyer.rating || 4.5,
        city: lawyer.city,
      }));
      
      setSavedLawyersData(formattedLawyers);
    }
    
    setLoading(false);
  }, [userProfile?.savedLawyers]);

  const handleViewProfile = (lawyerId: string) => {
    navigate(`/lawyer/${lawyerId}`);
  };
  
  const handleUnsave = (lawyerId: string) => {
    unsaveLawyer(lawyerId);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6 flex justify-center p-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  if (!savedLawyersData.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Saved Lawyers</CardTitle>
          <CardDescription>Your list of saved legal professionals</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-10">
          <p className="text-muted-foreground mb-4">You haven't saved any lawyers yet</p>
          <Button onClick={() => navigate("/find-lawyer")}>
            Browse Lawyers
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Lawyers</CardTitle>
        <CardDescription>Your list of saved legal professionals</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {savedLawyersData.map(lawyer => (
            <Card key={lawyer.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-4 flex items-start gap-4">
                <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src={lawyer.profileImage} alt={lawyer.name} />
                  <AvatarFallback>{lawyer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{lawyer.name}</h3>
                      <Badge variant="outline" className="mt-1">
                        {lawyer.domain}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-1 items-center">
                      <StarIcon size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{lawyer.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
                    <MapPinIcon size={14} />
                    {lawyer.city}
                    <span className="mx-1">•</span>
                    {lawyer.experience} years exp
                  </div>
                  
                  <div className="mt-3 flex gap-2">
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => handleViewProfile(lawyer.id)}
                      className="flex items-center gap-1"
                    >
                      View Profile
                      <ExternalLinkIcon size={14} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleUnsave(lawyer.id)}
                    >
                      Unsave
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedLawyers;
