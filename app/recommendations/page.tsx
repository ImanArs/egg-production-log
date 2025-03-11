"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { recommendationsData } from "@/data/recommendations";

export default function RecommendationsPage() {
  const router = useRouter();

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
        Recommendations
      </motion.h1>

      <motion.p variants={item} className="text-gray-600 mb-6">
        Useful tips on chicken care to increase egg production
      </motion.p>

      <div className="grid gap-4">
        {recommendationsData.map((recommendation, index) => (
          <motion.div
            key={recommendation.id}
            variants={item}
            className="bg-[#D2B48C] rounded-lg overflow-hidden shadow-sm"
          >
            <div className="aspect-video bg-gray-100 relative">
              <img
                src={recommendation.image}
                alt={recommendation.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2 text-[#935f38]">
                {recommendation.title}
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                {recommendation.description}
              </p>
              <button
                onClick={() =>
                  router.push(`/recommendations/${recommendation.id}`)
                }
                className="text-[#8B5E3C] font-medium flex items-center"
              >
                Read more
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
