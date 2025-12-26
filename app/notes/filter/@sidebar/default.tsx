import Link from "next/link";
import { getCategories } from "@/lib/api";

const NotesSidebar = async () => {
  const categories = await getCategories();

  return (
    <>
      <Link href="/notes/action/create">Create Note</Link>
      <ul>
        <li>
          <Link href={`notes/filter/all`}>All notes</Link>
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`note/filter/${category.id}`}>{category.name}</Link>
            </li>
          ))}
        </li>
      </ul>
    </>
  );
};

export default NotesSidebar;
