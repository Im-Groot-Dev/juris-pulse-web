
import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <PageLayout>
      <section className="bg-gradient-to-b from-secondary/40 to-background py-24">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display">About Legal Match</h1>
              <p className="text-xl text-muted-foreground mb-8">
                We're revolutionizing how people connect with legal professionals through 
                AI-powered matching technology that ensures the perfect fit for your legal needs.
              </p>
              <p className="text-lg mb-6">
                Founded in 2023, Legal Match has quickly grown to become India's premier legal 
                services platform, connecting thousands of clients with qualified legal professionals.
              </p>
              <div className="flex flex-wrap gap-8 mb-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">5000+</span>
                  <span className="text-muted-foreground">Qualified Lawyers</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">95%</span>
                  <span className="text-muted-foreground">Client Satisfaction</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">24/7</span>
                  <span className="text-muted-foreground">Support Available</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <div className="bg-primary/20 rounded-tl-3xl rounded-br-3xl w-full aspect-video"></div>
                <div className="absolute -top-4 -right-4 w-full h-full border border-primary rounded-tl-3xl rounded-br-3xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Our Mission & Values
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Accessibility", 
                description: "Making quality legal services available to everyone, regardless of location or budget."
              },
              { 
                title: "Innovation", 
                description: "Using cutting-edge technology to improve the legal service experience for both clients and attorneys."
              },
              { 
                title: "Excellence", 
                description: "Maintaining the highest standards of professionalism and expertise in everything we do."
              },
              { 
                title: "Integrity", 
                description: "Operating with transparency, honesty, and ethical conduct in all our dealings."
              },
              { 
                title: "Empowerment", 
                description: "Giving clients the knowledge and resources they need to make informed legal decisions."
              },
              { 
                title: "Diversity", 
                description: "Celebrating and supporting diversity in the legal profession and the clients we serve."
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                className="bg-muted/30 p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-display">Our Leadership</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the team that's leading the transformation of legal services in India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((_, index) => (
              <motion.div 
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="w-40 h-40 bg-accent/10 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-bold">Executive Name</h3>
                <p className="text-primary mb-2">Position Title</p>
                <p className="text-sm text-muted-foreground">
                  Brief biography of the team member and their expertise.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default AboutPage;
