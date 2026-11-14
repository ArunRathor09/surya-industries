"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/components/providers";

export function ProductDialog({
  open,
  onClose,
  title,
  children,
  size = "max-w-3xl",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: string;
}) {
  const { text } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      aria-labelledby={titleId}
      className={`m-auto max-h-[92dvh] w-[calc(100%-1.5rem)] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white p-0 text-slate-900 shadow-[0_35px_100px_rgb(15_23_42/25%)] backdrop:bg-slate-950/45 backdrop:backdrop-blur-sm dark:border-white/10 dark:bg-slate-950 dark:text-white ${size}`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      ref={dialogRef}
    >
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 dark:border-white/10 sm:px-7">
        <h2 className="font-heading text-lg font-semibold sm:text-xl" id={titleId}>
          {title}
        </h2>
        <button
          aria-label={text.catalog.close}
          className="grid size-9 shrink-0 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/10"
          onClick={onClose}
          type="button"
        >
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>
      <div className="max-h-[calc(92dvh-4.25rem)] overflow-y-auto">{children}</div>
    </dialog>
  );
}
