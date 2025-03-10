"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { settingsData } from "@/data/settings"

export default function SettingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [setting, setSetting] = useState<any>(null)

  useEffect(() => {
    const id = Number.parseInt(params.id)
    const foundSetting = settingsData.find((item) => item.id === id)

    if (foundSetting) {
      setSetting(foundSetting)
    } else {
      router.push("/settings")
    }
  }, [params.id, router])

  if (!setting) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <motion.div className="p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <button onClick={() => router.push("/settings")} className="flex items-center text-sky-500 mb-4">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to settings
      </button>

      <h1 className="text-2xl font-bold text-sky-500 mb-4">{setting.title}</h1>

      <div className="bg-white rounded-lg p-4 shadow-sm">
        <p className="text-gray-700 whitespace-pre-line">{setting.content}</p>
      </div>
    </motion.div>
  )
}

