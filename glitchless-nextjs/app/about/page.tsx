"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HolographicCard from "@/components/HolographicCard";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function AboutPage() {
  const team = [
    {
      name: "Naman Patel",
      role: "Founder & CEO",
      bio: "Visionary leader driving innovation in developer tooling.",
      icon: "👨‍💻",
    },
    {
      name: "Satvik Sharma",
      role: "CTO",
      bio: "Tech architect. Building scalable systems that just work.",
      icon: "⚡",
    },
    {
      name: "Bhasit Gupta",
      role: "Lead Developer",
      bio: "Full-stack wizard. Turning complex problems into elegant solutions.",
      icon: "🧙‍♂️",
    },
    {
      name: "Akshat Soni",
      role: "Product Designer",
      bio: "UI/UX enthusiast. Making developer tools beautiful and intuitive.",
      icon: "🎨",
    },
  ];

  const values = [
    {
      title: "Developer First",
      description: "We build tools we'd want to use. Every feature starts with developer pain points.",
      icon: "💡",
    },
    {
      title: "AI-Powered",
      description: "Leveraging cutting-edge AI to automate the tedious parts of debugging.",
      icon: "🤖",
    },
    {
      title: "Privacy Matters",
      description: "Your logs stay yours. We never store or share your data.",
      icon: "🔒",
    },
    {
      title: "Open Source",
      description: "Contributing back to the community. Transparency in everything we do.",
      icon: "🌐",
    },
  ];

  return (
    <>
      <AnimatedBackground />
      <Navbar />
      
      <main className="min-h-screen pt-24 pb-16 px-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Hero Section */}
          <section className="text-center py-16 animate-[fadeInUp_0.6s_ease-out]">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-sm font-medium mb-6">
              🚀 Our Story
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Building the Future of
              <br />
              <span className="bg-gradient-to-r from-[var(--accent)] to-cyan-300 bg-clip-text text-transparent">
                Developer Tools
              </span>
            </h1>
            <p className="text-xl text-[var(--secondary)] max-w-[700px] mx-auto leading-relaxed">
              Glitchless was born from frustration. We were tired of spending hours debugging 
              when we could be shipping. So we built the tool we wished existed.
            </p>
          </section>

          {/* Stats Section */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 animate-[fadeInUp_0.8s_ease-out_0.2s_backwards]">
            {[
              { value: "10K+", label: "Developers" },
              { value: "50M+", label: "Logs Analyzed" },
              { value: "99.9%", label: "Uptime" },
              { value: "4.9★", label: "Rating" },
            ].map((stat, i) => (
              <HolographicCard key={i} intensity="low" className="text-center p-6">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-[var(--accent)] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-[var(--secondary)] text-sm">{stat.label}</div>
              </HolographicCard>
            ))}
          </section>

          {/* Mission Section */}
          <section className="grid md:grid-cols-2 gap-12 items-center mb-20 animate-[fadeInUp_0.8s_ease-out_0.4s_backwards]">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Mission is Simple
              </h2>
              <p className="text-[var(--secondary)] text-lg leading-relaxed mb-6">
                We believe debugging should be fast, intuitive, and even enjoyable. 
                Every developer deserves tools that understand their code as well as they do.
              </p>
              <p className="text-[var(--secondary)] text-lg leading-relaxed">
                We're not just building a product. We're creating a future where 
                shipping code is frictionless and bugs are caught before they reach production.
              </p>
            </div>
            <HolographicCard intensity="high" className="p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-2xl">
                    🎯
                  </div>
                  <div>
                    <h3 className="font-semibold">Reduce Debugging Time</h3>
                    <p className="text-sm text-[var(--secondary)]">by 90% with AI-powered analysis</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--success)]/10 flex items-center justify-center text-2xl">
                    🚀
                  </div>
                  <div>
                    <h3 className="font-semibold">Ship Faster</h3>
                    <p className="text-sm text-[var(--secondary)]">Focus on features, not fixes</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center text-2xl">
                    🤝
                  </div>
                  <div>
                    <h3 className="font-semibold">Empower Teams</h3>
                    <p className="text-sm text-[var(--secondary)]">Collaborate with context</p>
                  </div>
                </div>
              </div>
            </HolographicCard>
          </section>

          {/* Values Section */}
          <section className="mb-20 animate-[fadeInUp_0.8s_ease-out_0.6s_backwards]">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-[var(--secondary)]">The principles that guide everything we do</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, i) => (
                <HolographicCard key={i} intensity="low" className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-2xl shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                      <p className="text-[var(--secondary)] text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </HolographicCard>
              ))}
            </div>
          </section>

          {/* Team Section */}
          <section className="mb-20 animate-[fadeInUp_0.8s_ease-out_0.8s_backwards]">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet the Team</h2>
              <p className="text-[var(--secondary)]">The people behind Glitchless</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, i) => (
                <HolographicCard key={i} intensity="low" className="p-6 text-center group">
                  <div className="w-20 h-20 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center text-4xl mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {member.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-[var(--accent)] text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-[var(--secondary)] text-sm leading-relaxed">{member.bio}</p>
                </HolographicCard>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center animate-[fadeInUp_1s_ease-out_1s_backwards]">
            <HolographicCard intensity="high" className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Ship Faster?
              </h2>
              <p className="text-[var(--secondary)] text-lg mb-8 max-w-[500px] mx-auto">
                Join thousands of developers who are debugging smarter, not harder.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/login"
                  className="bg-gradient-to-br from-[var(--accent)] to-[#00C8D4] text-[var(--primary)] px-8 py-4 rounded-xl font-semibold shadow-[0_4px_15px_rgba(0,242,255,0.3)] transition-all hover:shadow-[0_6px_20px_rgba(0,242,255,0.5)] hover:-translate-y-0.5 no-underline inline-flex items-center justify-center gap-2"
                >
                  <span>Get Started Free</span>
                  <span>→</span>
                </Link>
                <Link
                  href="/#how-it-works"
                  className="border border-[var(--glass-border)] text-white px-8 py-4 rounded-xl font-semibold no-underline transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] inline-flex items-center justify-center"
                >
                  See How It Works
                </Link>
              </div>
            </HolographicCard>
          </section>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
