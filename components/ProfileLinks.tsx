import {ArrowUpRight} from 'lucide-react';
import {professionalProfiles, socialProfiles} from '../lib/professional-profiles';

export default function ProfileLinks({onHome = false}: {onHome?:boolean}) {
  const Heading = onHome ? 'h3' : 'h2';
  return <section className="home-professional">
    {([["Profile zawodowe", professionalProfiles], ["Media społecznościowe", socialProfiles]] as const).map(([title, links]) =>
      <div key={title}><Heading>{title}</Heading><ul role="list">{links.map(({label,href})=><li key={href}><a href={href} rel="noreferrer">{label} <ArrowUpRight size={14} aria-hidden="true"/></a></li>)}</ul></div>)}
  </section>;
}
