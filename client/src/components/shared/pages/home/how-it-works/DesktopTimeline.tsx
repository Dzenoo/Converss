import TimelineDot from "./TimelineDot";
import { TimelineDataTypes } from "./HowItWorks";

const DesktopTimeline = ({
  timelineData,
}: {
  timelineData: TimelineDataTypes;
}) => {
  return (
    <div className="hidden md:block">
      <div className="relative mt-8 h-[500px] md:mt-12 md:h-[600px] lg:mt-16 lg:h-[700px]">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="lineGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="var(--primary-blue)"
                stopOpacity="0.9"
              />
              <stop
                offset="50%"
                stopColor="var(--primary-blue)"
                stopOpacity="0.7"
              />
              <stop
                offset="100%"
                stopColor="var(--primary-blue)"
                stopOpacity="0.5"
              />
            </linearGradient>
          </defs>

          <path
            d={`
            M ${timelineData[0].position.desktop.x + 2} ${timelineData[0].position.desktop.y + 4}
            C ${timelineData[0].position.desktop.x + 12} ${timelineData[0].position.desktop.y - 8}
              ${timelineData[1].position.desktop.x - 8} ${timelineData[1].position.desktop.y - 12}
              ${timelineData[1].position.desktop.x + 2} ${timelineData[1].position.desktop.y + 4}
            C ${timelineData[1].position.desktop.x + 15} ${timelineData[1].position.desktop.y + 20}
              ${timelineData[2].position.desktop.x - 15} ${timelineData[2].position.desktop.y + 25}
              ${timelineData[2].position.desktop.x + 2} ${timelineData[2].position.desktop.y + 4}
          `}
            stroke="url(#lineGradient)"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-lg"
          />

          <circle r="0.4" fill="var(--primary-blue)" opacity="0.8">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path={`
              M ${timelineData[0].position.desktop.x + 2} ${timelineData[0].position.desktop.y + 4}
              C ${timelineData[0].position.desktop.x + 12} ${timelineData[0].position.desktop.y - 8}
                ${timelineData[1].position.desktop.x - 8} ${timelineData[1].position.desktop.y - 12}
                ${timelineData[1].position.desktop.x + 2} ${timelineData[1].position.desktop.y + 4}
              C ${timelineData[1].position.desktop.x + 15} ${timelineData[1].position.desktop.y + 20}
                ${timelineData[2].position.desktop.x - 15} ${timelineData[2].position.desktop.y + 25}
                ${timelineData[2].position.desktop.x + 2} ${timelineData[2].position.desktop.y + 4}
            `}
            />
          </circle>
          <circle r="0.3" fill="var(--primary-blue)" opacity="0.6">
            <animateMotion
              dur="6s"
              begin="1s"
              repeatCount="indefinite"
              path={`
              M ${timelineData[0].position.desktop.x + 2} ${timelineData[0].position.desktop.y + 4}
              C ${timelineData[0].position.desktop.x + 12} ${timelineData[0].position.desktop.y - 8}
                ${timelineData[1].position.desktop.x - 8} ${timelineData[1].position.desktop.y - 12}
                ${timelineData[1].position.desktop.x + 2} ${timelineData[1].position.desktop.y + 4}
              C ${timelineData[1].position.desktop.x + 15} ${timelineData[1].position.desktop.y + 20}
                ${timelineData[2].position.desktop.x - 15} ${timelineData[2].position.desktop.y + 25}
                ${timelineData[2].position.desktop.x + 2} ${timelineData[2].position.desktop.y + 4}
            `}
            />
          </circle>
        </svg>

        {timelineData.map((item) => (
          <div
            key={item.id}
            className="absolute"
            style={{
              left: `${item.position.desktop.x}%`,
              top: `${item.position.desktop.y}%`,
            }}
          >
            <div className="space-y-6 lg:space-y-10">
              <TimelineDot />

              <div className="flex flex-col items-end justify-end gap-3 lg:gap-5">
                <div
                  className={`relative ${
                    item.id === 1
                      ? "right-12 lg:right-20"
                      : item.id === 2
                        ? "right-40 lg:right-72"
                        : "right-12 lg:right-20"
                  }`}
                >
                  <span className="text-6xl font-bold text-[var(--tertiary-gray)] lg:text-8xl xl:text-9xl">
                    {item.id}
                  </span>
                </div>

                <div className="max-w-xs space-y-2 lg:max-w-sm">
                  <div>
                    <h3 className="text-base leading-tight font-semibold lg:text-lg">
                      {item.title}
                    </h3>
                  </div>
                  <div>
                    <p className="text-sm leading-relaxed font-light text-[var(--primary-gray)] lg:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopTimeline;
