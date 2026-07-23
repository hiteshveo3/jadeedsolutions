"use client";

import { useCurrency } from "./CurrencyProvider";

export function Price({
  gbp,
  period,
  className = "",
  periodClassName = "",
}: {
  gbp: number;
  period?: string;
  className?: string;
  periodClassName?: string;
}) {
  const { format } = useCurrency();
  return (
    <span className={className}>
      {format(gbp)}
      {period && (
        <span className={`font-normal ${periodClassName}`}> {period}</span>
      )}
    </span>
  );
}
