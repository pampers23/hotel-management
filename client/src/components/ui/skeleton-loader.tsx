import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  className?: string;
  type?: 'card' | 'text' | 'image' | 'avatar';
}

const SkeletonLoader = ({ className, type = 'text' }: SkeletonLoaderProps) => {
  const baseClasses = "bg-gradient-to-r from-muted via-muted/50 to-muted bg-[length:200%_100%] animate-shimmer rounded";

  if (type === 'card') {
    return (
      <div className={cn("rounded-xl border bg-card overflow-hidden", className)}>
        <div className={cn(baseClasses, "aspect-[4/3]")} />
        <div className="p-5 space-y-3">
          <div className={cn(baseClasses, "h-4 w-20")} />
          <div className={cn(baseClasses, "h-6 w-3/4")} />
          <div className={cn(baseClasses, "h-4 w-full")} />
          <div className="flex gap-4">
            <div className={cn(baseClasses, "h-4 w-16")} />
            <div className={cn(baseClasses, "h-4 w-16")} />
          </div>
          <div className={cn(baseClasses, "h-10 w-full mt-4")} />
        </div>
      </div>
    );
  }

  if (type === 'image') {
    return <div className={cn(baseClasses, "aspect-[4/3]", className)} />;
  }

  if (type === 'avatar') {
    return <div className={cn(baseClasses, "h-10 w-10 rounded-full", className)} />;
  }

  return <div className={cn(baseClasses, "h-4", className)} />;
};

export default SkeletonLoader;