'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { signupAlumni, clearError } from '../../../redux/features/auth/authSlice';
import SignupStepper from '../../SignupStepper';
import PersonalInfoStep from './PersonalInfoStep';
import SchoolDetailsStep from './SchoolDetailsStep';
import LifeAfterSchoolStep from './LifeAfterSchoolStep';
import GetInvolvedStep from './GetInvolvedStep';
import { FormData, initialFormData, stepNames } from './types';

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
    
    // Map frontend form data to API format
    const apiData = {
      ...formData,
      yearOfGraduation: formData.graduationYear,
    };
    
    const result = await dispatch(signupAlumni(apiData));
    
    if (signupAlumni.fulfilled.match(result)) {
      // Clear localStorage on successful signup
      localStorage.removeItem('alumniSignupData');
      localStorage.removeItem('alumniSignupStep');
      // Redirect to alumni dashboard
      router.push('/alumni');
    }
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
    <div className="flex flex-col w-full">
      <div className="">
        <div className="w-full space-y-4">
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
