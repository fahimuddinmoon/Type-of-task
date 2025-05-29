import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect } from 'react';
import { useState } from 'react';
import { auth } from '../../firebase.config';
import UseAxios from './UseAxios';



export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [dark, setDark] = useState(false)
    const axiosSecure = UseAxios()
    const provider = new GoogleAuthProvider()
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const profileUpdate = (updateData) => {
        return updateProfile(auth.currentUser, updateData)
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        setLoading(true)
        signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async currentUser => {
            if (currentUser && currentUser?.photoURL) {
                await axiosSecure.post(`/users/${currentUser?.email}`,
                    {
                        name: currentUser?.displayName,
                        image: currentUser?.photoURL,
                        email: currentUser?.email
                    }
                )
                await axiosSecure.post(`/mode/Change/${currentUser?.email}`,
                    {
                        email: currentUser?.email,
                        mode: 'light'
                    }
                )

                setUser(currentUser)
            } else {

                setUser(null)
            }
            setLoading(false)
        })
        return () => {
            unSubscribe()
        }
    }, [])

    const apiInfo = {
        user,
        setUser,
        loading,
        googleLogin,
        createUser,
        profileUpdate,
        login,
        logout,

    }

    return (
        <AuthContext.Provider value={apiInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;