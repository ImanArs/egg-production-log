"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { recommendationsData } from "@/data/recommendations";

export default function RecommendationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [recommendation, setRecommendation] = useState<any>(null);

  useEffect(() => {
    const id = Number.parseInt(params.id);
    const foundRecommendation = recommendationsData.find(
      (item) => item.id === id
    );

    if (foundRecommendation) {
      setRecommendation(foundRecommendation);
    } else {
      router.push("/recommendations");
    }
  }, [params.id, router]);

  if (!recommendation) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <motion.div
      className="p-4 bg-[#E5C9A6]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <button
        onClick={() => router.push("/recommendations")}
        className="flex items-center text-[#8B5E3C] mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to recommendations
      </button>

      <div className="aspect-video bg-[#D2B48C] rounded-lg overflow-hidden mb-4">
        <img
          src={recommendation.image}
          alt={recommendation.title}
          className="w-full h-full object-cover"
        />
      </div>

      <h1 className="text-2xl font-bold text-[#8B5E3C] mb-4">
        {recommendation.title}
      </h1>

      <div className="bg-[#D2B48C] rounded-lg p-4 shadow-sm">
        <p className="text-[#8B5E3C] whitespace-pre-line">
          {recommendation.content}
        </p>
      </div>
    </motion.div>
  );
}
