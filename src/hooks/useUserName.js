import { useState, useEffect } from "react";

export function useUserName() {
  const [name, setName] = useState("Maria Danis");

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setName(savedName);
    }

    function handleStorageChange() {
      const updatedName = localStorage.getItem("userName");
      if (updatedName) {
        setName(updatedName);
      }
    }

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return name;
}
