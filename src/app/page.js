import SignIn from "./../components/sign-in";
import Image from "next/image";
import UserAvatar from "../components/auth/UserAvatar";

export default function Home() {
  return (
    <>
    <div>
      hello
      <SignIn/>
      <UserAvatar/>
    </div>
    </>
  );
}
