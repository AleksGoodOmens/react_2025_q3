import Avatar from './components/ALEKS.png';
import { aboutMe } from './components/data';
import Image from 'next/image';
import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';
import { FaDiscord } from 'react-icons/fa';

const About = () => {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-lg bg-amber-300 p-6 shadow-md md:flex-row">
      <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-amber-500 bg-amber-800 shadow-lg">
        <Image
          src={Avatar.src}
          width={Avatar.width}
          height={Avatar.height}
          alt={`${aboutMe.name} avatar`}
          priority={true}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h1 className="text-3xl font-bold text-gray-800">{aboutMe.name}</h1>
        <h2 className="mb-4 text-xl text-amber-600">{aboutMe.role}</h2>

        <p className="mb-4 text-gray-600">{aboutMe.bio}</p>

        <div className="flex gap-4">
          <a
            href={aboutMe.gitHub}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 transition-colors hover:text-amber-600"
          >
            <span className="sr-only">GitHub</span>
            <BsGithub className="h-6 w-6" />
          </a>

          <a
            href={aboutMe.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 transition-colors hover:text-indigo-600"
          >
            <span className="sr-only">Discord</span>
            <FaDiscord className="h-6 w-6" />
          </a>

          <Link
            href="https://rs.school/"
            className="text-amber-800"
            target="_blank"
            rel="noreferrer"
          >
            RS-School
          </Link>
        </div>
      </div>
    </section>
  );
};

export default About;
