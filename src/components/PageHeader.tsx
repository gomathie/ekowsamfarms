import React from 'react';

interface PageHeaderProps {
  /** Small uppercase label above the title. */
  eyebrow: string;
  title: string;
  description?: string;
  /** Optional background photo; a dark scrim keeps text legible over it. */
  image?: string;
  /** Buttons or other controls rendered under the description. */
  children?: React.ReactNode;
}

/**
 * The dark banner at the top of every interior page. Keeping it in one place
 * means the eyebrow/title/description rhythm stays identical across the site.
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  image,
  children
}) => (
  <section className="relative bg-brand-950 text-white overflow-hidden">
    {image && (
      <>
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 via-brand-950/70 to-brand-950" />
      </>
    )}

    <div className="relative max-w-7xl mx-auto text-center px-4 py-14 sm:py-16 space-y-3">
      <span className="inline-block text-[11px] font-bold text-accent-300 uppercase tracking-[0.18em] bg-brand-900/80 px-3 py-1 rounded-full border border-brand-800">
        {eyebrow}
      </span>

      <h1 className="text-3xl sm:text-5xl font-black font-serif leading-tight">
        {title}
      </h1>

      {description && (
        <p className="text-brand-200 text-sm max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}

      {children && <div className="pt-3">{children}</div>}
    </div>
  </section>
);
