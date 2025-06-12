import { cn } from "@/lib/utils";

const TimelineDot = ({
  className = "",
  ...props
}: React.ComponentProps<"div"> & {
  className?: string;
}) => {
  return (
    <div
      {...props}
      className={cn(
        "relative z-20 flex items-center justify-center rounded-full bg-white drop-shadow drop-shadow-blue-100",
        "border-2 border-white/50 shadow-lg transition-all hover:scale-105",
        "h-16 w-16",
        className,
      )}
    >
      <div className="h-5 w-5 rounded-full bg-[var(--secondary-gray)]"></div>
    </div>
  );
};

export default TimelineDot;
