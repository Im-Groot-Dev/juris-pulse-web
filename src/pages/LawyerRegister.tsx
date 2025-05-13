
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DOMAINS, LAW_SCHOOLS, BAR_ASSOCIATIONS, CITIES } from "@/utils/machineLearningSim";

const LawyerRegister = () => {
  const navigate = useNavigate();
  const { registerLawyer } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    contact_number: "",
    city: "",
    address: "",
    experience: "",
    domain: "",
    law_school: "",
    bar_association: "",
    total_cases: "",
    cases_won: "",
    fees_per_hearing: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    if (!formData.first_name || !formData.last_name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all required fields");
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    if (!formData.age || !formData.gender || !formData.contact_number || !formData.city || !formData.address) {
      toast.error("Please fill in all required fields");
      return false;
    }
    
    return true;
  };

  const validateStep3 = () => {
    if (!formData.experience || !formData.domain || !formData.law_school || !formData.bar_association) {
      toast.error("Please fill in all required fields");
      return false;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    } else if (currentStep === 3 && validateStep3()) {
      setCurrentStep(4);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate final step
    if (!formData.total_cases || !formData.cases_won || !formData.fees_per_hearing) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Ensure cases won is not more than total cases
    if (parseInt(formData.cases_won) > parseInt(formData.total_cases)) {
      toast.error("Cases won cannot exceed total cases");
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Process data for submission
      const submissionData = {
        ...formData,
        rating: 4.0, // Default rating for new lawyers
        age: parseInt(formData.age),
        experience: parseInt(formData.experience),
        total_cases: parseInt(formData.total_cases),
        cases_won: parseInt(formData.cases_won),
        fees_per_hearing: parseInt(formData.fees_per_hearing),
      };
      
      await registerLawyer(submissionData);
      toast.success("Registration successful! Redirecting to your dashboard...");
      
      // Navigate to lawyer dashboard
      setTimeout(() => {
        navigate("/lawyer-dashboard");
      }, 2000);
      
    } catch (error) {
      console.error("Lawyer registration failed:", error);
      // Toast is already handled in the registerLawyer function
    } finally {
      setIsLoading(false);
    }
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                placeholder="John"
                value={formData.first_name}
                onChange={(e) => updateField("first_name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                placeholder="Doe"
                value={formData.last_name}
                onChange={(e) => updateField("last_name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="john@example.com"
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => updateField("password", e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => updateField("confirmPassword", e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                placeholder="35"
                type="number"
                min="25"
                max="80"
                value={formData.age}
                onChange={(e) => updateField("age", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => updateField("gender", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                  <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact_number">Contact Number</Label>
              <Input
                id="contact_number"
                placeholder="+91 12345 67890"
                value={formData.contact_number}
                onChange={(e) => updateField("contact_number", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select
                value={formData.city}
                onValueChange={(value) => updateField("city", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your city" />
                </SelectTrigger>
                <SelectContent>
                  {CITIES.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="123 Law Street, City"
                value={formData.address}
                onChange={(e) => updateField("address", e.target.value)}
                required
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Input
                id="experience"
                placeholder="10"
                type="number"
                min="1"
                max="50"
                value={formData.experience}
                onChange={(e) => updateField("experience", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="domain">Legal Domain</Label>
              <Select
                value={formData.domain}
                onValueChange={(value) => updateField("domain", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your legal domain" />
                </SelectTrigger>
                <SelectContent>
                  {DOMAINS.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="law_school">Law School</Label>
              <Select
                value={formData.law_school}
                onValueChange={(value) => updateField("law_school", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your law school" />
                </SelectTrigger>
                <SelectContent>
                  {LAW_SCHOOLS.map((school) => (
                    <SelectItem key={school} value={school}>
                      {school}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bar_association">Bar Association</Label>
              <Select
                value={formData.bar_association}
                onValueChange={(value) => updateField("bar_association", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your bar association" />
                </SelectTrigger>
                <SelectContent>
                  {BAR_ASSOCIATIONS.map((association) => (
                    <SelectItem key={association} value={association}>
                      {association}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="total_cases">Total Cases Handled</Label>
              <Input
                id="total_cases"
                placeholder="100"
                type="number"
                min="0"
                value={formData.total_cases}
                onChange={(e) => updateField("total_cases", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cases_won">Cases Won</Label>
              <Input
                id="cases_won"
                placeholder="75"
                type="number"
                min="0"
                max={formData.total_cases || undefined}
                value={formData.cases_won}
                onChange={(e) => updateField("cases_won", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fees_per_hearing">Fees Per Hearing (₹)</Label>
              <Input
                id="fees_per_hearing"
                placeholder="10000"
                type="number"
                min="1000"
                value={formData.fees_per_hearing}
                onChange={(e) => updateField("fees_per_hearing", e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter your standard fees per hearing in Indian Rupees
              </p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Account Information";
      case 2:
        return "Personal Information";
      case 3:
        return "Professional Details";
      case 4:
        return "Case History & Fees";
      default:
        return "";
    }
  };

  return (
    <PageLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12">
        <div className="w-full max-w-lg px-4 animate-fade-in">
          <Card className="bg-secondary/50 border-secondary backdrop-blur-sm">
            <CardHeader className="space-y-1 items-center text-center">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-accent"
                >
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
              </div>
              <CardTitle className="text-2xl font-display">Lawyer Registration</CardTitle>
              <CardDescription>
                Join our platform to connect with clients seeking legal expertise
              </CardDescription>
              
              {/* Step indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full ${
                      step === currentStep ? "bg-accent" : "bg-muted"
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm font-medium mt-2 text-accent">
                Step {currentStep}: {getStepTitle()}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <form 
                onSubmit={currentStep === 4 ? handleSubmit : (e) => { e.preventDefault(); handleNextStep(); }}
                className="space-y-4"
              >
                {renderFormStep()}
                
                <div className="flex justify-between pt-2">
                  {currentStep > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handlePrevStep}
                    >
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}
                  
                  {currentStep < 4 ? (
                    <Button type="submit">Next</Button>
                  ) : (
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-t-2 border-current" />
                          <span>Registering...</span>
                        </div>
                      ) : (
                        "Complete Registration"
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
            
            <CardFooter className="flex justify-center">
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account?</span>{" "}
                <Link to="/login" className="text-accent hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default LawyerRegister;
