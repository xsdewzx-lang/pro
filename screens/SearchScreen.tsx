import React, { useState } from 'react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { FoodItem } from '../types';
import { Search, Loader2, ArrowLeft, Plus } from 'lucide-react';
import { analyzeFoodText } from '../services/geminiService';

interface Props {
  onSelectFood: (food: FoodItem) => void;
  onBack: () => void;
}

export const SearchScreen: React.FC<Props> = ({ onSelectFood, onBack }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<FoodItem[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const items = await analyzeFoodText(query);
    setResults(items);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="pt-12 pb-4 px-6 border-b border-gray-100 flex items-center gap-4">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-800">Add Food</h1>
      </div>

      <div className="p-6 flex-1 flex flex-col overflow-hidden">
        
        <form onSubmit={handleSearch} className="mb-6">
           <div className="flex gap-2">
            <Input 
              icon={Search}
              placeholder="Search food (e.g., Apple, Tuna Sandwich)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className={`!px-4 ${loading ? 'opacity-70' : ''}`} disabled={loading}>
                {loading ? <Loader2 className="animate-spin" /> : 'Go'}
            </Button>
           </div>
        </form>

        {/* Results */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
          {results.length > 0 ? (
            <>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Results</h3>
              {results.map((item) => (
                <button 
                    key={item.id} 
                    onClick={() => onSelectFood(item)}
                    className="w-full text-left border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:border-primary/30 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-lg">
                      {item.icon || '🍽️'}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-xs text-gray-400">{item.amount} • {item.calories} kcal</p>
                      <div className="flex gap-2 mt-1">
                         <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded">P: {item.protein}g</span>
                         <span className="text-[10px] bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">C: {item.carbs}g</span>
                         <span className="text-[10px] bg-yellow-100 text-yellow-600 px-1.5 py-0.5 rounded">F: {item.fat}g</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-gray-50 text-gray-400 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                    <Plus size={20} />
                  </div>
                </button>
              ))}
            </>
          ) : (
            !loading && (
              <div className="text-center mt-10 opacity-50">
                 <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-4">
                    <Search size={32} className="text-gray-300" />
                 </div>
                 <p className="text-gray-400">Search for food to see nutritional info</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};