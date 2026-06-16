import { Middleware } from '@reduxjs/toolkit';
import socket from '../../apiConfig/socket';
import { fetchActivities } from '../features/activities/activitiesSlice';
import { fetchGallery } from '../features/gallery/gallerySlice';
import { fetchEvents } from '../features/events/eventsSlice';

const socketMiddleware: Middleware = (store) => {
  socket.on('activitiesUpdated', () => {
    (store.dispatch as any)(fetchActivities());
  });

  socket.on('galleryUpdated', () => {
    (store.dispatch as any)(fetchGallery());
  });

  socket.on('eventsUpdated', () => {
    (store.dispatch as any)(fetchEvents());
  });

  return (next) => (action) => {
    return next(action);
  };
};

export default socketMiddleware;
