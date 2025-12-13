/*
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
*/
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChipItem } from "@/components/ui/chip-item";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  AwardIcon,
  BrainIcon,
  BriefcaseIcon,
  CheckIcon,
  ChevronsLeftRightIcon,
  CircleCheckBigIcon,
  EyeIcon,
  LaptopIcon,
  MegaphoneIcon,
  NetworkIcon,
  PaletteIcon,
  ServerIcon,
  SparklesIcon,
  TargetIcon,
  TrendingUpIcon,
  TrophyIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react";

export default function Page() {
  return (
    <div
      className={cn(
        "w-full min-h-[calc(100dvh-8rem)] md:min-h-[calc(100dvh-5rem)]",
        "bg-brand-green-black font-dm-sans text-center",
      )}
    >
      <HeroSection />
      <GrowthOpportunitiesSection />
      <MentorshipTrack />
      <HowItWorks />
      <Benefits />
      {/*<FAQs />*/}
      <CTA />
    </div>
  );
}

function HeroSection() {
  return (
    <div
      className={cn(
        "max-w-fit mx-auto",
        "px-7 py-14 md:px-20 md:py-40",
        "flex flex-col md:flex-row gap-10 md:gap-28 justify-center",
      )}
    >
      <div className={cn("flex flex-col gap-8 md:gap-16 items-start")}>
        <div className="text-start flex flex-col gap-6">
          <ChipItem
            className={cn(
              "text-white md:text-sm",
              "border-brand-green bg-brand-green/30 border-[1px]",
            )}
          >
            Campus Ambassador Program 2025
          </ChipItem>

          <p className="text-3xl md:text-6xl text-white font-dm-sans tracking-tighter max-w-148">
            We&apos;re Building a Tribe of Young Innovators
          </p>

          <p className="font-light text-sm md:text-xl text-emerald-100 max-w-140">
            Join MeetSession&apos;s Campus Ambassador Program. This isn&apos;st
            about vides and T-shirt, we&apos;re offering real growth
            opportunities, industry immersion, and career pathways.
          </p>

          <div
            className={cn(
              "flex flex-col md:flex-row gap-2 md:gap-4",
              "w-full h-fit",
            )}
          >
            <button
              className={cn(
                "rounded-xl bg-white hover:bg-gray-100 px-6 h-16",
                "transition-all text-neutral-600 text-sm md:text-base",
              )}
            >
              Apply Now
            </button>
            {/*<button
              className={cn(
                "bg-transparent rounded-xl",
                "px-6 border-2 h-16",
                "transition-all text-sm md:text-base text-white",
              )}
            >
              Learn More
            </button>*/}
          </div>
        </div>

        <div className="flex flex-row gap-1.5 md:gap-3 items-normal md:items-center">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className={cn(
                "p-px",
                "rounded-xl md:rounded-3xl",
                "bg-linear-to-b from-brand-green-dark/40 to-transparent to-45%",
              )}
            >
              <div
                className={cn(
                  "text-start",
                  "rounded-xl md:rounded-3xl",
                  "px-4 py-3 md:px-8 md:py-6 space-y-1",
                  "bg-linear-to-b from-brand-green-black from-60% to-brand-green/10",
                )}
              >
                <p className="text-xl md:text-3xl text-white">{metric.value}</p>
                <p className="text-brand-green-light text-xs md:text-sm">
                  {metric.item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={cn(
          "hidden md:block",
          "w-148 h-148 bg-neutral-950 rounded-[64px]",
          "bg-[url('/image/ms-ambassador-bg.jpg')] bg-no-repeat bg-cover bg-center",
        )}
      ></div>
    </div>
  );
}
const metrics = [
  { id: 1, item: "Mentorship Tracks", value: 7 },
  { id: 2, item: "Shadow Programs", value: 6 },
  { id: 3, item: "Get Gold Status", value: "Top 10%" },
];

function GrowthOpportunitiesSection() {
  return (
    <div
      className={cn(
        "flex flex-col gap-16",
        "w-full min-h-fit bg-white",
        "py-10 md:py-36 px-7 md:px-16",
      )}
    >
      <div className="flex flex-col gap-3 w-full h-fit">
        <p className="text-3xl md:text-5xl tracking-tighter">
          Real Growth Opportunities
        </p>
        <p className="w-full max-w-2xl mx-auto text-center font-light text-base md:text-lg">
          Not vibes and T-shirt. We&apos;re offering mentorship, internships,
          industry immersion, and real pathways to shape your career in tech.
        </p>
      </div>

      <div className="max-w-screen-xl w-full mx-auto flex flex-wrap gap-8 justify-center">
        {opportunities.map((opp) => (
          <Card
            key={opp.id}
            className={cn(
              "bg-sky-200/20 border-border/40 shadow-none",
              "w-full sm:w-96 h-80",
            )}
          >
            <CardContent>
              <div className="bg-brand-green-extralight/20 w-fit h-fit p-4 rounded-2xl text-brand-green">
                {opp.icon}
              </div>
            </CardContent>
            <CardHeader className="text-start gap-4">
              <CardTitle className="text-lg md:text-xl font-bold font-quicksand">
                {opp.title}
              </CardTitle>
              <CardDescription className="text-sm md:text-base text-neutral-700">
                {opp.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
const opportunities = [
  {
    id: 1,
    icon: <BriefcaseIcon />,
    title: "Real Growth Opportunities",
    description:
      "Choose from 7 mentorship tracks: Product Management, Frontend, Backend, AI/ML, Business Strategy, Product Design, or Legal Research. Get paired with Devon Technologies mentors.",
  },
  {
    id: 2,
    icon: <EyeIcon />,
    title: "Industry Immersion",
    description:
      "Shadow professionals for a full day. Join standups, observe meetings, experience real product execution. Leave with a report + LinkedIn recommendations",
  },
  {
    id: 3,
    icon: <SparklesIcon />,
    title: "Internship Pathways",
    description:
      "Priority consideration for Devon Technologies internships, PPDC access-to-justice programs and other partner ecosystem placements",
  },
  {
    id: 4,
    icon: <UsersIcon />,
    title: "Exclusive Community",
    description:
      "Join the Devon Innovation Circle (DIC). Get early feature tests, beta access, internal showcases, and private workshops. Shape real product releases.",
  },
  {
    id: 5,
    icon: <AwardIcon />,
    title: "Career Branding",
    description:
      "LinkedIn spotlights, community shoutouts, speaker opportunities, and verifiable portfolio certificates with QR codes.",
  },
  {
    id: 6,
    icon: <TrophyIcon />,
    title: "Rewards That Matter",
    description:
      "Top 10% become Gold Ambassadors with internship screening, mentor matches, executive recommendations, and event sponsorships.",
  },
  {
    id: 7,
    icon: <NetworkIcon />,
    title: "Network Access",
    description:
      "Connect with legal-tech ecosystem. JIT Summit, PPDC events, digital right forums, product innovation summits, and startup mixers",
  },
  {
    id: 8,
    icon: <TrendingUpIcon />,
    title: "Real Impact",
    description:
      "Solve onboarding problems, collect user feedback, host campus meetings, advocate AI responsibility, and directly influence MeetSession&apos's growth",
  },
];

function MentorshipTrack() {
  return (
    <div
      className={cn(
        "py-10 md:py-36 px-7 md:px-16",
        "flex flex-col gap-16 bg-white",
        "w-full min-h-fit bg-linear-to-b from-brand-green-extralight/10 to-white",
      )}
    >
      <div className="flex flex-col items-center gap-3 w-full h-fit text-center">
        <ChipItem className="text-base tracking-tighter text-brand-green border-none bg-brand-green-extralight/15">
          <span>🧠</span> <span>Mentorship Opportunities</span>
        </ChipItem>
        <p className="text-3xl md:text-5xl tracking-tighter">
          Choose Your Mentorship Track
        </p>
        <p className="w-full max-w-2xl mx-auto text-center font-light text-base md:text-lg">
          Get paired with a mentor from Devon Technologies or our ecosystem.
          Pick your field and start your journey toward expertise.
        </p>
      </div>

      <div className="flex flex-wrap gap-6 justify-center max-w-7xl w-fit mx-auto">
        {tracks.map((track) => (
          <Card
            key={track.id}
            className={cn(
              "border-white border-[2px] w-full sm:w-72 shadow-2xl",
              "bg-linear-150 from-emerald-200/30 to-white rounded-2xl",
            )}
          >
            <CardContent>
              <div className="h-fit w-fit p-3 rounded-2xl bg-brand-green-extralight/20 text-brand-green">
                {track.icon}
              </div>
            </CardContent>

            <CardHeader className="text-start">
              <CardTitle className="">{track.title}</CardTitle>
              <CardDescription className="">
                {track.description}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row items-center gap-3 w-full justify-center">
        <ChipItem className="bg-brand-green/5 border-brand-green text-brand-green text-sm md:text-base">
          <span>💼</span> <span>Priority internship pathways</span>
        </ChipItem>
        <p className="text-sm md:text-base font-light">
          to Devon Technologies LTD, PPDC access-to-justice programs, and
          partner ecosystem internships
        </p>
      </div>
    </div>
  );
}
const tracks = [
  {
    id: 1,
    icon: <LaptopIcon />,
    title: "Frontend",
    description: "Master modern web interfaces and user experiences",
  },
  {
    id: 2,
    icon: <ServerIcon />,
    title: "Backend",
    description: "Build scalable systems and APIs",
  },
  {
    id: 3,
    icon: <BrainIcon />,
    title: "AI/ML",
    description: "Explore artificial intelligence and machine learning",
  },
  {
    id: 4,
    icon: <ChevronsLeftRightIcon />,
    title: "Product Management",
    description: "Learn to build products user love",
  },
  {
    id: 5,
    icon: <BriefcaseIcon />,
    title: "Business Strategy",
    description: "Develop strategic thinking and business acumen",
  },
  {
    id: 6,
    icon: <PaletteIcon />,
    title: "Product Design",
    description: "Create beautiful, intuitive products experiences",
  },
  {
    id: 7,
    icon: <NetworkIcon />,
    title: "Legal Research",
    description: "Navigate legal-tech and access-to-justice",
  },
];

function HowItWorks() {
  return (
    <div
      className={cn(
        "w-full min-h-fit",
        "py-10 md:py-40 px-7 md:px-16",
        "flex flex-col gap-12 md:gap-28 bg-white",
        "bg-linear-to-t from-brand-green-extralight/10 to-90% to-white",
      )}
    >
      <div className="flex flex-col items-center gap-3 w-full h-fit text-center">
        <p className="text-3xl md:text-5xl tracking-tighter">How It Works</p>
        <p className="w-full max-w-2xl mx-auto text-center font-light text-base md:text-lg">
          Your journey as a MeetSession Campus Ambassador in four simple steps
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-5 md:gap-0 items-start justify-center w-full">
        {steps.map((step, idx) => (
          <div
            key={step.id}
            className={cn(
              "w-full max-w-full lg:max-w-96",
              "flex flex-col items-center gap-5 relative",
            )}
          >
            <div
              className={cn(
                "hidden md:flex items-center justify-center",
                "h-8 md:h-10 w-8 md:w-10 rounded-full bg-emerald-100",
                "absolute right-60 sm:right-12 lg:-right-3 -top-4 lg:top-0 z-20",
                "tracking-tighter text-brand-green font-light text-sm sm:text-base",
              )}
            >
              0{step.id}
            </div>

            <div
              className={cn(
                "text-white p-4 md:p-6 h-fit w-fit z-10",
                "rounded-2xl shadow-lg shadow-neutral-300",
                "bg-linear-150 from-emerald-300 to-brand-green",
              )}
            >
              {step.icon}
            </div>

            <div className="w-full h-fit flex flex-col gap-4">
              <p className="text-base sm:text-lg md:text-xl font-medium">
                {step.title}
              </p>
              <p className="font-medium text-neutral-700 w-full font-quicksand max-w-full lg:max-w-72 mx-auto">
                {step.description}
              </p>
            </div>

            {
              <div
                className={cn(
                  "absolute top-0 w-full",
                  idx !== 0 &&
                    "lg:before:absolute lg:before:left-0 lg:before:top-5 lg:before:h-[2px] lg:before:w-40 lg:before:z-0 lg:before:bg-linear-to-r lg:before:from-brand-green-extradark/50 lg:before:to-neutral-50",
                  "lg:after:absolute lg:after:right-0 lg:after:top-5 lg:after:h-[2px] lg:after:w-40 lg:after:z-0 lg:after:bg-linear-to-r lg:after:from-brand-green-extralight lg:after:to-brand-green-extradark/50",
                )}
              />
            }
          </div>
        ))}
      </div>
    </div>
  );
}
const steps = [
  {
    id: 1,
    icon: <UserPlusIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />,
    title: "Apply & Get Selected",
    description:
      "Submit your application showcasing your passion for building communities and leadership experience. Our team reviews and selects ambassadors who align with our values.",
  },
  {
    id: 2,
    icon: <TargetIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />,
    title: "Complete Onboarding",
    description:
      "Join our comprehensive onboarding program where you'll learn about MeetSession, ambassador responsibilities, and receive training on marketing and event management.",
  },
  {
    id: 3,
    icon: <MegaphoneIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />,
    title: "Execute Initiatives",
    description:
      "Organise events, workshops, and campaigns on your campus. Promote MeetSession and help students discover how it can enhance their learning experience.",
  },
  {
    id: 4,
    icon: <TrophyIcon className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />,
    title: "Achieve & Grow",
    description:
      "Track your progress, achieve milestones, earn rewards, and unlock exclusive opportunities. Build portfolio while making a real impact.",
  },
];

function Benefits() {
  const colours = [
    "before:bg-blue-700",
    "before:bg-brand-green",
    "before:bg-purple-600",
    "before:bg-brand-green",
  ];
  function colourSelector(index: number) {
    return colours[(index + 1) % colours.length];
  }

  return (
    <div
      className={cn(
        "bg-white",
        "w-full min-h-fit",
        "py-10 md:py-52 px-7 md:px-16",
        "flex flex-col gap-12 md:gap-16 bg-white",
      )}
    >
      <div className="flex flex-col items-center gap-3 w-full h-fit text-center">
        <p className="text-3xl md:text-5xl tracking-tighter">
          Ambassador Benefits & Perks
        </p>
        <p className="w-full max-w-3xl mx-auto text-center text-base md:text-lg font-quicksand">
          Everything you need to success as a campus ambassador, plus exclusive
          rewards for your dedication and impact.
        </p>
      </div>

      <div className="flex flex-wrap flex-col md:flex-row gap-5 justify-center w-full">
        {benefits.map((benefit, idx) => (
          <div
            key={benefit.id}
            className={cn(
              "flex flex-col items-start gap-4",
              "border border-border rounded-2xl p-6",
              "w-full max-w-full md:max-w-72 relative overflow-hidden",
              "before:absolute before:top-0 before:left-0 before:w-full before:h-2",
              `${colourSelector(idx)}`,
            )}
          >
            <p className="text-base md:text-xl font-medium">{benefit.name}</p>
            <ul className="font-quicksand text-xs md:text-sm font-medium flex flex-col gap-2 w-full">
              {benefit.options.map((option, i) => (
                <li
                  key={i}
                  className="flex items-start justify-start gap-2 text-start"
                >
                  <CheckIcon className="h-5 w-5 text-brand-green" />
                  <span>{option}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center max-w-screen-xl mx-auto">
        <div className="flex flex-col items-start text-start gap-2.5 md:gap-4.5 w-full md:w-1/2">
          <p className="font-semibold text-xl md:text-3xl">
            Real Impact, Real Opportunities
          </p>
          <p className="font-quicksand font-medium">
            As a MeetSession Campus Ambassador, you&apos;re not just promoting a
            product—you&apos;re leading a movement to transform how students
            engage with their education. Your work creates lasting impact on
            your campus community.
          </p>
          <ul className="flex flex-col gap-3.5 w-full">
            {perks.map((perk) => (
              <li
                key={perk.id}
                className="flex items-start justify-start gap-2 md:gap-4 text-start"
              >
                <div
                  className={cn(
                    "p-1.5 rounded-lg",
                    "flex items-center justify-center",
                    "bg-brand-green-extralight/20 text-brand-green",
                  )}
                >
                  <CheckIcon className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <p className="font-semibold text-base">{perk.title}</p>
                  <p className="text-xs md:text-sm font-quicksand">
                    {perk.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="sm:h-120 md:h-144 rounded-[52px] bg-sky-100 w-full md:w-1/2 bg-[url('/image/ms-ambassador-perks.jpg')] bg-cover bg-center"></div>
      </div>
    </div>
  );
}
const perks = [
  {
    id: 1,
    title: "Flexible Schedule",
    description:
      "Balance ambassadorship with your studies and other commitments",
  },
  {
    id: 2,
    title: "Ongoing Support",
    description: "Dedicated team support and resources to help you succeed",
  },
  {
    id: 3,
    title: "Created Freedom",
    description: "Design and execute intiatives that resonate with your campus",
  },
];
const benefits = [
  {
    id: 1,
    name: "Starter Kit",
    options: [
      "Official MeetSession merchandise",
      "Welcome package with branded items",
      "Digital ambassador toolkit",
      "Access to marketing materials",
    ],
  },
  {
    id: 2,
    name: "Premium Access",
    options: [
      "Free premium MeetSession account",
      "Transcription credits",
      "Early access to new features",
      "Priority customer support",
    ],
  },
  {
    id: 3,
    name: "Professional Growth",
    options: [
      "Monthly skill-building workshops",
      "Mentorship with industry experts",
      "LinkedIn recommendation letters",
      "Resume-building opportunities",
    ],
  },
  {
    id: 4,
    name: "Rewards & Recognition",
    options: [
      "Performance based incentives",
      "Exclusive networking events",
      "Certificate of completion",
    ],
  },
];

/*
function FAQs() {
  return (
    <div
      className={cn(
        "bg-white",
        "w-full min-h-fit",
        "py-10 md:py-52 px-7 md:px-16",
        "flex flex-col gap-12 md:gap-16 bg-neutral-50",
      )}
    >
      <div className="flex flex-col items-center gap-3 w-full h-fit text-center">
        <p className="text-3xl md:text-5xl tracking-tighter">
          Frequently Asked Questions
        </p>

        <p className="w-full max-w-3xl mx-auto text-center text-base md:text-lg font-quicksand">
          Everything you need to know about the Campus Ambassador Program
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full max-w-screen-xl mx-auto"
      >
        {questions.map((question) => (
          <AccordionItem
            key={question.id}
            value={String(question.id)}
            className="bg-white rounded-xl px-4 py-2 font-quicksand text-start"
          >
            <AccordionTrigger className="font-medium md:text-base hover:no-underline cursor-pointer">
              {question.question}
            </AccordionTrigger>
            <AccordionContent>{question.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="flex flex-col gap-2 w-full text-center">
        <p>Still have questions?</p>
        <p className="text-brand-green">
          Contact our team at{" "}
          <a href="mailto:ambassador@meetsession.com">
            ambassador@meetsession.io
          </a>
        </p>
      </div>
    </div>
  );
}
const questions = [
  {
    id: 1,
    question: "Who can apply to become a Campus Ambassador?",
    answer:
      "Any undergraduate student who is currently enrolled in a college or university.",
  },
];
*/

function CTA() {
  return (
    <div
      className={cn(
        "w-full min-w-full min-h-fit",
        "py-0 md:py-20 px-0 md:px-16",
        "flex flex-col gap-12 md:gap-16 bg-white",
      )}
    >
      <div
        className={cn(
          "h-full max-w-screen-xl w-full mx-auto bg-black rounded-none md:rounded-[52px] text-white py-20 px-10",
          "flex flex-col gap-5",
        )}
      >
        <div className="flex flex-col items-center gap-3 w-full h-fit text-start md:text-center">
          <p className="text-3xl md:text-5xl tracking-tighter">
            Ready to Lead the Change?
          </p>

          <p className="w-full max-w-3xl mx-auto text-start md:text-center text-base md:text-lg font-quicksand">
            Join hundreds of student leaders who are transforming their campuses
            and building the future of collaborative learning
          </p>
        </div>

        <ul className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-center text-sm md:text-base">
          {offers.map((offer) => (
            <li key={offer.id} className="flex items-center gap-2">
              <CircleCheckBigIcon className="w-5 h-5" />
              <p>{offer.item}</p>
            </li>
          ))}
        </ul>

        <div className="font-quicksand flex flex-col md:flex-row gap-4 w-full justify-center">
          <Button className="bg-neutral-50 hover:bg-neutral-200 text-neutral-800 px-6! h-14">
            Apply Now
            <ArrowRightIcon />
          </Button>

          {/*<Button variant="outline" className="bg-transparent px-6 h-14">
            Download Program Guide
          </Button>*/}
        </div>

        <p className="font-quicksand text-xs md:text-sm text-neutral-200">
          Applications are reviewed on a rolling basis. Apply today to secure
          your spot!
        </p>
      </div>
    </div>
  );
}
const offers = [
  { id: 1, item: "No application fee" },
  { id: 2, item: "Flexible schedule" },
  { id: 3, item: "Exclusive perks" },
];
