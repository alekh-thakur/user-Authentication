import {useEffect, useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
const SignIn = () =>{
    const navigate = useNavigate();
    const [checked,setChecked] = useState(false);    
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formData,setFormData] = useState({
        email:"",
        password:""
    })

   

    const emailValidation = () =>{
        if(!formData.email.includes("@")){
            setEmailError("Invalid email")
            return false;
        }
        setEmailError("")
        return true;
    }

    const passwordValidation = () =>{
        if(formData.password.trim().length <8){
            setPasswordError("Length must be of 8 characters")
            return false;
        }
        setPasswordError("")
        return true;
    }

    const handleData = (e)=>{
        setFormData({
            ...formData,[e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const isEmailValid = emailValidation();
        const isPasswrodValid = passwordValidation();
        if( isEmailValid && isPasswrodValid){
            try{
                const res = await axios.post("http://localhost:8080/signIn",formData)       
                navigate('/welcome',{
                    state:{name:res.data.name}
                })
                setFormData({
                    email:"",
                    password:""
                })
            }catch(err){
                alert(err.response?.data || "Login failed")
                            
            }
            
             
            
           
        }

        
    }

    return(
        <div className="container">
            <div className="signup-box">
                <h2 className="Signup-head">Sign in </h2>
                <form action=""  onSubmit={handleSubmit}>
                   
                <div className="input-box">
                    <label htmlFor="">E-mail</label>
                    <input name="email" type="email" value={formData.email} onChange={handleData}/>
                    <span className="validation-check">{emailError}</span>
                </div>
                <div className="input-box">
                    <label htmlFor="">Password</label>
                    <input name="password" value={formData.password} type={checked ? "text" : "password"} onChange={handleData} />
                    <span className="validation-check">{passwordError}</span>
                    
                </div>
                <div style={{display:'flex',justifyContent:"space-between"}}>
                    <div>
                        <input type="checkbox" onClick={()=>setChecked(!checked)} name="" id="pass-check" />
                    <label htmlFor="">Show password</label>
                    </div>
                    <div style={{fontSize:"13px",marginRight:"7px"}} >
                       <Link to={'/signUp'}>Create a new account</Link>
                    </div>
                    

                </div>
                <div className="signIn-btnBox">
                    <button className="signIn-btn" type="submit">Sign in</button>
                </div>
                </form>
            </div>
            
        </div>
    )
}

export default SignIn;