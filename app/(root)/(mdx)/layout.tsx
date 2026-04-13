export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='prose pt-27 md:pt-34 pb-20 container prose-ul:marker:text-black prose-ol:marker:text-black prose-a:no-underline prose-a:hover:underline prose-h2:mt-6 prose-h2:mb-4'>
      {children}
    </div>
  );
}
