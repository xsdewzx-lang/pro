import React from 'react';
import { FoodItem, UserStats } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Plus, ChevronRight } from 'lucide-react';

interface Props {
  stats: UserStats;
  todaysFood: FoodItem[];
  onAddFood: () => void;
  onEditFood: (food: FoodItem) => void;
}

export const HomeScreen: React.FC<Props> = ({ stats, todaysFood, onAddFood, onEditFood }) => {
  const remainingCalories = stats.calorieGoal - stats.caloriesConsumed;
  const progressData = [
    { name: 'Consumed', value: stats.caloriesConsumed },
    { name: 'Remaining', value: remainingCalories > 0 ? remainingCalories : 0 },
  ];
  const COLORS = ['#2dd4bf', '#e5e7eb']; // Primary, Gray-200

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto no-scrollbar pb-24">
      {/* Header */}
      <div className="bg-primary pt-12 pb-20 px-6 rounded-b-[2.5rem] relative">
        <div className="flex justify-between items-center text-white mb-4">
          <h2 className="font-bold text-xl">NutriTrack</h2>
          <button className="p-2 hover:bg-white/20 rounded-full">
            <div className="w-6 h-0.5 bg-white mb-1.5 rounded-full"></div>
            <div className="w-4 h-0.5 bg-white ml-auto rounded-full"></div>
          </button>
        </div>
      </div>

      {/* Stats Card */}
      <div className="px-6 -mt-16">
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-100">
          
          {/* Calorie Circle */}
          <div className="flex flex-col items-center justify-center mb-6 relative">
             <div className="w-48 h-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={progressData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={10}
                    >
                      {progressData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-700">
                   <span className="text-4xl font-bold">{stats.caloriesConsumed}</span>
                   <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">kcal eaten</span>
                </div>
             </div>
             <p className="text-sm text-gray-500 mt-2">Goal: {stats.calorieGoal} kcal</p>
          </div>

          {/* Macros */}
          <div className="space-y-4">
            <MacroBar label="Protein" current={stats.protein} max={stats.proteinGoal} color="bg-orange-400" />
            <MacroBar label="Carbs" current={stats.carbs} max={stats.carbsGoal} color="bg-blue-400" />
            <MacroBar label="Fats" current={stats.fat} max={stats.fatGoal} color="bg-yellow-400" />
          </div>

          {/* Fast Add Button */}
          <button 
            onClick={onAddFood}
            className="w-full mt-6 bg-primary/10 text-primary py-3 rounded-xl font-semibold hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Add Food
          </button>
        </div>
      </div>

      {/* Today's Foods */}
      <div className="px-6 mt-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Foods</h3>
        <div className="space-y-3">
          {todaysFood.length === 0 ? (
            <div className="text-center py-8 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
              <p>No food logged yet.</p>
            </div>
          ) : (
            todaysFood.map((food) => (
              <button 
                key={food.id} 
                onClick={() => onEditFood(food)}
                className="w-full text-left bg-white p-4 rounded-2xl flex items-center shadow-sm border border-gray-50 hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-xl">
                  {food.icon || '🥣'}
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-semibold text-gray-800">{food.name}</h4>
                  <p className="text-xs text-gray-400">{food.amount}</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="block font-bold text-primary">{food.calories}</span>
                  <span className="text-[10px] text-gray-400">kcal</span>
                </div>
                <ChevronRight size={16} className="text-gray-300 ml-2" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

const MacroBar = ({ label, current, max, color }: { label: string, current: number, max: number, color: string }) => {
  const percentage = Math.min((current / max) * 100, 100);
  
  return (
    <div className="flex items-center gap-3">
      <div className="w-16">
        <span className="text-xs font-semibold text-gray-600">{label}</span>
      </div>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${color}`} 
          style={{ width: `${percentage}%` }} 
        />
      </div>
      <div className="w-16 text-right">
        <span className="text-xs text-gray-400">{current}/{max}g</span>
      </div>
    </div>
  );
};