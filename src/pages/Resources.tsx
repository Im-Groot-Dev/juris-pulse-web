import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ResourceCard from "@/components/ResourceCard";
import { Input } from "@/components/ui/input";
import { Search, FileTextIcon, BookOpenIcon, FileIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Full resources data is in ResourceDetail.tsx
// This is a shortened version for the listing page
const resources = [
  {
    id: "1",
    type: "article",
    title: "Understanding Legal Rights in Property Disputes",
    description: "Learn about the fundamental legal rights you have when dealing with property disputes in India. This comprehensive article covers key aspects of property law and common issues faced by property owners.",
    category: "Property Law",
    date: "May 15, 2025",
    readTime: "10 min read",
    gradient: "bg-gradient-to-r from-blue-50 to-indigo-100",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
  },
  {
    id: "2",
    type: "guide",
    title: "Complete Guide to Filing a Consumer Complaint",
    description: "A step-by-step guide to help you navigate the process of filing a consumer complaint under the Consumer Protection Act. Includes templates and examples for effective complaints.",
    category: "Consumer Law",
    date: "May 10, 2025",
    readTime: "15 min read",
    gradient: "bg-gradient-to-r from-emerald-50 to-teal-100",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "3",
    type: "template",
    title: "Employment Agreement Template for Small Businesses",
    description: "A legally sound employment agreement template crafted for small business owners in India. Includes all essential clauses and is compliant with current labor laws.",
    category: "Employment Law",
    date: "May 5, 2025",
    readTime: "5 min read",
    gradient: "bg-gradient-to-r from-amber-50 to-yellow-100",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop"
  },
  {
    id: "4",
    type: "article",
    title: "The Role of Mediation in Family Law Cases",
    description: "Discover how mediation can be a powerful alternative to litigation in family law disputes. This article explains the benefits, process, and outcomes of mediation.",
    category: "Family Law",
    date: "April 28, 2025",
    readTime: "12 min read", 
    gradient: "bg-gradient-to-r from-pink-50 to-rose-100",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop"
  },
  {
    id: "5",
    type: "guide",
    title: "Navigating the Corporate Compliance Requirements",
    description: "A comprehensive guide for businesses to understand and meet their compliance obligations under various corporate laws in India.",
    category: "Corporate Law",
    date: "April 22, 2025",
    readTime: "20 min read",
    gradient: "bg-gradient-to-r from-purple-50 to-violet-100",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "6",
    type: "template",
    title: "Last Will and Testament Document Template",
    description: "A properly structured template for creating a legally valid will that ensures your assets are distributed according to your wishes after your passing.",
    category: "Estate Planning",
    date: "April 15, 2025",
    readTime: "8 min read",
    gradient: "bg-gradient-to-r from-blue-50 to-sky-100",
    image: "https://images.unsplash.com/photo-1586282391129-76a6df230234?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "7",
    type: "article",
    title: "Digital Rights and Privacy Laws in India",
    description: "An overview of the evolving landscape of digital rights and privacy laws in India, including the Personal Data Protection Bill and its implications.",
    category: "Cyber Law",
    date: "April 8, 2025",
    readTime: "14 min read",
    gradient: "bg-gradient-to-r from-teal-50 to-cyan-100",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop"
  },
  {
    id: "8",
    type: "guide",
    title: "How to File RTI Applications Effectively",
    description: "Learn the proper way to file Right to Information (RTI) applications to get the information you need from government bodies.",
    category: "Constitutional Law",
    date: "April 1, 2025",
    readTime: "18 min read",
    gradient: "bg-gradient-to-r from-orange-50 to-amber-100",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2012&auto=format&fit=crop"
  },
  {
    id: "9",
    type: "template",
    title: "Rental Agreement Template with All Essential Clauses",
    description: "A comprehensive rental agreement template that protects both landlords and tenants with all necessary legal clauses and conditions.",
    category: "Real Estate Law",
    date: "March 25, 2025",
    readTime: "7 min read",
    gradient: "bg-gradient-to-r from-lime-50 to-green-100",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
  }
];

// Get unique categories from resources
const categories = [...new Set(resources.map(item => item.category))];

const Resources = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Filter resources based on active tab, category and search term
  const filteredResources = resources
    .filter(resource => activeTab === "all" || resource.type === activeTab)
    .filter(resource => !activeCategory || resource.category === activeCategory)
    .filter(resource => 
      searchTerm === "" || 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Handle category filter
  const toggleCategory = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
    }
  };
  
  return (
    <PageLayout>
      <div className="container py-12">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Legal Resources Library</h1>
          <p className="text-muted-foreground text-lg mt-2">
            Access articles, guides, and templates to help you navigate legal processes and understand your rights
          </p>
          
          {/* Search bar */}
          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              className="pl-9 bg-background/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>
        
        <div className="mb-6 flex justify-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="article">Articles</TabsTrigger>
              <TabsTrigger value="guide">Guides</TabsTrigger>
              <TabsTrigger value="template">Templates</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Category filters */}
        {activeTab !== "all" && (
          <motion.div 
            className="mb-8 flex flex-wrap gap-2 justify-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {categories.map(category => (
              <Badge 
                key={category} 
                variant={activeCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </motion.div>
        )}
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredResources.map((resource) => (
            <motion.div
              key={resource.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * parseInt(resource.id) }}
            >
              <ResourceCard {...resource} />
            </motion.div>
          ))}
        </motion.div>
        
        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No resources found matching your search criteria.</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm("");
              setActiveTab("all");
              setActiveCategory(null);
            }}>
              Clear Filters
            </Button>
          </div>
        )}

        {/* Resource types explanation */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="bg-card p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center mb-3">
              <div className="bg-primary/10 p-3 rounded-full mr-3">
                <FileTextIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Articles</h3>
            </div>
            <p className="text-muted-foreground">
              In-depth explorations of important legal topics written by experts. Articles provide analysis and insights to help you understand complex legal concepts.
            </p>
          </motion.div>
          
          <motion.div
            className="bg-card p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center mb-3">
              <div className="bg-emerald-500/10 p-3 rounded-full mr-3">
                <BookOpenIcon className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold">Guides</h3>
            </div>
            <p className="text-muted-foreground">
              Step-by-step instructions and practical advice for navigating legal processes. Guides break down complex procedures into manageable actions.
            </p>
          </motion.div>
          
          <motion.div
            className="bg-card p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center mb-3">
              <div className="bg-amber-500/10 p-3 rounded-full mr-3">
                <FileIcon className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold">Templates</h3>
            </div>
            <p className="text-muted-foreground">
              Ready-to-use legal document formats that you can customize for your specific needs. Save time and ensure you have all essential clauses covered.
            </p>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Resources;
