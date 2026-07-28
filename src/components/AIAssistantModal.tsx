import React, { useState, useRef, useEffect } from 'react';
import { FARM_INFO, PRODUCTS, WORKSHOPS, DIVISIONS } from '../data/farmData';
import { X, Sparkles, Send, Bot, User, Leaf, RefreshCw, HelpCircle } from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I am the Ekow Sam AI Farm Advisor. Ask me anything about our fresh farm produce, Snail & Catfish training workshops, farm tours in Ghana, or commercial farming advice!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const quickPrompts = [
    "How do I buy Giant African Snails?",
    "When is the next Snail Masterclass?",
    "Where is Ekow Sam Farms located?",
    "How to feed commercial catfish in Ghana?"
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    setTimeout(() => {
      let responseText = "";
      const lower = query.toLowerCase();

      if (lower.includes('snail') || lower.includes('heliculture')) {
        responseText = "Ekow Sam Farms is a leader in Heliculture (Snail Farming) in Ghana! We breed Giant African Snails (Archachatina marginata), sell point-of-lay breeders, offer oven-dried snails, and host a 2-Day Snail Masterclass (GHS 500) with 10 starter breeders included.";
      } else if (lower.includes('catfish') || lower.includes('fish') || lower.includes('aquaculture')) {
        responseText = "Our Aquaculture division raises premium African Catfish and Tilapia in clean spring-fed ponds. We sell fresh table fish (GHS 45/kg), oven-smoked catfish vacuum packs (GHS 160/pack of 5), high-yield fingerlings (GHS 600 for 500 shooters), and host 3-Day Aquaculture Breeding Courses.";
      } else if (lower.includes('egg') || lower.includes('poultry') || lower.includes('chicken')) {
        responseText = "We produce over 1,200 crates of fresh large brown eggs daily (GHS 65 per crate of 30) and 100% natural grain-fed dressed broiler chickens (GHS 120 per whole 2.5kg-3kg bird) raised under strict biosecure conditions.";
      } else if (lower.includes('location') || lower.includes('where') || lower.includes('visit') || lower.includes('address')) {
        responseText = `Ekow Sam Farms is located at ${FARM_INFO.location} off the Accra-Cape Coast Highway. Visitors and tour groups are welcome! Call us at ${FARM_INFO.phones[0]} to arrange a guided farm tour.`;
      } else if (lower.includes('training') || lower.includes('workshop') || lower.includes('course') || lower.includes('masterclass')) {
        responseText = `We offer hands-on agribusiness courses: Snail Farming Masterclass (Aug 15-16), Catfish Breeding (Aug 28-30), Poultry Broiler Management (Sept 12-13), and Turnkey Agribusiness Setup (Sept 26). Register directly on our Training page!`;
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('buy') || lower.includes('store')) {
        responseText = "You can view all current farm produce prices and place direct orders through our Farm Store tab. We deliver to Accra, Cape Coast, Kumasi, Tema, and offer free farm pickup.";
      } else {
        responseText = `At Ekow Sam Farms, we operate across 6 divisions: Poultry & Layers, Aquaculture, Heliculture (Snail Farming), Greenhouse Vegetables, Agro-Processing, and Farmers Training. Feel free to ask about any specific division, product, or workshop!`;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMsg]);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full h-[600px] flex flex-col overflow-hidden border border-slate-100 relative">
        {/* Header */}
        <div className="p-4 bg-blue-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-amber-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Ekow Sam AI Farm Advisor</h3>
              <p className="text-xs text-blue-200">24/7 Agribusiness & Produce Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-blue-800 text-blue-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="bg-blue-50 px-4 py-2 border-b border-blue-100 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar">
          <HelpCircle className="w-3.5 h-3.5 text-blue-700 shrink-0" />
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="whitespace-nowrap bg-white hover:bg-blue-100 text-blue-800 border border-blue-200 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-slate-800 text-white'
                    : 'bg-blue-700 text-white'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-300" />}
              </div>

              <div>
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-slate-900 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block px-1">
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 bg-white p-3 rounded-xl border border-slate-200 w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-600" />
              <span>Analyzing farm knowledgebase...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about snail farming, eggs, catfish, training..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-600 bg-slate-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2.5 rounded-xl transition-colors shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
