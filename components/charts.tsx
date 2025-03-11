"use client";

import { motion } from "framer-motion";

interface LineChartProps {
  data: { date: string; count: number }[];
}

export function LineChart({ data }: LineChartProps) {
  if (data.length === 0) return null;

  // Find min and max values
  const counts = data.map((item) => item.count);
  const maxCount = Math.max(...counts, 10);
  const minCount = 0;

  return (
    <div className="relative w-full min-h-48 h-48 flex flex-col items-center">
      {/* Axes */}
      <div className="absolute left-4 top-0 bottom-4 w-px bg-[#8B5E3C]"></div>
      <div className="absolute left-4 right-4 bottom-4 h-px bg-[#8B5E3C]"></div>

      {/* Line and Points */}
      <svg
        className="w-[100%] h-[100%] px-4"
        viewBox="0 0 300 50"
        preserveAspectRatio="none"
      >
        <polyline
          fill="none"
          stroke="#8B5E3C"
          strokeWidth="1"
          points={data
            .map((point, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y =
                50 - ((point.count - minCount) / (maxCount - minCount)) * 40;
              return `${x},${y}`;
            })
            .join(" ")}
        />
        {data.map((point, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y =
            50 - ((point.count - minCount) / (maxCount - minCount)) * 40;
          return (
            <g key={i}>
              <circle cx={x + 1.4} cy={y} r="1.5" fill="#8B5E3C" />
              <text
                x={x + 1.5}
                y={y - 2}
                fontSize="2"
                textAnchor="middle"
                fill="#0f172a"
              >
                {point.count}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

interface PieChartProps {
  today: number;
  yesterday: number;
  difference: number;
  isIncrease: boolean;
}
export function PieChart({
  today,
  yesterday,
  difference,
  isIncrease,
}: PieChartProps) {
  const total = today + yesterday;
  const todayPercentage = total > 0 ? (today / total) * 100 : 50;
  const yesterdayPercentage = 100 - todayPercentage;

  return (
    <div className="relative flex flex-col items-center w-48 h-48">
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Background Circle */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="absolute"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#E5C9A6"
            strokeWidth="10"
          />
        </svg>

        {/* Today's Data */}
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="absolute"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#8B5E3C"
            strokeWidth="10"
            strokeDasharray="282.6"
            strokeDashoffset={282.6 * (1 - todayPercentage / 100)}
            initial={{ strokeDashoffset: 282.6 }}
            animate={{ strokeDashoffset: 282.6 * (1 - todayPercentage / 100) }}
            transition={{ duration: 1 }}
            strokeLinecap="round"
          />
        </motion.svg>

        {/* Yesterday's Data */}
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="absolute"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#A67B5B"
            strokeWidth="10"
            strokeDasharray="282.6"
            strokeDashoffset={(282.6 * todayPercentage) / 100}
            initial={{ strokeDashoffset: 282.6 }}
            animate={{ strokeDashoffset: (282.6 * todayPercentage) / 100 }}
            transition={{ duration: 1 }}
            strokeLinecap="round"
          />
        </motion.svg>

        {/* Center Text */}
        <div className="absolute flex flex-col items-center">
          <span
            className={`text-2xl font-bold ${
              isIncrease ? "text-[#8B5E3C]" : "text-[#A67B5B]"
            }`}
          >
            {isIncrease ? "+" : "-"}
            {difference}
          </span>
        </div>
      </div>
    </div>
  );
}
