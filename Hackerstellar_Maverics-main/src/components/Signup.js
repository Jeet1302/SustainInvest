import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        name : "",
        phone : "",
        password : "",
        email:""
    })
    const [msg, setmsg] = useState("");
    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: credentials.name, phone: credentials.phone, password: credentials.password,email: credentials.email})
        });
        const json = await response.json()
        // console.log(json);
        if(json.success){
            navigate("/login");
        }else{
            alert("Invalid Credential");
        }
    }
    return (
        <div className="signup" style={{position:"relative"}}>
            {/* <img src="/img/army-seva.png" style={{position: "absolute",width:"20%", left:"200px",top:"70px"}}/> */}
            <img src="/img/Untitled Design 1.png" style={{position: "absolute",width:"30%", right:"120px",top:"180px"}}/>
            <form  onSubmit={handleSubmit} style={{position:"absolute", left:"200px", top:"150px"}}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label" >Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Contact Number</label>
                    <input type="tel" className="form-control" value={credentials.phone} onChange={onChange} id="phone" name="phone" aria-describedby="emailHelp" required/>
                    <div id="emailHelp" className="form-text">We'll never share your contact with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} name="email" id="email" />
                </div>
                <p>{msg}</p>
                <button type="submit" className="btn" >Register</button>
            </form>
            
        </div>
    )
}