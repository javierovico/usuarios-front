import axios from "axios";

// const mocks = {
//   auth: { POST: { token: "This-is-a-mocked-token" } },
//   "user/me": { GET: { name: "doggo", title: "sir" } }
// };

const apiCall = ({ url,data, method }) =>
  new Promise((resolve, reject) => {
    console.log("apicall: "+url+data+method);
    switch (method?method.toLowerCase():'') {
      case 'post':
        axios.post(url,data).then((response)=>{
          resolve(response.data);
        }).catch((error)=>{
          reject(new Error(error.response.data.message));
        })
        break;
      default:
        console.log("get: "+url);
        axios.get(url).then((response)=>{
            resolve(response.data);
        }).catch((error)=>{
            reject(new Error(error.response.data.message));
        })
        break;
    }
    // setTimeout(() => {
    //   try {
    //     resolve(mocks[url][method || "GET"]);
    //     console.log(`Mocked '${url}' - ${method || "GET"}`);
    //     console.log("response: ", mocks[url][method || "GET"]);
    //   } catch (err) {
    //     reject(new Error(err));
    //   }
    // }, 1000);
  });

export default apiCall;
