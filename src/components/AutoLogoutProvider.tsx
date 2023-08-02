'use client'
import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';


interface SessionProviderProps {
    children: React.ReactNode;

}
type WindowActivityEvent = keyof WindowEventMap;  

  const LogoutProvider: React.FC<SessionProviderProps> = ({ children }) => {
    const { data: session, status } = useSession();
        
    const [inactivityTimeout, setInactivityTimeout] = useState<NodeJS.Timeout | null>(null);
    const [userSignedIn, setUserSignedIn] = useState(false);
    
    const resetInactivityTimeout = () => {
        if (inactivityTimeout) {
          clearTimeout(inactivityTimeout);
        }
    
        // Set a new timeout for auto logout after a period of the of inactivity
        const newInactivityTimeout = setTimeout(() => {          
          signOut({
            callbackUrl: `${window.location.origin}/sign-in`,
          });
          window.alert('You have been signed out due to inactivity');
        }, 15 * 60  * 1000); // 15 minutes (in milliseconds)
    
        setInactivityTimeout(newInactivityTimeout);                
    };
       
    
      useEffect(() => {
        const handleUserActivity = () => {                  
            resetInactivityTimeout();
        };
        const windowEvents: WindowActivityEvent[] = [
            "keypress",
            "scroll",
            "click"
        ];
        if(userSignedIn){
            console.log(userSignedIn,inactivityTimeout);
            windowEvents.forEach(eventName => {
                window.addEventListener(eventName, handleUserActivity);
            });
            
        
            return () => {
                windowEvents.forEach(eventName => {
                    window.removeEventListener(eventName, handleUserActivity);
                });
    
            };
        }
                                        
      }, [userSignedIn,inactivityTimeout]);
  
    // Check if the user is logged in on mount
    
    useEffect(() => {
        if (status === "authenticated" && session.user) {
            // The user is signed in
            setUserSignedIn(true);
        } else {
            // The user is not signed in or the session is still loading
            setUserSignedIn(false);
        }
    }, [session, status]);
      
    return <>{children}</>;
  };
  
  export default LogoutProvider;