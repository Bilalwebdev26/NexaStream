import React, { useState } from "react";
import { usethemeStore } from "../../store/themeSelector";
import { Palette } from "lucide-react";
import { THEMES } from "../../constant";

const ThemeSelector = () => {
  const [toggleBtn, setToggleBtn] = useState(false);
  const { theme, settheme } = usethemeStore();
  const handleTheme = (theme) => {
    if (!theme) {
      settheme("coffee");
    }
    settheme(theme);
  };
  return (
    <div className="relative">
      <button tabIndex={0}
        onClick={() => {
          setToggleBtn(!toggleBtn);
        }}
        className="btn btn-ghost btn-circle"
      >
        <Palette />
      </button>
      {/* {toggleBtn === true && (
        <div className="overflow-y-auto absolute w-48 h-64 bg-red-400 -left-48 top-12 transition-all rounded-md p-2 border border-base-300">
          {THEMES.map((theme, index) => (
            <div className="" key={index}>
              <div className="flex items-center gap-2 p-2">
                <Palette className="size-3" />
                <span className="text-xs font-semibold">{theme.label}</span>
                <div className="flex gap-1">
                  {theme.colors.map((col, index) => (
                    <span
                      key={index}
                      style={{ backgroundColor: col }}
                      className="size-2 rounded-full inline-block"
                    ></span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )} */}
      {toggleBtn === true && (
        <div tabIndex={0} className="custom-scroll space-y-2 overflow-y-auto absolute w-48 h-64 bg-primary/20 backdrop-blur-lg -left-40 top-12 transition-all rounded-md p-2 border border-base-300">
          {THEMES.map((themeN, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-2 cursor-pointer hover:bg-gray-600 rounded-md ${
                theme === themeN.name
                  ? "bg-primary/70 text-primary"
                  : "hover:bg-base-content/5"
              }`}
              onClick={() => handleTheme(themeN.name)}
            >
              {/* Left Side: Palette + Label */}
              <div className="flex items-center gap-2 min-w-[70px]">
                <Palette className="size-3 text-white" />
                <span className="text-xs font-semibold truncate text-white/70">
                  {themeN.label}
                </span>
              </div>

              {/* Right Side: Colors */}
              <div className="flex gap-1 min-w-[60px] justify-end">
                {themeN.colors.map((col, cIndex) => (
                  <span
                    key={cIndex}
                    style={{ backgroundColor: col }}
                    className="size-2 rounded-full inline-block"
                  ></span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
