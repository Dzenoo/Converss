import TimelineDot from "./TimelineDot";
import { TimelineDataTypes } from "./HowItWorks";

const MobileTimeline = ({
  timelineData,
}: {
  timelineData: TimelineDataTypes;
}) => {
  return (
    <div className="md:hidden">
      <div className="relative h-[800px] sm:h-[900px]">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="mobileLineGradient"
              x1="0%"
              y1="0%"
              x2="0%"
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
           M ${timelineData[0].position.mobile.x + 2} ${timelineData[0].position.mobile.y + 4}
           C ${timelineData[0].position.mobile.x + 8} ${timelineData[0].position.mobile.y + 12}
             ${timelineData[1].position.mobile.x - 5} ${timelineData[1].position.mobile.y - 8}
             ${timelineData[1].position.mobile.x + 2} ${timelineData[1].position.mobile.y + 4}
           C ${timelineData[1].position.mobile.x - 8} ${timelineData[1].position.mobile.y + 12}
             ${timelineData[2].position.mobile.x + 5} ${timelineData[2].position.mobile.y - 8}
             ${timelineData[2].position.mobile.x + 2} ${timelineData[2].position.mobile.y + 4}
         `}
            stroke="url(#mobileLineGradient)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-lg"
          />

          <circle r="0.5" fill="var(--primary-blue)" opacity="0.8">
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              path={`
             M ${timelineData[0].position.mobile.x + 2} ${timelineData[0].position.mobile.y + 4}
             C ${timelineData[0].position.mobile.x + 8} ${timelineData[0].position.mobile.y + 12}
               ${timelineData[1].position.mobile.x - 5} ${timelineData[1].position.mobile.y - 8}
               ${timelineData[1].position.mobile.x + 2} ${timelineData[1].position.mobile.y + 4}
             C ${timelineData[1].position.mobile.x - 8} ${timelineData[1].position.mobile.y + 12}
               ${timelineData[2].position.mobile.x + 5} ${timelineData[2].position.mobile.y - 8}
               ${timelineData[2].position.mobile.x + 2} ${timelineData[2].position.mobile.y + 4}
           `}
            />
          </circle>
        </svg>

        {timelineData.map((item) => (
          <div
            key={item.id}
            className="absolute"
            style={{
              left: `${item.position.mobile.x}%`,
              top: `${item.position.mobile.y}%`,
            }}
          >
            <div className="flex items-start gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <TimelineDot className="h-12 w-12 sm:h-14 sm:w-14" />
              </div>

              <div className="flex-1 space-y-2 pt-1">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-[var(--tertiary-gray)] sm:text-5xl">
                    {item.id}
                  </span>
                  <div>
                    <h3 className="text-base leading-tight font-semibold sm:text-lg">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <div className="max-w-xs sm:max-w-sm">
                  <p className="text-sm leading-relaxed font-light text-[var(--primary-gray)] sm:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileTimeline;
