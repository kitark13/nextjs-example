"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores/authStore";
import { logout } from "@/lib/api";

const AuthNavigation = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const cleareisAuthenticated = useAuthStore(
    (state) => state.cleareisAuthenticated
  );

  const handleLogout = async () => {
    await logout();
    cleareisAuthenticated();
    router.push("sign-in");
  };

  return isAuthenticated ? (
    <li>
      <p>{user?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </li>
  ) : (
    <>
      <li>
        <Link href="/sign-in">Login</Link>
      </li>
      <li>
        <Link href="/sign-up">Sign up</Link>
      </li>
    </>
  );
};

export default AuthNavigation;
