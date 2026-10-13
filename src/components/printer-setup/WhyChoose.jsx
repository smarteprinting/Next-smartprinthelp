import React from "react";
import {
  BookOpenCheck,
  Laptop,
  MessageCircle,
  Printer,
} from "lucide-react";

const guidancePoints = [
  {
    text: "Guidance for printer installation, computer connectivity, WiFi, driver issues, and offline errors.",
    Icon: Printer,
  },
  {
    text: "Easy-to-follow instructions that explain practical diagnostic steps.",
    Icon: BookOpenCheck,
  },
  {
    text: "Information for supported Windows and Mac printing environments.",
    Icon: Laptop,
  },
  {
    text: "Contact options for discussing unresolved printer issues, subject to actual service availability.",
    Icon: MessageCircle,
  },
];

function WhyChoose() {
  return (
    <section
      aria-labelledby="why-choose-heading"
      className="w-full bg-slate-50 px-4 py-14 sm:px-6 sm:py-16"
    >
      <div className="mx-auto max-w-6xl">
     <h2
  id="why-choose-heading"
  className="text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
>
  Why Choose Smart Print Help for Printer Guidance?
</h2>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {guidancePoints.map(({ text, Icon }) => (
            <li
              key={text}
              className="flex items-start gap-4 border-t border-slate-200 py-5"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                <Icon size={21} aria-hidden="true" />
              </span>
              <p className="pt-1 text-base leading-7 text-slate-700">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default WhyChoose;