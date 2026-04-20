"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/lib/data";
import FadeIn from "@/components/motion/FadeIn";
import CouponButton from "@/components/CouponButton";

const STEPS = [
  {
    title: "Signup on LitBuy",
    desc: "Create a LitBuy Account to get 70% Shipping Coupons and download the LitBuy App.",
    type: "signup" as const,
  },
  {
    title: "Create Your Haul",
    desc: "Our website helps you to easily browse all products, find your favorites and open the Link. Add them to your cart by choosing your Size or Color and complete your payment.",
    type: "browse" as const,
  },
  {
    title: "Ship Out Your Haul",
    desc: "After 2-3 Days your Haul arrives in the LitBuy Warehouse and you will receive detailed Quality Check Pictures for your Items. Select your Items and choose a Shipping Line for your Country. Pay the Shipping fee and wait about 7-10 Days till your Haul arrives at your Door.",
    type: "ship" as const,
  },
  {
    title: "Join the Community",
    desc: "If you have any Questions or need help with your Order, join our Community for 24/7 Support.",
    type: "community" as const,
  },
];

export default function TutorialContent() {
  return (
    <div className="max-w-[800px] mx-auto px-5 py-12 pb-20">
      <FadeIn>
        <div className="text-center mb-12">
          <h1 className="text-[clamp(28px,6vw,42px)] font-black uppercase mb-3">
            How to <span className="text-accent">Order</span>
          </h1>
          <p className="text-text-secondary text-[15px]">
            Follow these 4 simple steps to get your haul
          </p>
        </div>
      </FadeIn>

      <div className="flex flex-col gap-4 mb-12">
        {STEPS.map((step, i) => (
          <FadeIn key={i} delay={0.1 + i * 0.1}>
            <div className="bg-bg-card border border-border rounded-xl p-6 flex gap-5 items-start hover:border-accent/20 transition-colors">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 400, damping: 15 }}
                className="w-10 h-10 bg-accent text-bg-primary rounded-lg flex items-center justify-center font-mono text-lg font-bold shrink-0"
              >
                {i + 1}
              </motion.div>
              <div className="flex-1">
                <h2 className="font-mono text-[15px] font-black uppercase mb-1.5">
                  {step.title}
                </h2>
                <p className="text-text-secondary text-sm leading-relaxed mb-3">
                  {step.desc}
                </p>

                {step.type === "signup" && (
                  <CouponButton
                    href={SITE_CONFIG.litbuyInvite}
                    label="Sign Up on LitBuy"
                    subLabel="70% Off"
                    external
                  />
                )}

                {step.type === "browse" && (
                  <Link href="/litbuy-spreadsheet">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-bg-primary font-mono text-xs font-bold uppercase tracking-wide rounded-lg hover:bg-accent-hover transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M19 7h-3V6a4 4 0 00-8 0v1H5a1 1 0 00-1 1v11a3 3 0 003 3h10a3 3 0 003-3V8a1 1 0 00-1-1zm-9-1a2 2 0 014 0v1h-4V6zm8 13a1 1 0 01-1 1H7a1 1 0 01-1-1V9h2v1a1 1 0 002 0V9h4v1a1 1 0 002 0V9h2v10z" />
                      </svg>
                      Browse All Products
                    </motion.div>
                  </Link>
                )}

                {step.type === "community" && (
                  <div className="flex gap-2 flex-wrap">
                    <motion.a
                      href={SITE_CONFIG.discord}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5865f2] hover:bg-[#4752c4] text-white font-mono text-xs font-bold uppercase tracking-wide rounded-lg transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                        <path d="M20.317 4.37a19.79 19.79 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.618-1.25.077.077 0 00-.079-.037A19.74 19.74 0 003.677 4.37a.07.07 0 00-.032.028C.533 9.046-.32 13.58.099 18.058a.082.082 0 00.031.056 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.873-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.11 13.11 0 01-1.872-.892.077.077 0 01-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 01.078-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.009c.12.1.246.198.373.292a.077.077 0 01-.006.127 12.3 12.3 0 01-1.873.892.076.076 0 00-.041.107c.36.698.772 1.363 1.225 1.993a.076.076 0 00.084.028 19.84 19.84 0 006.002-3.03.077.077 0 00.031-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.029zM8.02 15.33c-1.183 0-2.157-1.086-2.157-2.419s.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.332-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419s.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z" />
                      </svg>
                      Join Discord
                    </motion.a>
                    <motion.a
                      href={SITE_CONFIG.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0088cc] hover:bg-[#006da3] text-white font-mono text-xs font-bold uppercase tracking-wide rounded-lg transition-colors"
                    >
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                        <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                      Join Telegram
                    </motion.a>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
