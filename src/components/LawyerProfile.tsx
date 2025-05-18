
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const LawyerProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "123-456-7890", // Mock data
    domain: "Corporate Law", // Mock data
    experience: "10 years", // Mock data
    bio: "Experienced lawyer specializing in corporate law with a focus on mergers and acquisitions.", // Mock data
    education: "LLB, National Law University, Delhi", // Mock data
    bar_association: "Bar Council of Delhi", // Mock data
    address: "123 Legal Street, New Delhi", // Mock data
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would save to the backend
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Professional Profile</CardTitle>
          <Button 
            variant={isEditing ? "outline" : "default"} 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={profile.name} 
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                value={profile.email} 
                onChange={handleChange}
                disabled={true} // Email should not be editable
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone" 
                value={profile.phone} 
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="domain">Specialization</Label>
              <Input 
                id="domain" 
                name="domain" 
                value={profile.domain} 
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input 
                id="experience" 
                name="experience" 
                value={profile.experience} 
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Input 
                id="education" 
                name="education" 
                value={profile.education} 
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bar_association">Bar Association</Label>
              <Input 
                id="bar_association" 
                name="bar_association" 
                value={profile.bar_association} 
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Office Address</Label>
              <Input 
                id="address" 
                name="address" 
                value={profile.address} 
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Professional Bio</Label>
            <Textarea 
              id="bio" 
              name="bio" 
              value={profile.bio} 
              onChange={handleChange}
              disabled={!isEditing}
              className="min-h-[120px]"
            />
          </div>
          
          {isEditing && (
            <CardFooter className="px-0 pt-4">
              <Button type="submit">Save Changes</Button>
            </CardFooter>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default LawyerProfile;
