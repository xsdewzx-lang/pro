import React, { useState } from 'react';
import { UserProfile, ScreenName } from '../types';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { ChevronRight, Settings, Bell, HelpCircle, LogOut, User as UserIcon, Camera, Mail, User } from 'lucide-react';

interface Props {
  user: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
  onNavigate: (screen: ScreenName) => void;
}

export const ProfileScreen: React.FC<Props> = ({ user, onUpdateUser, onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleSave = () => {
    onUpdateUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto no-scrollbar pb-24">
      {/* Header / Banner */}
      <div className="bg-primary h-32 relative"></div>
      
      {/* Profile Card */}
      <div className="px-6 -mt-12 mb-6">
        <div className="bg-white rounded-3xl p-6 shadow-lg shadow-gray-100 flex flex-col items-center">
            <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gray-200 border-4 border-white overflow-hidden flex items-center justify-center">
                    {user.avatarUrl ? (
                        <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                        <UserIcon size={40} className="text-gray-400" />
                    )}
                </div>
                <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full border-2 border-white">
                    <Camera size={14} />
                </button>
            </div>
            
            {isEditing ? (
              <div className="w-full space-y-3 mt-4">
                <Input 
                  icon={User}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Full Name"
                />
                <Input 
                  icon={Mail}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="Email"
                />
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-800 mt-3">{user.name}</h2>
                <p className="text-sm text-gray-400 mb-4">{user.email}</p>
              </>
            )}
            
            <div className="mt-4 flex gap-3 w-full">
              {isEditing ? (
                 <>
                   <Button variant="ghost" className="flex-1" onClick={() => setIsEditing(false)}>Cancel</Button>
                   <Button className="flex-1" onClick={handleSave}>Save Changes</Button>
                 </>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="mx-auto text-primary text-sm font-medium hover:bg-primary/5 px-4 py-1.5 rounded-full transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
        </div>
      </div>

      {/* Menu Items */}
      {!isEditing && (
        <div className="px-6 space-y-4">
          <h3 className="font-bold text-gray-800 text-lg">Settings</h3>
          
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <MenuItem icon={Settings} label="Goals" onClick={() => {}} />
              <MenuItem icon={Bell} label="Alerts" onClick={() => {}} hasToggle />
              <MenuItem icon={HelpCircle} label="Help & Contact Us" onClick={() => {}} />
          </div>

          <Button 
              variant="ghost" 
              fullWidth 
              className="!text-red-500 hover:!bg-red-50 mt-4"
              onClick={() => onNavigate(ScreenName.WELCOME)}
          >
              <LogOut size={18} />
              Log Out
          </Button>
        </div>
      )}
    </div>
  );
};

const MenuItem = ({ icon: Icon, label, onClick, hasToggle = false }: any) => (
    <div 
        onClick={onClick}
        className="flex items-center justify-between p-4 border-b border-gray-50 last:border-0 active:bg-gray-50 cursor-pointer"
    >
        <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg text-gray-600">
                <Icon size={18} />
            </div>
            <span className="font-medium text-gray-700">{label}</span>
        </div>
        {hasToggle ? (
            <div className="w-10 h-6 bg-gray-200 rounded-full relative">
                <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
            </div>
        ) : (
            <ChevronRight size={18} className="text-gray-400" />
        )}
    </div>
);