import { Carousel } from "@/components/carousel";

const testimonials = [
  {
    text: "MeetSession has revolutionized how we handle depositions. The accuracy is outstanding and the organization features save us hours every week.",
    author: "Sarah Johnson, Senior Partner at Johnson & Associates",
    rating: 3,
  },
  {
    text: "Finally, a transcription tool built specifically for legal professionals. The cross-examination mode is a game-changer for our courtroom work.",
    author: "Michael Chen, Public Defender's Office",
    rating: 5,
  },
  {
    text: "MeetSession has revolutionized how we handle depositions. The accuracy is outstanding and the organization features save us hours every week.",
    author: "Sarah Johnson, Senior Partner at Johnson & Associates",
    rating: 2,
  },
  {
    text: "Finally, a transcription tool built specifically for legal professionals. The cross-examination mode is a game-changer for our courtroom work.",
    author: "Michael Chen, Public Defender's Office",
    rating: 4,
  },
  // Add more testimonials as needed
];

export function Testimonials() {
  return (
    <div id="testimonials" className="py-8 md:py-24 px-7 flex flex-col h-full w-full gap-5 md:gap-12">
      <div className="mx-auto max-w-full md:max-w-7xl flex flex-col gap-3 md:gap-4 items-center">
        <p className="font-dm-sans font-black text-brand-blue text-3xl md:text-4xl text-center">Trusted by Professionals</p>
        <p className="text-sm md:text-base font-light text-center">MeetSession supports a wide range of professional usecases. Here <br className="hidden md:block"/> are a few testimonials from professionals who rely on it.</p>
      </div>
      <Carousel items={testimonials} />
    </div>
  );
}
