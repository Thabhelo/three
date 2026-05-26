import { useEffect, useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent } from "react";
import { Loader2, Plus, X } from "lucide-react";
import {
  deleteGalleryImage,
  saveGalleryImage,
  saveGalleryOrder,
  uploadGalleryImage,
  type GalleryImage,
} from "@/lib/gallery-service";

type GalleryEditorGridProps = {
  items: GalleryImage[];
  onChange: () => Promise<void>;
};

function GalleryEditorCard({
  item,
  draggingId,
  autoEditLabel,
  onDelete,
  onLabelChange,
  onLabelEditDone,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  item: GalleryImage;
  draggingId: string | null;
  autoEditLabel?: boolean;
  onDelete: (id: string) => void;
  onLabelChange: (id: string, label: string) => void;
  onLabelEditDone?: () => void;
  onDragStart: (id: string | null) => void;
  onDragOver: (event: DragEvent<HTMLElement>) => void;
  onDrop: (id: string) => void;
}) {
  const [label, setLabel] = useState(item.label);
  const [editingLabel, setEditingLabel] = useState(false);

  useEffect(() => {
    setLabel(item.label);
  }, [item.label]);

  useEffect(() => {
    if (autoEditLabel) setEditingLabel(true);
  }, [autoEditLabel]);

  function finishEditing() {
    setEditingLabel(false);
    onLabelChange(item.id, label.trim() || "Untitled");
    onLabelEditDone?.();
  }

  return (
    <figure
      draggable
      onDragStart={() => onDragStart(item.id)}
      onDragEnd={() => onDragStart(null)}
      onDragOver={onDragOver}
      onDrop={() => onDrop(item.id)}
      className={`soft-card group relative overflow-hidden rounded-[14px] ${draggingId === item.id ? "opacity-50" : ""}`}
    >
      <div className="relative aspect-[4/5] cursor-grab overflow-hidden active:cursor-grabbing">
        <img src={item.src} alt={item.label} className="h-full w-full object-cover" draggable={false} />
        <div className="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-[#0b0218]/75 via-[#0b0218]/35 to-transparent p-4 pr-12">
          {editingLabel ? (
            <input
              autoFocus
              value={label}
              onChange={(event) => setLabel(event.target.value)}
              onFocus={(event) => event.currentTarget.select()}
              onBlur={finishEditing}
              onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter") event.currentTarget.blur();
              }}
              placeholder="Type a label"
              className="w-full bg-transparent font-label text-white/90 outline-none placeholder:text-white/40"
            />
          ) : (
            <button
              type="button"
              onClick={() => setEditingLabel(true)}
              className="font-label text-left text-white/90 transition-colors hover:text-white"
            >
              {item.label}
            </button>
          )}
        </div>
        <button
          type="button"
          aria-label={`Delete ${item.label}`}
          onClick={(event) => {
            event.stopPropagation();
            onDelete(item.id);
          }}
          className="absolute right-3 top-3 z-20 grid size-8 place-items-center rounded-full bg-[#0b0218]/55 text-white/85 backdrop-blur-sm transition-colors hover:bg-red-500/90 hover:text-white"
        >
          <X className="size-4" />
        </button>
      </div>
    </figure>
  );
}

export default function GalleryEditorGrid({ items, onChange }: GalleryEditorGridProps) {
  const [localItems, setLocalItems] = useState(items);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [autoEditLabelId, setAutoEditLabelId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const persistTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  async function persistOrder(nextItems: GalleryImage[]) {
    setBusy(true);
    setError("");
    try {
      await saveGalleryOrder(nextItems);
      setLocalItems(nextItems);
      await onChange();
    } catch (cause) {
      console.error(cause);
      setError("Could not save gallery order.");
    } finally {
      setBusy(false);
    }
  }

  function reorderItems(fromId: string, toId: string) {
    if (fromId === toId) return;

    const fromIndex = localItems.findIndex((item) => item.id === fromId);
    const toIndex = localItems.findIndex((item) => item.id === toId);
    if (fromIndex < 0 || toIndex < 0) return;

    const nextItems = [...localItems];
    const [moved] = nextItems.splice(fromIndex, 1);
    nextItems.splice(toIndex, 0, moved);
    setLocalItems(nextItems);

    if (persistTimerRef.current) window.clearTimeout(persistTimerRef.current);
    persistTimerRef.current = window.setTimeout(() => {
      void persistOrder(nextItems);
    }, 180);
  }

  async function handleDelete(id: string) {
    const target = localItems.find((item) => item.id === id);
    if (!target) return;

    const previousItems = localItems;
    const nextItems = localItems.filter((item) => item.id !== id);
    setLocalItems(nextItems);
    setBusy(true);
    setError("");

    try {
      await deleteGalleryImage(id, target.src);
      await onChange();
    } catch (cause) {
      console.error(cause);
      setLocalItems(previousItems);
      const code = typeof cause === "object" && cause && "code" in cause ? String(cause.code) : "";
      if (code.includes("permission-denied")) {
        setError("Delete blocked. Sign in with an admin email, then try again.");
      } else {
        setError("Could not delete image. Check your connection and try again.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleLabelChange(id: string, label: string) {
    const target = localItems.find((item) => item.id === id);
    if (!target || target.label === label) return;

    setBusy(true);
    setError("");
    try {
      await saveGalleryImage({ ...target, label });
      await onChange();
    } catch (cause) {
      console.error(cause);
      setError("Could not update label.");
    } finally {
      setBusy(false);
    }
  }

  async function handleAdd(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setBusy(true);
    setError("");
    try {
      const src = await uploadGalleryImage(file);
      const id = `image-${Date.now()}`;
      await saveGalleryImage({
        id,
        src,
        label: "New photo",
        order: localItems.length,
      });
      setAutoEditLabelId(id);
      await onChange();
    } catch (cause) {
      console.error(cause);
      setError("Could not add image. Check Firebase Storage rules and auth.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      {error ? <p className="mb-4 text-sm text-red-400">{error}</p> : null}
      {busy ? (
        <p className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Saving...
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {localItems.map((item) => (
          <GalleryEditorCard
            key={item.id}
            item={item}
            draggingId={draggingId}
            autoEditLabel={autoEditLabelId === item.id}
            onDelete={handleDelete}
            onLabelChange={handleLabelChange}
            onLabelEditDone={() => setAutoEditLabelId(null)}
            onDragStart={setDraggingId}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(id) => {
              if (draggingId) reorderItems(draggingId, id);
              setDraggingId(null);
            }}
          />
        ))}

        <button
          type="button"
          disabled={busy}
          onClick={() => fileInputRef.current?.click()}
          className="soft-card flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-[14px] border border-dashed border-white/15 bg-white/[0.02] text-muted-foreground transition-colors hover:border-white/25 hover:bg-white/[0.04] hover:text-foreground disabled:opacity-60"
        >
          <span className="grid size-11 place-items-center rounded-full border border-dashed border-white/15">
            <Plus className="size-5" />
          </span>
          <span className="font-label">Add photo</span>
        </button>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAdd} />
    </div>
  );
}
