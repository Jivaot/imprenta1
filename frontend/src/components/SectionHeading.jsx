import React from 'react';

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow ? (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#3f97d4]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-2xl font-extrabold tracking-tight text-[#184a53] sm:text-[2rem] lg:text-[2.2rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}
