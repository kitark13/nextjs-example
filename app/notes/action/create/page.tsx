import { getCategories } from "@/lib/api";
import NoteFrom from "@/components/NoteFrom/NoteForm";

const CreateNote = async () => {
  const categories = await getCategories();

  return (
    <>
      <NoteFrom categories={categories} />
    </>
  );
};

export default CreateNote;
