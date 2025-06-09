import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/assets/images/converss-logo-dark.png"
        alt="converss-logo"
        width={200}
        height={200}
      />
    </Link>
  );
};

export default Logo;
