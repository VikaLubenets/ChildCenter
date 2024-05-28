import { Contact, Service } from "@/constants/DBTypes";
import Link from "next/link";
import EditBtn from "../Buttons/EditBtn";
import RemoveBtn from "../Buttons/RemoveBtn";

type Props = {
  header: string;
  info: Service[] | Contact[];
  onRemove: (id: string) => void;
  deleteFunction: (id: string) => Promise<Response | null>;
  basePath: string;
  addBtnName: string;
  addBtnPath: string;
}

export const AdminContainer = ({
  header,
  info,
  onRemove,
  deleteFunction,
  basePath,
  addBtnName,
  addBtnPath,
}: Props) => {
  return(
    <article className="admin-container">
      <h2 className="lg:text-xl text-lg font-bold py-4">{header}</h2>
      <div className="flex gap-5">
        {info.map(option => (
            <div key={option.title} className="flex flex-col gap-3 bg-slate-300 p-2 rounded-lg">
              <div className="flex justify-between items-center">
                <h3 className="font-bold">{option.title}</h3>
                <div className="flex gap-3 items-center">
                  <RemoveBtn id={option._id!} onRemove={() => onRemove(option._id!)} deleteFunction={deleteFunction} />
                  <EditBtn id={option._id!} basePath={basePath} />
                </div>
              </div>
              <p>{option.description}</p>
            </div>
        ))}
      </div>
      <Link href={addBtnPath} className="btn max-w-[300px]">
        {addBtnName}
      </Link>
    </article>
  )
}