import { useState } from "react";
import { Search, Mic } from "lucide-react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search crop (e.g. Tomato)" }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim());
  };

  const handleVoice = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setQuery(text);
      onSearch(text);
    };
    recognition.start();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-4 bg-card rounded-xl ring-1 ring-border focus:ring-2 focus:ring-primary outline-none transition-all text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <motion.button
        whileTap={{ scale: 0.97 }}
        type="button"
        onClick={handleVoice}
        className="p-4 bg-card rounded-xl ring-1 ring-border hover:ring-primary text-primary transition-all"
        aria-label="Voice search"
      >
        <Mic size={20} />
      </motion.button>
      <motion.button
        whileTap={{ scale: 0.97 }}
        type="submit"
        className="px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all"
      >
        Search
      </motion.button>
    </form>
  );
};

export default SearchBar;
