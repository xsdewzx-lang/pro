export enum ScreenName {
  WELCOME = 'WELCOME',
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  PROFILE = 'PROFILE',
}

export interface FoodItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  amount: string; // e.g. "1 medium" or "100g"
  servingSizeGrams?: number; // Base weight for the nutrients listed
  icon?: string; // emoji or url
}

export interface UserStats {
  calorieGoal: number;
  caloriesConsumed: number;
  protein: number;
  proteinGoal: number;
  carbs: number;
  carbsGoal: number;
  fat: number;
  fatGoal: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
}