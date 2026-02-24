import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export const ThemeToggle = () => {
  const { isDark, toggleDark, setColorTheme } = useTheme();

//   console.log(isDark,"IsDark", toggleDark)

  return (
    <div className="flex items-center gap-4">
      {/* Dark/Light Toggle */}
      <button onClick={toggleDark} className="p-2 rounded-full hover:bg-slate-800/50 transition">
        {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
      </button>

      {/* Color Theme Selector */}
      <div className="flex gap-2 bg-slate-800/20 p-1.5 rounded-full border border-slate-700">
        <button onClick={() => setColorTheme('default')} className="w-5 h-5 rounded-full bg-blue-500" title="Default" />
        <button onClick={() => setColorTheme('emerald')} className="w-5 h-5 rounded-full bg-emerald-500" title="Emerald" />
      </div>
    </div>
  );
};