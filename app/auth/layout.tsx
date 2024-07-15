import Image from "next/image";
import bg from "./../../public/bg.jpg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex items-center justify-center">
      <Image
        src={bg}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-10"
      />
      {children}
    </div>
  );
};
export default AuthLayout;
