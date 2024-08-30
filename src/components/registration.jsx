import { useState, useEffect } from 'react';
import image from '../assets/image.png';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase';
import { setDoc, doc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegistrationPage = () => {
  const [passCheck, setPassCheck] = useState(false);
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mailcheck, setMailcheck] = useState(false);
  const [valid, setValid] = useState(false);
  const [name, setName] = useState('')
  const [namecheck, setNamecheck] = useState(false)

  function handlePassword(e) {
    const value = e.target.value;
    setPassword(value);
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (passwordPattern.test(value)) {
      setPassCheck(true);
    } else {
      setPassCheck(false);
    }
  }

  function handleName(e) {
    setName(e.target.value);
    if ((e.target.value) == '') {
      setNamecheck(false)
    } else {
      setNamecheck(true)
    }
  }

  function handleEmail(e) {
    const value = e.target.value;
    setEmail(value);

    if (value.includes('@gmail.com')) {
      setMailcheck(true);
    } else {
      setMailcheck(false);
    }
  }

  useEffect(() => {
    setValid(passCheck && mailcheck && namecheck);
  }, [passCheck, mailcheck, namecheck]);

  function toggleVisibility() {
    setVisible(!visible);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      const user = auth.currentUser;
      console.log(user);
      console.log('registered successfully');
      toast.success("User registered successfully", {
        position: 'top-center'
      });
      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          name: name,
        });
      }


    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: 'bottom-center'
      });

    }
  }

  return (
    <>
      <div className="container flex items-center ">
        <img src={image} alt="nature image" className="max-h-screen w-6/12 object-cover" />
        <div className="registration p-8">
          <h1 className="font-bold text-4xl">Register to enter the website</h1>
          <p>to share your adventure and follow others</p>
          <form onSubmit={handleRegister} className="inputfield flex flex-col gap-7 py-6 ">
            <div>
              <input type="text" value={name} onChange={handleName} required placeholder="Enter your name" className="p-2 border-0 border-b-2 w-full" />
            </div>
            <div>
              <input
                type="email"
                onChange={handleEmail}
                value={email}
                required
                placeholder="Enter your email address"
                name="email"
                id="mail"
                className="p-2 border-0 border-b-2 w-full"
              />
            </div>
            <div className="relative">
              <input
                type={visible ? 'text' : 'password'}
                value={password}
                minLength="8"
                name="pass"
                id="pass"
                className="p-2 border-0 border-b-2 w-full"
                required
                placeholder="Enter your password"
                onChange={handlePassword}
              />
              <span className="absolute right-3 top-3 text-2xl cursor-pointer" onClick={toggleVisibility}>
                {visible ? <FaEyeSlash /> : <FaEye />}
              </span>
              <p className="text-sm">
                *Password must contain capital alphabets, small alphabets, numbers, and special characters.
              </p>
            </div>
            <div className="buttons flex gap-4">
              <button
                type="submit"
                className={`border-2 border-black w-fit rounded-3xl px-4 py-1.5 font-bold ${valid ? 'enable' : 'disable'}`}
                disabled={!valid}
              >
                Sign Up
              </button>
              <p className="forgot-password text-right">
                Already registered <a href="/login" className='link'>Login</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
