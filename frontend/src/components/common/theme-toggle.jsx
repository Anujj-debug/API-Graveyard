import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" aria-label="Toggle color theme" disabled className="relative">
        <span className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    );
  }

  // Handle system preference resolution or explicit theme
  const currentTheme = theme === "system" ? 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") 
    : theme;

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label="Toggle color theme"
      title={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="relative overflow-hidden"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
