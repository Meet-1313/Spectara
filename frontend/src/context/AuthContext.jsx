import {createContext,useContext,useState,useEffect} from 'react';
import {currentUser} from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }){
    const [user,setUser]    = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            if(!token){
                setLoading(false);
                return;
            }

            try{
                const data = await currentUser(token);
                setUser(data.user);
                console.log("Context User:", data.user);
            }catch(error){
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                setUser(null);
            }finally{
                setLoading(false);
            }
        }
        checkUser();
    },[]);

    return(
        <AuthContext.Provider 
        value = {{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);