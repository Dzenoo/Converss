import Link from "next/link";

import { Button } from "@/components/ui/buttons/button";

const NotFound: React.FC<{ href?: string }> = ({ href = "/" }) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-6xl font-semibold">404</h1>
      <h2 className="text-2xl font-semibold dark:text-white">
        Oops! Page Not Found
      </h2>
      <p className="max-w-md text-center text-[var(--primary-gray)]">
        We are sorry, but the page you are looking for doesnt exist or has been
        moved.
      </p>
      <Link href={href}>
        <Button>Go Back Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
