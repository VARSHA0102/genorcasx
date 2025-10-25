import React, { useEffect, useState, useRef } from "react";
import { useRoute } from "wouter";

import { marked } from "marked";
import { motion, AnimatePresence } from "framer-motion";

if (import.meta.hot) {
  import.meta.hot.accept();
}

function BlogPost() {
  const [match, params] = useRoute("/blog/:slug");
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [headings, setHeadings] = useState<string[]>([]);
  const [activeHeading, setActiveHeading] = useState<string>("");

  const articleRef = useRef<HTMLDivElement>(null);

  // 🧠 Preload all .md files and images at build time
  const files = import.meta.glob('../../blogs/*.md', { query: '?raw', import: 'default' });
  const images = import.meta.glob('../../blogs/img/*.{png,jpg,jpeg,gif,svg}', { import: 'default' });

  useEffect(() => {
    if (!params?.slug) return;
    const slug = decodeURIComponent(params.slug);
    const key = `../../blogs/${slug}.md`;

    async function loadMarkdown() {
      try {
        if (!(key in files)) {
          console.error(`Markdown file not found for slug: ${slug}`);
          setError(true);
          return;
        }

        // Load Markdown content
        const text = await files[key]();
        const html = marked.parse(text, { mangle: false, headerIds: true });

        // Replace relative image paths inside Markdown
        const updatedHtml = html.replace(
          /<img src="\.\/(.*?)"/g,
          (_, filename) => {
            const imageUrl = new URL(`../../blogs/${filename}`, import.meta.url).href;
            return `<img src="${imageUrl}"`;
          }
        );

        // ✅ Add top image for this blog (slug.png)
        let topImageHtml = "";
        const imageKey = `../../blogs/img/${slug}.png`;
        if (imageKey in images) {
          const imageUrl = await images[imageKey]();
          topImageHtml = `<img src="${imageUrl}" class="rounded-xl mb-6 mx-auto" alt="${slug}" />`;
        }

        // Combine top image + Markdown content
        setContent(topImageHtml + updatedHtml);

        // Extract H2 headings (only from Markdown, exclude top image)
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = updatedHtml;
        const h2s = Array.from(tempDiv.querySelectorAll("h2")).map(
          (h) => h.textContent || ""
        );
        setHeadings(h2s);
        setError(false);
      } catch (err) {
        console.error("Error loading blog:", err);
        setError(true);
      }
    }

    loadMarkdown();
  }, [params?.slug]);

  // 🩵 Highlight heading currently visible in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.textContent || "");
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    const articleEl = articleRef.current;
    if (articleEl) {
      const headingEls = articleEl.querySelectorAll("h2");
      headingEls.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [content]);

  // ✨ Smooth scroll to heading
  const scrollToHeading = (headingText: string) => {
    if (!articleRef.current) return;
    const headings = Array.from(articleRef.current.querySelectorAll("h2"));
    const target = headings.find((h) => h.textContent === headingText);
    if (target) {
      setActiveHeading(headingText);
      const yOffset = -100;
      const y = target.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 pt-24 pb-8 text-center text-muted-foreground">
        <h2 className="text-2xl font-semibold mb-4">Blog post not found 📰</h2>
        <p>It seems this article doesn’t exist or hasn’t been published yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto px-4 pt-24 pb-8 gap-8">
      {/* LEFT SIDEBAR */}
      <aside className="hidden lg:flex w-64 sticky top-24 self-start">
        <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-4 flex flex-col gap-3 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            On This Page
          </h3>
          <AnimatePresence>
            {headings.map((heading) => (
              <motion.div
                key={heading}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`cursor-pointer rounded-md px-3 py-1 transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-900 flex items-center ${
                    activeHeading === heading
                      ? "bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-800 dark:to-blue-900 font-semibold text-blue-600 dark:text-blue-400 shadow-md"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                  onClick={() => scrollToHeading(heading)}
                >
                  <span className="ml-1">{heading}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </aside>

      {/* MAIN BLOG CONTENT */}
      <div className="flex-1">
        <motion.article
          ref={articleRef}
          className="
            prose prose-neutral dark:prose-invert 
            max-w-none 
            prose-img:rounded-xl prose-img:mx-auto prose-img:border prose-img:border-border
            prose-p:text-lg
            prose-li:text-lg
          "
          dangerouslySetInnerHTML={{ __html: content }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default BlogPost;
