import { FormData } from './types';

interface GetInvolvedStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function GetInvolvedStep({ formData, setFormData }: GetInvolvedStepProps) {
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 px-3 md:px-0">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#6393f6]">Life after Holy Rosary</h2>
        <p className="hidden lg:block text-[#6393f6] font-medium">Your journey since graduation</p>
      </div>
      
      <div className="bg-[#F2F7FC] rounded-3xl p-6 space-y-6">
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
          </div>
        </section>

        {/* Declaration */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">Declaration</h3>
          <label className="flex items-start gap-4 px-4 py-2 bg-white border-2 border-[#00BFFF] rounded-lg cursor-pointer hover:bg-[#F0F9FF] transition">
            <input
              type="checkbox"
              checked={formData.acceptTerms}
              onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
              className="mt-1 w-5 h-5 accent-[#00BFFF]"
              required
            />
            <div>
              <p className="font-semibold text-[#1E3A8A]">I agree to the terms & privacy policy. *</p>
              <p className="text-sm text-[#6B7280] mt-1">I confirm that the information I have provided is accurate and I consent to the Holy Rosary Old Girls Association storing and using my details to manage my membership and keep me informed of association activities. My information will not be shared with third parties without my permission.</p>
            </div>
          </label>
        </section>
      </div>
    </div>
  );
}
