"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { auth } from '@/lib/firebase';
import { signOut, updateProfile } from 'firebase/auth';
import { setUser } from '@/lib/store/slices/authSlice';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { bookings } = useSelector((state: RootState) => state.booking);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
    }
  }, [user, router]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(setUser(null));
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!auth.currentUser) return;

    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });

      dispatch(setUser({
        ...user!,
        displayName,
      }));

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="heading-lg mb-8">Profile</h1>

        <div className="bg-gray-900 rounded-lg p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Email
              </label>
              <p className="text-white">{user.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Name
              </label>
              {isEditing ? (
                <div className="flex gap-4">
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="bg-gray-800 border-gold-500/20"
                  />
                  <Button
                    onClick={handleUpdateProfile}
                    className="bg-gold-500 hover:bg-gold-600 text-black"
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <p className="text-white">{user.displayName || 'Not set'}</p>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(true)}
                    className="border-gold-500/20 text-gold-400"
                  >
                    Edit
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <h2 className="heading-lg mb-6">Booking History</h2>
        <div className="space-y-4 mb-8">
          {bookings.length === 0 ? (
            <p className="text-gray-400">No booking history yet</p>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-gray-900 rounded-lg p-6 flex justify-between items-center"
              >
                <div>
                  <p className="text-white mb-2">{booking.serviceId}</p>
                  <p className="text-sm text-gray-400">{booking.date}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  booking.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                  booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {booking.status}
                </span>
              </div>
            ))
          )}
        </div>

        <Button
          onClick={handleSignOut}
          variant="outline"
          className="border-red-500/20 text-red-400 hover:bg-red-500/10"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}