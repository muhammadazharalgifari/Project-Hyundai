import { getLatestMessages } from "@/lib/data";
import { MessageCircleMore, Star } from "lucide-react";
import Image from "next/image";

export default async function MessageMarquee() {
  const messages = await getLatestMessages();

  if (!messages || messages.length === 0) {
    return null;
  }

  const marqueeMessages = [...messages, ...messages];

  return (
    <section className="max-w-screen-xl mx-auto py-20 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold capitalize">
          Customer{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent">
            Reviews
          </span>
        </h1>
        <p className="py-3 text-lg text-gray-500">
          What our customers say about their experience with us. Real stories,
          real satisfaction.
        </p>
      </div>

      {/* Reviews Marquee */}
      <div className="overflow-hidden relative">
        <div className="animate-marquee flex gap-8">
          {marqueeMessages.map((msg, idx) => (
            <div
              key={`${msg.id}-${idx}`}
              className="relative min-w-[360px] lg:min-w-[400px] max-w-md bg-white rounded-2xl shadow-lg hover:shadow-sm transition-all duration-300 p-6 flex flex-col gap-4 mb-4"
            >
              <div className="absolute top-4 right-4 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400" />
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Image
                  src={msg.user?.image ?? "/Default-Profile.png"}
                  alt={msg.name}
                  width={50}
                  height={50}
                  className="rounded-full border object-cover"
                />
                <div>
                  <p className="font-semibold text-lg text-gray-800 capitalize">
                    {msg.name}
                  </p>
                  <span className="text-sm text-gray-600 italic">
                    {msg.user?.email}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed flex items-start">
                <span className="bg-green-500 p-1 text-white rounded-lg mr-3">
                  <MessageCircleMore className="w-5 h-5" />
                </span>
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
