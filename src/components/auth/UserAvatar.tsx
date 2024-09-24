import Image from "next/image";
import { auth } from "../../auth";

export default async function UserAvatar() {
  const session = await auth();

  // Check if session is null before accessing user
  if (!session || !session.user) return null;

  return (
    <div>
      <Image src={session.user.image} alt="User Avatar" height={35} width={35} className="rounded-full" />
    </div>
  );
}
