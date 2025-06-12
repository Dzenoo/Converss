import * as motion from "motion/react-client";

import { FeaturesData, popIn, staggerContainer } from "@/constants";

const MotionDiv = motion.div;

const Features = () => {
  return (
    <section
      id="features"
      className="flex flex-col items-center justify-center gap-16 px-4"
    >
      <div className="space-y-5">
        <div>
          <h1 className="text-center text-2xl font-semibold lg:text-4xl">
            Why Choose{" "}
            <span className="text-[var(--primary-blue)]">Converss?</span>
          </h1>
        </div>
        <div className="max-w-xl">
          <p className="text-center text-sm text-[var(--primary-gray)] md:text-base">
            Everything you need to create, deploy, and manage AI chat assistants
            that delight your customers and grow your business.
          </p>
        </div>
      </div>

      <MotionDiv
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="grid grid-cols-1 gap-10 sm:mx-10 md:grid-cols-2 xl:mx-52 2xl:mx-96"
      >
        {FeaturesData.map((f) => (
          <MotionDiv
            key={f.id}
            variants={popIn}
            className="max-w-xl space-y-2 rounded-xl border bg-white p-7 shadow-sm"
            whileHover={{ scale: 1.1 }}
          >
            <div>
              <f.icon style={{ color: f.color }} />
            </div>
            <div className="pt-2">
              <h2 className="text-base leading-7 font-semibold">{f.title}</h2>
            </div>
            <div>
              <p className="text-sm leading-5 text-[var(--primary-gray)]">
                {f.description}
              </p>
            </div>
          </MotionDiv>
        ))}
      </MotionDiv>
    </section>
  );
};

export default Features;
