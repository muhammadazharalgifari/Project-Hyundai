import { CarFront } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-4"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <CarFront className="w-6 h-6 text-indigo-600" />
          </div>
        </div>

        <p className="text-gray-600 font-medium">
          Find comfort in driving with Hyundai
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
