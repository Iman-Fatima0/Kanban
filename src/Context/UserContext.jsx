import React, { createContext, useState, useEffect} from "react";
import subwaycookie from 'js-cookie';
import { jwtDecode } from "jwt-decode"; 
export const DataContext = createContext();

export const UserContext = ({ children }) => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const token = subwaycookie.get('token');
      if (token) {
        const decodedUser = jwtDecode(token); 
        setUser(decodedUser);
      }
    }, []);
  
    const userLoggedIn = (token) => {
      if (token) {
        subwaycookie.set('token', token, { expires: 3 / 24 }); 
        setUser(jwtDecode(token));  
      }
    };
  
    const userLoggedOut = () => {
      subwaycookie.remove('token');  
      setUser(null);  
    };
  
    return (
      <DataContext.Provider value={{ user, userLoggedIn, userLoggedOut }}>
        {children}
      </DataContext.Provider>
    );
  };
  
  export default UserContext;
  