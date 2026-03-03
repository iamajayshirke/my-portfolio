// src/hooks/usePortfolioForm.ts
import { useState, useEffect } from "react";
import type { IUser, IPortfolioContent } from "../types";

export const usePortfolioForm = (initialUser: IUser | null) => {
  const [userForm, setUserForm] = useState<Partial<IUser>>({});

  // Synchronize with Redux when the user is fetched/rehydrated
  useEffect(() => {
    if (initialUser) {
      setUserForm({
        ...initialUser,
        content: {
          name: initialUser.content?.name ?? "",
          role: initialUser.content?.role ?? "",
          experience: initialUser.content?.experience ?? "",
          techStack: initialUser.content?.techStack || [],
          jobs: initialUser.content?.jobs || [],
          projects: initialUser.content?.projects || [],
          education: initialUser.content?.education || [],
        },
      });
    }
  }, [initialUser]);

  // Update top-level fields (username, email)
  const updateField = (field: keyof IUser, value: any) => {
    setUserForm((prev) => ({ ...prev, [field]: value }));
  };

  // Update content fields (name, role, experience)
  const updateContent = (updates: Partial<IPortfolioContent>) => {
    setUserForm((prev) => ({
      ...prev,
      content: { ...prev.content!, ...updates },
    }));
  };

  // THE FIX: Immutable Array Update Helper
  const updateArrayItem = <T extends keyof IPortfolioContent>(
    key: T,
    index: number,
    updates: Partial<any>,
  ) => {
    const currentArray = [...((userForm.content?.[key] as any[]) || [])];
    currentArray[index] = { ...currentArray[index], ...updates };
    updateContent({ [key]: currentArray } as any);
  };

  return { userForm, updateField, updateContent, updateArrayItem, setUserForm };
};
