import { Metadata } from "next";
import { Suspense } from "react";
import HeaderSection from "@/components/Header-Section";
import Main from "@/components/Main";
import LoadingSpinner from "@/components/LoadingSpinner";

export const metadata: Metadata = {
  title: "Find Your Dream Car",
  description: "Check out our car models",
};

const CarsPage = () => {
  return (
    <div>
      <HeaderSection
        title="Car Models"
        subTitle="Choose your desired vehicle and experience the future of driving."
      />
      <div>
        <Suspense fallback={<LoadingSpinner />}>
          <Main />
        </Suspense>
      </div>
    </div>
  );
};

export default CarsPage;
