import Image from "next/image";

export default function logo() {
  return (
    <div>
      <Image width={512} height={512} alt="TimeGrid_Logo" src="/TimeGrid_Logo.png" />
    </div>
  );
}
