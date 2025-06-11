import {
  Accordion,
  AccordionTrigger,
  AccordionItem,
  AccordionContent,
} from "@/components/ui/navigation/accordion";
import { Button } from "@/components/ui/buttons/button";

export const FaqData = [
  {
    id: 1,
    title: "Do I need to know how to code?",
    description:
      "Creating a profile is simple: sign up, fill in your details like education, experience, and skills, and upload your resume to complete your profile.",
  },
  {
    id: 2,
    title: "What is a “message”?",
    description:
      "Yes, you can apply to multiple jobs. Simply navigate to each job listing and submit your application with a few clicks.",
  },
  {
    id: 3,
    title: "Can I try it before paying?",
    description:
      "Set up job alerts by specifying the job title, level, and type. You will receive email notifications whenever new postings match all three criteria.",
  },
  {
    id: 4,
    title: "How do I add the assistant to my website?",
    description:
      "Yes, our platform is completely free for job seekers, including features like job applications, alerts, and profile creation.",
  },
  {
    id: 5,
    title: "What happens when I hit the free message limit?",
    description:
      "You can track your application status in your profile, which provides updates such as 'Pending,' 'Interview', 'Accepted' or 'Rejected'",
  },
  {
    id: 6,
    title: "Can I use this on multiple websites?",
    description:
      "Following an employer allows you to stay updated with their latest job postings. You will receive email notifications whenever they list a new opportunity.",
  },
];

const Faq = () => {
  return (
    <section className="space-y-20">
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
              <AccordionTrigger className="pb-0 text-left font-semibold max-sm:text-sm">
                {title}
              </AccordionTrigger>
              <AccordionContent className="pb-0 text-[#9C9C9C]">
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
