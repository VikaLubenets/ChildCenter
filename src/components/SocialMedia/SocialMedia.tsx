import { SocialMediaItem } from "./SocialMediaItem"

type Props = {
  row?: boolean;
  className?: string;
}

export const SocialMedia = ({row, className}: Props) => {
  return (
    <aside className={`w-1/12  justify-center items-center h-[270px] hidden lg:flex ${className}`}>
      <ul className={`flex ${row ? 'flex-row w-1/2' : 'flex-col'} justify-between items-start h-full`}>
        <SocialMediaItem sourse={"/icons/vk-logo.svg"} name={"vk"} href={"/"} />
        <SocialMediaItem sourse={"/icons/telegram-logo.svg"} name={"telegram"} href={"/"} />
        <SocialMediaItem sourse={"/icons/whatsup-logo.svg"} name={"what's up"} href={"/"} />
        <SocialMediaItem sourse={"/icons/insta-logo.svg"} name={"instagram"} href={"/"} />
      </ul>
    </aside>
  );
};