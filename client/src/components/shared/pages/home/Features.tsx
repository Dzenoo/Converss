import { FeaturesData } from "@/constants";

const Features = () => {
  return (
    <section
      id="features"
      className="flex flex-col items-center justify-center gap-16 space-y-5"
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

      <div className="grid grid-cols-1 gap-10 sm:mx-10 md:grid-cols-2 xl:mx-52 2xl:mx-96">
        {FeaturesData.map((f) => (
          <div key={f.id} className="max-w-xl space-y-2 rounded-xl border p-7">
            <div>
              <f.icon
                style={{
                  color: f.color,
                }}
              />
            </div>
            <div className="pt-2">
              <h2 className="text-base leading-7 font-semibold">{f.title}</h2>
            </div>
            <div>
              <p className="text-sm leading-5 text-[var(--primary-gray)]">
                {f.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
