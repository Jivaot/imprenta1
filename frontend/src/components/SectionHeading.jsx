import React from 'react';

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#0f8c93]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-3xl font-extrabold tracking-tight text-[#184a53] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
