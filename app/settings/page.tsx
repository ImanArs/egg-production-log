"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Shield, FileText, HelpCircle, ArrowRight } from "lucide-react";
import { settingsData } from "@/data/settings";

export default function SettingsPage() {
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

  const getIcon = (type: string) => {
    switch (type) {
      case "privacy":
        return <Shield className="w-5 h-5 text-[#8B5E3C]" />;
      case "terms":
        return <FileText className="w-5 h-5 text-[#8B5E3C]" />;
      case "support":
        return <HelpCircle className="w-5 h-5 text-[#8B5E3C]" />;
      default:
        return <FileText className="w-5 h-5 text-[#8B5E3C]" />;
    }
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
        Settings
      </motion.h1>

      <div className="grid gap-4">
        {settingsData.map((setting) => (
          <motion.div
            key={setting.id}
            variants={item}
            className="bg-[#D2B48C] rounded-lg p-4 shadow-sm flex items-center"
            onClick={() => router.push(`/settings/${setting.id}`)}
          >
            <div className="bg-[#D2A679] p-2 rounded-full mr-3">
              {getIcon(setting.type)}
            </div>
            <div className="flex-1">
              <h2 className="font-medium">{setting.title}</h2>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={item}
        className="mt-8 text-center text-gray-500 text-sm"
      >
        Egg Production Log v1.0.0
      </motion.div>
    </motion.div>
  );
}
