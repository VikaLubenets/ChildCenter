import { CiEdit } from "react-icons/ci";
import Link from "next/link";

type EditBtnProps = {
  id: string;
  basePath: string;
};

const EditBtn: React.FC<EditBtnProps> = ({ id, basePath }) => {
  return (
    <Link href={`${basePath}/${id}`} className="cursor-pointer">
      <CiEdit size={24} />
    </Link>
  );
};

export default EditBtn;