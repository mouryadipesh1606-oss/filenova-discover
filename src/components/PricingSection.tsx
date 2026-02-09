import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For casual users",
    features: [
      "5 conversions per day",
      "Max 10MB file size",
      "Standard quality",
      "Basic formats",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For power users & teams",
    features: [
      "Unlimited conversions",
      "Max 500MB file size",
      "Maximum quality",
      "All formats supported",
      "Batch conversion",
      "Priority processing",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 md:py-28 bg-card/30 border-y">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Simple Pricing</h2>
          <p className="text-muted-foreground">No hidden fees. Cancel anytime.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 ${
                plan.highlighted
                  ? "gradient-bg text-primary-foreground shadow-2xl shadow-primary/20 scale-[1.02]"
                  : "glass-hover"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-background text-foreground text-xs font-semibold shadow-lg">
                  <Sparkles className="h-3 w-3" /> Most Popular
                </div>
              )}
              <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
              <p className={`text-sm mb-5 ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {plan.description}
              </p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className={`text-sm mb-1 ${plan.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {plan.period}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.highlighted
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "gradient-bg text-primary-foreground border-0"
                }`}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
