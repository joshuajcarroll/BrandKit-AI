// components/SyncUserWithConvex.tsx
"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function SyncUserWithConvex() {
  const { user, isLoaded } = useUser();
  const updateUser = useMutation(api.users.updateUser);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) return;

    const fullName = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim();

    updateUser({
      clerkUserId: user.id,
      name: fullName || undefined,
      email: user.emailAddresses[0]?.emailAddress ?? "",
    }).catch((error) => {
      console.error("Error syncing user:", error);
    });
  }, [isLoaded, user, updateUser]);

  return null;
}
