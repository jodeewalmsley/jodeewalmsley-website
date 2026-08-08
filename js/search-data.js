/* ==========================================================================
   Search index
   QA pass 2026-07-25: Home and About excerpts now mirror their real, approved
   on-page copy. Method, Books, Whisker Wisdom, Blog, Contact and Resources
   entries are still marked [Placeholder] because those pages themselves still
   contain placeholder/unapproved copy — update each excerpt when its page's
   real copy is locked, not before.
   Each entry: { title, url, excerpt, category }
   ========================================================================== */
const SITE_SEARCH_INDEX = [
  { title: "Home", url: "index.html", excerpt: "Hello… I'm Jo-Dee. Helping people think more clearly, build resilience and perform at their best through practical neuroscience, real stories and lived experience.", category: "Page" },
  { title: "About", url: "about.html", excerpt: "I don't just teach resilience. I've had to rebuild mine.", category: "Page" },
  { title: "Speaking", url: "speaking.html", excerpt: "Calmer teams, clearer thinking, better performance — keynotes and workshops.", category: "Page" },
  { title: "The L.A.U.G.H.T.E.R. Method®", url: "laughter-method.html", excerpt: "[Placeholder] The signature framework behind Jo-Dee's work.", category: "Page" },
  { title: "Resilience — The L.A.U.G.H.T.E.R. Method®", url: "laughter-method-resilience.html", excerpt: "Life will compress you. Resilience helps you rise again. Resilience isn't about avoiding difficult times — it's about learning how to recover, adapt and keep moving forward.", category: "Pillar" },
  { title: "Love, Laughter & Longevity — The L.A.U.G.H.T.E.R. Method®", url: "laughter-method-love.html", excerpt: "Everything begins with connection. Love, laughter and meaningful connection are some of the most powerful contributors to lifelong wellbeing.", category: "Pillar" },
  { title: "Awareness & Acceptance — The L.A.U.G.H.T.E.R. Method®", url: "laughter-method-awareness.html", excerpt: "Awareness gives you choice. Meet The Captain of Your Ship, the teaching framework for emotional awareness, resilience and intentional choice.", category: "Pillar" },
  { title: "Unpack, Understand & Unify — The L.A.U.G.H.T.E.R. Method®", url: "laughter-method-unpack.html", excerpt: "Sometimes the biggest step forward begins by gently unpacking what you've been carrying. Meet The Life Picture™, the signature teaching tool for understanding what you carry and choosing what stays.", category: "Pillar" },
  { title: "Books", url: "books.html", excerpt: "[Placeholder] Whisker Wisdom® and future titles.", category: "Page" },
  { title: "Whisker Wisdom® — Volume One", url: "book-whisker-wisdom.html", excerpt: "[Placeholder] Book description and where to buy.", category: "Book" },
  { title: "Blog", url: "blog.html", excerpt: "[Placeholder] Insights and articles.", category: "Page" },
  { title: "[Placeholder] Sample Blog Post Title", url: "blog-post-example.html", excerpt: "[Placeholder] Sample article body copy goes here.", category: "Blog Post" },
  { title: "Media, Press & Recognition", url: "media.html", excerpt: "Media coverage and interviews featuring Jo-Dee Walmsley, including Khaleej Times, Social Radar, YogaLife and The Woking Magazine.", category: "Page" },
  { title: "Contact", url: "contact.html", excerpt: "[Placeholder] Book Jo-Dee to speak, or send a general enquiry.", category: "Page" },
  { title: "Resources", url: "resources.html", excerpt: "[Placeholder] Downloadable one-sheet, media kit, and excerpts.", category: "Page" }
];
