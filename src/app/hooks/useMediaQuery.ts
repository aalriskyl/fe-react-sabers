import { useState, useEffect } from "react";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Ensure window is defined (for SSR/Next.js compatibility)
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query);

      // Update state with current match
      if (media.matches !== matches) {
        setMatches(media.matches);
      }

      // Create listener
      const listener = () => setMatches(media.matches);

      // Add listener
      media.addEventListener("change", listener);

      // Clean up
      return () => media.removeEventListener("change", listener);
    }
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;
