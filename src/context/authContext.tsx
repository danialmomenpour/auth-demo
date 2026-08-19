import {createContext, type ReactNode, useContext, useState,} from "react";

export type UserRole = 'admin' | 'moderator' | 'user';

export type User = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    age: string;
    image: string;
    role: UserRole;
};

type AuthContextType = {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;

    setAccessToken: (token: string | null) => void;
    login: (user: User, accessToken: string , refreshToken:string) => void;
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
    const [refreshToken, setRefreshToken] = useState<string | null>(null);


    const login = (user: User, accessToken: string, refreshToken: string) => {
        setUser(user);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                refreshToken,
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