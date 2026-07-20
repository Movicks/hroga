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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
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
                <option value="male">Male</option>
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
            <div>
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
            </div>
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
            <div>
              <label className="block text-sm mb-2">State / city</label>
              <input
                type="text"
                value={formData.stateCity}
                onChange={(e) => setFormData({ ...formData, stateCity: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                placeholder="e.g Lagos, Abuja, London"
              />
            </div>
            <div>
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
            </div>
          </div>
        </section>

        <hr className="border-[#E5E7EB]" />

        {/* Profile photo */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">Profile photo</h3>
          {previewUrl ? (
            <div className="relative inline-block">
              <img 
                src={previewUrl} 
                alt="Profile preview" 
                className="w-32 h-32 object-cover rounded-xl border-2 border-[#6393f6]"
              />
              <button
                type="button"
                onClick={() => setPreviewUrl(null)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-[#C7D2FE] rounded-xl p-8 bg-white text-center cursor-pointer hover:bg-[#F8FAFF] transition block">
              <input
                type="file"
                accept="image/jpeg,image/png"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    console.log('File selected:', file);
                    const url = URL.createObjectURL(file);
                    setPreviewUrl(url);
                  }
                }}
              />
              <div className="flex flex-col md:flex-row items-center md:justify-center md:items-start gap-2">
                <div className='relative mt-1'>
                  <Camera size={24} className='text-[#1e3a8a]/80' />
                  <span className='absolute bg-white right-[-2px] top-[1px] p-1 rounded-full w-3 h-3 text-md font-medium flex items-center justify-center text-[#1e3a8a]'>+</span>
                </div>
                <div className='flex flex-col items-center'>
                  <p className="text-lg font-medium text-[#1E3A8A]">Upload a recent photo of yourself</p>
                  <p className="text-sm text-[#6B7280] mt-1 md:ml-[-25px]">JPG or PNG · Max 5MB · Minimum 300 × 300px</p>
                </div>
              </div>
            </label>
          )}
        </section>

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
