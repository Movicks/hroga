import { Middleware } from '@reduxjs/toolkit';
import socket from '../../apiConfig/socket';
import { fetchActivities } from '../features/activities/activitiesSlice';
import { fetchGallery } from '../features/gallery/gallerySlice';
import { fetchEvents } from '../features/events/eventsSlice';
import { fetchAudits } from '../features/audits/auditsSlice';
import { fetchConversations } from '../features/contact-messages/contactMessagesSlice';

const socketMiddleware: Middleware = (store) => {
  socket.on('activitiesUpdated', () => {
    const state = store.getState() as any;
    if (state.auth.isAuthenticated) {
      (store.dispatch as any)(fetchActivities({ force: true }));
    }
  });

  socket.on('galleryUpdated', () => {
    const state = store.getState() as any;
    if (state.auth.isAuthenticated) {
      (store.dispatch as any)(fetchGallery({ force: true }));
    }
  });

  socket.on('eventsUpdated', () => {
    const state = store.getState() as any;
    if (state.auth.isAuthenticated) {
      (store.dispatch as any)(fetchEvents({ force: true }));
    }
  });

  socket.on('auditsUpdated', () => {
    const state = store.getState() as any;
    if (state.auth.isAuthenticated) {
      (store.dispatch as any)(fetchAudits({ force: true }));
    }
  });

  socket.on('contactMessagesUpdated', () => {
    const state = store.getState() as any;
    if (state.auth.isAuthenticated) {
      (store.dispatch as any)(fetchConversations({ force: true }));
    }
  });

  return (next) => (action) => {
    return next(action);
  };
};

export default socketMiddleware;
