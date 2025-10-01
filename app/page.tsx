import Hero from "@/components/Hero";
import Main from "@/components/Main";
import MapsDealer from "@/components/MapsDealer";
import MessageMarquee from "@/components/MessageMarquee";

const page = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Message From User Section */}
      <MessageMarquee />

      <div className="text-center">
        <h1 className="text-5xl font-bold capitalize">
          Car{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent">
            Models
          </span>
        </h1>
        <p className="py-3 text-lg text-gray-500">
          Choose your desired vehicle and experience the future of driving.
        </p>
      </div>
      {/* Cars Section */}
      <Main />

      {/* Maps Section */}
      <MapsDealer />
    </div>
  );
};

export default page;
