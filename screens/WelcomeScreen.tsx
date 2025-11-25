import React from 'react';
import { Button } from '../components/Button';
import { ScreenName } from '../types';
import { Apple } from 'lucide-react';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

export const WelcomeScreen: React.FC<Props> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col h-full bg-white px-8 pt-20 pb-10">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="bg-primary/10 p-6 rounded-3xl mb-8 animate-bounce-slow">
          <Apple size={64} className="text-primary" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Welcome to <span className="text-primary">NutriTrack</span>
        </h1>
        
        <p className="text-gray-500 leading-relaxed max-w-[250px]">
          Track food, calories, and health goals easily. Start your journey today.
        </p>
      </div>

      <div className="space-y-4">
        <Button fullWidth onClick={() => onNavigate(ScreenName.SIGNUP)}>
          Get Started
        </Button>
        
        <div className="text-center">
          <span className="text-gray-500 text-sm">Already have an account? </span>
          <button 
            onClick={() => onNavigate(ScreenName.LOGIN)}
            className="text-primary font-semibold text-sm hover:underline"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};