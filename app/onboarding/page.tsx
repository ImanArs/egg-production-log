"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Egg,
  BarChartIcon as ChartBar,
  BookOpen,
  CheckCircle,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const onboardingSteps = [
    {
      icon: <Egg className="w-12 h-12 text-white" />,
      title: "Welcome to Egg Production Log",
      description: "An app to track the productivity of your chickens",
      buttonText: "Next",
    },
    {
      icon: <ChartBar className="w-12 h-12 text-white" />,
      title: "Track Productivity",
      description:
        "The app will help you keep records and analyze productivity with graphs",
      buttonText: "Next",
    },
    {
      icon: <BookOpen className="w-12 h-12 text-white" />,
      title: "Useful Recommendations",
      description: "Get advice on chicken care to increase egg production",
      buttonText: "Next",
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-white" />,
      title: "Ready to Start?",
      description: "Begin tracking your chickens' productivity right now",
      buttonText: "Start",
    },
  ];

  const handleNext = () => {
    if (step < onboardingSteps.length - 1) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      localStorage.setItem("onboardingCompleted", "true");
      router.push("/");
    }
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex flex-col items-center text-center max-w-md"
        >
          <motion.div className="relative mb-8" animate={pulseAnimation}>
            <div className="absolute inset-0 bg-red-200 rounded-full opacity-30 scale-125" />
            <div className="bg-red-500 rounded-full p-6 relative">
              {onboardingSteps[step].icon}
            </div>
          </motion.div>

          <h1 className="text-2xl font-bold mb-3 text-red-500">
            {onboardingSteps[step].title}
          </h1>

          <p className="text-gray-600 mb-8">
            {onboardingSteps[step].description}
          </p>

          <button
            onClick={handleNext}
            className="bg-red-500 text-white py-3 px-8 rounded-full font-medium shadow-sm hover:bg-red-600 transition-colors"
          >
            {onboardingSteps[step].buttonText}
          </button>

          <div className="flex mt-8 gap-2">
            {onboardingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === step ? "bg-red-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
