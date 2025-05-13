
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import LawyerCard from "@/components/LawyerCard";
import { getLawyerData, LawyerData } from "@/utils/machineLearningSim";
import { toast } from "sonner";

const UserDashboard = () => {
  const { user } = useAuth();
  const [lawyerData, setLawyerData] = useState<LawyerData[]>([]);
  const [recentLawyers, setRecentLawyers] = useState<LawyerData[]>([]);
  const [savedLawyers, setSavedLawyers] = useState<LawyerData[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  
  useEffect(() => {
    // Load lawyer data
    const lawyers = getLawyerData();
    setLawyerData(lawyers);
    
    // Simulate recent and saved lawyers
    // In a real app, this would come from user data in backend
    const randomLawyers = [...lawyers]
      .sort(() => 0.5 - Math.random())
      .slice(0, 10);
    
    setRecentLawyers(randomLawyers.slice(0, 3));
    setSavedLawyers(randomLawyers.slice(3, 6));
    
    // Simulate appointments
    const mockAppointments = [
      {
        id: "apt-1",
        date: new Date(Date.now() + 86400000 * 3), // 3 days from now
        lawyer: randomLawyers[0],
        status: "upcoming",
        type: "Consultation",
        notes: "Initial consultation regarding property dispute case"
      },
      {
        id: "apt-2",
        date: new Date(Date.now() - 86400000 * 2), // 2 days ago
        lawyer: randomLawyers[1],
        status: "completed",
        type: "Case Review",
        notes: "Review of documentation and case strategy"
      }
    ];
    
    setAppointments(mockAppointments);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleScheduleAppointment = () => {
    toast.success("Scheduling feature will be available soon!");
  };

  const handleRemoveSaved = (lawyerId: string) => {
    setSavedLawyers(savedLawyers.filter(l => l.id !== lawyerId));
    toast.success("Lawyer removed from saved list");
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 rounded-xl ring-2 ring-accent/30">
                <AvatarImage src={user?.profileImage} />
                <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-display font-bold">Welcome, {user?.name}</h1>
                <p className="text-muted-foreground">Manage your legal needs and appointments</p>
              </div>
            </div>
            
            <Button onClick={handleScheduleAppointment}>
              Schedule New Appointment
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid grid-cols-4 w-full max-w-lg mx-auto animate-slide-down">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="saved">Saved Lawyers</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="animate-scale-in md:col-span-2 card-3d">
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled meetings with lawyers</CardDescription>
                </CardHeader>
                <CardContent>
                  {appointments.filter(apt => apt.status === 'upcoming').length > 0 ? (
                    <div className="space-y-4">
                      {appointments
                        .filter(apt => apt.status === 'upcoming')
                        .map(appointment => (
                          <div key={appointment.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center gap-4">
                              <Avatar>
                                <AvatarImage src={appointment.lawyer.profileImage} />
                                <AvatarFallback>
                                  {appointment.lawyer.first_name[0]}
                                  {appointment.lawyer.last_name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {appointment.lawyer.first_name} {appointment.lawyer.last_name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {formatDate(appointment.date)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {appointment.type}
                                </p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">You have no upcoming appointments</p>
                      <Button onClick={handleScheduleAppointment}>
                        Schedule an Appointment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="animate-scale-in card-3d" style={{ animationDelay: '100ms' }}>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                  <CardDescription>Summary of your legal activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Appointments</p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold">{appointments.length}</p>
                        <Badge variant="outline">Total</Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Saved Lawyers</p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold">{savedLawyers.length}</p>
                        <Badge variant="outline">Total</Badge>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Recent Views</p>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-bold">{recentLawyers.length}</p>
                        <Badge variant="outline">Last 7 days</Badge>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <Button variant="outline" size="sm" className="w-full">
                        View All Activity
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-display font-medium">Recently Viewed Lawyers</h2>
                <Button variant="link" className="text-accent">View All</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentLawyers.map((lawyer, index) => (
                  <div key={lawyer.id} className="animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <LawyerCard lawyer={lawyer} />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="appointments" className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-display font-medium">Your Appointments</h2>
                <Button onClick={handleScheduleAppointment}>Schedule New</Button>
              </div>
              
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map(appointment => (
                    <Card key={appointment.id} className={`animate-scale-in card-3d ${
                      appointment.status === 'upcoming' ? 'border-l-4 border-l-accent' : ''
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={appointment.lawyer.profileImage} />
                              <AvatarFallback>
                                {appointment.lawyer.first_name[0]}
                                {appointment.lawyer.last_name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {appointment.lawyer.first_name} {appointment.lawyer.last_name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {appointment.lawyer.domain}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-start md:items-end">
                            <div className="flex items-center gap-2">
                              <Badge variant={appointment.status === 'upcoming' ? 'default' : 'secondary'}>
                                {appointment.status === 'upcoming' ? 'Upcoming' : 'Completed'}
                              </Badge>
                              <span className="text-sm font-medium">
                                {formatDate(appointment.date)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {appointment.type} - {appointment.notes}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end mt-4 space-x-2">
                          <Button variant="outline" size="sm">
                            {appointment.status === 'upcoming' ? 'Reschedule' : 'View Details'}
                          </Button>
                          {appointment.status === 'upcoming' && (
                            <Button size="sm">
                              Join Meeting
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-12">
                    <div className="mb-4 text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">No appointments yet</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Schedule your first appointment with a lawyer to get started
                    </p>
                    <Button onClick={handleScheduleAppointment}>
                      Schedule an Appointment
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="saved" className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-display font-medium">Saved Lawyers</h2>
              
              {savedLawyers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedLawyers.map((lawyer, index) => (
                    <div key={lawyer.id} className="relative animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-2 top-2 z-10 bg-background/50 backdrop-blur-sm hover:bg-background/70"
                        onClick={() => handleRemoveSaved(lawyer.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="sr-only">Remove</span>
                      </Button>
                      <LawyerCard lawyer={lawyer} />
                    </div>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-12">
                    <div className="mb-4 text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">No saved lawyers</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Save lawyers you're interested in to compare and contact them later
                    </p>
                    <Button onClick={() => window.location.href = '/find-lawyer'}>
                      Find Lawyers
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-display font-medium">Browsing History</h2>
              
              {recentLawyers.length > 0 ? (
                <div className="space-y-4">
                  {recentLawyers.map((lawyer, index) => (
                    <Card key={lawyer.id} className="animate-scale-in card-3d" style={{ animationDelay: `${index * 100}ms` }}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarImage src={lawyer.profileImage} />
                              <AvatarFallback>
                                {lawyer.first_name[0]}
                                {lawyer.last_name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {lawyer.first_name} {lawyer.last_name}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{lawyer.domain}</span>
                                <span>•</span>
                                <span>Viewed 2 days ago</span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm">View Profile</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-12">
                    <div className="mb-4 text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium mb-2">No browsing history</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Your recent searches and viewed lawyers will appear here
                    </p>
                    <Button onClick={() => window.location.href = '/find-lawyer'}>
                      Start Browsing
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default UserDashboard;
