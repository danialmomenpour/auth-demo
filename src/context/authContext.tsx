import {
    createContext,
    useContext,
    useState,
    type ReactNode,
} from "react";

type UserRole = "admin" | "editor" | "viewer";

export type User = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    role: UserRole;
};

type AuthContextType = {
    user: User | null;
    accessToken: string | null;

    setAccessToken: (token: string | null) => void;
    login: (user: User, accessToken: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);

    const login = (user: User, accessToken: string) => {
        setUser(user);
        setAccessToken(accessToken);
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                setAccessToken,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}