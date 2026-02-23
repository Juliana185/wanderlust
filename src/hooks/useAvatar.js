import { useState, useEffect } from "react";

export function useAvatar() {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }

    function handleStorageChange() {
      const updatedAvatar = localStorage.getItem("avatar");
      setAvatar(updatedAvatar);
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return avatar;
}
