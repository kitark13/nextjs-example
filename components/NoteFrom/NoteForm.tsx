"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Category, createNote, NewNoteData } from "@/lib/api";
import { useNoteDraftStore } from "@/lib/stores/noteStore";

type Props = { categories: Category[] };

const NoteFrom = ({ categories }: Props) => {
  const router = useRouter();

  const { draft, setDraft, clearDraft } = useNoteDraftStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({ ...draft, [event.target.name]: event.target.value });
  };

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      router.push("/notes/filter/all");
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = Object.fromEntries(formData) as NewNoteData;
    mutate(values);
  };

  const handleCancel = () => router.push("/notes/filter/all");

  return (
    <form action={handleSubmit}>
      <label>
        Title
        <input
          type="text"
          name="title"
          defaultValue={draft?.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Content
        <textarea
          name="content"
          defaultValue={draft?.content}
          onChange={handleChange}
        ></textarea>
      </label>
      <label>
        Category
        <select
          name="category"
          defaultValue={draft?.categoryId}
          onChange={handleChange}
        >
          {categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </label>
      <div>
        <button type="submit">Create</button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NoteFrom;
