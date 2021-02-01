import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <section className={styles.landing}>
        <div>
          <h1 className={styles.landingName}>Cassany Gauthier</h1>
          <h2 className={styles.landingSubtitle}>
            Software Engineering Student, Indie Game Developer
          </h2>
        </div>
      </section>

      <section className={styles.about} id='about'>
        <h2 className='section-about__title'>About</h2>
        <div className='section-about__story'>
          <p>
            I am Gauthier, a 22 years old software engineering student and indie
            game developer living in Toulouse, France. <br />
            I love creating things, from games to software to world bulding and
            much more. <br />I am currently working on a game since a year and a
            half as a solo developer.{" "}
          </p>
        </div>
        <div className='section-about__stack'>
          <p>
            I have tinkered with many technologies but here is what I am most
            familiar with :{" "}
          </p>
        </div>
      </section>

      <section className='section-projects' id='projects'>
        <h2 className='section-projects__title'>Projects</h2>
        <div className='projects-container'>
          <div className='projects-container__el'>
            <h3 className='projects-container__el__title'>
              PC Game : To be announced
            </h3>
            <div className='projects-container__el__content'>
              <p>
                I have been thinking about this game since june 2018 and have
                been actively working on it since november 2018. <br />
                Since then, i have been learning about 3d art, marketing,
                product management, game design, level design, unreal engine and
                much more. <br />
                It takes me most of my free time and there is still a lot to be
                done, but I hope I will be able to make the annoucement soon.{" "}
              </p>
              <img src='images/GameScreen_lowRes.png' alt='Game Screenshot' />
            </div>
            <p className='projects-container__el__stack'>
              Unreal Engine 4, C++, Blender, Substance Painter, Krita
            </p>
          </div>
          <div className='projects-container__el'>
            <h3 className='projects-container__el__title'>SL Textual</h3>
            <div className='projects-container__el__content'>
              <p>
                Small engine to make textual games.
                <br />
                It is quite rudimentary, but it alloweded me to be more
                comfortable with C++.
              </p>
              <img src='images/SL.PNG' alt='Game Screenshot' />
            </div>
            <p className='projects-container__el__stack'>C++, WPF</p>
          </div>
          <div className='projects-container__el'>
            <h3 className='projects-container__el__title'>SL Textual</h3>
            <div className='projects-container__el__content'>
              <p>
                Small engine to make textual games.
                <br />
                It is quite rudimentary, but it alloweded me to be more
                comfortable with C++.
              </p>
              <img src='images/SL.PNG' alt='Game Screenshot' />
            </div>
            <p className='projects-container__el__stack'>C++, WPF</p>
          </div>
        </div>
      </section>

      <section className='section-blog' id='blog'>
        <h2 className='section-blog__title'>Blog</h2>
        <div className='section-blog__content'>
          <p>Coming Soon</p>
        </div>
      </section>
    </Layout>
  );
}
