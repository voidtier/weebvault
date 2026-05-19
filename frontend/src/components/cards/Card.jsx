export default function Card({ className, image_src }) {
  return (
    <>
      <div className={`max-h-72 w-40 overflow-hidden rounded-2xl ${className}`}>
        <img src={`${image_src}`} className="w-full h-full object-contain" />
      </div>
    </>
  );
}
