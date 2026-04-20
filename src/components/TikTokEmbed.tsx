"use client";

import { useEffect, useRef } from "react";

interface TikTokEmbedProps {
  url: string;
}

export default function TikTokEmbed({ url }: TikTokEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load TikTok embed script
    const existingScript = document.querySelector(
      'script[src="https://www.tiktok.com/embed.js"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Re-trigger embed processing
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).tiktokEmbed?.lib?.render?.();
    }
  }, [url]);

  // Extract video ID from URL
  const videoId = url.match(/video\/(\d+)/)?.[1] || "";

  return (
    <div ref={containerRef} className="w-full max-w-[325px]">
      <blockquote
        className="tiktok-embed"
        cite={url}
        data-video-id={videoId}
        style={{ maxWidth: 325, minWidth: 250 }}
      >
        <section>
          <a target="_blank" rel="noopener noreferrer" href={url}>
            @timseydiii
          </a>
        </section>
      </blockquote>
    </div>
  );
}
