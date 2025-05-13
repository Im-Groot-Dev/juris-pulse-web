
import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const services = [
  {
    title: "Legal Consultation",
    description: "Get expert advice on legal matters with personalized consultation sessions.",
    icon: "⚖️",
  },
  {
    title: "Document Review",
    description: "Professional review of legal documents to ensure compliance and protect your interests.",
    icon: "📄",
  },
  {
    title: "Case Representation",
    description: "Full representation in court proceedings with strategic advocacy.",
    icon: "👨‍⚖️",
  },
  {
    title: "Contract Drafting",
    description: "Custom legal documents drafted to protect your business and personal interests.",
    icon: "✍️",
  },
  {
    title: "Dispute Resolution",
    description: "Mediation and arbitration services to resolve conflicts efficiently.",
    icon: "🤝",
  },
  {
    title: "Legal Research",
    description: "In-depth analysis and research on complex legal issues.",
    icon: "🔍",
  },
];

const ServicesPage = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <PageLayout>
      <section className="bg-gradient-to-b from-secondary/40 to-background py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display">Our Legal Services</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive legal solutions tailored to your specific needs with a focus on excellence and client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Card className={`h-full border transition-all duration-300 ${
                  hoveredIndex === index ? "border-primary shadow-lg" : "border-border"
                }`}>
                  <CardHeader>
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <CardTitle className="text-xl font-display">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <button className="text-primary hover:underline text-sm font-medium">
                      Learn more →
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Our Legal Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We follow a structured approach to provide you with the best legal representation.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 max-w-4xl mx-auto">
            {[
              { step: "1", title: "Initial Consultation", desc: "We understand your legal needs" },
              { step: "2", title: "Case Strategy", desc: "We develop a tailored legal strategy" },
              { step: "3", title: "Representation", desc: "We advocate on your behalf" },
              { step: "4", title: "Resolution", desc: "We work toward a favorable outcome" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                className="flex-1 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServicesPage;
