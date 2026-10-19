"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/system/Icon";
import { cn } from "@/lib/utils";

/* One selector for the whole dashboard, portal and site forms (owner, 5 Oct 2026):
   - on phones it opens as a sheet that slides up from the bottom;
   - on bigger screens, as a list just under the field;
   - one colour only: the chosen option is lime text with a lime tick, nothing else.
   Built as a listbox, so keyboards and screen readers work (arrows, Home/End, Enter, Esc). */

export type SelectOption<T extends string> = { value: T; label: string };

const PHONE = "(max-width: 639px)";

export function Select<T extends string>({
  label,
  value,
  options,
  onChange,
  hideLabel = false,
  className,
  disabled,
  size = "md",
  placeholder = "Choose…",
  invalid = false,
  onBlur,
}: {
  label: string;
  value: T;
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  hideLabel?: boolean;
  className?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  invalid?: boolean;
  onBlur?: () => void;
}) {
  const id = useId();
  const labelId = `${id}-label`;
  const listId = `${id}-list`;
  const trigger = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState(false);
  const [active, setActive] = useState(0);
  const [place, setPlace] = useState<{ top: number; left: number; width: number; up: boolean } | null>(null);
  const current = options.find((option) => option.value === value);

  const close = useCallback(
    (refocus = true) => {
      setOpen(false);
      if (refocus) trigger.current?.focus();
      onBlur?.();
    },
    [onBlur]
  );

  const openList = () => {
    if (disabled) return;
    const isPhone = window.matchMedia(PHONE).matches;
    setPhone(isPhone);
    const rect = trigger.current?.getBoundingClientRect();
    if (rect && !isPhone) {
      const room = window.innerHeight - rect.bottom;
      setPlace({ top: room < 300 && rect.top > room ? rect.top : rect.bottom, left: rect.left, width: Math.max(rect.width, 200), up: room < 300 && rect.top > room });
    }
    setActive(Math.max(0, options.findIndex((option) => option.value === value)));
    setOpen(true);
  };

  const choose = (index: number) => {
    const option = options[index];
    if (!option) return;
    if (option.value !== value) onChange(option.value);
    close();
  };

  // Focus the list when it opens; keep the active option in view.
  useLayoutEffect(() => {
    if (open) list.current?.focus({ preventScroll: true });
  }, [open]);
  useEffect(() => {
    if (!open) return;
    list.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  // Desktop: close on outside click, scroll or resize (the list is placed where the field was).
  useEffect(() => {
    if (!open || phone) return;
    const onDown = (event: MouseEvent) => {
      if (!list.current?.contains(event.target as Node) && !trigger.current?.contains(event.target as Node)) close(false);
    };
    const onMove = (event: Event) => {
      if (event.target instanceof Node && list.current?.contains(event.target)) return;
      close(false);
    };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
    };
  }, [open, phone, close]);

  // Phone sheet: the page underneath doesn't scroll.
  useEffect(() => {
    if (!open || !phone) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, phone]);

  const onTriggerKey = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      openList();
    }
  };

  const onListKey = (event: KeyboardEvent<HTMLUListElement>) => {
    const last = options.length - 1;
    if (event.key === "ArrowDown") setActive((i) => Math.min(last, i + 1));
    else if (event.key === "ArrowUp") setActive((i) => Math.max(0, i - 1));
    else if (event.key === "Home") setActive(0);
    else if (event.key === "End") setActive(last);
    else if (event.key === "Enter" || event.key === " ") choose(active);
    else if (event.key === "Escape") close();
    else if (event.key === "Tab") close(false);
    else if (event.key.length === 1) {
      // Type-ahead: jump to the next option starting with that letter.
      const letter = event.key.toLowerCase();
      const next = options.findIndex((option, i) => i > active && option.label.toLowerCase().startsWith(letter));
      const wrap = next >= 0 ? next : options.findIndex((option) => option.label.toLowerCase().startsWith(letter));
      if (wrap >= 0) setActive(wrap);
      return;
    } else return;
    event.preventDefault();
  };

  /** `activeClass`: the keyboard / pointer highlight — desktop only, and never on the chosen row,
      so a row is only ever one colour (lime when chosen, a soft fill when pointed at). */
  const optionRows = (rowClass: string, activeClass = "") =>
    options.map((option, index) => {
      const selected = option.value === value;
      return (
        <li
          key={option.value || `empty-${index}`}
          id={`${id}-opt-${index}`}
          data-index={index}
          role="option"
          aria-selected={selected}
          onMouseEnter={() => setActive(index)}
          onClick={() => choose(index)}
          className={cn("flex cursor-pointer items-center justify-between gap-3", rowClass, index === active && !selected && activeClass, selected ? "font-bold text-[#BEF70A]" : "text-white/85")}
        >
          <span className="min-w-0 truncate">{option.label}</span>
          {selected ? <Icon name="check" size={16} /> : null}
        </li>
      );
    });

  const listProps = {
    ref: list,
    id: listId,
    role: "listbox" as const,
    tabIndex: -1,
    "aria-labelledby": labelId,
    "aria-activedescendant": `${id}-opt-${active}`,
    onKeyDown: onListKey,
  };

  return (
    <div className={cn("relative block text-sm font-semibold text-white", className)}>
      <span id={labelId} className={hideLabel ? "sr-only" : "mb-1.5 block"}>
        {label}
      </span>
      <button
        ref={trigger}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-labelledby={`${labelId} ${id}-value`}
        onClick={() => (open ? close() : openList())}
        onKeyDown={onTriggerKey}
        className={cn(
          "flex w-full items-center justify-between gap-2 border text-left font-medium text-white outline-none transition-colors focus-visible:border-[#BEF70A] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          "bg-white/[0.09]",
          invalid ? "border-red-400" : open ? "border-[#BEF70A]" : "border-white/[0.24]",
          size === "sm" ? "min-h-8 rounded-[12px] px-3 text-xs" : size === "lg" ? "min-h-12 rounded-[14px] px-4 text-[15px]" : "min-h-10 rounded-[14px] px-3.5 text-sm"
        )}
      >
        <span id={`${id}-value`} className={cn("min-w-0 truncate", !current && "text-white/55")}>
          {current?.label ?? placeholder}
        </span>
        <Icon name="chevronDown" size={size === "sm" ? 14 : 16} className={cn("shrink-0 text-white/60 transition-transform", open && "rotate-180")} />
      </button>

      {open && phone
        ? createPortal(
            <div className="fixed inset-0 z-[90] sm:hidden" role="presentation">
              <button type="button" aria-label="Close" tabIndex={-1} onClick={() => close()} className="absolute inset-0 bg-[#051B1E]/65 motion-safe:animate-[fade-in_.2s_ease-out]" />
              <div className="absolute inset-x-0 bottom-0 flex max-h-[80dvh] flex-col rounded-t-[26px] bg-[#06301D] pb-[env(safe-area-inset-bottom)] shadow-[0_-20px_60px_rgba(0,0,0,0.4)] motion-safe:animate-[sheet-up_.26s_cubic-bezier(.2,.8,.2,1)]">
                <div className="flex shrink-0 flex-col items-center px-5 pb-2 pt-3">
                  <span aria-hidden="true" className="h-1.5 w-10 rounded-full bg-white/20" />
                  <p className="mt-3 w-full text-[15px] font-bold text-white">{label}</p>
                </div>
                <ul {...listProps} className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-3 outline-none custom-scrollbar">
                  {optionRows("min-h-12 rounded-[14px] px-4 text-[15px] active:bg-white/[0.04]")}
                </ul>
              </div>
            </div>,
            document.body
          )
        : null}

      {open && !phone && place
        ? createPortal(
            <ul
              {...listProps}
              style={{ position: "fixed", left: place.left, width: place.width, ...(place.up ? { bottom: window.innerHeight - place.top + 6 } : { top: place.top + 6 }) }}
              className="z-[90] max-h-72 overflow-y-auto rounded-[16px] bg-[#0A3B23] p-1.5 text-sm shadow-[0_18px_50px_rgba(0,0,0,0.45)] outline-none custom-scrollbar motion-safe:animate-[fade-in_.12s_ease-out]"
            >
              {optionRows("min-h-10 rounded-[10px] px-3", "bg-white/[0.06]")}
            </ul>,
            document.body
          )
        : null}
    </div>
  );
}
