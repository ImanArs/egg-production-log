"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus, Egg } from "lucide-react"

export default function ReportPage() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [count, setCount] = useState(0)
  const [isSaved, setIsSaved] = useState(false)

  const handleSave = () => {
    // Get existing data from localStorage
    const existingData = localStorage.getItem("eggData")
    const eggData = existingData ? JSON.parse(existingData) : []

    // Check if entry for this date already exists
    const existingEntryIndex = eggData.findIndex((entry: any) => entry.date === date)

    if (existingEntryIndex >= 0) {
      // Update existing entry
      eggData[existingEntryIndex].count = count
    } else {
      // Add new entry
      eggData.push({ date, count })
    }

    // Sort by date
    eggData.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Save to localStorage
    localStorage.setItem("eggData", JSON.stringify(eggData))

    // Show success message
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div className="p-4" variants={container} initial="hidden" animate="show">
      <motion.h1 variants={item} className="text-2xl font-bold text-sky-500 mb-6">
        Add Report
      </motion.h1>

      <motion.p variants={item} className="text-gray-600 mb-6">
        Fill out the form to add data about egg collection
      </motion.p>

      <motion.div variants={item} className="bg-white rounded-lg p-4 shadow-sm mb-4">
        <label className="block text-gray-700 mb-2">Collection Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
      </motion.div>

      <motion.div variants={item} className="bg-white rounded-lg p-4 shadow-sm mb-6">
        <label className="block text-gray-700 mb-2">Number of Eggs</label>
        <div className="flex items-center">
          <button onClick={() => setCount(Math.max(0, count - 1))} className="bg-gray-200 p-2 rounded-l-md">
            -
          </button>
          <input
            type="number"
            min="0"
            value={count}
            onChange={(e) => setCount(Number.parseInt(e.target.value) || 0)}
            className="w-full p-2 border-y border-gray-300 text-center focus:outline-none"
          />
          <button onClick={() => setCount(count + 1)} className="bg-gray-200 p-2 rounded-r-md">
            +
          </button>
        </div>
        <div className="flex items-center mt-2 text-gray-600">
          <Egg className="w-4 h-4 mr-1" />
          <span>Number of eggs collected</span>
        </div>
      </motion.div>

      <motion.button
        variants={item}
        onClick={handleSave}
        className="w-full bg-sky-500 text-white py-3 px-4 rounded-md font-medium shadow-sm hover:bg-sky-600 transition-colors flex items-center justify-center"
      >
        <Plus className="w-5 h-5 mr-2" />
        Save Report
      </motion.button>

      {isSaved && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="mt-4 p-3 bg-green-100 text-green-700 rounded-md text-center"
        >
          Data saved successfully!
        </motion.div>
      )}
    </motion.div>
  )
}

