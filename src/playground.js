const axios = require("axios");

const url = " http://localhost:3000/jobs";

// axios
//   .get(url) // return Promise object
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .then(() => {});

const fetchJobsV1 = async () => {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

fetchJobsV1();
