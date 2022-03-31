// /* eslint-disable import/prefer-default-export */
// /* eslint-disable object-shorthand */
// import fetchIntercept from "fetch-intercept";

// export const unregister = fetchIntercept.register({
//   request: function (url, config) {
//     // eslint-disable-next-line no-param-reassign
//     config.requestOptions.headers.platform = "rhwhwkw40edn";
//     // Modify the url or config here
//     return [url, config];
//   },

//   requestError: function (error) {
//     // Called when an error occured during another 'request' interceptor call
//     return Promise.reject(error);
//   },

//   response: function (response) {
//     // Modify the reponse object
//     return response;
//   },

//   responseError: function (error) {
//     // Handle an fetch error
//     return Promise.reject(error);
//   },
// });

// // Call fetch to see your interceptors in action.
// fetch("http://google.com");

// // Unregister your interceptor
// unregister();
