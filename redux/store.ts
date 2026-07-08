import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import activitiesReducer from './features/activities/activitiesSlice';
import galleryReducer from './features/gallery/gallerySlice';
import eventsReducer from './features/events/eventsSlice';
import usersReducer from './features/users/usersSlice';
import auditsReducer from './features/audits/auditsSlice';
import donationsReducer from './features/donations/donationsSlice';
import contactMessagesReducer from './features/contact-messages/contactMessagesSlice';
import socketMiddleware from './middleware/socketMiddleware';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      activities: activitiesReducer,
      gallery: galleryReducer,
      events: eventsReducer,
      users: usersReducer,
      audits: auditsReducer,
      donations: donationsReducer,
      contactMessages: contactMessagesReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(socketMiddleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
