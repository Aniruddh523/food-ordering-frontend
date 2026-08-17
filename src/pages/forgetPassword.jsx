import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../services/api"

function ForgotPassword(){
    const naviagate = useNavigate();
    const [email,setEmail] = useState("");
    const [loading,setLoading]= useState(false)

    const handelSubmit = async (e)=>{
        e.preventDefault();
        if(!email){
            return toast.error("Please Enter your email")
        }

        try{
            setLoading(true);
            const res = await API.post("/api/users/forgot-password",{
                email,
            });

            toast.success(res.data.massage || "OTP Send Sucessfully");
            naviagate("/verify-otp",{
                state:{email},
            })

        }catch(err){
            console.log(err);
            toast.error("fail to send OTP")
        } finally{
            setLoading(false);
        }

    };

return(
    <div className="min-h-screen flex justify-center item-center bg-gray-100">

        <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-8">
            <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
                Forget password
            </h1>
            <p className="text-gray-500 text-center mb-6">
                Enter your registered email to receive an OTP.  
            </p>
            <form onSubmit={handelSubmit} className="space-y-5">
                <input 
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full border p-3 rounded-lg outline-none focus:right-2 focus:ring-orange-500"
                required
                />

                <button
                type="submit"
                disabled={loading}

                
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold">

                    {loading ? "Sending OTP...": "Send OTP"}
                </button>
            </form>
        </div>
    </div>
)

}

export default ForgotPassword;