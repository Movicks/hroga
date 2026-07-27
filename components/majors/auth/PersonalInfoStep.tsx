import { useState, useEffect } from 'react';
import { Camera, X } from 'lucide-react';
import { FormData } from './types';

interface PersonalInfoStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function PersonalInfoStep({ formData, setFormData }: PersonalInfoStepProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Cleanup object URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Map frontend fields to address fields
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      currentAddress: {
        ...prev.currentAddress,
        country: prev.country || '',
        state: prev.stateCity || '',
        city: prev.stateCity || '',
        addressLine: prev.homeAddress || '',
      },
      permanentAddress: {
        ...prev.permanentAddress,
        country: prev.country || '',
        state: prev.stateCity || '',
        city: prev.stateCity || '',
        addressLine: prev.homeAddress || '',
      },
    }));
  }, [formData.country, formData.stateCity, formData.homeAddress, setFormData]);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 px-3 md:px-0">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#6393f6]">Personal Information</h2>
        <p className="hidden lg:block text-[#6393f6]/70 font-medium">Fields marked * are required</p>
      </div>
      
      <div className="bg-[#F2F7FC] rounded-3xl p-6 space-y-6">
        {/* Full name */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">Full name</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm mb-2">First name *</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                required
                placeholder="Grace"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Middle name</label>
              <input
                type="text"
                value={formData.middleName}
                onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                placeholder="Amarachi"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Last name *</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                required
                placeholder="Ikechukwu"
              />
            </div>
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">
                Maiden name <span className="text-gray-500">(Name at graduation)</span>
              </label>
              <input
                type="text"
                value={formData.maidenName}
                onChange={(e) => setFormData({ ...formData, maidenName: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                placeholder="name your classmates knew you by"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Graduation Year</label>
              <input
                type="text"
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                placeholder="what your classmates called you"
              />
            </div>
          </div> */}
        </section>

        <hr className="border-[#E5E7EB]" />

        {/* Basic Details */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">Basic Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Date of birth *</label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
              >
                <option value="">Select</option>
                <option value="female">Female</option>
                {/* <option value="male">Male</option> */}
              </select>
            </div>
          </div>
        </section>

        <hr className="border-[#E5E7EB]" />

        {/* Contact Details */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">Contact Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Email address *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                required
                placeholder="you@doman.com"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Phone number *</label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                required
                placeholder="+234 801 224 546"
              />
            </div>
            {/* <div>
              <label className="block text-sm mb-2">
                WhatsApp number <span className="text-gray-500">(If different)</span>
              </label>
              <input
                type="tel"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                placeholder="+234 801 224 546"
              />
            </div> */}
            <div>
              <label className="block text-sm mb-2">Country of residence *</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                required
              >
                <option value="">Select country</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="UK">United Kingdom</option>
                <option value="USA">United States</option>
                <option value="Canada">Canada</option>
              </select>
            </div>
            {/* <div>
              <label className="block text-sm mb-2">State / city</label>
              <input
                type="text"
                value={formData.stateCity}
                onChange={(e) => setFormData({ ...formData, stateCity: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                placeholder="e.g Lagos, Abuja, London"
              />
            </div> */}
            {/* <div>
              <label className="block text-sm mb-2">
                Home address <span className="text-gray-500">(optional)</span>
              </label>
              <input
                type="text"
                value={formData.homeAddress}
                onChange={(e) => setFormData({ ...formData, homeAddress: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                placeholder="for postal correspondence"
              />
            </div> */}
          </div>
        </section>

        <hr className="border-[#E5E7EB]" />

        {/* Password */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">Create Password</h3>
          <div>
            <label className="block text-sm mb-2">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-white px-3 py-2 pr-12 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                required
                minLength={8}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
          </div>
        </section>
      </div>
    </div>
  );
}
