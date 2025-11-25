import React, { useState } from 'react';
import { ScreenName, UserStats, FoodItem, UserProfile } from './types';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { AuthScreen } from './screens/AuthScreen';
import { HomeScreen } from './screens/HomeScreen';
import { SearchScreen } from './screens/SearchScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { BottomNav } from './components/BottomNav';
import { FoodEditModal } from './components/FoodEditModal';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>(ScreenName.WELCOME);
  
  // App State
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: "Jane Appleseed",
    email: "jane@example.com",
    avatarUrl: "https://picsum.photos/200/200"
  });

  const [todaysFood, setTodaysFood] = useState<FoodItem[]>([
    { id: '1', name: 'Tuna Salad Sandwich', calories: 450, protein: 30, carbs: 45, fat: 15, amount: '250g', servingSizeGrams: 250, icon: '🥪' },
    { id: '2', name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, amount: '1 medium', servingSizeGrams: 182, icon: '🍎' },
  ]);

  const [userStats, setUserStats] = useState<UserStats>({
    calorieGoal: 2000,
    caloriesConsumed: 545,
    protein: 30,
    proteinGoal: 120,
    carbs: 70,
    carbsGoal: 250,
    fat: 15,
    fatGoal: 65,
  });

  // Modal State
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingExisting, setIsEditingExisting] = useState(false);

  // Stats syncing
  React.useEffect(() => {
    const newStats = todaysFood.reduce((acc, food) => ({
      caloriesConsumed: acc.caloriesConsumed + food.calories,
      protein: acc.protein + food.protein,
      carbs: acc.carbs + food.carbs,
      fat: acc.fat + food.fat,
    }), {
        caloriesConsumed: 0, protein: 0, carbs: 0, fat: 0
    });

    setUserStats(prev => ({
        ...prev,
        caloriesConsumed: newStats.caloriesConsumed,
        protein: Math.round(newStats.protein),
        carbs: Math.round(newStats.carbs),
        fat: Math.round(newStats.fat),
    }));
  }, [todaysFood]);

  // Handlers
  const handleSelectFoodFromSearch = (food: FoodItem) => {
    setSelectedFood(food);
    setIsEditingExisting(false);
    setIsModalOpen(true);
  };

  const handleEditExistingFood = (food: FoodItem) => {
    setSelectedFood(food);
    setIsEditingExisting(true);
    setIsModalOpen(true);
  };

  const handleSaveFood = (food: FoodItem) => {
    if (isEditingExisting) {
      setTodaysFood(prev => prev.map(item => item.id === food.id ? food : item));
    } else {
      setTodaysFood(prev => [food, ...prev]);
      setCurrentScreen(ScreenName.HOME);
    }
  };

  const handleDeleteFood = (id: string) => {
    setTodaysFood(prev => prev.filter(item => item.id !== id));
    setIsModalOpen(false);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case ScreenName.WELCOME:
        return <WelcomeScreen onNavigate={setCurrentScreen} />;
      case ScreenName.LOGIN:
        return <AuthScreen type="LOGIN" onNavigate={setCurrentScreen} />;
      case ScreenName.SIGNUP:
        return <AuthScreen type="SIGNUP" onNavigate={setCurrentScreen} />;
      case ScreenName.HOME:
        return <HomeScreen stats={userStats} todaysFood={todaysFood} onAddFood={() => setCurrentScreen(ScreenName.SEARCH)} onEditFood={handleEditExistingFood} />;
      case ScreenName.SEARCH:
        return <SearchScreen onSelectFood={handleSelectFoodFromSearch} onBack={() => setCurrentScreen(ScreenName.HOME)} />;
      case ScreenName.PROFILE:
        return <ProfileScreen user={userProfile} onUpdateUser={setUserProfile} onNavigate={setCurrentScreen} />;
      default:
        return <WelcomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  const showBottomNav = [ScreenName.HOME, ScreenName.PROFILE].includes(currentScreen);

  return (
    // Mobile Frame Container
    <div className="relative w-full max-w-[400px] h-[100dvh] md:h-[850px] bg-white md:rounded-[3rem] md:border-[8px] md:border-gray-900 shadow-2xl overflow-hidden flex flex-col">
      {/* Dynamic Island / Notch Mockup for aesthetic */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-50 pointer-events-none hidden md:block"></div>
      
      {/* Screen Content */}
      <div className="flex-1 overflow-hidden relative">
        {renderScreen()}
      </div>

      {/* Food Edit Modal */}
      {selectedFood && (
        <FoodEditModal 
            food={selectedFood}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveFood}
            onDelete={isEditingExisting ? handleDeleteFood : undefined}
        />
      )}

      {/* Bottom Nav */}
      {showBottomNav && (
        <BottomNav currentScreen={currentScreen} onNavigate={setCurrentScreen} />
      )}
    </div>
  );
};

export default App;