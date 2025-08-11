import Avatar from './components/ALEKS.png';
import { aboutMe } from './components/data';
import Image from 'next/image';

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
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <a
            href={aboutMe.discord}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 transition-colors hover:text-indigo-600"
          >
            <span className="sr-only">Discord</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.3 4.1c-1.4-.6-3-.9-4.7-.9-1.7 0-3.3.3-4.7.9-.1 0-.2.1-.3.1-.1 0-.2-.1-.3-.1-1.4-.6-3-.9-4.7-.9-1.7 0-3.3.3-4.7.9C.2 4.8 0 5.4 0 6v12c0 .6.2 1.2.6 1.6.4.4 1 .6 1.6.6h.2c.1 0 .2-.1.3-.1 1.4-.6 3-.9 4.7-.9 1.7 0 3.3.3 4.7.9.1 0 .2.1.3.1.1 0 .2-.1.3-.1 1.4-.6 3-.9 4.7-.9 1.7 0 3.3.3 4.7.9.1 0 .2.1.3.1h.2c.6 0 1.2-.2 1.6-.6.4-.4.6-1 .6-1.6V6c0-.6-.2-1.2-.6-1.6-.4-.4-1-.6-1.6-.6zM6 15.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm12 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
            </svg>
          </a>

          <a
            href="https://rs.school/"
            className="text-amber-800"
            target="_blank"
            rel="noreferrer"
          >
            RS-School
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
