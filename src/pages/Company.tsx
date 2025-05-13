
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";

const CompanyPage = () => {
  return (
    <PageLayout>
      <section className="bg-gradient-to-b from-secondary/40 to-background py-24">
        <div className="container px-4 mx-auto">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-display">
              Bridging The Gap Between <span className="text-primary">Legal Needs</span> And <span className="text-primary">Legal Expertise</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Legal Match is revolutionizing how people connect with legal professionals through our AI-powered platform,
              ensuring the perfect match for every legal need.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6 font-display">Our Story</h2>
              <p className="text-lg mb-4">
                Founded in 2023 by a team of legal professionals and technology experts, Legal Match
                was born from a simple observation: finding the right legal representation is often
                challenging, time-consuming, and intimidating for many people.
              </p>
              <p className="text-lg mb-4">
                Our founders experienced firsthand how difficult it can be to match clients with the right
                legal expertise. They set out to create a platform that would make legal services more
                accessible, transparent, and efficient for everyone involved.
              </p>
              <p className="text-lg">
                Today, Legal Match has helped thousands of clients connect with qualified lawyers across
                India, transforming how legal services are discovered and delivered.
              </p>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 h-64 flex items-center justify-center">
                <div className="text-4xl">🏛️</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold mb-4 font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              The Legal Match Difference
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Matching",
                description: "Our proprietary algorithm analyzes over 50 data points to connect you with the perfect legal professional for your specific needs.",
                icon: "🧠",
              },
              {
                title: "Verified Professionals",
                description: "Every lawyer on our platform is thoroughly vetted and verified, ensuring you receive quality legal representation.",
                icon: "✅",
              },
              {
                title: "Transparent Pricing",
                description: "We believe in clear, upfront pricing with no hidden fees or surprises, making legal services more accessible.",
                icon: "💰",
              },
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-background rounded-lg p-6 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl font-bold mb-4 font-display"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Our Mission
              </motion.h2>
              <motion.p 
                className="text-xl text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                To make quality legal services accessible to everyone by simplifying how people connect with legal professionals.
              </motion.p>
            </div>

            <motion.div 
              className="space-y-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {[
                {
                  title: "Democratizing Legal Access",
                  description: "We believe everyone deserves access to quality legal representation, regardless of their background or resources. Our platform breaks down barriers to legal services by making the process simpler, more transparent, and more efficient.",
                },
                {
                  title: "Empowering Legal Professionals",
                  description: "We provide lawyers with the tools and technology they need to streamline their practice, reach more clients, and focus on what they do best: providing excellent legal counsel.",
                },
                {
                  title: "Improving Legal Outcomes",
                  description: "By matching clients with lawyers who have the right expertise and experience for their specific needs, we help improve overall legal outcomes and client satisfaction.",
                },
              ].map((item, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary/5">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 font-display">Join Our Team</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're always looking for talented individuals who are passionate about making legal services 
              more accessible through technology and innovation.
            </p>
            <Button size="lg">
              View Open Positions
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 font-display">Contact Us</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions about Legal Match? We'd love to hear from you.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 rounded-lg bg-muted/30">
                <div className="text-2xl mb-2">📧</div>
                <h3 className="text-lg font-bold mb-1">Email</h3>
                <p className="text-primary">info@legalmatch.com</p>
              </div>
              <div className="p-6 rounded-lg bg-muted/30">
                <div className="text-2xl mb-2">📞</div>
                <h3 className="text-lg font-bold mb-1">Phone</h3>
                <p className="text-primary">+91 1234-567890</p>
              </div>
              <div className="p-6 rounded-lg bg-muted/30">
                <div className="text-2xl mb-2">🏢</div>
                <h3 className="text-lg font-bold mb-1">Office</h3>
                <p className="text-muted-foreground">
                  Legal Match HQ<br />
                  Bangalore, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CompanyPage;
