"use client";

import Link from "next/link";

import { cn, scrollToSection } from "@/lib/utils";
import { FooterLinks } from "@/constants";

import Logo from "@/components/shared/Logo";

const Footer = () => {
  return (
    <footer
      className={cn(
        "border-t border-gray-100 bg-white px-5 py-8 shadow-lg dark:border-[#1b1b1b] dark:bg-[#0d0d0d]",
      )}
    >
      <div className="flex items-start justify-between gap-10 max-xl:flex-wrap dark:border-[#1b1b1b]">
        <div className="flex basis-[36em] flex-col gap-5 max-xl:basis-full">
          <div className="relative right-13">
            <Logo />
          </div>

          <div className="max-w-lg">
            <p className="text-[var(--primary-gray)]">
              The easiest way for small businesses to create their own AI
              assistant.
            </p>
          </div>
          {/* <div>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={FooterLinks.find((link) => link.id === "5")?.links[0].href}
            >
              <LinkedinIcon />
            </a>
          </div> */}
          <div>
            <span className="text-center text-sm font-light text-[var(--primary-gray)]">
              &copy; 2024 Copyright, Jobernify. All rights reserved
            </span>
          </div>
        </div>
        <div className="flex items-start justify-between gap-16 max-lg:flex-wrap">
          {FooterLinks.slice(0, 4).map((links) => renderFooterLinks(links))}
        </div>
      </div>
    </footer>
  );
};

function renderFooterLinks<
  T extends {
    title: string;
    links: {
      id: number;
      href: string;
      name: string;
    }[];
    id: number;
  },
>({ title, links, id }: T): React.JSX.Element {
  return (
    <div key={id} className="space-y-3">
      <div>
        <h1 className="text-sm font-medium uppercase">{title}</h1>
      </div>
      <div>
        <ul className="flex flex-col gap-2">
          {links.map((link) => {
            return (
              <li
                key={link.id}
                className="text-sm text-[var(--primary-gray)] transition-all hover:text-black dark:hover:text-white"
              >
                {link.href.includes("/") ? (
                  <Link href={link.href}>{link.name}</Link>
                ) : (
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="cursor-pointer"
                  >
                    {link.name}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Footer;
