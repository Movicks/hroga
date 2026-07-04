import { FormData } from './types';

interface SchoolDetailsStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function SchoolDetailsStep({ formData, setFormData }: SchoolDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 px-3 md:px-0">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#6393f6]">School Details</h2>
        <p className="hidden lg:block text-[#6393f6] font-medium">Your Holy Rosary chapter</p>
      </div>
      
      <div className="bg-[#F2F7FC] rounded-3xl p-6 space-y-6">
        {/* Your Class */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">Your Class</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Graduation year *</label>
              <select
                value={formData.graduationYear}
                onChange={(e) => setFormData({ ...formData, graduationYear: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                required
              >
                <option value="">Select year</option>
                {Array.from({ length: 50 }, (_, i) => 2024 - i).map(year => (
                  <option key={year} value={year.toString()}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Entry year *</label>
              <select
                value={formData.entryYear}
                onChange={(e) => setFormData({ ...formData, entryYear: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                required
              >
                <option value="">Select year</option>
                {Array.from({ length: 50 }, (_, i) => 2024 - i - 6).map(year => (
                  <option key={year} value={year.toString()}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">House / dormitory</label>
              <select
                value={formData.house}
                onChange={(e) => setFormData({ ...formData, house: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
              >
                <option value="">Select house</option>
                <option value="St. Theresa">St. Theresa</option>
                <option value="St. Joseph">St. Joseph</option>
                <option value="St. Mary">St. Mary</option>
                <option value="St. Anne">St. Anne</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-2">Class / arm</label>
              <input
                type="text"
                value={formData.classArm}
                onChange={(e) => setFormData({ ...formData, classArm: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                placeholder="e.g ss3A, Form 4B"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Form teacher <span className="text-gray-500">(If remembered)</span></label>
              <input
                type="text"
                value={formData.formTeacher}
                onChange={(e) => setFormData({ ...formData, formTeacher: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                placeholder="e.g ss3A, Form 4B"
              />
            </div>
          </div>
        </section>

        <hr className="border-[#E5E7EB]" />

        {/* Roles & activities in school */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">Roles & activities in school</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">Positions held</label>
              <input
                type="text"
                value={formData.positionsHeld}
                onChange={(e) => setFormData({ ...formData, positionsHeld: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                placeholder="e.g Head girl, Prefect, Class captain"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Clubs, societies or teams</label>
              <input
                type="text"
                value={formData.clubsSocieties}
                onChange={(e) => setFormData({ ...formData, clubsSocieties: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                placeholder="e.g Drama club, Red Cross, Press club"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">
                A favourite school memory <span className="text-gray-500">(optional)</span>
              </label>
              <textarea
                value={formData.favoriteMemory}
                onChange={(e) => setFormData({ ...formData, favoriteMemory: e.target.value })}
                className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
                rows={3}
                placeholder="Share a memory that has stayed with you from your Holy Rosary days"
              />
            </div>
          </div>
        </section>

        <hr className="border-[#E5E7EB]" />

        {/* Classmates you remember */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">Classmates you remember</h3>
          <div>
            <label className="block text-sm mb-2">Names of classmates you'd like to reconnect with</label>
            <textarea
              value={formData.classmates}
              onChange={(e) => setFormData({ ...formData, classmates: e.target.value })}
              className="w-full bg-white px-3 py-2 border-2 border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#6393f6]"
              rows={3}
              placeholder="e.g Ngozi Eze, — helps us link you to the right class group"
            />
            <p className="text-xs text-gray-500 mt-1">Separate names with commas. This helps verify your class year and connect you to your WhatsApp group.</p>
          </div>
        </section>
      </div>
    </div>
  );
}
