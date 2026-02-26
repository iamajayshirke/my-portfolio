import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export const ThemeToggle = () => {
  const { isDark, toggleDark, colorTheme, setColorTheme } = useTheme();

  return (
    <div className="flex items-center gap-4">
      {/* Mode Toggle */}
      <button 
        onClick={toggleDark} 
        className="p-2 rounded-xl bg-[var(--card-bg)] border border-[var(--card-border)] hover:border-primary transition-all active:scale-95"
      >
        {isDark ? (
          <Sun size={18} className="text-yellow-400" />
        ) : (
          <Moon size={18} className="text-blue-500" />
        )}
      </button>

      {/* Theme Selector */}
      {/* <div className="flex gap-2 bg-[var(--card-bg)] p-1.5 rounded-xl border border-[var(--card-border)]">
        <button 
          onClick={() => setColorTheme('default')} 
          className={`w-6 h-6 rounded-lg bg-blue-500 transition-transform hover:scale-110 ${colorTheme === 'default' ? 'ring-2 ring-offset-2 ring-blue-500 ring-offset-[var(--bg-color)]' : ''}`} 
          title="Blue Professional" 
        />
        <button 
          onClick={() => setColorTheme('emerald')} 
          className={`w-6 h-6 rounded-lg bg-emerald-500 transition-transform hover:scale-110 ${colorTheme === 'emerald' ? 'ring-2 ring-offset-2 ring-emerald-500 ring-offset-[var(--bg-color)]' : ''}`} 
          title="Emerald Growth" 
        />
      </div> */}
    </div>
  );
};