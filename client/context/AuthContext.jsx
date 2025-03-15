import React, { useEffect, useState } from 'react';
const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {

    useEffect(() => {
        
    }, [])


    return (
        <AuthContext.Provider >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext)