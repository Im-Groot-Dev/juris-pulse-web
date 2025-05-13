
import React, { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import UserAppointments from "@/components/UserAppointments";

const UserDashboard = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  
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
                    <AvatarImage src={user?.profileImage} alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>{user?.name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
              </CardHeader>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Dashboard Navigation</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-col">
                  {[
                    { id: "profile", name: "Profile" },
                    { id: "appointments", name: "My Appointments" },
                    { id: "saved", name: "Saved Lawyers" },
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
              <h1 className="text-3xl font-bold">Welcome, {user?.name}</h1>
              <p className="text-muted-foreground">
                Manage your legal appointments and saved lawyers
              </p>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="saved">Saved Lawyers</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Profile</CardTitle>
                    <CardDescription>View and manage your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                        <p>{user?.name}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p>{user?.email}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                        <p>{new Date().toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Account Type</p>
                        <p className="capitalize">{user?.role}</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <Button disabled>Edit Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="appointments">
                <UserAppointments />
              </TabsContent>
              
              <TabsContent value="saved">
                <Card>
                  <CardHeader>
                    <CardTitle>Saved Lawyers</CardTitle>
                    <CardDescription>Your list of saved legal professionals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userProfile?.savedLawyers && userProfile.savedLawyers.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* This would show saved lawyers if there were any */}
                        <Card className="bg-muted/30 p-4">
                          <p>You have {userProfile?.savedLawyers.length} saved lawyers</p>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="mt-2"
                            onClick={() => navigate("/find-lawyer")}
                          >
                            Browse Lawyers
                          </Button>
                        </Card>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">You haven't saved any lawyers yet</p>
                        <Button 
                          onClick={() => navigate("/find-lawyer")}
                        >
                          Browse Lawyers
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>Manage your account preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Password</h3>
                      <p className="text-sm text-muted-foreground">Update your password to keep your account secure</p>
                      <Button disabled>Change Password</Button>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Notifications</h3>
                      <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
                      <Button disabled>Manage Notifications</Button>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Privacy</h3>
                      <p className="text-sm text-muted-foreground">Control your privacy settings</p>
                      <Button disabled>Privacy Settings</Button>
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

export default UserDashboard;
