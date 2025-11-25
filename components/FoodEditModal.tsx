import React, { useState, useEffect } from 'react';
import { FoodItem } from '../types';
import { Button } from './Button';
import { X, Trash2, Scale } from 'lucide-react';

interface Props {
  food: FoodItem;
  isOpen: boolean;
  onClose: () => void;
  onSave: (food: FoodItem) => void;
  onDelete?: (id: string) => void; // Only present if editing existing food
}

export const FoodEditModal: React.FC<Props> = ({ food, isOpen, onClose, onSave, onDelete }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [grams, setGrams] = useState<number>(food.servingSizeGrams || 100);
  
  // Base stats (per 1 unit / original serving size)
  const [baseStats] = useState({
    calories: food.calories,
    protein: food.protein,
    carbs: food.carbs,
    fat: food.fat,
    grams: food.servingSizeGrams || 100
  });

  useEffect(() => {
    // Reset state when food changes or modal opens
    setQuantity(1);
    setGrams(food.servingSizeGrams || 100);
  }, [food, isOpen]);

  if (!isOpen) return null;

  // Handlers
  const handleQuantityChange = (val: number) => {
    setQuantity(val);
    // Update grams based on new quantity
    setGrams(Math.round(val * baseStats.grams));
  };

  const handleGramsChange = (val: number) => {
    setGrams(val);
    // Update quantity based on new grams
    setQuantity(Number((val / baseStats.grams).toFixed(2)));
  };

  // Calculate current display values
  const multiplier = grams / baseStats.grams;
  const currentCalories = Math.round(baseStats.calories * multiplier);
  const currentProtein = Number((baseStats.protein * multiplier).toFixed(1));
  const currentCarbs = Number((baseStats.carbs * multiplier).toFixed(1));
  const currentFat = Number((baseStats.fat * multiplier).toFixed(1));

  const handleSave = () => {
    onSave({
      ...food,
      calories: currentCalories,
      protein: currentProtein,
      carbs: currentCarbs,
      fat: currentFat,
      servingSizeGrams: grams,
      amount: `${quantity} serving${quantity !== 1 ? 's' : ''} (${grams}g)`
    });
    onClose();
  };

  return (
    <div className="absolute inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto transition-opacity" 
        onClick={onClose}
      />
      
      <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl pointer-events-auto transform transition-transform duration-300 animate-slide-up">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl">
                {food.icon || '🍽️'}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 leading-tight">{food.name}</h3>
                <p className="text-sm text-gray-500">{baseStats.calories} kcal per serving</p>
              </div>
           </div>
           <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
             <X size={20} className="text-gray-600" />
           </button>
        </div>

        {/* Inputs */}
        <div className="flex gap-4 mb-8">
            <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Quantity</label>
                <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <span className="text-lg font-bold text-gray-800">x</span>
                    <input 
                        type="number" 
                        min="0.1" 
                        step="0.5"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(parseFloat(e.target.value) || 0)}
                        className="w-full bg-transparent text-xl font-bold text-gray-800 text-right focus:outline-none"
                    />
                </div>
            </div>
            
            <div className="flex-1">
                <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Weight (g)</label>
                <div className="flex items-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                    <Scale size={18} className="text-gray-400 mr-2" />
                    <input 
                        type="number" 
                        value={grams}
                        onChange={(e) => handleGramsChange(parseInt(e.target.value) || 0)}
                        className="w-full bg-transparent text-xl font-bold text-gray-800 text-right focus:outline-none"
                    />
                </div>
            </div>
        </div>

        {/* Stats Preview */}
        <div className="bg-primary/5 rounded-2xl p-5 mb-6 flex justify-between items-center text-center">
            <div>
                <span className="block text-2xl font-bold text-primary">{currentCalories}</span>
                <span className="text-xs font-medium text-primary/60">kcal</span>
            </div>
            <div className="w-px h-8 bg-primary/10"></div>
            <div>
                <span className="block text-lg font-semibold text-gray-700">{currentProtein}g</span>
                <span className="text-xs text-gray-400">Protein</span>
            </div>
            <div>
                <span className="block text-lg font-semibold text-gray-700">{currentCarbs}g</span>
                <span className="text-xs text-gray-400">Carbs</span>
            </div>
            <div>
                <span className="block text-lg font-semibold text-gray-700">{currentFat}g</span>
                <span className="text-xs text-gray-400">Fat</span>
            </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
            {onDelete && (
                <Button variant="ghost" className="!px-3 !bg-red-50 text-red-500 hover:!bg-red-100" onClick={() => onDelete(food.id)}>
                    <Trash2 size={20} />
                </Button>
            )}
            <Button fullWidth onClick={handleSave}>
                {onDelete ? 'Update Log' : 'Add to Log'}
            </Button>
        </div>

      </div>
      
      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};