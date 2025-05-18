
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Progress } from "@/components/ui/progress";

const LawyerStats = () => {
  // Mock data for charts and stats
  const appointmentData = [
    { month: "Jan", count: 5 },
    { month: "Feb", count: 8 },
    { month: "Mar", count: 12 },
    { month: "Apr", count: 10 },
    { month: "May", count: 15 },
  ];
  
  const caseStats = {
    totalCases: 95,
    casesWon: 87,
    casesOngoing: 5,
    casesLost: 3
  };
  
  const successRate = Math.round((caseStats.casesWon / caseStats.totalCases) * 100);
  
  const domainDistribution = [
    { name: "Corporate Law", value: 45 },
    { name: "Property Law", value: 25 },
    { name: "Family Law", value: 15 },
    { name: "Criminal Law", value: 10 },
    { name: "Other", value: 5 }
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{successRate}%</div>
            <Progress value={successRate} className="h-2 mt-2" />
            <p className="text-sm text-muted-foreground mt-2">
              {caseStats.casesWon} won out of {caseStats.totalCases} total cases
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{caseStats.casesOngoing}</div>
            <p className="text-sm text-muted-foreground mt-2">
              Currently in progress
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <p className="text-sm text-muted-foreground mt-2">
              Across all practice areas
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Appointments by Month</CardTitle>
            <CardDescription>Number of client appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" name="Appointments" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Case Distribution</CardTitle>
            <CardDescription>By practice area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {domainDistribution.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.name}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
          <CardDescription>Revenue and earnings overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="text-sm text-muted-foreground">This Month</div>
              <div className="text-2xl font-bold">₹1,25,000</div>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="text-sm text-muted-foreground">Last Month</div>
              <div className="text-2xl font-bold">₹92,500</div>
            </div>
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="text-sm text-muted-foreground">Year to Date</div>
              <div className="text-2xl font-bold">₹5,48,000</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LawyerStats;
