
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ClientData {
  id: string;
  name: string;
  email: string;
  phone: string;
  casesCount: number;
  lastAppointment: string;
  profileImage?: string;
}

const LawyerClients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock clients data - in a real app, this would come from the backend
  const clients: ClientData[] = [
    {
      id: "client1",
      name: "Rahul Sharma",
      email: "rahul@example.com",
      phone: "+91 9876543210",
      casesCount: 2,
      lastAppointment: "May 15, 2025",
      profileImage: "https://api.dicebear.com/7.x/personas/svg?seed=Rahul"
    },
    {
      id: "client2",
      name: "Priya Patel",
      email: "priya@example.com",
      phone: "+91 9876543211",
      casesCount: 1,
      lastAppointment: "May 10, 2025",
      profileImage: "https://api.dicebear.com/7.x/personas/svg?seed=Priya"
    },
    {
      id: "client3",
      name: "Amit Kumar",
      email: "amit@example.com",
      phone: "+91 9876543212",
      casesCount: 3,
      lastAppointment: "May 5, 2025",
      profileImage: "https://api.dicebear.com/7.x/personas/svg?seed=Amit"
    },
    {
      id: "client4",
      name: "Sneha Gupta",
      email: "sneha@example.com",
      phone: "+91 9876543213",
      casesCount: 1,
      lastAppointment: "April 28, 2025",
      profileImage: "https://api.dicebear.com/7.x/personas/svg?seed=Sneha"
    }
  ];
  
  // Filter clients based on search query
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Client Management</CardTitle>
        <CardDescription>View and manage your client relationships</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-6">
          <Input
            placeholder="Search clients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Button className="ml-2">Add New Client</Button>
        </div>
        
        <div className="space-y-4">
          {filteredClients.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No clients found</p>
            </div>
          ) : (
            filteredClients.map((client) => (
              <Card key={client.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={client.profileImage} />
                      <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-medium">{client.name}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 text-sm text-muted-foreground">
                        <span>{client.email}</span>
                        <span>{client.phone}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm">
                        <span className="font-medium">{client.casesCount}</span> {client.casesCount === 1 ? "case" : "cases"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Last appointment: {client.lastAppointment}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LawyerClients;
