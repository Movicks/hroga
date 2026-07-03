'use client';

interface SignupStepperProps {
  currentStep: number;
  totalSteps: number;
  stepNames: string[];
}

export default function SignupStepper({
  currentStep,
  totalSteps,
  stepNames,
}: SignupStepperProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-center bg-white py-5 rounded-xl shadow-md">
        {stepNames.map((name, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;
          
          return (
            <div key={name} className="flex flex-col items-center relative flex-1">
              {/* Connector line */}
              {index < totalSteps - 1 && (
                <div
                  className={`absolute top-4 left-0 w-full h-0.5 transform transition-transform duration-300 ${
                  isCompleted ? 'bg-[#6292d6]' : 'bg-[#D1D5DB]'
                }`}
                  style={{ transform: 'translateX(50%)' }}
                />
              )}
              
              {/* Step circle */}
              <div
                className={`relative w-8 h-8 rounded-full flex items-center justify-center font-bold z-10 ${
                  isActive
                    ? 'bg-white border-3 border-[#e3effc] text-[#3B82F6]'
                    : isCompleted
                    ? 'bg-[#6292d6] text-white'
                    : 'bg-gray-100 text-[#9CA3AF]'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className={`w-2 h-2 ${isActive ? 'bg-[#6393d6]' : 'bg-gray-400'} rounded-full text-[#3B82F60] text-[10px] md:text-sm font-medium text-center`} />
                )}
              </div>
              
              {/* Step name */}
              <span
                className={`text-[10px] md:text-sm font-medium text-center mt-3 ${
                  isActive ? 'text-[#6393d6]' : 'text-[#4B5563]'
                }`}
              >
                {name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
