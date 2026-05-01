"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait until Firebase resolves the persisted session before redirecting
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  async function handleLogout() {
    await signOut(auth);
    router.replace("/login");
  }

  // Show a neutral loading state while Firebase resolves the session
  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-sm">Loading...</p>
      </main>
    );
  }

  // Guard: don't flash dashboard content while redirect is in-flight
  if (!user) {
    return null;
  }

  return (
    <main className="min-h-screen p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome back,{" "}
            <span className="font-medium text-gray-700">
              {user.displayName ?? user.email}
            </span>
          </p>
        </div>
        <button
          id="logout-btn"
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>

      <div className="border border-gray-200 rounded p-6 bg-white text-center text-gray-400 text-sm">
        Expense features coming soon (Phase 2)
      </div>
    </main>
  );
}
