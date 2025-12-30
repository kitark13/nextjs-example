"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, LoginRequest } from "@/lib/api";
import { useAuthStore } from "@/lib/stores/authStore";
import { ApiError } from "../api/api";

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const setUser = useAuthStore((state) => state.setUser);
  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;
      const res = await login(formValues);
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          "Ooops... some error"
      );
    }
  };

  return (
    <>
      <h1>Sign In</h1>
      <form action={handleSubmit}>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
          <button type="submit">Log in</button>
        </label>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};

export default SignIn;
