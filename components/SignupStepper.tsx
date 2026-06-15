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
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {stepNames.map((name, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;
          
          return (
            <div key={name} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold mb-2 ${
                  isActive
                    ? 'bg-primary text-white'
                    : isCompleted
                    ? 'bg-secondary text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isCompleted ? '✓' : step}
              </div>
              <span
                className={`text-xs text-center ${
                  isActive ? 'text-primary font-medium' : 'text-gray-500'
                }`}
              >
                {name}
              </span>
              {index < totalSteps - 1 && (
                <div
                  className={`h-1 flex-1 ${
                    isCompleted ? 'bg-secondary' : 'bg-gray-200'
                  }`}
                  style={{ marginLeft: '2rem', marginRight: '2rem' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
