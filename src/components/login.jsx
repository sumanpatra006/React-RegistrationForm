import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import image from '../assets/image.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { auth } from "./firebase";
import { toast } from "react-toastify";
// import SignInwithGoogle from "./signInWIthGoogle";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in Successfully");
            window.location.href = "/profile";
            toast.success("User logged in Successfully", {
                position: "top-center",
            });
        } catch (error) {
            console.log(error.message);

            toast.error(error.message, {
                position: "bottom-center",
            });
        }
    };

    return (
        <div className="container flex items-center ">
            <img src={image} alt="nature image" className="max-h-screen w-6/12 object-cover" />
            <div className="registration p-8">
                <h1 className="font-bold text-4xl">Login to enter the website</h1>
                <p>to share your adventure and follow others</p>
                <form onSubmit={handleSubmit} className="inputfield flex flex-col gap-7 py-6">
                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control p-2 border-0 border-b-2 w-full"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control p-2 border-0 border-b-2 w-full"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary border-2 border-black w-fit rounded-3xl px-4 py-1.5 font-bold">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        New user <a href="/register" className=" link">Register Here</a>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;

