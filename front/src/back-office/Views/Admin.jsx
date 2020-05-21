import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
const axios = require("axios");

const HomeIsLoggedIn = () => {
  const blankValue = { message: "" };
  const [value, setValue] = useState([""]);

  useEffect(() => {
    axios
      .get(`/admin`)
      .then((apiRes) => {
        setValue(apiRes.data.text);
      })
      .catch((err) => console.error(err));
  }, []);

  const addValue = () => {
    setValue([...value, ""]);
  };

  const handleChange = (e) => {
    const updatedValues = [...value];
    updatedValues[e.target.dataset.idx] = e.target.value;
    setValue(updatedValues);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = "http://localhost:8080/admin";
    axios
      .post(
        url,
        {
          user: {
            text: value,
          },
        }
        // { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "Text Created") {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch((error) => {
        console.log(error.data);
      });
  };

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <p>You are logged in !</p>
        <br />
        <input
          type="button"
          className="button is-normal is-success is-light"
          value="Add New Input"
          onClick={addValue}
        />
        {value.length &&
          value.map((val, idx) => {
            const inputId = `name-${idx}`;
            return (
              <div key={`${idx}`}>
                <br />
                <label htmlFor={inputId}>{`Input #${idx + 1}`}</label>
                <input
                  type="text"
                  name={inputId}
                  data-idx={idx}
                  id={inputId}
                  className="message"
                  value={value[idx]}
                  onChange={handleChange}
                />
              </div>
            );
          })}
        <br />
        <input
          type="submit"
          className="button is-primary is-light"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default HomeIsLoggedIn;
