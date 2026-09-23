import { Mark, RailHeading } from '@/components/ui';

import styles from './About.module.scss';

export function About() {
  return (
    <section className={styles.about} id="about" aria-labelledby="about-title" data-reveal>
      <RailHeading
        id="about-title"
        note={
          <>
            Barcelona, Spain
            <br />
            Spanish native, English C2
            <br />
            B.Eng. Computer Engineering
          </>
        }
      >
        About
      </RailHeading>

      <div className={styles.body}>
        <p className={styles.lede}>
          Most of my work is in <Mark>TypeScript, React and Next.js</Mark>: custom frontends,
          headless architectures, and the GraphQL and REST integrations that connect them to real
          data, across web applications and e-commerce alike.
        </p>

        <p>
          I am comfortable in <Mark>Figma</Mark> as well as in code. I have designed an app end to
          end, every screen and interaction, and that left me a design sense I still use. I may not
          start a design from zero, but I can read one properly, see how it will behave once it is
          in a browser, and spot where it falls down on user experience, sizing or responsiveness.
          Telling a good design from a bad one matters more in agency work than it sounds.
        </p>

        <p>
          I&rsquo;ve been involved across the whole process, not only the code:{' '}
          <Mark>
            breaking a project down, estimating it, and handling the changes that always arrive
            halfway through
          </Mark>
          , along with <Mark>the workflows, documentation and internal tooling</Mark> that keep a
          team shipping consistently. That is the work I care most about.
        </p>

        <p>
          Outside work I train most days and I like putting myself in situations I&rsquo;m not
          comfortable in yet, which turns out to be good practice for everything else. I read a lot
          of manga. <Mark>Steal Like an Artist</Mark> is still the book that shaped how I work:
          learn in the open, and give back what you borrowed.
        </p>
      </div>
    </section>
  );
}
