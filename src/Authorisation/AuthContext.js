import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [publicKey, setPublicKey] = useState(null);

  const handleSetPublicKey = (key) => {
    setPublicKey(key);
  };

  return (
    <AuthContext.Provider value={{ publicKey, setPublicKey: handleSetPublicKey }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
