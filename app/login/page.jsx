import { SignIn } from "@clerk/nextjs";

export default function login() {
  return <SignIn afterSignInUrl="/dashboard" afterSignUpUrl="/login" />;
}
