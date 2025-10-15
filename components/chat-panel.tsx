"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { Send, AlertTriangle, CloudRain, Settings, Wind, Eye, EyeOff } from "lucide-react"
import { WeatherPanel } from "@/components/weather-panel"
import { WeatherSettingsModal } from "@/components/weather-settings-modal"

interface ChatMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

interface ChatPanelProps {
  onSubmitChat: (text: string) => void
  onEmergencyToggle: (enabled: boolean) => void
  onHurricaneToggle: (enabled: boolean) => void
  emergencyMode: boolean
  hurricaneMode: boolean
  isLoading?: boolean
  lastSearchResults?: number
  isUsingAI?: boolean
  userLocation?: { lat: number; lng: number } | null
  showCrowdDensity?: boolean
  onToggleCrowdDensity?: (show: boolean) => void
}

export function ChatPanel({ onSubmitChat, onEmergencyToggle, onHurricaneToggle, emergencyMode, hurricaneMode, isLoading = false, lastSearchResults = 0, isUsingAI = false, userLocation, showCrowdDensity = false, onToggleCrowdDensity }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hello! I can help you find emergency resources like shelters, food banks, and clinics. What do you need?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    onSubmitChat(inputText)
    setInputText("")

    // Add response after search completes
    setTimeout(() => {
      let responseText = "";
      if (lastSearchResults > 0) {
        const aiIndicator = isUsingAI ? " (AI-powered)" : " (keyword-based)";
        responseText = `I found ${lastSearchResults} ${lastSearchResults === 1 ? 'resource' : 'resources'} near you${aiIndicator}. Check the map for locations and details.`;
      } else if (emergencyMode) {
        responseText = "I'm searching for emergency shelters in your area...";
      } else {
        responseText = "I'm searching for resources near you...";
      }
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-6 border-b border-[#E0E0E0] flex-shrink-0">
        <h1 className="text-2xl font-bold text-[#212121] mb-4">
          &lt;kevindo.dev&gt;
        </h1>

        {/* Emergency Mode Toggle */}
        <div className="flex items-center justify-between mb-3 p-3 rounded-[12px] bg-[#F8F9FA] hover:bg-[#E0E0E0]/50 transition-all">
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-5 h-5 ${emergencyMode ? "text-[#dc2626]" : "text-[#4F4F4F]"}`} />
            <span className="text-sm font-medium text-[#212121]">Emergency Mode</span>
          </div>
          <Switch
            checked={emergencyMode}
            onCheckedChange={onEmergencyToggle}
            className="data-[state=checked]:bg-[#dc2626]"
          />
        </div>

        {/* Hurricane Display Toggle */}
        <div className="flex items-center justify-between p-3 rounded-[12px] bg-[#F8F9FA] hover:bg-[#E0E0E0]/50 transition-all">
          <div className="flex items-center gap-2">
            <Wind className={`w-5 h-5 ${hurricaneMode ? "text-orange-600" : "text-[#4F4F4F]"}`} />
            <span className="text-sm font-medium text-[#212121]">Hurricane Display</span>
          </div>
          <Switch
            checked={hurricaneMode}
            onCheckedChange={onHurricaneToggle}
            className="data-[state=checked]:bg-orange-600"
          />
        </div>

        {/* Weather Settings Button */}
        <div className="flex justify-center mt-4">
          <WeatherSettingsModal>
            <Button variant="outline" size="sm" className="w-full rounded-[10px] border-[#34C759] text-[#34C759] hover:bg-[#F3FFF3]">
              <Settings className="w-4 h-4 mr-2" />
              Weather Alert Settings
            </Button>
          </WeatherSettingsModal>
        </div>

        {/* Crowd Density Toggle Button */}
        <div className="flex justify-center mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full rounded-[10px] border-[#34C759] text-[#34C759] hover:bg-[#F3FFF3]"
            onClick={() => onToggleCrowdDensity?.(!showCrowdDensity)}
          >
            {showCrowdDensity ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
            {showCrowdDensity ? "Hide Crowd Density" : "Show Crowd Density"}
          </Button>
        </div>
      </div>

      {/* Weather Panel - Fixed at top */}
      {userLocation && (
        <div className="p-4 border-b border-[#E0E0E0] bg-white flex-shrink-0">
          <WeatherPanel lat={userLocation.lat} lng={userLocation.lng} />
        </div>
      )}

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
            <Card
              className={`max-w-[80%] p-3 rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.08)] ${
                message.isUser 
                  ? "bg-[#34C759] text-white" 
                  : "bg-white text-[#212121] border border-[#E0E0E0]"
              }`}
            >
              <p className="text-sm break-words">{message.text}</p>
            </Card>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-[#E0E0E0] flex-shrink-0 bg-white">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask in English or Español…"
            className="flex-1 h-12 text-base rounded-[10px] border-[#E0E0E0] focus:border-[#34C759] focus:ring-[#34C759]"
          />
          <Button 
            type="submit" 
            size="lg" 
            className="h-12 px-4 rounded-[10px] bg-[#34C759] hover:bg-[#2BA84A] shadow-[0_4px_8px_rgba(52,199,89,0.3)]" 
            disabled={isLoading}
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
