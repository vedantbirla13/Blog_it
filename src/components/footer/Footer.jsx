import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>vedantbirla</div>
      <div className={styles.text}>
         BlogIT © All rights reserved.
      </div>
    </div>
  );
};

export default Footer;