'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    ArrowLeft,
    Target,
    Users,
    Mic,
    FolderOpen,
    MessageSquare,
    Globe,
    Shield,
    Smartphone
} from 'lucide-react';
import { BackAction } from '@/components/back-button';

export default function AboutMeetSession() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <BackAction name="Back" />
                    <h1 className="text-xl mt-10 font-bold text-slate-900 mb-2">
                        About MeetSession
                    </h1>
                    <p className="text-lg text-slate-600">
                        Your smart legal companion for recording, transcribing, and organizing meetings, all in one app.
                    </p>
                </div>

                {/* Our Mission */}
                <Card className="mb-6 border-0 shadow-lg bg-gradient-to-br from-teal-500 to-teal-600">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <div className="flex items-center text-center gap-4">
                                    <Image
                                        src="/svg/our-mission.svg"
                                        alt="hero"
                                        width={10}
                                        height={15}
                                        className="h-auto w-14"
                                    />
                                    <h2 className="text-2xl text-center font-bold text-white mb-3">
                                        Our Mission
                                    </h2>
                                </div>

                                <p className="text-teal-50 mt-5 text-md font-semibold leading-relaxed">
                                    We help legal professionals capture every word, stay organized, and access case notes anytime, anywhere.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Why MeetSession */}
                <Card className="mb-6 border-0 shadow-lg bg-gradient-to-br from-teal-600 to-teal-700">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                            <div className="flex-1">
                                <div className="flex items-center text-center gap-4">
                                    <Image
                                        src="/svg/why-meet.svg"
                                        alt="hero"
                                        width={10}
                                        height={15}
                                        className="h-auto w-14"
                                    />
                                    <h2 className="text-2xl font-bold text-white mb-3">
                                        Why MeetSession
                                    </h2>
                                </div>

                                <p className="text-teal-50 mt-5 text-md font-semibold text-lg leading-relaxed">
                                    Built for the realities of Board Rooms and chambers, fast, accurate, and secure.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Features List */}
                <div className="space-y-4 mb-6">
                    <FeatureCard
                        icon={<Mic className="h-5 w-5" />}
                        title="Accurate Transcripts"
                        description="AI tuned for noisy courtrooms."
                    />

                    <FeatureCard
                        icon={<FolderOpen className="h-5 w-5" />}
                        title="Stay Organized"
                        description="Save recordings neatly into folders."
                    />

                    <FeatureCard
                        icon={<MessageSquare className="h-5 w-5" />}
                        title="Cross-Examination Mode"
                        description="Tailored for courtroom questioning."
                    />

                    <FeatureCard
                        icon={<Globe className="h-5 w-5" />}
                        title="Works Anywhere"
                        description="On any device, with any mic."
                    />

                    <FeatureCard
                        icon={<Shield className="h-5 w-5" />}
                        title="Secure & Private"
                        description="Strong protection for sensitive data."
                    />
                </div>

                {/* How It Works */}
                <Card className="mb-8 border-0 shadow-lg bg-gradient-to-br from-teal-600 to-teal-700">
                    <CardContent className="p-4">
                        <div className="flex items-center text-center gap-4">
                            <Image
                                src="/svg/how-it-works.svg"
                                alt="hero"
                                width={10}
                                height={15}
                                className="h-auto w-14"
                            />
                            <h2 className="mt-2 text-md font-semibold text-lg text-white">
                                How It Works
                            </h2>
                        </div>

                        <div className=" mt-4">
                            <StepItem number="1" text="Record your session." />
                            <StepItem number="2" text="Transcribe instantly with AI." />
                            <StepItem number="3" text="Save & Organize with ease." />
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <div className="text-center text-slate-400 text-sm">
                    © 2025 MeetSession by Devon Technologies Ltd.
                </div>
            </div>
        </div>
    );
}

function FeatureCard({
    title,
    description
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <Card className="border-0 shadow-md bg-slate-800 hover:bg-slate-750 transition-colors">
            <CardContent>
                <div className="flex items-center text-md text-white text-center gap-2">
                    <div className="font-bold">
                        {title}
                    </div> -
                    <span className="font-semibold">
                        {description}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

function StepItem({ number, text }: { number: string; text: string }) {
    return (
        <div className="flex items-center gap-4 text-teal-50">
            <span className="text-lg font-semibold">
                {number}.
            </span>
            <span className="text-lg font-semibold">
                {text}
            </span>
        </div>
    );
}