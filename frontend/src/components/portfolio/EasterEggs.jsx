import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Terminal } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

// Konami Code: up up down down left right left right b a
const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

const terminalLines = [
  { type: 'prompt', text: '$ whoami' },
  { type: 'output', text: 'rithika_annareddy' },
  { type: 'prompt', text: '$ cat ~/about.txt' },
  { type: 'output', text: 'Data Engineer | Pipeline Builder | ML Enthusiast' },
  { type: 'output', text: 'Currently: Building financial data systems at Ooftish' },
  { type: 'output', text: 'Education: OSU \'25 - Statistics + CIS' },
  { type: 'prompt', text: '$ ls ~/skills/' },
  { type: 'output', text: 'python/  sql/  spark/  airflow/  pytorch/  react/' },
  { type: 'prompt', text: '$ echo $STATUS' },
  { type: 'output', text: '\u2705 Open to opportunities' },
  { type: 'prompt', text: '$ cat ~/fun_fact.txt' },
  { type: 'output', text: 'Secured 2nd place nationally in SAE AutoDrive Challenge II \ud83c\udfc6' },
  { type: 'prompt', text: '$ fortune' },
  { type: 'output', text: '"The best time to plant a tree was 20 years ago.' },
  { type: 'output', text: ' The second best time is now." - Chinese Proverb' },
  { type: 'prompt', text: '$ _', cursor: true },
];

const TerminalOverlay = ({ isOpen, onClose, onAchievement }) => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (isOpen && currentLineIndex < terminalLines.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => [...prev, terminalLines[currentLineIndex]]);
        setCurrentLineIndex(prev => prev + 1);
      }, currentLineIndex === 0 ? 500 : 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen, currentLineIndex]);

  useEffect(() => {
    if (isOpen) {
      setDisplayedLines([]);
      setCurrentLineIndex(0);
      onAchievement('terminal');
    }
  }, [isOpen, onAchievement]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
        
        {/* Terminal window */}
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-[#1a1a1a] rounded-lg border border-green-500/30 shadow-2xl shadow-green-500/10 overflow-hidden"
        >
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#252525] border-b border-green-500/20">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="ml-2 text-green-500 text-sm font-mono flex items-center gap-2">
                <Terminal size={14} />
                rithika@portfolio ~ bash
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="h-6 w-6 text-green-500/50 hover:text-green-500 hover:bg-green-500/10"
            >
              <X size={14} />
            </Button>
          </div>

          {/* Terminal content */}
          <div className="p-4 font-mono text-sm h-80 overflow-y-auto terminal-text">
            {displayedLines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-1"
              >
                {line.type === 'prompt' ? (
                  <span className="text-green-400">
                    {line.text}
                    {line.cursor && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="inline-block w-2 h-4 bg-green-400 ml-1"
                      />
                    )}
                  </span>
                ) : (
                  <span className="text-green-300/80 pl-2">{line.text}</span>
                )}
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-4 py-2 bg-[#252525] border-t border-green-500/20 text-xs text-green-500/50 font-mono">
            Press ESC or click outside to close | \u2191\u2191\u2193\u2193\u2190\u2192\u2190\u2192BA unlocked this
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const AchievementPopup = ({ achievement, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      className="fixed bottom-4 right-4 z-[90] p-4 bg-card border border-primary/30 rounded-lg shadow-lg max-w-xs"
    >
      <div className="flex items-center gap-3">
        <div className="text-2xl">\ud83c\udfc6</div>
        <div>
          <p className="font-medium text-sm">{achievement.name}</p>
          <p className="text-xs text-muted-foreground">{achievement.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const EasterEggs = ({ children }) => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [konamiProgress, setKonamiProgress] = useState(0);
  const [achievements, setAchievements] = useState({
    tooltip: false,
    terminal: false,
    skills: false,
  });
  const [showAchievement, setShowAchievement] = useState(null);
  const [achievementCount, setAchievementCount] = useState(0);

  // Konami code listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === KONAMI_CODE[konamiProgress]) {
        const newProgress = konamiProgress + 1;
        setKonamiProgress(newProgress);
        
        if (newProgress === KONAMI_CODE.length) {
          setTerminalOpen(true);
          setKonamiProgress(0);
        }
      } else if (e.code === KONAMI_CODE[0]) {
        setKonamiProgress(1);
      } else {
        setKonamiProgress(0);
      }

      // ESC to close terminal
      if (e.code === 'Escape' && terminalOpen) {
        setTerminalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiProgress, terminalOpen]);

  const handleAchievement = useCallback((type) => {
    if (!achievements[type]) {
      setAchievements(prev => ({ ...prev, [type]: true }));
      setAchievementCount(prev => prev + 1);
      
      const achievementData = {
        tooltip: { name: 'Explorer', description: 'Found a hidden tooltip!' },
        terminal: { name: 'Konami Master', description: 'Unlocked terminal mode!' },
        skills: { name: 'Curious Mind', description: 'Explored the skills map!' },
      };
      
      setShowAchievement(achievementData[type]);
    }
  }, [achievements]);

  // Check for badge achievement
  useEffect(() => {
    if (achievementCount >= 3 && !showAchievement) {
      setShowAchievement({
        name: 'Easter Egg Hunter',
        description: 'Found all 3 hidden interactions!',
      });
    }
  }, [achievementCount, showAchievement]);

  return (
    <>
      {typeof children === 'function' 
        ? children({ onEasterEggFound: handleAchievement })
        : children
      }
      
      {/* Terminal overlay */}
      <TerminalOverlay 
        isOpen={terminalOpen} 
        onClose={() => setTerminalOpen(false)}
        onAchievement={handleAchievement}
      />

      {/* Achievement popup */}
      <AnimatePresence>
        {showAchievement && (
          <AchievementPopup 
            achievement={showAchievement}
            onClose={() => setShowAchievement(null)}
          />
        )}
      </AnimatePresence>

      {/* Achievement counter badge (hidden until first achievement) */}
      {achievementCount > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-4 left-4 z-[80]"
        >
          <Badge variant="secondary" className="gap-1 px-3 py-1.5">
            \ud83c\udfc6 {achievementCount}/3 Found
          </Badge>
        </motion.div>
      )}
    </>
  );
};

export default EasterEggs;
