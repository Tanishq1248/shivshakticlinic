import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health Tips & Blog",
  description:
    "Explore health tips, wellness articles, and medical advice from the doctors at Shiv Shakti Health Clinic.",
};

const blogPosts = [
  {
    id: "1",
    tag: "Wellness",
    title: "5 Simple Habits for Better Health Every Day",
    excerpt: "Small daily habits can make a major difference in your long-term health and well-being.",
    icon: "self_improvement",
    color: "bg-secondary-container/30 text-secondary",
  },
  {
    id: "2",
    tag: "Nutrition",
    title: "Monsoon Diet: What to Eat & What to Avoid",
    excerpt: "The monsoon season brings common infections. Here's how to eat right to stay protected.",
    icon: "nutrition",
    color: "bg-primary-container/30 text-primary",
  },
  {
    id: "3",
    tag: "Homoeopathy",
    title: "Understanding Homoeopathic Treatment",
    excerpt: "Learn how homoeopathy works, its benefits, and when it's the right choice for you.",
    icon: "spa",
    color: "bg-secondary-container/30 text-secondary",
  },
  {
    id: "4",
    tag: "Women's Health",
    title: "Gynaecological Health: What Every Woman Should Know",
    excerpt: "Essential information about women's health, regular checkups, and early detection.",
    icon: "pregnant_woman",
    color: "bg-primary-container/30 text-primary",
  },
  {
    id: "5",
    tag: "Lifestyle",
    title: "Managing Diabetes & Blood Pressure Naturally",
    excerpt: "Practical tips from our doctors on managing lifestyle diseases with diet and exercise.",
    icon: "blood_pressure",
    color: "bg-secondary-container/30 text-secondary",
  },
  {
    id: "6",
    tag: "Respiratory",
    title: "Asthma & Nebulization: What You Need to Know",
    excerpt: "When to seek nebulization therapy and how to manage asthma triggers effectively.",
    icon: "air",
    color: "bg-primary-container/30 text-primary",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="text-center py-xl px-md md:px-lg max-w-container-max mx-auto w-full">
        <div className="inline-block bg-secondary-container/30 text-secondary font-label-technical text-label-technical px-sm py-xs rounded-full mb-md">
          Health Education
        </div>
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-sm">
          Health Tips &amp; Articles
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Expert health advice from our doctors to help you live a healthier, happier life.
        </p>
      </section>

      <section className="pb-xl px-md md:px-lg max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-surface border border-outline-variant/30 rounded-2xl p-lg shadow-card hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-md ${post.color}`}
              >
                <span className="material-symbols-outlined">{post.icon}</span>
              </div>
              <div className="mb-sm">
                <span className="inline-block bg-surface-container-low text-on-surface-variant font-label-technical text-label-technical px-2 py-1 rounded-md">
                  {post.tag}
                </span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-primary mb-sm">{post.title}</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{post.excerpt}</p>
              <div className="mt-lg flex items-center gap-xs text-secondary font-button text-button group-hover:gap-sm transition-all">
                Read More
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </div>
            </article>
          ))}
        </div>
        <p className="text-center font-body-sm text-body-sm text-on-surface-variant mt-xl">
          More articles coming soon — check back regularly for updates from our doctors.
        </p>
      </section>
    </>
  );
}
