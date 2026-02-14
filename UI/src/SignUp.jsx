import {useEffect, useState} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () =>{
    const navigate = useNavigate();
    const [checked,setChecked] = useState(false);    
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [formData,setFormData] = useState({
        name:"",
        email:"",
        password:""
    })

    const nameValidation = () =>{
        if(formData.name.trim().length ===0){
            setNameError("Name is required")
            return false;
        }
        setNameError("");
        return true;
    }

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
        const isNameValid = nameValidation();
        const isEmailValid = emailValidation();
        const isPasswrodValid = passwordValidation();
        if(isNameValid && isEmailValid && isPasswrodValid){
            try{
             const res = await axios.post("http://localhost:8080/signUp",formData)
             navigate("/welcome",{
                state:{name:formData.name}

             })
             setFormData({
                name:"",
                email:"",
                password:""
             })
        }
        catch(err){
            console.error(err);
            alert("Email already exists")            
        }
        }

        
    }

    return(
        <div className="container">
            <div className="signup-box">
                <h2 className="Signup-head">Sign up </h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className="input-box">
                    <label htmlFor="">Full Name</label>
                    <input name="name" type="text" value={formData.name} onChange={handleData}/>
                    <span className="validation-check">{nameError}</span>
                </div>
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
                       <Link to={'/signIn'}>Already have an account?</Link>
                    </div>
                    

                </div>
                <div className="signIn-btnBox">
                    <button className="signIn-btn"  type="submit">Sign up</button>
                </div>
                </form>
            </div>
            
        </div>
    )
}

export default SignUp;