import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { checkAuthStatus, loginUser, logoutUser, signupUser } from '../helpers/api-communicatio';

type User = {
  name: string;
  email: string;
};

type UserAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkStatus = async () => {
      try {
        const data = await checkAuthStatus();
        if (!isMounted) return;

        if (data) {
          setUser({ name: data.name, email: data.email });
          setIsLoggedIn(true);
        } else {
          clearAuthState(); // fallback in case backend returns null
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        if (isMounted) clearAuthState();
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkStatus();

    return () => {
      isMounted = false;
    };
  }, []);

  const clearAuthState = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  const login = async (email: string, password: string) => {
    try {
      const data = await loginUser(email, password);
      if (data) {
        setUser({ name: data.name, email: data.email });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const data = await signupUser(name, email, password);
      if (data) {
        setUser({ name: data.name, email: data.email });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Signup failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser(); // server-side session clear
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  };

const value: UserAuth = {
    user,
    isLoggedIn,
    loading,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): UserAuth => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

