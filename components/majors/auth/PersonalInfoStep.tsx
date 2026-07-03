import { FormData } from './types';

interface PersonalInfoStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function PersonalInfoStep({ formData, setFormData }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 px-3 md:px-0">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#6393f6]">Personal Information</h2>
        <p className="hidden lg:block text-[#6393f6] font-medium">Fields marked * are required</p>
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
                placeholder="David"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Middle name</label>
              <input
                type="text"
                value={formData.middleName}
                onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                placeholder="Akan"
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
                placeholder="Akan"
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
          <div className="border-2 border-dashed border-[#C7D2FE] rounded-xl p-8 bg-[#F8FAFF] text-center">
            <div className="flex flex-col items-center">
              <svg className="w-10 h-10 text-[#00BFFF] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20a2 2 0 01-2-2v-2a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6z" />
              </svg>
              <p className="text-lg font-medium text-[#1E3A8A]">Upload a recent photo of yourself</p>
              <p className="text-sm text-[#6B7280] mt-1">JPG or PNG · Max 5MB · Minimum 300 × 300px</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
