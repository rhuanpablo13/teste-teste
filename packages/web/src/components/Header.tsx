import { Link } from 'react-router-dom';

import logoLg from '../assets/logo-lg.jpg';
interface Props {
  heading: string;
  paragraph: string;
  linkName: string;
  linkUrl: string;
}

export default function Header({
  heading,
  paragraph,
  linkName,
  linkUrl = '#'
}: Props) {
  return (
    <div className="mb-10">
      <div className="flex justify-center">
        <img alt="" className="h-32 " src={logoLg} />
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-zinc-600">
        {heading}
      </h2>
    </div>
  );
}
