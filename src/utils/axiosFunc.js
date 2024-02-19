import axios from "axios";
const { VITE_FWH_URL } = import.meta.env

const axiosRequest = async (reqOptions) => {
  const defaultOptions = {
    url: "",
    method: "GET",
    data: {},
    headers: {},
  };

  for (const key in reqOptions) {
    if (key === "path")
      defaultOptions["url"] = `${VITE_FWH_URL}${reqOptions[key]}`;
    else if (key === "headers")
      defaultOptions["headers"] = { ...reqOptions[key] };
    else if (key === "cancelToken")
      defaultOptions.data["cancelToken"] = { ...reqOptions[key] };
    else defaultOptions[key] = reqOptions[key];
  }
  
  return await axios(defaultOptions)
    .then((response) => {
      if (response?.status === 200) {
        const detailText = {
          status: response?.status,
          data: response?.data,
        };
        return detailText;
      }
    })
    .catch((error) => {
      const detailText = {
        status: error?.response?.status,
        data: error,
      };
      return detailText;
    });
};

export default axiosRequest;
