import { AlertTriangle, Calendar, Puzzle, Database, Clock, X } from 'lucide-react';
import { ScrollReveal, StaggerReveal, StaggerItem } from '@/components/ScrollReveal';

const problems = [
  {
    icon: AlertTriangle,
    title: 'AI Voice Agents Hallucinate Appointments',
    description: 'Your agent tells two different callers the same slot is available. Both show up. Chaos ensues.',
  },
  {
    icon: X,
    title: 'Double-Bookings Destroy Trust',
    description: 'One mistake and your client is calling you angry. Your reputation is on the line.',
  },
  {
    icon: Puzzle,
    title: 'Patchwork Tools Break Under Load',
    description: 'Zapier + Google Calendar + Cal.com wasn\'t built for real-time voice agent traffic.',
  },
];

const solutions = [
  {
    icon: Database,
    title: 'Atomic Booking Guarantee',
    description: 'Hold → Confirm state machine with database-level locking. When TEIKOS says it\'s open, it\'s open.',
  },
  {
    icon: Clock,
    title: 'Real-Time Availability',
    description: 'Never cached. Computed live on every call.',
  },
  {
    icon: Calendar,
    title: 'One Integration, Infinite Scale',
    description: 'Connect to Vapi, Retell, n8n, or any webhook-capable system in minutes.',
  },
];

export function ProblemSolution() {
  return (
    <section className="section-padding bg-white">
      <div className="container-max mx-auto">
        {/* Section Header */}
        <ScrollReveal className="text-center mb-16">
          <span className="inline-block bg-teikos-coral/20 border-[2px] border-teikos-coral rounded-full px-4 py-2 text-sm font-body font-semibold text-teikos-coral-deep mb-4">
            The Problem
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-dark max-w-3xl mx-auto">
            Your Voice Agent Is Making{' '}
            <span className="text-teikos-coral">Costly Mistakes</span>
          </h2>
        </ScrollReveal>

        {/* Problem Cards */}
        <StaggerReveal className="grid md:grid-cols-3 gap-6 mb-8">
          {problems.map((problem, index) => (
            <StaggerItem key={index}>
              <div className="teikos-card h-full border-teikos-coral/30">
                <div className="w-12 h-12 bg-teikos-coral/20 border-[2px] border-teikos-coral rounded-lg flex items-center justify-center mb-4">
                  <problem.icon className="w-6 h-6 text-teikos-coral-deep" />
                </div>
                <h3 className="font-heading font-bold text-xl text-dark mb-3">
                  {problem.title}
                </h3>
                <p className="font-body text-dark/70 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>

        {/* VS Divider */}
        <ScrollReveal className="flex justify-center my-12">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-32 h-[3px] bg-dark/20" />
            </div>
            <div className="relative bg-white border-[3px] border-dark rounded-full w-16 h-16 flex items-center justify-center">
              <span className="font-heading font-bold text-lg text-dark">VS</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-end">
              <div className="w-32 h-[3px] bg-dark/20" />
            </div>
          </div>
        </ScrollReveal>

        {/* Solution Header */}
        <ScrollReveal className="text-center mb-12">
          <span className="inline-block bg-teikos-blue/20 border-[2px] border-teikos-blue rounded-full px-4 py-2 text-sm font-body font-semibold text-teikos-blue-deep mb-4">
            The Solution
          </span>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-dark max-w-3xl mx-auto">
            TEIKOS:{' '}
            <span className="text-teikos-blue">Infrastructure-Grade</span>{' '}
            Scheduling
          </h2>
        </ScrollReveal>

        {/* Solution Cards */}
        <StaggerReveal className="grid md:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <StaggerItem key={index}>
              <div className="teikos-card h-full border-teikos-blue/30">
                <div className="w-12 h-12 bg-teikos-blue/20 border-[2px] border-teikos-blue rounded-lg flex items-center justify-center mb-4">
                  <solution.icon className="w-6 h-6 text-teikos-blue-deep" />
                </div>
                <h3 className="font-heading font-bold text-xl text-dark mb-3">
                  {solution.title}
                </h3>
                <p className="font-body text-dark/70 leading-relaxed">
                  {solution.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
