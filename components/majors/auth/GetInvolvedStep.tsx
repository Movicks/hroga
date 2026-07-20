import { FormData, Involvement } from './types';

interface GetInvolvedStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export default function GetInvolvedStep({ formData, setFormData }: GetInvolvedStepProps) {
  const socialsData = [
    {
      key: "linkedIn",
      label: "LinkedIn",
      placeholder: "https://linkedin.com/in/your-profile",
      description: "Share your LinkedIn profile.",
    },
    {
      key: "facebook",
      label: "Facebook",
      placeholder: "https://facebook.com/your-profile",
      description: "Share your Facebook profile.",
    },
    {
      key: "whatsApp",
      label: "WhatsApp",
      placeholder: "+234 801 234 5678",
      description: "Enter your WhatsApp phone number.",
    },
  ]
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 px-3 md:px-0">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#6393f6]">Getting Involved</h2>
        <p className="hidden lg:block text-[#6393f6] font-medium">How you'd like to contribute</p>
      </div>
      
      <div className="bg-[#F2F7FC] rounded-3xl p-6 space-y-6">
        {/* How would you like to be involved? */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">How would you like to be involved? *</h3>
          <div className="space-y-3">
            {[
              { key: 'attendReunion', label: 'Attend Reunion & events', description: 'Birthdays, weddings, annual gatherings and milestone celebration' },
              { key: 'joinCommittee', label: 'Join a project committee', description: 'Help plan and execute school development projects (library, lab upgrade, boreholes, art centre)' },
              { key: 'contributeFundraising', label: 'Contribute to fundraising', description: 'Support the scholarship fund, infrastructure drives and other campaigns' },
              { key: 'mentorStudents', label: 'Mentor students or young alumnae', description: 'Share your experience and help guide the next generation of Holy Rosary daughters' },
              { key: 'shareStory', label: 'Share my alumni story', description: 'Be featured on the alumni story section of the OGA website' },
              { key: 'serveExec', label: 'Serve on the executive or class committee', description: 'Take on a leadership role with the association' },
            ].map((item) => (
              <label key={item.key} className="flex items-start gap-4 px-4 py-2 bg-white border-2 border-[#00BFFF] rounded-lg cursor-pointer hover:bg-[#F0F9FF] transition">
                <input
                  type="checkbox"
                  checked={formData.involvement[item.key as keyof Involvement]}
                  onChange={(e) => setFormData({
                    ...formData,
                    involvement: {
                      ...formData.involvement,
                      [item.key]: e.target.checked
                    }
                  })}
                  className="mt-1 w-5 h-5 accent-[#00BFFF]"
                />
                <div>
                  <p className="font-semibold text-[#1E3A8A]">{item.label}</p>
                  <p className="text-sm text-[#6B7280] mt-1">{item.description}</p>
                </div>
              </label>
            ))}
          </div>
        </section>

        <hr className="border-[#E5E7EB]" />

        {/* How did you hear about the OGA? */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">How did you hear about the OGA?</h3>
          <div className="flex flex-wrap gap-4">
            {[
              { id: 'classmate', label: 'A classmate told me' },
              { id: 'whatsapp', label: 'WhatsApp group' },
              { id: 'social', label: 'Social media' },
              { id: 'website', label: 'OGA website' },
              { id: 'school', label: 'School notice' },
              { id: 'other', label: 'Other' },
            ].map((option) => (
              <label key={option.id} className="flex items-center gap-3 px-4 py-2 bg-white border-2 border-[#00BFFF] rounded-lg cursor-pointer hover:bg-[#F0F9FF] transition">
                <input
                  type="radio"
                  name="howHeard"
                  checked={formData.howHeard === option.id}
                  onChange={(e) => setFormData({ ...formData, howHeard: e.target.value })}
                  value={option.id}
                  className="w-5 h-5 accent-[#00BFFF]"
                />
                <span className="font-semibold text-[#1E3A8A]">{option.label}</span>
              </label>
            ))}
          </div>
        </section>

        <hr className="border-[#E5E7EB]" />

        {/* Referral */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">Referral</h3>
          <div>
            <label className="block text-sm font-semibold mb-2 text-[#1E3A8A]">
              Name of alumna who referred you <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              value={formData.referralName}
              onChange={(e) => setFormData({ ...formData, referralName: e.target.value })}
              className="w-full p-3 border-2 border-[#E5E7EB] rounded-xl focus:outline-none focus:border-[#00BFFF] shadow-sm"
              placeholder="e.g Ngozi Eze, class of 2005"
            />
          </div>
        </section>

        <hr className="border-[#E5E7EB]" />

        {/* Notification preferences */}
        <section className="space-y-4">
          <h3 className="text-lg font-semibold text-[#4B5563]">
            Social Media Handles
          </h3>

          <div className="space-y-5 grid grid-cols-2 gap-4">
            {socialsData.map((item) => (
              <div key={item.key} className="space-y-2">
                <label
                  htmlFor={item.key}
                  className="block text-sm font-semibold text-[#1E3A8A]"
                >
                  {item.label}
                </label>

                <input
                  id={item.key}
                  type={item.key === "whatsApp" ? "tel" : "url"}
                  placeholder={item.placeholder}
                  value={formData.socialMedia?.[
                    item.key as keyof typeof formData.socialMedia
                  ] ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      socialMedia: {
                        ...formData.socialMedia,
                        [item.key]: e.target.value,
                      },
                    })
                  }
                  className=" w-full flex items-center gap-3 px-4 py-2 bg-white border-2 border-[#00BFFF] rounded-lg cursor-pointer hover:bg-[#F0F9FF] transition"
                />

                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </section>


        <hr className="border-[#E5E7EB]" />

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
