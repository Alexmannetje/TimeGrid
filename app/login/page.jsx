import { SignIn } from "@clerk/nextjs";

export default function login() {
  return <SignIn afterSignInUrl="/home" afterSignUpUrl="/login" />;
}
