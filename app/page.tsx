"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LineChart, PieChart } from "@/components/charts";
import { AppLogo } from "@/components/app-logo";

export default function HomePage() {
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [eggData, setEggData] = useState<{ date: string; count: number }[]>([]);
  const [comparisonData, setComparisonData] = useState<{
    today: number;
    yesterday: number;
    difference: number;
    isIncrease: boolean;
  }>({
    today: 0,
    yesterday: 0,
    difference: 0,
    isIncrease: false,
  });

  useEffect(() => {
    // Check if onboarding has been completed
    const onboardingCompleted = localStorage.getItem("onboardingCompleted");
    if (onboardingCompleted === "true") {
      setShowOnboarding(false);
    } else {
      router.push("/onboarding");
    }

    // Load egg data from localStorage
    const storedEggData = localStorage.getItem("eggData");
    if (storedEggData) {
      const parsedData = JSON.parse(storedEggData);
      setEggData(parsedData);

      // Calculate comparison data
      const today = new Date().toISOString().split("T")[0];
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .split("T")[0];

      const todayEntry = parsedData.find((entry: any) => entry.date === today);
      const yesterdayEntry = parsedData.find(
        (entry: any) => entry.date === yesterday
      );

      const todayCount = todayEntry ? todayEntry.count : 0;
      const yesterdayCount = yesterdayEntry ? yesterdayEntry.count : 0;
      const difference = todayCount - yesterdayCount;

      setComparisonData({
        today: todayCount,
        yesterday: yesterdayCount,
        difference: Math.abs(difference),
        isIncrease: difference >= 0,
      });
    }
  }, [router]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="p-4 h-full bg-[#E5C9A6]"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div
        variants={item}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h1 className="text-2xl font-bold text-[#4E342E]">Welcome!</h1>
          <p className="text-[#5D4037]">Egg Production Log</p>
        </div>
        <div onClick={() => router.push("/settings")}>
          <AppLogo />
        </div>
      </motion.div>

      <motion.div
        variants={item}
        className="mb-6 bg-[#D2A679] rounded-lg p-4 shadow-sm min-h-48"
      >
        <h2 className="text-lg font-semibold text-[#text-[#8B5E3C]] mb-2">
          Egg Collection Statistics
        </h2>
        <LineChart data={eggData} />
      </motion.div>

      <motion.div
        variants={item}
        className="bg-[#D2A679] rounded-lg p-4 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-[#3E2723] mb-2">
          Comparison with Previous Day
        </h2>
        <div className="flex items-center justify-center">
          <PieChart
            today={comparisonData.today}
            yesterday={comparisonData.yesterday}
            difference={comparisonData.difference}
            isIncrease={comparisonData.isIncrease}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
