
import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LawyerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const mockClients = [
    {
      id: "client1",
      name: "Rajesh Sharma",
      issue: "Property Dispute",
      status: "Active",
      nextMeeting: "2025-05-20",
      caseFiled: "2025-04-10",
    },
    {
      id: "client2",
      name: "Priya Malhotra",
      issue: "Divorce Proceedings",
      status: "Active",
      nextMeeting: "2025-05-18",
      caseFiled: "2025-03-22",
    },
    {
      id: "client3",
      name: "Amit Patel",
      issue: "Corporate Contract",
      status: "Pending",
      nextMeeting: "2025-05-25",
      caseFiled: "2025-05-05",
    },
    {
      id: "client4",
      name: "Neha Gupta",
      issue: "Will Execution",
      status: "Completed",
      nextMeeting: null,
      caseFiled: "2025-02-15",
    },
  ];

  const mockAnalytics = {
    clientsThisMonth: 5,
    activeClients: 10,
    completedCases: 47,
    totalRevenue: "₹1,25,000",
    winRate: 92,
    avgRating: 4.8,
  };

  const handleContactClient = (clientName) => {
    toast.success(`Sending message to ${clientName}`);
  };

  const handleUpdateProfile = () => {
    toast.success("Profile updated successfully!");
  };

  return (
    <PageLayout>
      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <motion.div
            className="w-full lg:w-1/4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-6">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarImage src={user?.profileImage || ""} alt={user?.name} />
                    <AvatarFallback className="text-2xl">{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{user?.name}</CardTitle>
                <CardDescription>
                  {user?.email}
                  <div className="mt-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    Verified Lawyer
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Specialty:</span>
                  <span className="font-medium ml-2">Corporate Law</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-medium ml-2">12 years</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Cases Won:</span>
                  <span className="font-medium ml-2">87 / 95</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Rating:</span>
                  <span className="font-medium ml-2">
                    4.8/5 <span className="text-amber-500">★★★★★</span>
                  </span>
                </div>
                <div className="pt-2">
                  <Button onClick={handleUpdateProfile} className="w-full">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Dashboard Navigation</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col">
                  {[
                    { id: "overview", name: "Overview" },
                    { id: "clients", name: "My Clients" },
                    { id: "cases", name: "Active Cases" },
                    { id: "calendar", name: "Calendar" },
                    { id: "documents", name: "Documents" },
                    { id: "billing", name: "Billing & Payments" },
                    { id: "settings", name: "Settings" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      className={`p-3 text-left text-sm hover:bg-muted/50 transition-colors ${
                        activeTab === item.id ? "bg-muted font-medium" : ""
                      }`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="w-full lg:w-3/4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Welcome back, {user?.name?.split(' ')[0]}</h1>
              <p className="text-muted-foreground">
                Here's what's happening with your practice today.
              </p>
            </div>

            <Tabs defaultValue="overview" className="mb-8">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="clients">Clients</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                {/* Analytics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {[
                    {
                      title: "New Clients",
                      value: mockAnalytics.clientsThisMonth,
                      description: "this month",
                      change: "+2",
                      trend: "up",
                    },
                    {
                      title: "Active Clients",
                      value: mockAnalytics.activeClients,
                      description: "total",
                      change: "-1",
                      trend: "down",
                    },
                    {
                      title: "Cases Won",
                      value: mockAnalytics.completedCases,
                      description: "all time",
                      change: "+3",
                      trend: "up",
                    },
                    {
                      title: "Total Revenue",
                      value: mockAnalytics.totalRevenue,
                      description: "this month",
                      change: "+₹15,000",
                      trend: "up",
                    },
                    {
                      title: "Win Rate",
                      value: `${mockAnalytics.winRate}%`,
                      description: "all time",
                      change: "+2%",
                      trend: "up",
                    },
                    {
                      title: "Client Rating",
                      value: mockAnalytics.avgRating,
                      description: "average",
                      change: "+0.2",
                      trend: "up",
                    },
                  ].map((stat, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">
                          {stat.description}{" "}
                          <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                            {stat.change}
                          </span>
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recent Clients */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Recent Clients</CardTitle>
                    <CardDescription>
                      Your most recent client interactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockClients.slice(0, 3).map((client) => (
                        <div key={client.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{client.name}</div>
                              <div className="text-sm text-muted-foreground">{client.issue}</div>
                            </div>
                          </div>
                          <div>
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              client.status === "Active" ? "bg-green-100 text-green-700" :
                              client.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                              "bg-blue-100 text-blue-700"
                            }`}>
                              {client.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("clients")}>
                      View All Clients
                    </Button>
                  </CardFooter>
                </Card>

                {/* Performance Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Your current performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Client Satisfaction</span>
                          <span className="text-sm font-medium">95%</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Case Resolution Time</span>
                          <span className="text-sm font-medium">82%</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Document Efficiency</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Response Time</span>
                          <span className="text-sm font-medium">90%</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clients">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>All Clients</CardTitle>
                        <CardDescription>Manage your client relationships</CardDescription>
                      </div>
                      <Button size="sm">Add New Client</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockClients.map((client) => (
                        <div key={client.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-4">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{client.name}</div>
                              <div className="text-sm text-muted-foreground">{client.issue}</div>
                            </div>
                          </div>
                          <div className="flex flex-col sm:items-end gap-2">
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              client.status === "Active" ? "bg-green-100 text-green-700" :
                              client.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                              "bg-blue-100 text-blue-700"
                            }`}>
                              {client.status}
                            </span>
                            <div className="text-xs text-muted-foreground">
                              {client.nextMeeting 
                                ? `Next meeting: ${new Date(client.nextMeeting).toLocaleDateString()}`
                                : "No upcoming meetings"}
                            </div>
                          </div>
                          <div className="flex gap-2 self-end sm:self-center mt-2 sm:mt-0">
                            <Button size="sm" variant="outline" onClick={() => handleContactClient(client.name)}>
                              Contact
                            </Button>
                            <Button size="sm">View Details</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="calendar">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Calendar</CardTitle>
                        <CardDescription>Your upcoming appointments and deadlines</CardDescription>
                      </div>
                      <Button size="sm">Add Event</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      Calendar view coming soon
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>My Documents</CardTitle>
                        <CardDescription>Manage your legal documents and templates</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Upload</Button>
                        <Button size="sm">Create New</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                      Document management coming soon
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LawyerDashboard;
