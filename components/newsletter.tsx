import styles from './newsletter.module.scss';

const Newsletter = () => {
  return (
    <div className={styles.container}>
      <iframe
        width="540"
        height="270"
        src="https://fbbf7682.sibforms.com/serve/MUIEACWXetODdf4v-ue7rKAIsJuMNB-YhT9mA895VTo8snXttnMq5D6ERqc0vegu0-oK0fFf5iuJeqBhR7-rax47tqokb1RaG7D-C2oX6mKdet4B9Q8YeM3lD0IbFaYWdQ_ZXSpkgJQU6Qjv1u3eMpQ57olT2FFDplj-DrA8l90FqWL9jEmBfWaaShIaU-mT-OaIVcbXG_BGI090"
        frameBorder="0"
        scrolling="auto"
        allowFullScreen
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '100%',
        }}
      ></iframe>
    </div>
  );
};

export default Newsletter;
