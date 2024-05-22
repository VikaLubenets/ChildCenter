import ArtMenu from "@/components/ArtMenu";
import CTA from "@/components/CTA";

const Menu = () => {
  return(
    <article className="article">
      <h2 className="subtitle-header">Творческие направления нашей студии:</h2>
      <ArtMenu />
      <CTA />
    </article>
  )
};

export default Menu;