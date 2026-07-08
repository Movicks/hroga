'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCurrentUser } from '../../redux/features/auth/authSlice';
import { fetchActivities } from '../../redux/features/activities/activitiesSlice';
import { fetchGallery } from '../../redux/features/gallery/gallerySlice';
import { fetchEvents } from '../../redux/features/events/eventsSlice';
import { fetchConversations } from '@/redux/features/contact-messages/contactMessagesSlice';
// import { fetchContactMessages } from '../../redux/features/contact-messages/contactMessagesSlice';

export default function AutoFetch() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, accessToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Always fetch public data
    dispatch(fetchActivities());
    dispatch(fetchGallery());
    dispatch(fetchEvents());

    // If authenticated, fetch current user
    if (accessToken) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, accessToken]);

  // If user is authenticated and admin, fetch conversations
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchConversations());
    }
  }, [dispatch, isAuthenticated]);

  return null;
}
