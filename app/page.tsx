import { redirect } from "next/navigation";

// Root page: redirect users based on their auth state.
// Since we can't read Firebase auth on the server, we just redirect to /dashboard.
// The dashboard will handle the auth check client-side and redirect to /login if needed.
export default function Home() {
  redirect("/dashboard");
}
