import { Check } from 'lucide-react';

interface RegistrationStepperProps {
  currentStep: number;
}

export const RegistrationStepper: React.FC<RegistrationStepperProps> = ({ currentStep }) => {
  const steps = [
    {
      number: 1,
      title: 'Basic Information',
      description: 'Your personal details',
    },
    {
      number: 2,
      title: 'Professional Details',
      description: 'Your expertise and background',
    },
    {
      number: 3,
      title: 'Services & Pricing',
      description: 'What you offer',
    },
    {
      number: 4,
      title: 'Contact & Social',
      description: 'How clients can reach you',
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center relative flex-1">
            {/* Progress Line */}
            {index < steps.length - 1 && (
              <div
                className={`absolute top-5 left-[50%] w-full h-[2px] ${
                  currentStep > step.number ? 'bg-[#7C9A92]' : 'bg-gray-200'
                }`}
              />
            )}
            
            {/* Step Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center z-10 border-2 ${
                currentStep > step.number
                  ? 'bg-[#7C9A92] border-[#7C9A92] text-white'
                  : currentStep === step.number
                  ? 'bg-white border-[#7C9A92] text-[#7C9A92]'
                  : 'bg-white border-gray-200 text-gray-400'
              }`}
            >
              {currentStep > step.number ? (
                <Check className="w-5 h-5" />
              ) : (
                step.number
              )}
            </div>
            
            {/* Step Title */}
            <div className="mt-3 text-center">
              <h3
                className={`text-sm font-medium ${
                  currentStep >= step.number ? 'text-[#4A6670]' : 'text-gray-400'
                }`}
              >
                {step.title}
              </h3>
              <p
                className={`text-xs mt-1 ${
                  currentStep >= step.number ? 'text-[#7C9A92]' : 'text-gray-400'
                }`}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}