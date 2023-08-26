import styles from "../styles/form.module.css";

export default function ImageContainer({
  title,
  images,
  results = false,
  loading = false,
}) {
  return (
    <div className={styles.imagesGridContainer}>
      <h3>{title}</h3>
      <div className={styles.imagesGrid}>
        {!loading ? (
          images.map((image) => (
            <img
              style={{ width: "100%" }}
              src={results ? image : URL.createObjectURL(image)}
              alt="image"
              key={
                results
                  ? "results" + image.toString().split("/").pop()
                  : image.name
              }
            />
          ))
        ) : (
          <div className={styles.loadingWidget}>
            <img src="../favicon.ico" style={{ width: "10%" }}></img>
          </div>
        )}
      </div>
    </div>
  );
}
