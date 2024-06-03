import { About, Certificate, Contact, Service } from "@/constants/DBTypes";
import Link from "next/link";
import EditBtn from "../Buttons/EditBtn";
import RemoveBtn from "../Buttons/RemoveBtn";

type Props = {
  header: string;
  info: Service[] | Contact[] | About[] | Certificate[];
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
  return (
    <article className="admin-container">
      <h2 className="lg:text-xl text-lg font-bold py-4">{header}</h2>
      <div className="flex flex-col lg:flex-row gap-5 lg:text-base text-sm flex-wrap">
        {info && info.length > 0 ? (
          info.map((option) => {
            if (!option || !option._id) {
              return null;
            }

            return ( 
              <div key={option._id!} className="flex flex-col gap-3 bg-white p-2 rounded-lg lg:max-w-xs max-w-fit">
                <div className="flex justify-between items-center gap-5">
                  {"title" in option && option.title && (
                    <h3 className="font-bold">{`${option.title.length > 20 ? option.title.substring(0, 20) + '...' : option.title}`}</h3>
                  )}
                  <div className="flex gap-3 items-center">
                    <RemoveBtn
                      id={option._id!}
                      onRemove={() => onRemove(option._id!)}
                      deleteFunction={deleteFunction}
                    />
                    <EditBtn id={option._id!} basePath={basePath} />
                  </div>
                </div>
                {"description" in option && option.description && (
                  <p>{`${option.description.length > 100 ? option.description.substring(0, 100) + '...' : option.description}`}</p>
                )}
                {"price" in option && option.price && <p>{option.price}</p>}
              </div>
            );
          })
        ) : (
          <div>Информация не найдена</div>
        )}
      </div>
      <Link href={addBtnPath} className="btn max-w-[300px]">
        {addBtnName}
      </Link>
    </article>
  );
}