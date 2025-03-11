"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LineChart } from "@/components/charts";

export default function StatisticsPage() {
  const [eggData, setEggData] = useState<{ date: string; count: number }[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    average: 0,
    highest: 0,
    highestDate: "",
  });

  useEffect(() => {
    // Load egg data from localStorage
    const storedEggData = localStorage.getItem("eggData");
    if (storedEggData) {
      const parsedData = JSON.parse(storedEggData);
      setEggData(parsedData);

      // Calculate statistics
      if (parsedData.length > 0) {
        const total = parsedData.reduce(
          (sum: number, entry: any) => sum + entry.count,
          0
        );
        const average = total / parsedData.length;

        let highest = 0;
        let highestDate = "";

        parsedData.forEach((entry: any) => {
          if (entry.count > highest) {
            highest = entry.count;
            highestDate = entry.date;
          }
        });

        setStats({
          total,
          average: Number.parseFloat(average.toFixed(1)),
          highest,
          highestDate: new Date(highestDate).toLocaleDateString(),
        });
      }
    }
  }, []);

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
      className="p-4 bg-[#E5C9A6]"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.h1
        variants={item}
        className="text-2xl font-bold text-[#8B5E3C] mb-6"
      >
        Statistics
      </motion.h1>

      <motion.div
        variants={item}
        className="mb-6 bg-[#D2B48C] rounded-lg p-4 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-[#8B5E3C] mb-4">
          Egg Collection Chart
        </h2>
        {eggData.length > 0 ? (
          <LineChart data={eggData} />
        ) : (
          <p className="text-gray-500 text-center py-4">No data to display</p>
        )}
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          variants={item}
          className="bg-[#D2B48C] rounded-lg p-4 shadow-sm"
        >
          <h3 className="text-sm text-gray-500 mb-1">Total Collected</h3>
          <p className="text-2xl font-bold text-[#8B5E3C]">{stats.total}</p>
        </motion.div>

        <motion.div
          variants={item}
          className="bg-[#D2B48C] rounded-lg p-4 shadow-sm"
        >
          <h3 className="text-sm text-gray-500 mb-1">Average</h3>
          <p className="text-2xl font-bold text-[#8B5E3C]">{stats.average}</p>
        </motion.div>

        <motion.div
          variants={item}
          className="bg-[#D2B48C] rounded-lg p-4 shadow-sm col-span-2"
        >
          <h3 className="text-sm text-gray-500 mb-1">Best Result</h3>
          <p className="text-2xl font-bold text-[#8B5E3C]">{stats.highest}</p>
          <p className="text-xs text-gray-500">{stats.highestDate}</p>
        </motion.div>
      </div>

      {eggData.length === 0 && (
        <motion.div variants={item} className="text-center text-gray-500 p-4">
          <p>Add egg collection data in the "Report" section</p>
        </motion.div>
      )}
    </motion.div>
  );
}
