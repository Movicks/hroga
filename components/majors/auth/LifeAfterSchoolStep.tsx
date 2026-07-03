import { FormData } from './types';

interface LifeAfterSchoolStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function LifeAfterSchoolStep({ formData, setFormData }: LifeAfterSchoolStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 px-3 md:px-0">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#6393f6]">Life after Holy Rosary</h2>
        <p className="hidden lg:block text-[#6393f6] font-medium">Your journey since graduation</p>
      </div>
      
      <div className="bg-[#F2F7FC] rounded-3xl p-6 space-y-6">
        {/* Career */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">Career</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Current occupation *</label>
              <select
                value={formData.currentOccupation}
                onChange={(e) => setFormData({ ...formData, currentOccupation: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                required
              >
                <option value="">Select year</option>
                <option value="Employed">Employed</option>
                <option value="Self-employed">Self-employed</option>
                <option value="Student">Student</option>
                <option value="Retired">Retired</option>
                <option value="Unemployed">Unemployed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Job title / role</label>
              <input
                type="text"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                placeholder="e.g Senior Nurse, CEO, Senior Lecturer"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Organisation / company</label>
              <select
                value={formData.organisation}
                onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
              >
                <option value="">Select house</option>
                {/* Add options as needed */}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Industry / sector</label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
              >
                <option value="">Select Sector</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>
        </section>

        <hr className="border-[#E5E7EB]" />

        {/* Education after Holy Rosary */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">Education after Holy Rosary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Highest qualification</label>
              <select
                value={formData.highestQualification}
                onChange={(e) => setFormData({ ...formData, highestQualification: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
              >
                <option value="">Select</option>
                <option value="BSc">BSc</option>
                <option value="MSc">MSc</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Institution attended</label>
              <input
                type="text"
                value={formData.institutionAttended}
                onChange={(e) => setFormData({ ...formData, institutionAttended: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                placeholder="e.g university of Lagos, Kings college London"
              />
            </div>
          </div>
        </section>

        <hr className="border-[#E5E7EB]" />

        {/* Family */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">Family</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Marital status</label>
              <select
                value={formData.maritalStatus}
                onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
              >
                <option value="">Select</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">
                Spouse's name <span className="text-gray-500">(optional)</span>
              </label>
              <input
                type="text"
                value={formData.spouseName}
                onChange={(e) => setFormData({ ...formData, spouseName: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                placeholder="e.g university of Lagos, Kings college London"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Number of children</label>
              <select
                value={formData.numberOfChildren}
                onChange={(e) => setFormData({ ...formData, numberOfChildren: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
              >
                <option value="">Select</option>
                {Array.from({ length: 11 }, (_, i) => i.toString()).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Number of grandchildren</label>
              <select
                value={formData.numberOfGrandchildren}
                onChange={(e) => setFormData({ ...formData, numberOfGrandchildren: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
              >
                <option value="">Select</option>
                {Array.from({ length: 21 }, (_, i) => i.toString()).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>
        </section>

        <hr className="border-[#E5E7EB]" />

        {/* Your story */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">Your story</h3>
          <div>
            <label className="block text-sm mb-2">
              Your journey since graduation <span className="text-gray-500">(optional — may be featured on the website)</span>
            </label>
            <textarea
              value={formData.yourStory}
              onChange={(e) => setFormData({ ...formData, yourStory: e.target.value })}
              className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
              rows={3}
              placeholder="Tell us about your journey since leaving Holy Rosary. Where has life taken you? What are you most proud of? What does the school mean to you today?"
            />
            <p className="text-xs text-gray-500 mt-1">With your permission, your story may appear in the Alumni Stories section of our website. You'll be asked to confirm before anything is published.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
