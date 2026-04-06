import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/userService';
import { User } from '../types';
import UserForm from '../components/UserForm';

export default function AddUser() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (userData: User) => {
    setIsSubmitting(true);
    try {
      await userService.createUser(userData);
      navigate('/users');
    } catch (error) {
      console.error('Error creating user', error);
      alert('Failed to create user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8">
      <UserForm 
        title="Add New User" 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}
