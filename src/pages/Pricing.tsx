
import { useState } from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const pricingPlans = [
    {
      name: "Basic",
      description: "Essential legal services for individuals",
      monthlyPrice: "₹499",
      annualPrice: "₹4,990",
      features: [
        "AI-powered lawyer matching",
        "Basic legal document review",
        "Email support",
        "1 free consultation/month",
      ],
      highlighted: false,
    },
    {
      name: "Professional",
      description: "Comprehensive coverage for growing needs",
      monthlyPrice: "₹1,499",
      annualPrice: "₹14,990",
      features: [
        "Everything in Basic",
        "Priority lawyer matching",
        "Unlimited document reviews",
        "3 free consultations/month",
        "Phone support",
        "Legal form templates",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      description: "Full legal support for businesses",
      monthlyPrice: "₹3,999",
      annualPrice: "₹39,990",
      features: [
        "Everything in Professional",
        "Dedicated legal team",
        "Unlimited consultations",
        "24/7 emergency support",
        "Contract drafting assistance",
        "Legal risk assessment",
        "Company legal health check",
      ],
      highlighted: false,
    },
  ];

  return (
    <PageLayout>
      <section className="bg-gradient-to-b from-secondary/40 to-background py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 font-display"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Choose the plan that fits your legal needs, with no hidden fees
            </motion.p>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Tabs defaultValue="monthly" className="inline-flex">
                <TabsList className="grid w-64 grid-cols-2">
                  <TabsTrigger 
                    value="monthly" 
                    onClick={() => setBillingCycle("monthly")}
                    className={billingCycle === "monthly" ? "data-[state=active]:bg-primary" : ""}
                  >
                    Monthly
                  </TabsTrigger>
                  <TabsTrigger 
                    value="annual" 
                    onClick={() => setBillingCycle("annual")}
                    className={billingCycle === "annual" ? "data-[state=active]:bg-primary" : ""}
                  >
                    Annual (10% off)
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => {
              const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
              const planDelay = 0.3 + (index * 0.1);
              
              return (
                <motion.div 
                  key={index}
                  className={`${index === 1 ? "md:-mt-6" : ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: planDelay }}
                >
                  <Card className={`h-full relative overflow-hidden ${
                    plan.highlighted
                      ? "border-primary shadow-lg shadow-primary/20"
                      : "border-border"
                  }`}>
                    {plan.highlighted && (
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-medium">
                        Most Popular
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <span className="text-3xl font-bold">{price}</span>
                        <span className="text-muted-foreground ml-1">
                          {billingCycle === "monthly" ? "/month" : "/year"}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant={plan.highlighted ? "default" : "outline"}
                        className="w-full"
                      >
                        Get Started
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 font-display">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Find answers to common questions about our pricing and services
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "Can I change plans later?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated difference. When downgrading, the new rate will apply at the start of the next billing cycle."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, UPI payments, net banking, and wallet payments through our secure payment gateway."
                },
                {
                  question: "Is there a refund policy?",
                  answer: "Yes, we offer a 7-day money-back guarantee for all new subscriptions if you're not satisfied with our service."
                },
                {
                  question: "Do I need to sign a long-term contract?",
                  answer: "No, all our plans are on a month-to-month or annual basis with no long-term commitment required."
                },
                {
                  question: "Are there any hidden fees?",
                  answer: "No, the price you see is the price you pay. There are no hidden fees or surprise charges."
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="bg-muted/30 p-6 rounded-lg"
                >
                  <h3 className="font-bold mb-2">{item.question}</h3>
                  <p className="text-muted-foreground text-sm">{item.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PricingPage;
