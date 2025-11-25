import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ScreenName } from '../types';
import { Mail, Lock, User, ChevronLeft } from 'lucide-react';

interface Props {
  type: 'LOGIN' | 'SIGNUP';
  onNavigate: (screen: ScreenName) => void;
}

export const AuthScreen: React.FC<Props> = ({ type, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const isLogin = type === 'LOGIN';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication
    onNavigate(ScreenName.HOME);
  };

  return (
    <div className="flex flex-col h-full bg-white px-6 pt-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <button 
          onClick={() => onNavigate(ScreenName.WELCOME)}
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {isLogin ? 'Log In' : 'Create Your Account'}
        </h2>
        <p className="text-gray-500">
          {isLogin ? 'Welcome back! Stay on track.' : 'Sign up to start your healthy journey.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 space-y-5">
        {!isLogin && (
          <Input 
            icon={User} 
            placeholder="Full Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        
        <Input 
          icon={Mail} 
          type="email" 
          placeholder="Email Address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <Input 
          icon={Lock} 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {isLogin && (
          <div className="text-right">
            <button type="button" className="text-primary text-sm font-medium hover:underline">
              Forgot password?
            </button>
          </div>
        )}

        <Button fullWidth type="submit" className="mt-4">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>
    </div>
  );
};