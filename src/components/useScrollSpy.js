import { useEffect, useRef, useState } from "react";

export function useScrollSpy(itemCount) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const elements = itemRefs.current.filter(Boolean);

    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          const nextIndex = Number(visibleEntry.target.dataset.index);
          setActiveIndex(nextIndex);
        }
      },
      {
        root: null,
        rootMargin: "-40% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1]
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [itemCount]);

  return { activeIndex, itemRefs };
}
