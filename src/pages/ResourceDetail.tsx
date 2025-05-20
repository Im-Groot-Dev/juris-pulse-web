import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, Clock3Icon, BookmarkIcon, ArrowLeft, BookOpenIcon, FileTextIcon, FileIcon } from "lucide-react";

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
    content: `
      <h2>Introduction to Property Disputes</h2>
      <p>Property disputes are common in India, arising from various factors such as unclear titles, boundary issues, inheritance conflicts, and more. Understanding your legal rights is crucial to protecting your property interests.</p>
      
      <h2>Common Types of Property Disputes</h2>
      <p>Property disputes in India typically fall into several categories:</p>
      <ul>
        <li><strong>Boundary disputes</strong> - Disagreements about where one property ends and another begins</li>
        <li><strong>Title disputes</strong> - Conflicts about who actually owns a piece of property</li>
        <li><strong>Inheritance disputes</strong> - Disagreements among heirs about property distribution</li>
        <li><strong>Tenant-landlord disputes</strong> - Conflicts between property owners and tenants</li>
        <li><strong>Encroachment issues</strong> - When someone builds or extends structures onto neighboring property</li>
      </ul>
      
      <h2>Key Legal Rights in Property Matters</h2>
      <p>As a property owner in India, you have several fundamental rights protected by law:</p>
      <ul>
        <li>The right to possess and enjoy your property peacefully</li>
        <li>The right to exclude others from entering or using your property</li>
        <li>The right to transfer ownership through sale, gift, or will</li>
        <li>The right to reasonable use of your property within zoning laws</li>
        <li>The right to seek legal remedies for property violations</li>
      </ul>
      
      <h2>Important Property Laws in India</h2>
      <p>Several key laws govern property rights and disputes in India:</p>
      <ul>
        <li>The Transfer of Property Act, 1882</li>
        <li>The Registration Act, 1908</li>
        <li>The Indian Succession Act, 1925</li>
        <li>The Specific Relief Act, 1963</li>
        <li>Various state-specific property and tenancy laws</li>
      </ul>
      
      <h2>Legal Documents for Property Protection</h2>
      <p>To protect your property rights, ensure you have these key documents:</p>
      <ul>
        <li>Sale deed or title deed</li>
        <li>Property tax receipts</li>
        <li>Survey documents with clear boundaries</li>
        <li>Mutation records showing your name in government records</li>
        <li>Encumbrance certificate showing no outstanding loans on the property</li>
      </ul>
      
      <h2>Resolving Property Disputes</h2>
      <p>When facing a property dispute, you have several options:</p>
      <ul>
        <li><strong>Negotiation</strong> - Direct discussion with the opposing party</li>
        <li><strong>Mediation</strong> - Using a neutral third party to facilitate agreement</li>
        <li><strong>Legal notice</strong> - Formal communication through a lawyer</li>
        <li><strong>Civil lawsuit</strong> - Filing a case in the appropriate civil court</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Understanding your legal rights in property disputes is essential for protecting your interests. When facing any property-related conflict, it's advisable to consult with a qualified property law expert to assess your specific situation and recommend the most appropriate course of action.</p>
    `,
    relatedResources: ["2", "9", "3"]
  },
  // Add other resources with content
  // ... keep other resources data
];

const ResourceDetail = () => {
  const { type, id } = useParams<{ type: string, id: string }>();
  const navigate = useNavigate();
  const [resource, setResource] = useState<any>(null);
  const [relatedResources, setRelatedResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundResource = resources.find(r => r.id === id && r.type === type);
      
      if (foundResource) {
        setResource(foundResource);
        
        // Get related resources
        if (foundResource.relatedResources) {
          const related = resources.filter(r => 
            foundResource.relatedResources.includes(r.id)
          );
          setRelatedResources(related);
        }
      }
      
      setLoading(false);
    }, 500);
  }, [id, type]);
  
  // Get resource type icon
  const getTypeIcon = () => {
    switch (type) {
      case "article":
        return <FileTextIcon className="h-5 w-5" />;
      case "guide":
        return <BookOpenIcon className="h-5 w-5" />;
      case "template":
        return <FileIcon className="h-5 w-5" />;
      default:
        return <FileTextIcon className="h-5 w-5" />;
    }
  };
  
  if (loading) {
    return (
      <PageLayout>
        <div className="container py-12">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  if (!resource) {
    return (
      <PageLayout>
        <div className="container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Resource Not Found</h1>
            <p className="text-muted-foreground mb-6">
              We couldn't find the resource you're looking for.
            </p>
            <Button onClick={() => navigate("/resources")}>
              Browse All Resources
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="container py-12">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate("/resources")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Resources
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 items-center mb-3">
                <Badge className="capitalize flex items-center gap-1">
                  {getTypeIcon()}
                  {resource.type}
                </Badge>
                <Badge variant="outline">{resource.category}</Badge>
              </div>
              
              <h1 className="text-3xl font-bold">{resource.title}</h1>
              
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                {resource.date && (
                  <div className="flex items-center gap-1">
                    <CalendarIcon className="h-4 w-4" />
                    <span>{resource.date}</span>
                  </div>
                )}
                {resource.readTime && (
                  <div className="flex items-center gap-1">
                    <Clock3Icon className="h-4 w-4" />
                    <span>{resource.readTime}</span>
                  </div>
                )}
              </div>
            </div>
            
            <Card className="mb-8">
              <CardContent className="p-6">
                <div 
                  className="prose prose-indigo max-w-none"
                  dangerouslySetInnerHTML={{ __html: resource.content }}
                />
              </CardContent>
            </Card>
            
            <div className="flex justify-between items-center">
              <Button variant="outline" className="flex items-center gap-2" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2">
                <BookmarkIcon className="h-4 w-4" />
                Save for later
              </Button>
            </div>
          </motion.div>
          
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="space-y-6">
              {/* Related resources */}
              {relatedResources.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
                    <div className="space-y-4">
                      {relatedResources.map(related => (
                        <div 
                          key={related.id}
                          className="border-b pb-3 last:border-0 last:pb-0"
                        >
                          <div className="flex items-start gap-2">
                            <div className="mt-0.5">
                              {related.type === "article" && <FileTextIcon className="h-4 w-4 text-blue-500" />}
                              {related.type === "guide" && <BookOpenIcon className="h-4 w-4 text-emerald-500" />}
                              {related.type === "template" && <FileIcon className="h-4 w-4 text-amber-500" />}
                            </div>
                            <div>
                              <h4 className="font-medium text-sm hover:underline">
                                <button onClick={() => navigate(`/resources/${related.type}/${related.id}`)}>
                                  {related.title}
                                </button>
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs capitalize">
                                  {related.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {related.readTime}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Consultation CTA */}
              <Card className="bg-gradient-to-r from-indigo-50 to-blue-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Need Legal Help?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with experienced lawyers for personalized advice on your legal matters.
                  </p>
                  <Button className="w-full" onClick={() => navigate("/find-lawyer")}>
                    Find a Lawyer
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResourceDetail;
