import React, { createContext, useState, FC } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

interface AuthContextInterface {
    user: FirebaseAuthTypes.User | null;
    confirm: FirebaseAuthTypes.ConfirmationResult | null;
    setUser: React.Dispatch<React.SetStateAction<any>>;
    setConfirm: React.Dispatch<React.SetStateAction<any>>;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    phoneLogin: (phone: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextInterface>({
    user: null,
    confirm: null,
    setUser: () => null,
    setConfirm: () => null,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
    phoneLogin: async () => {}
});

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                confirm,
                setConfirm,
                login: async (email: string, password: string) => {
                    try {
                        await auth().signInWithEmailAndPassword(
                            email,
                            password
                        );
                    } catch (e: any) {
                        console.error(e.code);
                        return e.code;
                    }
                },
                register: async (email: string, password: string) => {
                    try {
                        await auth().createUserWithEmailAndPassword(
                            email,
                            password
                        );
                    } catch (e) {
                        console.log(e);
                        throw e;
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    } catch (e) {
                        console.error(e);
                    }
                },
                phoneLogin: async (phone: string) => {
                    try {
                        const confirmation = await auth().signInWithPhoneNumber(phone);
                        setConfirm(confirmation);
                    } catch (e) {
                        console.error(e);
                        throw e;
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
