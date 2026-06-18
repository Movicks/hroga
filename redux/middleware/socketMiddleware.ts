import { Middleware } from '@reduxjs/toolkit';
import socket from '../../apiConfig/socket';
import { fetchActivities } from '../features/activities/activitiesSlice';
import { fetchGallery } from '../features/gallery/gallerySlice';
import { fetchEvents } from '../features/events/eventsSlice';
import { fetchAudits } from '../features/audits/auditsSlice';

const socketMiddleware: Middleware = (store) => {
  socket.on('activitiesUpdated', () => {
    (store.dispatch as any)(fetchActivities({ force: true }));
  });

  socket.on('galleryUpdated', () => {
    (store.dispatch as any)(fetchGallery({ force: true }));
  });

  socket.on('eventsUpdated', () => {
    (store.dispatch as any)(fetchEvents({ force: true }));
  });

  socket.on('auditsUpdated', () => {
    (store.dispatch as any)(fetchAudits({ force: true }));
  });

  return (next) => (action) => {
    return next(action);
  };
};

export default socketMiddleware;
