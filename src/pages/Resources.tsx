
import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ResourcesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const resources = {
    articles: [
      {
        title: "Understanding Contract Law Basics",
        category: "Contract Law",
        image: "/placeholder.svg",
        excerpt: "Learn the fundamental principles of contract law and how they apply to everyday agreements.",
        date: "May 10, 2025",
        readTime: "5 min read",
      },
      {
        title: "Employee Rights in the Workplace",
        category: "Employment Law",
        image: "/placeholder.svg",
        excerpt: "A comprehensive guide to understanding your rights as an employee under Indian labor laws.",
        date: "May 5, 2025",
        readTime: "8 min read",
      },
      {
        title: "Property Registration Process in India",
        category: "Real Estate",
        image: "/placeholder.svg",
        excerpt: "Step-by-step guide to navigate the property registration process in different Indian states.",
        date: "April 28, 2025",
        readTime: "10 min read",
      },
      {
        title: "Filing Income Tax Returns: A Guide",
        category: "Tax Law",
        image: "/placeholder.svg",
        excerpt: "Everything you need to know about filing your income tax returns correctly and on time.",
        date: "April 22, 2025",
        readTime: "7 min read",
      },
    ],
    guides: [
      {
        title: "Starting a Business in India",
        category: "Business Law",
        image: "/placeholder.svg",
        excerpt: "A comprehensive legal guide to establishing your business entity in India.",
        downloadLink: "#",
      },
      {
        title: "Family Law Handbook",
        category: "Family Law",
        image: "/placeholder.svg",
        excerpt: "Everything you need to know about marriage, divorce, and child custody laws.",
        downloadLink: "#",
      },
      {
        title: "Intellectual Property Protection Guide",
        category: "IP Law",
        image: "/placeholder.svg",
        excerpt: "Learn how to protect your innovations, creative works, and brand identity.",
        downloadLink: "#",
      },
    ],
    templates: [
      {
        title: "Rental Agreement",
        category: "Real Estate",
        description: "Standard template for residential property rental agreements.",
        downloadLink: "#",
      },
      {
        title: "Employment Contract",
        category: "Employment Law",
        description: "Comprehensive employment agreement template with customizable clauses.",
        downloadLink: "#",
      },
      {
        title: "NDA Template",
        category: "Business Law",
        description: "Non-disclosure agreement to protect sensitive business information.",
        downloadLink: "#",
      },
      {
        title: "Will and Testament",
        category: "Estate Planning",
        description: "Basic template for creating a legally valid will document.",
        downloadLink: "#",
      },
    ],
  };

  // Filter resources based on search query
  const filterResources = (items) => {
    if (!searchQuery) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.excerpt && item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  return (
    <PageLayout>
      <section className="bg-gradient-to-b from-secondary/40 to-background py-24">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display">Legal Resources</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Access free legal articles, guides, and document templates to help you navigate common legal situations.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Tabs defaultValue="articles" className="w-full">
              <TabsList className="w-full max-w-md flex justify-between rounded-full bg-muted/50 p-1 mx-auto mb-8">
                <TabsTrigger value="articles" className="rounded-full">
                  Articles
                </TabsTrigger>
                <TabsTrigger value="guides" className="rounded-full">
                  Guides
                </TabsTrigger>
                <TabsTrigger value="templates" className="rounded-full">
                  Templates
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="articles">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filterResources(resources.articles).map((article, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      <Card className="h-full overflow-hidden transition-all hover:shadow-md">
                        <div className="aspect-video bg-muted/50 relative">
                          <div className="absolute top-2 right-2 bg-primary/90 text-white text-xs py-1 px-2 rounded-full">
                            {article.category}
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="hover:text-primary cursor-pointer transition-colors">
                            {article.title}
                          </CardTitle>
                          <CardDescription>
                            <div className="flex items-center text-xs gap-2">
                              <span>{article.date}</span>
                              <span>•</span>
                              <span>{article.readTime}</span>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{article.excerpt}</p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="link" className="px-0">Read more →</Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                {filterResources(resources.articles).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No articles found matching your search.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="guides">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {filterResources(resources.guides).map((guide, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md">
                        <div className="aspect-[3/2] bg-muted/50 relative">
                          <div className="absolute top-2 right-2 bg-primary/90 text-white text-xs py-1 px-2 rounded-full">
                            {guide.category}
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="hover:text-primary cursor-pointer transition-colors">
                            {guide.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-muted-foreground text-sm">{guide.excerpt}</p>
                        </CardContent>
                        <CardFooter>
                          <Button size="sm" className="w-full">
                            Download Guide
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                {filterResources(resources.guides).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No guides found matching your search.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="templates">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filterResources(resources.templates).map((template, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + (index * 0.1) }}
                    >
                      <Card className="h-full hover:shadow-md transition-all">
                        <CardHeader className="pb-2">
                          <div className="text-xs font-medium text-primary mb-1">
                            {template.category}
                          </div>
                          <CardTitle className="text-lg">{template.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="pb-4">
                          <p className="text-muted-foreground text-sm">{template.description}</p>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button variant="outline" size="sm" className="w-full">
                            Download Template
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                {filterResources(resources.templates).length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No templates found matching your search.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
      
      <section className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 font-display">Need Personalized Legal Help?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our resources provide general information, but every legal situation is unique.
              Connect with a qualified lawyer for advice tailored to your specific needs.
            </p>
            <Button size="lg" className="animate-pulse">
              Find Your Legal Match
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ResourcesPage;
