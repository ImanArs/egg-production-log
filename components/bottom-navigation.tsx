"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, PlusCircle, BookOpen, Settings, BarChart2 } from "lucide-react";

export function BottomNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { icon: Home, label: "Home", path: "/" },
    { icon: PlusCircle, label: "Report", path: "/report" },
    { icon: BarChart2, label: "Statistics", path: "/statistics" },
    { icon: BookOpen, label: "Tips", path: "/recommendations" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  useEffect(() => {
    // Set active tab based on current path
    const index = tabs.findIndex((tab) => pathname === tab.path);
    if (index !== -1) {
      setActiveTab(index);
    } else if (pathname.startsWith("/recommendations/")) {
      setActiveTab(3);
    } else if (pathname.startsWith("/settings/")) {
      setActiveTab(4);
    }
  }, [pathname]);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    router.push(tabs[index].path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#E5C9A6] border-t border-[#D2B48C] z-10">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map((tab, index) => {
          const Icon = tab.icon;
          const isActive = activeTab === index;

          return (
            <button
              key={index}
              className="relative flex flex-col items-center justify-center w-full h-full"
              onClick={() => handleTabChange(index)}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#D2A679] rounded-full w-12 h-12 mx-auto"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon
                className={`w-5 h-5 relative z-10 mb-3 ${
                  isActive ? "text-[#8B5E3C]" : "text-[#A67B5B]"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
