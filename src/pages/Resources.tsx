
import { useState } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ResourceCard from "@/components/ResourceCard";

// Mock resources data - in a real app this would come from an API
const resources = [
  {
    id: "1",
    type: "article",
    title: "Understanding Legal Rights in Property Disputes",
    description: "Learn about the fundamental legal rights you have when dealing with property disputes in India. This comprehensive article covers key aspects of property law and common issues faced by property owners.",
    category: "Property Law",
    date: "May 15, 2025",
    readTime: "10 min read",
    gradient: "bg-gradient-to-r from-blue-50 to-indigo-100"
  },
  {
    id: "2",
    type: "guide",
    title: "Complete Guide to Filing a Consumer Complaint",
    description: "A step-by-step guide to help you navigate the process of filing a consumer complaint under the Consumer Protection Act. Includes templates and examples for effective complaints.",
    category: "Consumer Law",
    date: "May 10, 2025",
    readTime: "15 min read",
    gradient: "bg-gradient-to-r from-emerald-50 to-teal-100"
  },
  {
    id: "3",
    type: "template",
    title: "Employment Agreement Template for Small Businesses",
    description: "A legally sound employment agreement template crafted for small business owners in India. Includes all essential clauses and is compliant with current labor laws.",
    category: "Employment Law",
    date: "May 5, 2025",
    readTime: "5 min read",
    gradient: "bg-gradient-to-r from-amber-50 to-yellow-100"
  },
  {
    id: "4",
    type: "article",
    title: "The Role of Mediation in Family Law Cases",
    description: "Discover how mediation can be a powerful alternative to litigation in family law disputes. This article explains the benefits, process, and outcomes of mediation.",
    category: "Family Law",
    date: "April 28, 2025",
    readTime: "12 min read", 
    gradient: "bg-gradient-to-r from-pink-50 to-rose-100"
  },
  {
    id: "5",
    type: "guide",
    title: "Navigating the Corporate Compliance Requirements",
    description: "A comprehensive guide for businesses to understand and meet their compliance obligations under various corporate laws in India.",
    category: "Corporate Law",
    date: "April 22, 2025",
    readTime: "20 min read",
    gradient: "bg-gradient-to-r from-purple-50 to-violet-100"
  },
  {
    id: "6",
    type: "template",
    title: "Last Will and Testament Document Template",
    description: "A properly structured template for creating a legally valid will that ensures your assets are distributed according to your wishes after your passing.",
    category: "Estate Planning",
    date: "April 15, 2025",
    readTime: "8 min read",
    gradient: "bg-gradient-to-r from-blue-50 to-sky-100"
  },
  {
    id: "7",
    type: "article",
    title: "Digital Rights and Privacy Laws in India",
    description: "An overview of the evolving landscape of digital rights and privacy laws in India, including the Personal Data Protection Bill and its implications.",
    category: "Cyber Law",
    date: "April 8, 2025",
    readTime: "14 min read",
    gradient: "bg-gradient-to-r from-teal-50 to-cyan-100"
  },
  {
    id: "8",
    type: "guide",
    title: "How to File RTI Applications Effectively",
    description: "Learn the proper way to file Right to Information (RTI) applications to get the information you need from government bodies.",
    category: "Constitutional Law",
    date: "April 1, 2025",
    readTime: "18 min read",
    gradient: "bg-gradient-to-r from-orange-50 to-amber-100"
  },
  {
    id: "9",
    type: "template",
    title: "Rental Agreement Template with All Essential Clauses",
    description: "A comprehensive rental agreement template that protects both landlords and tenants with all necessary legal clauses and conditions.",
    category: "Real Estate Law",
    date: "March 25, 2025",
    readTime: "7 min read",
    gradient: "bg-gradient-to-r from-lime-50 to-green-100"
  }
];

const Resources = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredResources = activeTab === "all" 
    ? resources 
    : resources.filter(resource => resource.type === activeTab);
  
  return (
    <PageLayout>
      <div className="container py-12">
        <motion.div
          className="space-y-2 text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Legal Resources Library</h1>
          <p className="text-muted-foreground text-lg">
            Access articles, guides, and templates to help you navigate legal processes and understand your rights
          </p>
        </motion.div>
        
        <div className="mb-10 flex justify-center">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="article">Articles</TabsTrigger>
              <TabsTrigger value="guide">Guides</TabsTrigger>
              <TabsTrigger value="template">Templates</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
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
            <p className="text-muted-foreground">No resources found in this category.</p>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Resources;
