
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Clock3Icon, BookOpenIcon, FileTextIcon, FileIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface ResourceCardProps {
  id: string;
  type: string;
  title: string;
  description: string;
  category: string;
  date?: string;
  readTime?: string;
  image?: string;
  gradient?: string;
}

const ResourceCard = ({
  id,
  type,
  title,
  description,
  category,
  date,
  readTime,
  image,
  gradient = "bg-gradient-to-r from-blue-100 to-indigo-100"
}: ResourceCardProps) => {
  // Define icon based on resource type
  const getIcon = () => {
    switch (type) {
      case "article":
        return <FileTextIcon className="h-6 w-6 text-primary" />;
      case "guide":
        return <BookOpenIcon className="h-6 w-6 text-emerald-600" />;
      case "template":
        return <FileIcon className="h-6 w-6 text-amber-600" />;
      default:
        return <FileTextIcon className="h-6 w-6" />;
    }
  };
  
  // Define badge color based on resource type
  const getBadgeVariant = (): "default" | "outline" | "secondary" | "destructive" => {
    switch (type) {
      case "article":
        return "default";
      case "guide":
        return "secondary";
      case "template":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-all h-full flex flex-col card-3d`}>
      {image ? (
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
          />
          <div className={`absolute inset-0 opacity-60 ${gradient}`} />
          <div className="absolute top-3 right-3">
            <Badge variant={getBadgeVariant()} className="capitalize">
              {type}
            </Badge>
          </div>
        </div>
      ) : (
        <div className={`h-48 w-full ${gradient} relative`}>
          <div className="absolute top-4 left-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm">
              {getIcon()}
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <Badge variant={getBadgeVariant()} className="capitalize">
              {type}
            </Badge>
          </div>
        </div>
      )}

      <CardContent className="p-5 flex-grow">
        <h3 className="text-lg font-medium line-clamp-2 mb-2">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>

        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
          {date && (
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-3 w-3" />
              <span>{date}</span>
            </div>
          )}
          {readTime && (
            <div className="flex items-center gap-1">
              <Clock3Icon className="h-3 w-3" />
              <span>{readTime}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 mt-auto border-t">
        <div className="flex justify-between items-center w-full">
          <Badge variant="outline" className="bg-white/50">
            {category}
          </Badge>
          <Button size="sm" asChild>
            <Link to={`/resources/${type}/${id}`}>
              Read More
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
