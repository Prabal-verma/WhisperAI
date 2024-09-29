import { signIn } from "../auth"
import { SignInButton } from "./auth/signin-button"
import { SignOutButton } from "./auth/signout-button"
 
export default function SignIn() {
  return (
    <>
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
    <form
      action={async (formData) => {
        "use server"
        await signIn("credentials", formData)
      }}
    >
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button>Sign In</button>
    </form>
    <SignInButton/>
    <SignOutButton/>
    </>
  )
} 