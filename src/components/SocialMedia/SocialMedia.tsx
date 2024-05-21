import { SocialMediaItem } from "./SocialMediaItem"

export const SocialMedia = () => {
  return (
    <aside className="w-1/12 flex justify-center items-center h-[270px]">
      <ul className="flex flex-col justify-between items-start h-full">
        <SocialMediaItem sourse={"/icons/vk-logo.svg"} name={"vk"} href={"/"} />
        <SocialMediaItem sourse={"/icons/telegram-logo.svg"} name={"telegram"} href={"/"} />
        <SocialMediaItem sourse={"/icons/whatsup-logo.svg"} name={"what's up"} href={"/"} />
        <SocialMediaItem sourse={"/icons/insta-logo.svg"} name={"instagram"} href={"/"} />
      </ul>
    </aside>
  );
};