import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";


const SocialLogin = () => {
    const{googleSignIn} = useContext(AuthContext);
    const handleGooleSignIn =() =>{
        googleSignIn()
        .then(result =>{
            console.log(result)
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <div>
            <div className="divider">OR</div>
            <div className="text-center">
                <button onClick={handleGooleSignIn} className="btn btn-circle btn-outline">
                    G
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;