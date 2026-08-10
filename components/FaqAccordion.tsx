'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type FaqItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: FaqItem[];
};

/**
 * Akordeon FAQ – klient-side, dostępny z klawiatury
 * (natywny <button> z aria-expanded i aria-controls).
 */
export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <div key={item.question} className="border-b border-border">
            <h3>
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-semibold text-ink lg:py-6 lg:text-xl"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
              >
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className={`shrink-0 text-green transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            {isOpen && (
              <p id={panelId} role="region" aria-labelledby={buttonId} className="pb-6 leading-7 text-ink/80 lg:pb-8 lg:leading-8">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
