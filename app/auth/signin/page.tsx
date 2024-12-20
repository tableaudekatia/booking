"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDispatch } from 'react-redux';
import { setUser, setError } from '@/lib/store/slices/authSlice';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setUser({
        id: userCredential.user.uid,
        email: userCredential.user.email!,
        displayName: userCredential.user.displayName,
        photoURL: userCredential.user.photoURL,
      }));
      router.push('/profile');
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(setUser({
        id: result.user.uid,
        email: result.user.email!,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      }));
      router.push('/profile');
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      dispatch(setUser({
        id: result.user.uid,
        email: result.user.email!,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      }));
      router.push('/profile');
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="heading-lg mb-6">Welcome Back</h2>
          <p className="text-gray-400">Sign in to access your account</p>
        </div>

        <form onSubmit={handleEmailSignIn} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-900 border-gold-500/20"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-900 border-gold-500/20"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gold-500 hover:bg-gold-600 text-black"
          >
            Sign in
          </Button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gold-500/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full bg-white hover:bg-gray-100 text-black"
          >
            Continue with Google
          </Button>
          <Button
            onClick={handleFacebookSignIn}
            className="w-full bg-[#1877F2] hover:bg-[#1864D9] text-white"
          >
            Continue with Facebook
          </Button>
        </div>
      </div>
    </div>
  );
}