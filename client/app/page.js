import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/Header";
import Form from "./components/Form";

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <div>
        <h1 className={styles.title}>Assentify Logo Detector</h1>
        <div className={styles.description}>
          <p>Detect Assentify Logos in an image using AI</p>
        </div>
      </div>

      <Form />

      <div className={styles.center}>
        <div style={{ marginBlock: "1rem" }}>
          <Image
            className={styles.logo}
            style={{ marginInline: "1rem" }}
            src="/next.svg"
            alt="Next.js Logo"
            width={60}
            height={37}
            priority
          />
          <Image
            className={styles.logo}
            src="/flask.svg"
            alt="Flask Logo"
            width={60}
            height={37}
            priority
          />
        </div>
      </div>
    </main>
  );
}
