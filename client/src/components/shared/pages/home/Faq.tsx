import { FaqData } from "@/constants";

import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/navigation/accordion";
import { Button } from "@/components/ui/buttons/button";

const Faq = () => {
  return (
    <section id="faq" className="space-y-20">
      <div className="flex flex-col items-center justify-center space-y-5">
        <div className="w-fit rounded-full bg-[var(--primary-blue-muted)] px-4 py-2">
          <span className="text-sm text-[var(--primary-blue)] uppercase">
            FAQ
          </span>
        </div>
        <div>
          <h1 className="text-center text-4xl font-semibold">
            Frequently Asked{" "}
            <span className="text-[var(--primary-blue)]">Questions</span>
          </h1>
        </div>
        <div className="max-w-2xl">
          <p className="text-center text-[var(--primary-gray)]">
            We know bringing AI into your business might feel new — so we’ve put
            together answers to the most common questions to help you feel
            confident and informed.
          </p>
        </div>
      </div>

      <div className="px-36">
        <Accordion type="single" collapsible>
          {FaqData.map(({ id, title, description }) => (
            <AccordionItem
              className="space-y-3 border-b-gray-200 py-4 dark:border-b-[#1b1b1b] dark:text-white"
              key={id}
              value={`item-${id}`}
            >
              <AccordionTrigger className="pb-0 text-left text-base font-semibold">
                {title}
              </AccordionTrigger>
              <AccordionContent className="pb-0 text-[var(--primary-gray)]">
                {description}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="flex flex-col items-center justify-center space-y-5">
        <div>
          <h1 className="text-center text-4xl font-semibold">
            Still Have Questions?
          </h1>
        </div>
        <div className="max-w-2xl">
          <p className="text-center text-[var(--primary-gray)]">
            If you have any further questions or concerns, please don't hesitate
            to reach out to us. Our dedicated support team is always ready to
            assist you with any inquiries you may have.
          </p>
        </div>
        <div>
          <Button className="px-6 font-medium" variant="outline">
            <a href="mailto:jobernify@gmail.com">Contact Us</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Faq;
