'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { signupAlumni, clearError } from '../../../redux/features/auth/authSlice';
import HomeTopbar from '../../topbars/HomeTopbar';
import SignupStepper from '../../SignupStepper';
import PersonalInfoStep from './PersonalInfoStep';
import SchoolDetailsStep from './SchoolDetailsStep';
import LifeAfterSchoolStep from './LifeAfterSchoolStep';
import GetInvolvedStep from './GetInvolvedStep';
import { FormData, initialFormData, stepNames } from './types';
import SectionHeading from '@/components/reusables/SectionHeading';
import ItalicTitle from '@/components/reusables/ItalicTitle';

export default function AlumniSignupForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('alumniSignupData');
    const savedStep = localStorage.getItem('alumniSignupStep');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    if (savedStep) {
      setCurrentStep(parseInt(savedStep, 10));
    }
  }, []);

  // Save to localStorage when data or step changes
  useEffect(() => {
    localStorage.setItem('alumniSignupData', JSON.stringify(formData));
    localStorage.setItem('alumniSignupStep', currentStep.toString());
  }, [formData, currentStep]);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    dispatch(clearError());
    // For now, just log the data
    console.log('Form submitted:', formData);
    // Clear localStorage on successful signup
    localStorage.removeItem('alumniSignupData');
    localStorage.removeItem('alumniSignupStep');
    // Redirect to alumni dashboard
    router.push('/alumni');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} setFormData={setFormData} />;
      case 2:
        return <SchoolDetailsStep formData={formData} setFormData={setFormData} />;
      case 3:
        return <LifeAfterSchoolStep formData={formData} setFormData={setFormData} />;
      case 4:
        return <GetInvolvedStep formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f2ef]">
      <HomeTopbar />
      <div className="flex-1 px-4 py-30 md:px-8">
        <div className="max-w-5xl mx-auto space-y-8">

          <div className="w-full h-[11rem] md:h-[13rem] bg-primary rounded-2xl overflow-hidden">
            <div className='relative flex items-center justify-end h-[100%] w-full'>
              <div className='w-[25%] min-h-full flex items-start justify-end'>
                <div className=''>
                  <div className='w-[9rem] h-[9rem] md:w-[15rem] md:h-[15rem] bg-[#E3EFFC]/50 rounded-full top-[-3rem] right-[-3rem] md:top-[-6rem] md:right-[-3rem] absolute' />
                  <div className='absolute w-[6rem] h-[6rem] md:w-[9rem] md:h-[8.5rem] rounded-[5px] bg-[#061977FF]/60 px-1 py-2 right-[2rem] top-[2rem] md:right-[5rem] md:top-[2rem] text-center'>
                    <div className='w-full h-full border-2 rounded-md bg-primary/40 flex flex-col justify-center'>
                      <span className='md:text-2xl font-serif text-[#061977FF]'>OGA</span>
                      <span className='text-white text-[10px] md:text-sm'>EST. 1968.</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* body contents */}
              <div className='absolute left-0 top-0 w-full h-full bg-blue-900/20 px-5 py-5 lg:px-15 lg:py-9'>
                <SectionHeading title="HOLY ROSARY OLD GIRLS ASSOCIATION" className="text-xs md:text-[15px] mb-0 md:mb-2 text-gray-200" />
                <h1 className="mb-2 text-[1.8rem] leading-[1] tracking-[-0.05em] text-white sm:text-[3.25rem] lg:text-[36px]">
                  Join the{" "}
                  <ItalicTitle
                    title="Sisterhood"
                    colorClass="text-[1.8rem] leading-[1] tracking-[-0.05em] text-[#061977FF] sm:text-[3.25rem] lg:text-[36px]"
                  />
                </h1>
                <p className='max-w-[37rem] text-xs md:text-[16px] text-gray-200 md:mt-4'>
                  Register to reconnect with your classmates, celebrate every milestone,
                  and be part of a community that lasts a lifetime.
                  Once a daugther of Holy Rosary, always a daugther.
                </p>
              </div>
            </div>
          </div>

          <SignupStepper 
            currentStep={currentStep} 
            totalSteps={4} 
            stepNames={stepNames}
          />
          
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          <div className="mb-8 bg-[#E3EFFC] py-6 md:px-4 rounded-xl">
            {renderStep()}
          </div>
          
          <section className='flex justify-between items-center'>
            {currentStep > 1 && (
              <button
                onClick={handlePrev}
                className="px-8 py-1 bg-none text-[#6393d6] border-2 border-[#6393d6] rounded-full font-semibold hover:bg-[#6393d6] hover:text-white transition duration-300"
              >
                Back
              </button>
            )}
            <div></div>
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="px-8 py-1 bg-[#6393d6] text-white rounded-full font-semibold hover:bg-[#6393d6]/80 transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !formData.acceptTerms}
                className="px-8 py-1 bg-[#6393d6] text-white rounded-full font-semibold hover:bg-[#6393d6]/80 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {loading ? 'Submitting...' : 'Submit registration'}
              </button>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
