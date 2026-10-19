import Link from "next/link";
import { Fragment, type ReactNode } from "react";

/* Jadeed AI's answers: paragraphs, "- " lists, **bold** and [links](/path). */

function inline(text: string, key: string, onNavigate?: () => void): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<b key={`${key}-${i++}`} className="font-semibold text-white">{m[1]}</b>);
    else if (m[3].startsWith("/")) out.push(<Link key={`${key}-${i++}`} href={m[3]} onClick={onNavigate} className="font-semibold text-[#BEF70A] underline decoration-[#BEF70A]/40 underline-offset-[3px] hover:decoration-[#BEF70A]">{m[2]}</Link>);
    else out.push(<a key={`${key}-${i++}`} href={m[3]} target="_blank" rel="noreferrer" className="font-semibold text-[#BEF70A] underline decoration-[#BEF70A]/40 underline-offset-[3px]">{m[2]}</a>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function ChatText({ text, onNavigate }: { text: string; onNavigate?: () => void }) {
  const blocks = text.trim().split(/\n{2,}/);
  return (
    <div className="space-y-3">
      {blocks.map((block, b) => {
        const lines = block.split("\n");
        if (lines.every((l) => /^\s*[-*•]\s+/.test(l))) {
          return (
            <ul key={b} className="space-y-1.5">
              {lines.map((l, i) => (
                <li key={i} className="flex gap-2.5">
                  <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#BEF70A]" />
                  <span>{inline(l.replace(/^\s*[-*•]\s+/, ""), `${b}-${i}`, onNavigate)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={b}>
            {lines.map((l, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {inline(l, `${b}-${i}`, onNavigate)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
