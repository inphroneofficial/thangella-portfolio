import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Bot, Sparkles, User, Send, Mic, MicOff } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
}

interface QuickQuestion {
  id: string;
  text: string;
  keywords: string[];
  response: string;
}

const quickQuestions: QuickQuestion[] = [
  {
    id: "skills",
    text: "Top skills? 💪",
    keywords: ["skill", "skills", "tech", "technology", "know", "can do"],
    response: "🚀 My top skills:\n\n☁️ **AWS Cloud** - EC2, S3, Lambda, VPC\n🔄 **DevOps** - Docker, K8s, Terraform, Jenkins\n📊 **Data** - Python, SQL, Power BI, Tableau\n🤖 **AI** - Prompt Engineering, LLMs\n\nLove building scalable solutions! ✨"
  },
  {
    id: "experience",
    text: "Experience? 📚",
    keywords: ["experience", "work", "job", "intern", "worked"],
    response: "🎓 Fresh **CS graduate** with:\n\n💼 Cloud & DevOps Internship\n🏆 9+ Projects (check portfolio!)\n📜 AWS Certifications\n🌟 Hackathon Participant\n\nEager for new challenges! 🚀"
  },
  {
    id: "projects",
    text: "Projects? 🛠️",
    keywords: ["project", "projects", "built", "build", "made", "create"],
    response: "🔥 Notable projects:\n\n🎥 **Rewind-It** - AI memory journal\n☁️ **AWS CI/CD** - Blue/Green deploys\n📊 **Analytics** - E-commerce & Fraud\n🐳 **K8s Cluster** - Full observability\n\nScroll to Projects section! 👆"
  },
  {
    id: "contact",
    text: "Contact? 📧",
    keywords: ["contact", "reach", "email", "call", "connect", "linkedin"],
    response: "📬 Let's connect!\n\n📧 thangella17@gmail.com\n💼 linkedin.com/in/gthangella\n🐙 github.com\n📍 Hyderabad, India\n\nReach out anytime! 🤝"
  },
  {
    id: "availability",
    text: "Open to work? 💼",
    keywords: ["available", "hire", "hiring", "open", "looking", "job", "opportunity"],
    response: "✅ **Yes, actively seeking!**\n\n🎯 Roles: DevOps, Cloud, Data, AI\n🏢 MNCs & Product Companies\n🌍 Open to remote & relocation\n\nLet's build together! 🚀"
  },
  {
    id: "certifications",
    text: "Certifications? 📜",
    keywords: ["certificate", "certification", "certified", "aws cert"],
    response: "🏅 My certifications:\n\n☁️ **AWS Cloud Practitioner**\n🔧 **DevOps Foundations**\n📊 **Data Analytics**\n🐍 **Python Programming**\n\nAlways learning more! 📚"
  },
  {
    id: "education",
    text: "Education? 🎓",
    keywords: ["education", "degree", "college", "university", "study", "studied"],
    response: "🎓 Education:\n\n📚 **B.sc (Honours) Computer Science and Game Development**\n🏫 Graduated 2024\n⭐ Strong academic record\n🔬 Focus: Cloud, Data, AI\n\nLifelong learner! 🌟"
  },
  {
    id: "devops",
    text: "DevOps skills? 🔧",
    keywords: ["devops", "cicd", "ci/cd", "pipeline", "docker", "kubernetes", "terraform"],
    response: "🔧 DevOps expertise:\n\n🐳 **Docker** - Containerization\n☸️ **Kubernetes** - Orchestration\n🏗️ **Terraform** - IaC\n🔄 **Jenkins** - CI/CD pipelines\n📈 **Prometheus/Grafana** - Monitoring\n\nInfrastructure as code FTW! 💪"
  }
];

