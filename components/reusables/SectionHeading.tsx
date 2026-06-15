
interface SectionHeadingProps {
    title: string
    className?: string
}

export default function SectionHeading({ title, className }: SectionHeadingProps) {
  return (
    <div className={`text-[14px] uppercase tracking-normal text-[#666666] mb-3 ${className}`}>
      {title}
    </div>
  )
}
