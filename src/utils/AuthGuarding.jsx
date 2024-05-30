import { useUser } from "@clerk/clerk-react";
import { Navigate, useNavigate } from "react-router-dom";

function AuthGuarding({children}){
    const { isSignedIn, user, isLoaded } = useUser();

    function isLoddedUser() {
        if(user){
            return user;
        }
    }

    return isLoddedUser() ? children : <Navigate to={'/'} />
}


export default AuthGuarding