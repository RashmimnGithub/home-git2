import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth, db } from './firebase'; // Ensure you import your initialized auth and db
import { doc, getDoc } from 'firebase/firestore';
import './LoginForm.css';
import { FaPhone, FaLaptopCode } from "react-icons/fa";

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationId, setVerificationId] = useState('');

  const setupRecaptcha = () => {
    try {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log('Recaptcha resolved');
        }
      });
    } catch (error) {
      console.error('Error setting up Recaptcha:', error);
    }
  };

  const checkPhoneNumberExists = async (phoneNumber) => {
    const docRef = doc(db, "users", phoneNumber);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  };

  const handleSignIn = async () => {
    setupRecaptcha();
    const phoneNumberString = `+${phoneNumber}`; // Ensure the phone number is in international format
    
    try {
      const phoneExists = await checkPhoneNumberExists(phoneNumberString);
      if (!phoneExists) {
        alert('Phone number not found in the database.');
        return;
      }

      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumberString, appVerifier)
        .then((confirmationResult) => {
          setVerificationId(confirmationResult.verificationId);
          console.log('SMS sent');
        })
        .catch((error) => {
          console.error('Error during signInWithPhoneNumber:', error);
        });
    } catch (error) {
      console.error('Error checking phone number:', error);
    }
  };

  const handleVerifyCode = () => {
    const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
    signInWithCredential(auth, credential)
      .then((result) => {
        console.log('User signed in successfully');
      })
      .catch((error) => {
        console.error('Error during signInWithCredential:', error);
      });
  };

  return (
    <div>
      <header className="header">
        <h1>Welcome to netcon CMP</h1>
      </header>
      <div className='container'>
        <div className='wrapper'>
          <div className="input-box">
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Phone number"/>
            <FaPhone className='icon'/>
          </div>
          <button onClick={handleSignIn}>Send Code</button>
          <div className="input-box">
            <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} placeholder="Verification code"/>
            <FaLaptopCode className='icon'/>
          </div>
          <button onClick={handleVerifyCode}>Verify Code</button>
          <div id="recaptcha-container"></div>
        </div>
      </div>
    </div>
  );
};

export default PhoneAuth;
