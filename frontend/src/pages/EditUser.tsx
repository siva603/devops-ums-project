import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../services/userService';
import { User } from '../types';
import UserForm from '../components/UserForm';
import Loader from '../components/Loader';

export default function EditUser() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;
      try {
        const data = await userService.getUserById(parseInt(id));
        setUser(data);
      } catch (error) {
        console.error('Error fetching user', error);
        navigate('/users');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, navigate]);

  const handleSubmit = async (userData: User) => {
    if (!id) return;
    setIsSubmitting(true);
    try {
      await userService.updateUser(parseInt(id), userData);
      navigate('/users');
    } catch (error) {
      console.error('Error updating user', error);
      alert('Failed to update user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="py-8">
      <UserForm 
        title="Edit User Details" 
        initialData={user || undefined} 
        onSubmit={handleSubmit} 
        isSubmitting={isSubmitting} 
      />
    </div>
  );
}
