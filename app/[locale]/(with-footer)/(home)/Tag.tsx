import Link from 'next/link';

export function TagItem({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-[30px] items-center justify-center gap-[2px] overflow-hidden whitespace-nowrap rounded-full border border-gray-300 bg-white px-2 text-xs transition-all duration-200 ease-in-out hover:border-gray-400 hover:bg-gray-100 hover:shadow-md'>
      {children}
    </div>
  );
}

export function TagLink({ name, href }: { name: string; href: string }) {
  return (
    <Link href={href} title={name} className='transition-transform duration-200 ease-in-out hover:scale-105'>
      <TagItem>{name}</TagItem>
    </Link>
  );
}

export function TagList({ data }: { data: { name: string; href: string; id: string }[] }) {
  return (
    <ul className='flex max-h-[68px] flex-wrap gap-2 overflow-hidden'>
      {data.map((item) => (
        <li key={item.href}>
          <TagLink name={item.name} href={item.href} />
        </li>
      ))}
    </ul>
  );
}
