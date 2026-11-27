import { Clock } from 'lucide-react';

export default function ReadingTime({ minutes }: { minutes: number }) {
  return <span className="reading-time">
    <Clock size={15} strokeWidth={1.7} aria-hidden="true" focusable="false"/>
    {minutes} min czytania
  </span>;
}
