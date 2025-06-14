import Image from "next/image";

import { Button } from "../ui/buttons/button";

const GoogleAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const handleGoogleAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <Button
      variant="outline"
      className="flex w-full items-center justify-center"
      type="button"
      onClick={() => handleGoogleAuth()}
    >
      <Image
        src="/assets/icons/google-icon-logo-transparent.png"
        alt="google-logo"
        width={40}
        height={40}
      />
      {children}
    </Button>
  );
};

export default GoogleAuth;
