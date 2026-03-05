import { useCallback, useRef, useState } from "react";

type UseChartFilterAnimationParams<TCategory> = {
  selectedCategory: TCategory;
  selectedMonth: number;
  selectedYear: number;
  setSelectedCategory: (value: TCategory) => void;
  setSelectedMonth: (value: number) => void;
  setSelectedYear: (value: number) => void;
};

export function useChartFilterAnimation<TCategory>({
  selectedCategory,
  selectedMonth,
  selectedYear,
  setSelectedCategory,
  setSelectedMonth,
  setSelectedYear,
}: UseChartFilterAnimationParams<TCategory>) {
  const counterRef = useRef(0);
  const [animationNonce, setAnimationNonce] = useState(0);

  const bumpAnimation = useCallback(() => {
    counterRef.current += 1;
    setAnimationNonce(counterRef.current);
  }, []);

  const handleCategoryChange = useCallback(
    (value: TCategory) => {
      if (Object.is(value, selectedCategory)) return;
      setSelectedCategory(value);
      bumpAnimation();
    },
    [bumpAnimation, selectedCategory, setSelectedCategory],
  );

  const handleMonthChange = useCallback(
    (value: number) => {
      if (value === selectedMonth) return;
      setSelectedMonth(value);
      bumpAnimation();
    },
    [bumpAnimation, selectedMonth, setSelectedMonth],
  );

  const handleYearChange = useCallback(
    (value: number) => {
      if (value === selectedYear) return;
      setSelectedYear(value);
      bumpAnimation();
    },
    [bumpAnimation, selectedYear, setSelectedYear],
  );

  return {
    animationNonce,
    handleCategoryChange,
    handleMonthChange,
    handleYearChange,
  };
}
