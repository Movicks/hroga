'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { signupAlumni, clearError } from '../../../redux/features/auth/authSlice';
import HomeTopbar from '../../../components/topbars/HomeTopbar';
import SignupStepper from '../../../components/SignupStepper';

const stepNames = [
  'Personal Info',
  'Password',
  'Current Address',
  'Permanent Address',
  'Review',
];

const initialFormData = {
  firstName: '',
  middleName: '',
  lastName: '',
  yearOfGraduation: '',
  email: '',
  phoneNumber: '',
  password: '',
  currentAddress: {
    country: '',
    state: '',
    city: '',
    addressLine: '',
  },
  permanentAddress: {
    country: '',
    state: '',
    city: '',
    addressLine: '',
  },
};

export default function AlumniSignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);

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
    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    dispatch(clearError());
    const result = await dispatch(signupAlumni(formData));
    if (signupAlumni.fulfilled.match(result)) {
      // Clear localStorage on successful signup
      localStorage.removeItem('alumniSignupData');
      localStorage.removeItem('alumniSignupStep');
      router.push('/alumni');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-secondary">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full p-2 border-2 border-secondary/30 rounded-md focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-secondary">Middle Name (Optional)</label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                  className="w-full p-2 border-2 border-secondary/30 rounded-md focus:outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-secondary">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full p-2 border-2 border-secondary/30 rounded-md focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-secondary">Year of Graduation</label>
                <input
                  type="text"
                  value={formData.yearOfGraduation}
                  onChange={(e) => setFormData({ ...formData, yearOfGraduation: e.target.value })}
                  className="w-full p-2 border-2 border-secondary/30 rounded-md focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-secondary">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border-2 border-secondary/30 rounded-md focus:outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-secondary">Phone Number</label>
              <input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full p-2 border-2 border-secondary/30 rounded-md focus:outline-none focus:border-primary"
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-secondary">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full p-2 border-2 border-secondary/30 rounded-md focus:outline-none focus:border-primary"
                minLength={8}
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4 text-secondary">Current Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-secondary">Country</label>
                <input
                  type="text"
                  value={formData.currentAddress.country}
                  onChange={(e) => setFormData({
                    ...formData,
                    currentAddress: { ...formData.currentAddress, country: e.target.value },
                  })}
                  className="w-full p-2 border-2 border-secondary/30 rounded-md focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-secondary">State</label>
                <input
                  type="text"
                  value={formData.currentAddress.state}
                  onChange={(e) => setFormData({
                    ...formData,
                    currentAddress: { ...formData.currentAddress, state: e.target.value },
                  })}
                  className="w-full p-2 border-2 border-secondary/30 rounded-md focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-secondary">City</label>
                <input
                  type="text"
                  value={formData.currentAddress.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    currentAddress: { ...formData.currentAddress, city: e.target.value },
                  })}
                  className="w-full p-2 border-2 border-secondary/30 rounded-md focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-secondary">Address Line</label>
                <input
                  type="text"
                  value={formData.currentAddress.addressLine}
                  onChange={(e) => setFormData({
                    ...formData,
                    currentAddress: { ...formData.currentAddress, addressLine: e.target.value },
                  })}
                  className="w-full p-2 border-2 border-secondary/30 rounded-md focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4 text-secondary">Permanent Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-secondary">Country</label>
                <input
                  type="text"
                  value={formData.permanentAddress.country}
                  onChange={(e) => setFormData({
                    ...formData,
                    permanentAddress: { ...formData.permanentAddress, country: e.target.value },
                  })}
                  className="w-full p-2 border-2 border-secondary/30 rounded-md focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-secondary">State</label>
                <input
                  type="text"
                  value={formData.permanentAddress.state}
                  onChange={(e) => setFormData({
                    ...formData,
                    permanentAddress: { ...formData.permanentAddress, state: e.target.value },
                  })}
                  className="w-full p-2 border-2 border-secondary/30 rounded-md focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-secondary">City</label>
                <input
                  type="text"
                  value={formData.permanentAddress.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    permanentAddress: { ...formData.permanentAddress, city: e.target.value },
                  })}
                  className="w-full p-2 border-2 border-secondary/30 rounded-md focus:outline-none focus:border-primary"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-secondary">Address Line</label>
                <input
                  type="text"
                  value={formData.permanentAddress.addressLine}
                  onChange={(e) => setFormData({
                    ...formData,
                    permanentAddress: { ...formData.permanentAddress, addressLine: e.target.value },
                  })}
                  className="w-full p-2 border-2 border-secondary/30 rounded-md focus:outline-none focus:border-primary"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4 text-secondary">Review Your Information</h3>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
              <p><strong>First Name:</strong> {formData.firstName}</p>
              {formData.middleName && <p><strong>Middle Name:</strong> {formData.middleName}</p>}
              <p><strong>Last Name:</strong> {formData.lastName}</p>
              <p><strong>Year of Graduation:</strong> {formData.yearOfGraduation}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
              <div className="mt-4">
                <h4 className="font-medium text-secondary mb-2">Current Address</h4>
                <p>{formData.currentAddress.addressLine}, {formData.currentAddress.city}, {formData.currentAddress.state}, {formData.currentAddress.country}</p>
              </div>
              <div className="mt-2">
                <h4 className="font-medium text-secondary mb-2">Permanent Address</h4>
                <p>{formData.permanentAddress.addressLine}, {formData.permanentAddress.city}, {formData.permanentAddress.state}, {formData.permanentAddress.country}</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HomeTopbar />
      <div className="flex-1 flex items-center justify-center bg-primary/10 py-8">
        <div className="max-w-2xl w-full p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center text-secondary">Alumni Sign Up</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          <SignupStepper 
            currentStep={currentStep} 
            totalSteps={5} 
            stepNames={stepNames}
          />
          
          <div className="mb-6">
            {renderStep()}
          </div>
          
          <section className='flex w-full justify-end'>
            <div className="flex gap-4 w-full max-w-[15rem]">
              {currentStep > 1 && (
                <button
                  onClick={handlePrev}
                  className="flex-1 bg-gray-200 text-gray-700 p-2 rounded-md hover:bg-gray-300"
                >
                  Previous
                </button>
              )}
              {currentStep < 5 ? (
                <button
                  onClick={handleNext}
                  className="flex-1 bg-primary text-white p-2 rounded-md hover:bg-primary/80"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-primary text-white p-2 rounded-md hover:bg-primary/80 disabled:opacity-50"
                >
                  {loading ? 'Signing Up...' : 'Submit'}
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
