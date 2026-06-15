'use client';

import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';
import SignupStepper from '../SignupStepper';

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

export default function ProfileSettingsForm() {
  const { user } = useAppSelector((state) => state.auth);
  const [currentStep, setCurrentStep] = useState(1);
  const [saveMessage, setSaveMessage] = useState('');
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (!user) {
      return;
    }

    setFormData({
      firstName: user.firstName || '',
      middleName: user.middleName || '',
      lastName: user.lastName || '',
      yearOfGraduation: user.yearOfGraduation || '',
      email: user.email || '',
      phoneNumber: user.phoneNumber || '',
      password: '',
      currentAddress: {
        country: user.currentAddress?.country || '',
        state: user.currentAddress?.state || '',
        city: user.currentAddress?.city || '',
        addressLine: user.currentAddress?.addressLine || '',
      },
      permanentAddress: {
        country: user.permanentAddress?.country || '',
        state: user.permanentAddress?.state || '',
        city: user.permanentAddress?.city || '',
        addressLine: user.permanentAddress?.addressLine || '',
      },
    });
  }, [user]);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, stepNames.length));
    setSaveMessage('');
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setSaveMessage('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaveMessage('Profile changes are ready to be connected to your update API.');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-secondary">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(event) => setFormData({ ...formData, firstName: event.target.value })}
                  className="w-full rounded-md border-2 border-secondary/30 p-2 focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-secondary">Middle Name (Optional)</label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(event) => setFormData({ ...formData, middleName: event.target.value })}
                  className="w-full rounded-md border-2 border-secondary/30 p-2 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-secondary">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(event) => setFormData({ ...formData, lastName: event.target.value })}
                  className="w-full rounded-md border-2 border-secondary/30 p-2 focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-secondary">Year of Graduation</label>
                <input
                  type="text"
                  value={formData.yearOfGraduation}
                  onChange={(event) => setFormData({ ...formData, yearOfGraduation: event.target.value })}
                  className="w-full rounded-md border-2 border-secondary/30 p-2 focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-secondary">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                className="w-full rounded-md border-2 border-secondary/30 p-2 focus:border-primary focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-secondary">Phone Number</label>
              <input
                type="text"
                value={formData.phoneNumber}
                onChange={(event) => setFormData({ ...formData, phoneNumber: event.target.value })}
                className="w-full rounded-md border-2 border-secondary/30 p-2 focus:border-primary focus:outline-none"
                required
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-secondary">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(event) => setFormData({ ...formData, password: event.target.value })}
                className="w-full rounded-md border-2 border-secondary/30 p-2 focus:border-primary focus:outline-none"
                minLength={8}
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="mb-4 text-lg font-medium text-secondary">Current Address</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-secondary">Country</label>
                <input
                  type="text"
                  value={formData.currentAddress.country}
                  onChange={(event) => setFormData({
                    ...formData,
                    currentAddress: { ...formData.currentAddress, country: event.target.value },
                  })}
                  className="w-full rounded-md border-2 border-secondary/30 p-2 focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-secondary">State</label>
                <input
                  type="text"
                  value={formData.currentAddress.state}
                  onChange={(event) => setFormData({
                    ...formData,
                    currentAddress: { ...formData.currentAddress, state: event.target.value },
                  })}
                  className="w-full rounded-md border-2 border-secondary/30 p-2 focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-secondary">City</label>
                <input
                  type="text"
                  value={formData.currentAddress.city}
                  onChange={(event) => setFormData({
                    ...formData,
                    currentAddress: { ...formData.currentAddress, city: event.target.value },
                  })}
                  className="w-full rounded-md border-2 border-secondary/30 p-2 focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-secondary">Address Line</label>
                <input
                  type="text"
                  value={formData.currentAddress.addressLine}
                  onChange={(event) => setFormData({
                    ...formData,
                    currentAddress: { ...formData.currentAddress, addressLine: event.target.value },
                  })}
                  className="w-full rounded-md border-2 border-secondary/30 p-2 focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h3 className="mb-4 text-lg font-medium text-secondary">Permanent Address</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-secondary">Country</label>
                <input
                  type="text"
                  value={formData.permanentAddress.country}
                  onChange={(event) => setFormData({
                    ...formData,
                    permanentAddress: { ...formData.permanentAddress, country: event.target.value },
                  })}
                  className="w-full rounded-md border-2 border-secondary/30 p-2 focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-secondary">State</label>
                <input
                  type="text"
                  value={formData.permanentAddress.state}
                  onChange={(event) => setFormData({
                    ...formData,
                    permanentAddress: { ...formData.permanentAddress, state: event.target.value },
                  })}
                  className="w-full rounded-md border-2 border-secondary/30 p-2 focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-secondary">City</label>
                <input
                  type="text"
                  value={formData.permanentAddress.city}
                  onChange={(event) => setFormData({
                    ...formData,
                    permanentAddress: { ...formData.permanentAddress, city: event.target.value },
                  })}
                  className="w-full rounded-md border-2 border-secondary/30 p-2 focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-secondary">Address Line</label>
                <input
                  type="text"
                  value={formData.permanentAddress.addressLine}
                  onChange={(event) => setFormData({
                    ...formData,
                    permanentAddress: { ...formData.permanentAddress, addressLine: event.target.value },
                  })}
                  className="w-full rounded-md border-2 border-secondary/30 p-2 focus:border-primary focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="mb-4 text-lg font-medium text-secondary">Review Your Information</h3>
            <div className="space-y-2 rounded-lg bg-gray-50 p-4 text-sm">
              <p><strong>First Name:</strong> {formData.firstName}</p>
              {formData.middleName && <p><strong>Middle Name:</strong> {formData.middleName}</p>}
              <p><strong>Last Name:</strong> {formData.lastName}</p>
              <p><strong>Year of Graduation:</strong> {formData.yearOfGraduation}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
              <div className="mt-4">
                <h4 className="mb-2 font-medium text-secondary">Current Address</h4>
                <p>
                  {formData.currentAddress.addressLine}, {formData.currentAddress.city}, {formData.currentAddress.state}, {formData.currentAddress.country}
                </p>
              </div>
              <div className="mt-2">
                <h4 className="mb-2 font-medium text-secondary">Permanent Address</h4>
                <p>
                  {formData.permanentAddress.addressLine}, {formData.permanentAddress.city}, {formData.permanentAddress.state}, {formData.permanentAddress.country}
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="px-4 py-8">
      <div className="mx-auto w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-secondary">Profile Settings</h1>

        <form onSubmit={handleSubmit}>
          <SignupStepper
            currentStep={currentStep}
            totalSteps={stepNames.length}
            stepNames={stepNames}
          />

          <div className="mb-6">
            {renderStep()}
          </div>

          {saveMessage && (
            <p className="mb-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {saveMessage}
            </p>
          )}

          <section className="flex w-full justify-end">
            <div className="flex w-full max-w-[15rem] gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex-1 rounded-md bg-gray-200 p-2 text-gray-700 hover:bg-gray-300"
                >
                  Previous
                </button>
              )}

              {currentStep < stepNames.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 rounded-md bg-primary p-2 text-white hover:bg-primary/80"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-1 rounded-md bg-primary p-2 text-white hover:bg-primary/80"
                >
                  Save changes
                </button>
              )}
            </div>
          </section>
        </form>
      </div>
    </section>
  );
}
