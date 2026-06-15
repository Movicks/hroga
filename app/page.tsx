'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout, fetchCurrentUser } from '../redux/features/auth/authSlice';
import HomeTopbar from '../components/topbars/HomeTopbar';
import Gallery from '@/components/majors/home/gallerySection/Gallery';
import ActivitiesSection from '@/components/majors/home/activities/ActivitiesSection';
import HeroSection from '@/components/majors/home/heroSection/HeroSection';
import AboutAssociation from '@/components/majors/home/aboutUsSection/AboutUs';
import UpcomingEvents from '@/components/majors/home/upcomingEvents/UpcomingEvents';
import Footer from '@/components/footer/Footer';

export default function HomePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, user, dispatch]);

  return (
    <div className="relative flex flex-col">
      <HomeTopbar />
      <main className="min-h-screen">
        <HeroSection />
        <AboutAssociation />
        <UpcomingEvents />
        <ActivitiesSection/>
        <Gallery/>
      </main>
      <Footer/>
    </div>
  );
}