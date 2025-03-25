export interface User {
    id: string;
    email: string;
    name?: string;
  }
  export interface NavigationItem {
    name: string;
    href: string;
  }
  
  export interface HeaderProps {
    // Add any props the Header might need in the future
    logoSrc?: string;
    companyName?: string;
  }
  
  export interface NavigationProps {
    items: NavigationItem[];
  }
  
  export interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    navigation: NavigationItem[];
  }