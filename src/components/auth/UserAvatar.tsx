import { auth } from "../../auth";

export default async function UserAvatar() {
  const session = await auth();

  // Check if session is null before accessing user
  if (!session || !session.user) return null;

  return (
    <div>
      <img src={session.user.image} alt="User Avatar" />
    </div>
  );
}
