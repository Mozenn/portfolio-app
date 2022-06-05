import styles from './newsletter.module.scss';
import Script from 'next/script';
import Head from 'next/head';

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
    //   <>
    //     <Head>
    //       <title>Test</title>
    //       <link
    //         href="https://sibforms.com/forms/end-form/build/sib-styles.css"
    //         rel="stylesheet"
    //         key="sendinblue"
    //       />
    //     </Head>
    //     <div className={styles.container}>
    //       <label
    //         htmlFor="EMAIL"
    //         data-required="*"
    //         className={styles.subscribeLabel}
    //       >
    //         Subscribe to my newsletter
    //       </label>
    //       <form
    //         id="sib-form"
    //         method="POST"
    //         action="https://fbbf7682.sibforms.com/serve/MUIEACWXetODdf4v-ue7rKAIsJuMNB-YhT9mA895VTo8snXttnMq5D6ERqc0vegu0-oK0fFf5iuJeqBhR7-rax47tqokb1RaG7D-C2oX6mKdet4B9Q8YeM3lD0IbFaYWdQ_ZXSpkgJQU6Qjv1u3eMpQ57olT2FFDplj-DrA8l90FqWL9jEmBfWaaShIaU-mT-OaIVcbXG_BGI090"
    //       >
    //         <div>
    //           <input
    //             className={styles.subscribeInput}
    //             type="text"
    //             id="EMAIL"
    //             name="EMAIL"
    //             autoComplete="off"
    //             placeholder="Your email"
    //             data-required="true"
    //             required
    //           />
    //           <button
    //             form="sib-form"
    //             type="submit"
    //             className={styles.subscribeButton}
    //           >
    //             <svg
    //               className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon"
    //               viewBox="0 0 512 512"
    //             >
    //               <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
    //             </svg>
    //             Subscribe
    //           </button>
    //         </div>
    //         <input
    //           type="text"
    //           name="email_address_check"
    //           value=""
    //           className={styles.hidden}
    //         />
    //         <input type="hidden" name="locale" value="en" />
    //         <input type="hidden" name="html_type" value="simple" />
    //       </form>
    //     </div>
    //     <Script id="sendinblue" strategy="lazyOnload">
    //       {`  window.REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
    // window.LOCALE = 'en';
    // window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = "The information provided is invalid. Please review the field format and try again.";

    // window.REQUIRED_ERROR_MESSAGE = "This field cannot be left blank. ";

    // window.GENERIC_INVALID_MESSAGE = "The information provided is invalid. Please review the field format and try again.";

    // window.translation = {
    //   common: {
    //     selectedList: '{quantity} list selected',
    //     selectedLists: '{quantity} lists selected'
    //   }
    // };

    // var AUTOHIDE = Boolean(0);`}
    //     </Script>
    //     <Script src="https://sibforms.com/forms/end-form/build/main.js" />
    //   </>
  );
};

export default Newsletter;
