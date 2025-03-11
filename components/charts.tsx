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
      <div className="absolute left-4 top-0 bottom-4 w-px bg-gray-300"></div>
      <div className="absolute left-4 right-4 bottom-4 h-px bg-gray-300"></div>

      {/* Line and Points */}
      <svg
        className="w-full h-full"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
      >
        <motion.polyline
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1"
          points={data
            .map((point, i) => {
              const x = (i / (data.length - 1)) * 100;
              const y =
                50 - ((point.count - minCount) / (maxCount - minCount)) * 40;
              return `${x},${y}`;
            })
            .join(" ")}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        {data.map((point, i) => {
          const x = (i / (data.length - 1)) * 100;
          const y =
            50 - ((point.count - minCount) / (maxCount - minCount)) * 40;
          return (
            <g key={i}>
              <motion.circle
                cx={x}
                cy={y}
                r="1.5"
                fill="#38bdf8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              />
              <text
                x={x}
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

      {/* Dates on x-axis */}
      <div className="absolute bottom-0 left-4 right-4 flex justify-between text-xs text-gray-500">
        {data.map((point, i) => {
          const date = new Date(point.date);
          const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`;
          return (
            <span key={i} className="w-8 text-center">
              {formattedDate}
            </span>
          );
        })}
      </div>
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
            stroke="#e2e8f0"
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
            stroke="#38bdf8"
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
            stroke="#ef4444"
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
              isIncrease ? "text-red-500" : "text-red-500"
            }`}
          >
            {difference}
          </span>
          <span className="text-gray-500 text-sm">
            {isIncrease ? "more" : "less"}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-around text-xs text-gray-600">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
          <span>{yesterday}</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
          <span>{today}</span>
        </div>
      </div>
    </div>
  );
}