// Humorous responses for casual/playful inputs
const casualResponses: { keywords: string[]; responses: string[] }[] = [
  {
    keywords: ["hello", "hi", "hey", "hola", "sup", "yo"],
    responses: [
      "👋 Hey there! Welcome to GT's portfolio!\n\nFeel free to explore or ask me anything! 🚀",
      "🌟 Hello, awesome human! Ready to explore some cool projects? 😎",
      "👋 Hi! I'm GT's digital twin (the cooler one 😜). How can I help?"
    ]
  },
  {
    keywords: ["how are you", "how r u", "how are u", "how're you", "hows it going", "how is it going"],
    responses: [
      "😄 I'm running at 100% efficiency!\n\nNo bugs today (knock on wood 🪵). How about you?",
      "🤖 I'm fantastic! Just here helping GT land his dream job. Living the dream! ✨",
      "💪 Great! Been chatting with awesome people like you all day!"
    ]
  },
  {
    keywords: ["what time", "what's the time", "time is it", "current time"],
    responses: [
      "⏰ Time to check out GT's amazing projects! 😄\n\n(I'm a chatbot, not a clock... but I try! 🕐)",
      "🕐 It's always a good time to hire GT! 😎\n\nFor actual time, check your device corner!",
      "⌚ Time flies when you're browsing a great portfolio! Check Projects section! 🚀"
    ]
  },
  {
    keywords: ["joke", "funny", "make me laugh", "tell me something funny"],
    responses: [
      "😄 Why do programmers prefer dark mode?\n\nBecause light attracts bugs! 🐛💡",
      "🤣 Why did the developer go broke?\n\nBecause he used up all his cache! 💰",
      "😂 How many programmers does it take to change a light bulb?\n\nNone, that's a hardware problem! 💡"
    ]
  },
  {
    keywords: ["who are you", "what are you", "who is this", "about you"],
    responses: [
      "🤖 I'm GT's portfolio assistant!\n\nThink of me as a helpful guide to all things Gadidamalla Thangella! ✨",
      "👋 I'm the friendly bot that knows everything about GT!\n\nAsk me about skills, projects, or just say hi! 😊"
    ]
  },
  {
    keywords: ["thank", "thanks", "thx", "ty", "appreciate"],
    responses: [
      "🙏 You're welcome! Happy to help!\n\nFeel free to ask more questions! 😊",
      "✨ My pleasure! That's what I'm here for!\n\nDon't forget to check out the projects! 🚀",
      "😊 Anytime! Good luck with your search!\n\nGT would love to connect! 📧"
    ]
  },
  {
    keywords: ["bye", "goodbye", "see you", "later", "gtg", "gotta go"],
    responses: [
      "👋 Bye! Thanks for visiting GT's portfolio!\n\nCome back anytime! 🌟",
      "✨ See you later! Don't forget to reach out if interested!\n\n📧 thangella17@gmail.com",
      "🚀 Take care! Hope you found what you were looking for!\n\nGood luck! 🍀"
    ]
  },
  {
    keywords: ["love", "awesome", "amazing", "great", "cool", "nice", "beautiful"],
    responses: [
      "🥰 Aww, thanks! GT put a lot of effort into this!\n\nGlad you like it! ✨",
      "😊 You're too kind! Wait till you see the projects!\n\nThey're even cooler! 🚀",
      "💖 Thanks! Your kind words made my day!\n\n(Even bots have feelings 🤖)"
    ]
  },
  {
    keywords: ["boring", "bad", "hate", "ugly", "sucks"],
    responses: [
      "😅 Oops! Sorry to hear that!\n\nAny suggestions to make it better? Always improving! 🔧",
      "🤔 Tough crowd! Maybe check out the projects?\n\nThey might change your mind! 🚀",
      "😊 Feedback noted! GT is always learning and improving!\n\nGive it another chance? 🙏"
    ]
  },
  {
    keywords: ["help", "what can you do", "options", "menu"],
    responses: [
      "🌟 I can help with:\n\n💼 Skills & Experience\n🛠️ Projects & Work\n📧 Contact Info\n🎓 Education & Certs\n\nJust ask! 😊",
      "👋 Try these topics:\n\n• Skills & Technologies\n• DevOps & AWS\n• Projects & Portfolio\n• Contact & Availability\n\nOr just chat! 🤖"
    ]
  }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content: "👋 Hi! I'm GT's assistant.\n\nAsk me anything or select a question! ✨"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      setShowButton(scrollTop < windowHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const findResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    // Check casual/humorous responses first
    for (const casual of casualResponses) {
      if (casual.keywords.some(keyword => lowerInput.includes(keyword))) {
        const randomIndex = Math.floor(Math.random() * casual.responses.length);
        return casual.responses[randomIndex];
      }
    }
    
    // Check portfolio-related questions
    for (const q of quickQuestions) {
      if (q.keywords.some(keyword => lowerInput.includes(keyword))) {
        return q.response;
      }
    }
    
    return "🤔 Interesting question!\n\nI'm best at portfolio stuff like skills, projects & contact info. Try the quick buttons below! 👇\n\nOr email GT directly: **thangella17@gmail.com** 📧"
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: inputText
    };
    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        type: "bot",
        content: findResponse(inputText)
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleQuestionClick = (question: QuickQuestion) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: question.text
    };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        type: "bot",
        content: question.response
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && showButton && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/25 text-primary-foreground"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-4 right-4 z-50 w-[280px] sm:w-[300px] overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
          >
            {/* Header */}
            <div className="relative overflow-hidden bg-gradient-to-r from-primary to-accent p-2.5">
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs">GT Assistant</h4>
                    <div className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[9px] text-white/80">Online</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-6 w-6 text-white/80 hover:text-white hover:bg-white/20"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="relative h-[180px] overflow-y-auto p-2 space-y-2 bg-background/50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-1.5 ${message.type === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    message.type === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-gradient-to-r from-primary/20 to-accent/20 text-primary"
                  }`}>
                    {message.type === "user" ? (
                      <User className="h-2.5 w-2.5" />
                    ) : (
                      <Sparkles className="h-2.5 w-2.5" />
                    )}
                  </div>
                  <div className={`max-w-[85%] rounded-lg px-2 py-1.5 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-sm"
                      : "bg-secondary text-foreground rounded-tl-sm"
                  }`}>
                    <p className="text-[10px] whitespace-pre-line leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-1.5"
                >
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary/20 to-accent/20">
                    <Sparkles className="h-2.5 w-2.5 text-primary" />
                  </div>
                  <div className="rounded-lg rounded-tl-sm bg-secondary px-2 py-2">
                    <div className="flex gap-1">
                      <span className="h-1 w-1 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1 w-1 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1 w-1 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Field */}
            <div className="border-t border-border bg-card p-2">
              <div className="flex gap-1.5">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="h-7 text-[10px] px-2"
                  disabled={isTyping}
                />
                {recognitionRef.current && (
                  <Button
                    variant={isListening ? "default" : "outline"}
                    size="icon"
                    onClick={toggleListening}
                    className={`h-7 w-7 shrink-0 ${isListening ? "bg-red-500 hover:bg-red-600" : ""}`}
                    disabled={isTyping}
                  >
                    {isListening ? <MicOff className="h-3 w-3" /> : <Mic className="h-3 w-3" />}
                  </Button>
                )}
                <Button
                  variant="default"
                  size="icon"
                  onClick={handleSendMessage}
                  className="h-7 w-7 shrink-0"
                  disabled={!inputText.trim() || isTyping}
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Quick Questions */}
            <div className="border-t border-border bg-card/50 p-1.5">
              <div className="flex flex-wrap gap-1">
                {quickQuestions.map((question) => (
                  <motion.button
                    key={question.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuestionClick(question)}
                    disabled={isTyping}
                    className="rounded-full border border-border bg-secondary/50 px-2 py-0.5 text-[9px] font-medium text-foreground transition-all hover:border-primary/50 hover:bg-primary/10 disabled:opacity-50"
                  >
                    {question.text}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
