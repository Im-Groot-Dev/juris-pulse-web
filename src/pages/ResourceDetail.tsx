
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon } from "lucide-react";

const ResourceDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, id } = useParams();
  const { resource } = location.state || {};
  
  useEffect(() => {
    // If no resource data is provided, redirect back to resources
    if (!resource) {
      navigate("/resources");
    }
  }, [resource, navigate]);
  
  if (!resource) {
    return null; // Will redirect via useEffect
  }
  
  const getTypeTitle = () => {
    switch (type) {
      case "article":
        return "Article";
      case "guide":
        return "Legal Guide";
      case "template":
        return "Legal Template";
      default:
        return "Resource";
    }
  };

  return (
    <PageLayout>
      <div className="container py-12">
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate("/resources")}
            className="mb-6"
          >
            ← Back to Resources
          </Button>
          
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              {resource.category}
            </Badge>
            {type === "article" && (
              <>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <CalendarIcon size={14} />
                  <span>{resource.date}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <ClockIcon size={14} />
                  <span>{resource.readTime}</span>
                </div>
              </>
            )}
          </div>
          
          <h1 className="text-3xl font-bold">{resource.title}</h1>
          {resource.excerpt && (
            <p className="text-lg text-muted-foreground mt-2">{resource.excerpt}</p>
          )}
          {resource.description && (
            <p className="text-lg text-muted-foreground mt-2">{resource.description}</p>
          )}
        </div>
        
        <div className="bg-card rounded-lg border border-border/40 p-6 md:p-8 lg:p-10 my-8 prose prose-zinc dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: resource.content }} />
        </div>
        
        <div className="mt-8 flex justify-between items-center">
          <Button variant="outline" onClick={() => navigate("/resources")}>
            Back to Resources
          </Button>
          
          {type === "template" && (
            <Button>
              Download Template
            </Button>
          )}
          
          {type === "guide" && (
            <Button>
              Download Guide
            </Button>
          )}
          
          <Button onClick={() => navigate("/find-lawyer")}>
            Consult a Lawyer
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default ResourceDetail;
