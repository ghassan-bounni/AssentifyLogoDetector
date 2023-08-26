"use client";
import styles from "../styles/form.module.css";
import { useState } from "react";
import Axios from "axios";
import ImageContainer from "./ImageContainer";

export default function Form() {
  const [state, setState] = useState({
    results: [],
    images: [],
    loading: false,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setState((prevData) => ({
        ...prevData,
        [name]: files,
        results: [],
      }));
    } else {
      setState((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setState({ ...state, loading: true });

    console.log("Form submitted");

    const res = await Axios.post(
      "http://127.0.0.1:5000/detect",
      {
        images: state.images,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).then((res) => res.data);

    // simulate loading time
    setTimeout(() => {
      setState((prevData) => ({
        ...prevData,
        loading: false,
        ["results"]: res["results"],
      }));
    }, 1000);
  };

  return (
    <form className={`${styles.center}`} name="form" onSubmit={handleSubmit}>
      <div className={styles.imagesContainer}>
        <ImageContainer title="images" images={Array.from(state.images)} />
        <ImageContainer
          title="results"
          images={state.results}
          results={true}
          loading={state.loading}
        />
      </div>

      <div className={`${styles.custominput} ${styles.card}`}>
        <label htmlFor="fileInput">Choose Files</label>
        <input
          id="fileInput"
          type="file"
          name="images"
          accept=".jpg, .jpeg, .png"
          multiple
          onChange={handleChange}
          required
        />
      </div>

      <input
        className={`${styles.custominput} ${styles.card}`}
        style={{ cursor: "pointer" }}
        type="submit"
        value="Submit"
      />
    </form>
  );
}
