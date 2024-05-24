
type Props = {
  title: string;
  date: string;
  description: string;
  price: string;
  additionalNote?: string;
  images?: [
    {
      imageSrc: string;
      alt: string;
    }
  ]
}

export const Lesson = ({
  title,
  date,
  description,
  price,
  additionalNote,
  images
}: Props) => {
  return (
    <div>
      lesson
    </div>
  )
}