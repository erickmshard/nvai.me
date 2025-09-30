import type { ComponentType } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Bot,
  Briefcase,
  Camera,
  Code,
  Globe2,
  Image as ImageIcon,
  Layers,
  MessageSquare,
  Music,
  Palette,
  PenLine,
  Search,
  Sparkles,
  Tag as TagIcon,
  Video,
  Wand2,
  Wrench,
} from 'lucide-react';

type IconType = ComponentType<{ className?: string }>;

function hashToIndex(key: string, mod: number) {
  let h = 5381;
  for (let i = 0; i < key.length; i += 1) h = (h * 33) ^ key.charCodeAt(i);
  return Math.abs(h) % mod;
}

const colorCombos = [
  // light background gradients with matching text/border colors
  'border-rose-200 from-rose-50 to-rose-100 text-rose-800',
  'border-pink-200 from-pink-50 to-pink-100 text-pink-800',
  'border-fuchsia-200 from-fuchsia-50 to-fuchsia-100 text-fuchsia-800',
  'border-violet-200 from-violet-50 to-violet-100 text-violet-800',
  'border-indigo-200 from-indigo-50 to-indigo-100 text-indigo-800',
  'border-blue-200 from-blue-50 to-blue-100 text-blue-800',
  'border-cyan-200 from-cyan-50 to-cyan-100 text-cyan-800',
  'border-teal-200 from-teal-50 to-teal-100 text-teal-800',
  'border-emerald-200 from-emerald-50 to-emerald-100 text-emerald-800',
  'border-lime-200 from-lime-50 to-lime-100 text-lime-800',
  'border-yellow-200 from-yellow-50 to-yellow-100 text-yellow-800',
  'border-amber-200 from-amber-50 to-amber-100 text-amber-800',
  'border-orange-200 from-orange-50 to-orange-100 text-orange-800',
  'border-red-200 from-red-50 to-red-100 text-red-800',
  'border-sky-200 from-sky-50 to-sky-100 text-sky-800',
  'border-slate-200 from-slate-50 to-slate-100 text-slate-800',
];

function getColorClass(key: string) {
  const i = hashToIndex(key, colorCombos.length);
  return colorCombos[i];
}

function getBuiltinIcon(name: string): IconType {
  const n = name.toLowerCase();
  if (n.includes('gpt') || n.includes('ai') || n.includes('bot') || n.includes('对话')) return Bot;
  if (n.includes('聊') || n.includes('chat') || n.includes('对话')) return MessageSquare;
  if (n.includes('图') || n.includes('绘') || n.includes('image') || n.includes('画')) return ImageIcon;
  if (n.includes('视') || n.includes('video')) return Video;
  if (n.includes('音') || n.includes('music') || n.includes('声')) return Music;
  if (n.includes('编程') || n.includes('code') || n.includes('开发') || n.includes('dev')) return Code;
  if (n.includes('办公') || n.includes('office') || n.includes('文档')) return Briefcase;
  if (n.includes('搜') || n.includes('search')) return Search;
  if (n.includes('学') || n.includes('learn') || n.includes('教育')) return BookOpen;
  if (n.includes('写') || n.includes('文') || n.includes('copy')) return PenLine;
  if (n.includes('魔法') || n.includes('提示') || n.includes('prompt') || n.includes('特效')) return Wand2;
  if (n.includes('全球') || n.includes('网站') || n.includes('导航') || n.includes('web')) return Globe2;
  if (n.includes('灵感') || n.includes('发现') || n.includes('探索') || n.includes('idea')) return Sparkles;
  if (n.includes('配色') || n.includes('视觉') || n.includes('设计') || n.includes('palette')) return Palette;
  if (n.includes('相机') || n.includes('照片') || n.includes('camera')) return Camera;
  if (n.includes('模型') || n.includes('多模态') || n.includes('stack') || n.includes('layer')) return Layers;
  if (n.includes('工具') || n.includes('tool')) return Wrench;
  return TagIcon;
}

export function TagItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`group relative flex h-8 items-center justify-center gap-1 whitespace-nowrap rounded-full border bg-gradient-to-b px-3 text-xs shadow-sm transition-all duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/10 lg:h-9 lg:text-sm ${
        className || 'border-gray-200 from-white to-gray-50 text-gray-800 hover:border-gray-300'
      }`}
    >
      {children}
    </div>
  );
}

export function TagLink({
  name,
  href,
  icon: Icon,
  className,
}: {
  name: string;
  href: string;
  icon?: IconType;
  className?: string;
}) {
  return (
    <Link href={href} title={name} aria-label={name}>
      <TagItem className={className}>
        {Icon ? <Icon className='mr-1 h-[14px] w-[14px] opacity-80 lg:h-[16px] lg:w-[16px]' /> : null}
        <span>{name}</span>
      </TagItem>
    </Link>
  );
}

export function TagList({
  data,
  colorful = false,
  showIcons = false,
  iconMap,
  maxHeight,
  direction = 'row',
}: {
  data: { name: string; href: string; id: string }[];
  colorful?: boolean;
  showIcons?: boolean;
  iconMap?: Record<string, IconType>;
  maxHeight?: number | 'auto';
  direction?: 'row' | 'column';
}) {
  const style = typeof maxHeight === 'number' ? { maxHeight: `${maxHeight}px` } : undefined;
  // 当设置了固定高度时，为避免悬停上移造成顶部被裁剪，增加轻微内边距
  const overflowClass = typeof maxHeight === 'number' ? 'overflow-hidden py-1' : '';
  const isColumn = direction === 'column';
  const base = isColumn ? 'flex flex-col items-stretch gap-2' : 'flex flex-wrap justify-center gap-2 lg:gap-2.5';
  return (
    <ul className={`${base} ${overflowClass}`} style={style}>
      {data.map((item) => {
        const key = (item.name || item.id).toLowerCase();
        const colorClass = colorful ? getColorClass(key) : undefined;
        const Icon = showIcons ? iconMap?.[key] || getBuiltinIcon(key) : undefined;
        return (
          <li key={item.href}>
            <TagLink name={item.name} href={item.href} icon={Icon} className={colorClass} />
          </li>
        );
      })}
    </ul>
  );
}
