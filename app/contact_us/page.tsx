import ContactForm from "@/components/forms/ContactForm";
import { contactDetails } from "@/components/forms/types/contactusData";
import HomeTopbar from "@/components/topbars/HomeTopbar";


export default function GetInTouchSection() {
  return (
    <section
      className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 md:pt-30"
      style={{
        background:
          "linear-gradient(135deg, #f5ede0 0%, #ece8e0 40%, #ddd5ce 100%)",
      }}
      >
      <HomeTopbar/>
      <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center lg:items-start gap-16">
        {/* Left column */}
        <div className="flex-1 max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-2">
            Get in Touch
          </h1>
          <p className="text-2xl font-normal text-[#5a82ad]/80 mb-6">
            We'd love to hear from you
          </p>
          <p className="text-gray-600 text-base leading-relaxed mb-10">
            For membership, event registration, project submissions, or any
            enquiries — reach out to the Holy Rosary OGA secretariat.
          </p>

          {/* Contact details */}
          <div className="flex flex-col gap-6">
            {contactDetails.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#5a82ad] flex items-center justify-center shadow-md">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#5a82ad] uppercase tracking-wide leading-none mb-0.5">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-700">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — form */}
        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
