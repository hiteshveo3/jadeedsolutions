"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { setLeadStatus } from "@/app/app/(dash)/actions";
import { ScoreBadge } from "@/components/system/LeadViews";
import { Select } from "@/components/system/ui";
import { LEAD_STATUS_LABEL, type LeadStatus } from "@/lib/system/types";
import { cn } from "@/lib/utils";

/* The leads board (Jadeed Marketing's pipeline; Design Lab idea 099 A: a column per stage,
   one card per lead). Drag a card to another column on desktop, or use its "Move to" menu
   anywhere (phones, keyboards). */

export type PipelineCard = { id: string; name: string; detail: string; score: "A" | "B" | "C"; status: LeadStatus; age: string };

const COLUMNS = Object.keys(LEAD_STATUS_LABEL) as LeadStatus[];

export function PipelineBoard({ cards, base }: { cards: PipelineCard[]; base: string }) {
  const [items, setItems] = useState(cards);
  const [dragging, setDragging] = useState<string | null>(null);
  const [over, setOver] = useState<LeadStatus | null>(null);
  const [error, setError] = useState("");
  const [, start] = useTransition();

  const move = (id: string, status: LeadStatus) => {
    const card = items.find((item) => item.id === id);
    if (!card || card.status === status) return;
    const previous = card.status;
    setItems((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
    setError("");
    start(async () => {
      const result = await setLeadStatus(id, status);
      if (!result.ok) {
        setItems((current) => current.map((item) => (item.id === id ? { ...item, status: previous } : item)));
        setError(result.error);
      }
    });
  };

  return (
    <>
      {error ? (
        <p role="alert" className="mb-3 rounded-[14px] bg-white/[0.06] p-3 text-sm text-[#ffb4a8]">
          {error}
        </p>
      ) : null}
      <div className="relative -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-4 custom-scrollbar sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:-mx-8 lg:scroll-px-8 lg:px-8">
        {COLUMNS.map((status) => {
          const column = items.filter((item) => item.status === status);
          return (
            <section
              key={status}
              aria-label={LEAD_STATUS_LABEL[status]}
              onDragOver={(event) => {
                event.preventDefault();
                setOver(status);
              }}
              onDragLeave={() => setOver((current) => (current === status ? null : current))}
              onDrop={(event) => {
                event.preventDefault();
                const id = event.dataTransfer.getData("text/plain");
                setOver(null);
                setDragging(null);
                if (id) move(id, status);
              }}
              className={cn("flex w-[17rem] shrink-0 snap-start flex-col rounded-[20px] p-2.5 transition-colors", over === status ? "bg-[#BEF70A]/[0.1]" : "bg-white/[0.04]")}
            >
              <h2 className="flex items-center justify-between px-1.5 pb-2.5 pt-1 text-sm text-white">
                {LEAD_STATUS_LABEL[status]}
                <span className={cn("rounded-full px-2 py-0.5 font-sans text-xs font-bold", status === "won" ? "bg-[#BEF70A] text-[#0B1F12]" : "bg-white/[0.08] text-white/60")}>{column.length}</span>
              </h2>
              <ul className="space-y-2">
                {column.map((card) => (
                  <li
                    key={card.id}
                    draggable
                    onDragStart={(event) => {
                      event.dataTransfer.setData("text/plain", card.id);
                      event.dataTransfer.effectAllowed = "move";
                      setDragging(card.id);
                    }}
                    onDragEnd={() => setDragging(null)}
                    className={cn("cursor-grab rounded-[16px] border border-white/[0.08] bg-[#06301D]/70 p-3 active:cursor-grabbing", dragging === card.id && "opacity-50")}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="min-w-0 flex-1">
                        <Link href={`${base}/leads/${card.id}`} className="block truncate text-sm font-semibold text-white hover:text-[#BEF70A]">
                          {card.name}
                        </Link>
                        <p className="truncate text-xs text-white/50">{card.detail}</p>
                        <p className="mt-0.5 text-xs text-white/40">{card.age}</p>
                      </div>
                      <ScoreBadge score={card.score} />
                    </div>
                    <div className="mt-2.5">
                      <Select
                        label={`Move ${card.name} to`}
                        hideLabel
                        value={card.status}
                        options={COLUMNS.map((s) => ({ value: s, label: s === card.status ? `In ${LEAD_STATUS_LABEL[s]}` : `Move to ${LEAD_STATUS_LABEL[s]}` }))}
                        onChange={(next) => move(card.id, next)}
                        size="sm"
                      />
                    </div>
                  </li>
                ))}
                {column.length === 0 ? <li className="rounded-[16px] border border-dashed border-white/[0.12] px-3 py-6 text-center text-xs text-white/40">Drop a lead here</li> : null}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
