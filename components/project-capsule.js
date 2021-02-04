import styles from "./project-capsule.module.scss";
import Link from "next/link";

export default function ProjectCapsule({ id, title, imageName }) {
  return (
    <div className={styles.capsule}>
      <Link href={`/projects/${id}`}>
        <a>
          <h3 className={styles.capsuleTitle}>{title}</h3>
        </a>
      </Link>
      <img
        className={styles.capsuleImage}
        src={`/images/${imageName}`}
        alt='capsule image'
      />
    </div>
  );
}

/*
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
          */
