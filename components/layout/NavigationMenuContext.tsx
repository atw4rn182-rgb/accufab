"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type NavigationMenuContextValue = {
  isOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
};

const NavigationMenuContext = createContext<NavigationMenuContextValue | null>(null);

export function NavigationMenuProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = useCallback(() => setIsOpen(true), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  const toggleMenu = useCallback(() => setIsOpen((open) => !open), []);

  const value = useMemo(
    () => ({ isOpen, openMenu, closeMenu, toggleMenu }),
    [isOpen, openMenu, closeMenu, toggleMenu]
  );

  return <NavigationMenuContext.Provider value={value}>{children}</NavigationMenuContext.Provider>;
}

export function useNavigationMenu() {
  const context = useContext(NavigationMenuContext);
  if (!context) {
    throw new Error("useNavigationMenu must be used within NavigationMenuProvider");
  }
  return context;
}
