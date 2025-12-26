import axios from "axios";

export type Note = {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type NoteListResponse = {
  notes: Note[];
  total: number;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type NewNoteData = {
  title: string;
  content: string;
  categoryId: string;
};

axios.defaults.baseURL = "https://next-v1-notes-api.goit.study";
// axios.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;

const delay = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const getNotes = async (categoryId?: string) => {
  await delay(2000);
  const res = await axios.get<NoteListResponse>("/notes", {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
    params: categoryId ? { categoryId } : {},
  });
  return res.data;
};

export const getSingleNote = async (id: string) => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};

export const getCategories = async () => {
  const res = await axios<Category[]>("/categories");
  return res.data;
};

export const createNote = async (data: NewNoteData) => {
  const res = await axios.post<Note>("/notes", data);
  return res.data;
};
