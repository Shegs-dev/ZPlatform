// import React, { useEffect } from "react";

// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// // import MDButton from "components/MDButton";
// // import MDInput from "components/MDInput";

// // import { Logger } from "logging-library";
// // import FileViewer from "react-file-viewer";
// // import { CustomErrorComponent } from "custom-error";
// import GHeaders from "getHeader";

// import { useNavigate } from "react-router-dom";

// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
// import Iframe from "react-iframe";
// import test1 from "./test1.jpeg";
// import test2 from "./test2.pdf";
// import test3 from "./test3.png";
// import testExcel from "./test-excel.xlsx";
// import testTxt from "./test-txt.txt";
// import testDocx from "./test-doc.doc";
// import testPpt from "./test-ppt.pptx";

// eslint-disable-next-line no-unused-vars
function Positions() {
  console.log("Tight");

  // const navigate = useNavigate();

  // const { allGHeaders: miHeaders } = GHeaders();
  // // const [files, setFiles] = useState();
  // const docs = [
  //   {
  //     uri: "https://plutospace.s3.amazonaws.com/WhatsApp%20Image%202022-06-11%20at%206.24.41%20PM%20%281%29.jpeg",
  //   },
  //   { uri: "https://plutospace.s3.amazonaws.com/ScreeningFormAnthony_Daniel.pdf" },
  //   { uri: test3 },
  //   { uri: test2 },
  //   { uri: test1 },
  //   { uri: testExcel },
  //   { uri: testTxt },
  //   { uri: testDocx },
  //   { uri: testPpt },
  //   // // eslint-disable-next-line global-require
  //   // { uri: require("./test1.jpeg") }, // Local File
  //   // // eslint-disable-next-line global-require
  //   // { uri: require("./test3.png") }, // Local File
  //   // // eslint-disable-next-line global-require
  //   // { uri: require("./test2.pdf") }, // Local Fil
  // ];
  // // const uuri = "http%3A%2F%2Fieee802%2Eorg%3A80%2Fsecmail%2FdocIZSEwEqHFr%2Edoc";
  // // // eslint-disable-next-line prefer-template
  // // console.log("https://view.officeapps.live.com/op/embed.aspx?src=" + uuri);

  // // const [view, setView] = useState(false);
  // // const handleView = () => {
  // //   setView(!view);
  // // };
  // // const onError = (e) => {
  // //   Logger.logError(e, "error in file-viewer");
  // // };
  // // const file = testExcel;
  // // const type = "pdf";
  // // const changeFiles = (e) => {
  // //   const fii = e.target.files;
  // //   console.log(fii[0]);
  // //   const fileReader = new FileReader();
  // //   fileReader.onload = (event) => {
  // //     const { result } = event.target;
  // //     setFiles(result);
  // //   };
  // //   fileReader.readAsDataURL(fii[0]);
  // // };

  // const handleGetImage = () => {
  //   const data11 = JSON.parse(localStorage.getItem("MonoUser1"));
  //   const personalIDs = data11.id;
  //   // PROF_PIC_EMP-4ppt
  //   // PROF_PIC_EMP-4doc
  //   // PROF_PIC_EMP-4xlsx
  //   // PROF_PIC_EMP-4pdf

  //   // https://plutospace.s3.amazonaws.com/dosk%20note.pptx
  //   // https://plutospace.s3.amazonaws.com/file-sample_100kB%20%282%29.doc
  //   // https://plutospace.s3.amazonaws.com/SampleCSVFile_11kb.csv
  //   // https://plutospace.s3.amazonaws.com/ScreeningFormAnthony_Daniel.pdf

  //   const imgKey = `PROF_PIC_EMP-${personalIDs}pdf`;
  //   const headers = miHeaders;
  //   fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getByKey/Mono/${imgKey}`, {
  //     headers,
  //   })
  //     .then(async (res) => {
  //       const aToken = res.headers.get("token-1");
  //       localStorage.setItem("rexxdex", aToken);
  //       const result = await res.text();
  //       if (result === null || result === undefined || result === "") {
  //         return {};
  //       }
  //       return JSON.parse(result);
  //     })
  //     .then((result) => {
  //       if (result.message === "Expired Access") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Token Does Not Exist") {
  //         navigate("/authentication/sign-in");
  //         window.location.reload();
  //       }
  //       if (result.message === "Unauthorized Access") {
  //         navigate("/authentication/forbiddenPage");
  //         window.location.reload();
  //       }
  //       fetch(`${process.env.REACT_APP_EKOATLANTIC_URL}/media/getS3Urls/${result.name}`, {
  //         headers,
  //       })
  //         .then(async (res) => {
  //           const aToken = res.headers.get("token-1");
  //           localStorage.setItem("rexxdex", aToken);
  //           const resultres = await res.text();
  //           if (resultres === null || resultres === undefined || resultres === "") {
  //             return {};
  //           }
  //           return JSON.parse(resultres);
  //         })
  //         .then((resultxx) => {
  //           if (resultxx.message === "Expired Access") {
  //             navigate("/authentication/sign-in");
  //             window.location.reload();
  //           }
  //           if (resultxx.message === "Token Does Not Exist") {
  //             navigate("/authentication/sign-in");
  //             window.location.reload();
  //           }
  //           if (resultxx.message === "Unauthorized Access") {
  //             navigate("/authentication/forbiddenPage");
  //             window.location.reload();
  //           }
  //           console.log(resultxx[0]);
  //         });
  //     });
  // };

  // useEffect(() => {
  //   let isMounted = true;

  //   if (isMounted) {
  //     // fetches the table data
  //     handleGetImage();
  //   }
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  // return (
  //   <DashboardLayout>
  //     <DashboardNavbar />
  //     {/* <MDInput type="file" files={files} onChange={(e) => changeFiles(e)} /> */}
  //     <div className="container" id="msdoc-renderer">
  //       {/* <iframe
  //         title="msdoc-iframe2"
  //         src="https://docs.google.com/gview?url=https://plutospace.s3.amazonaws.com/SampleCSVFile_11kb.csv&embedded=true"
  //         width="100%"
  //         height="100%"
  //         frameBorder="0"
  //       >
  //         This is an embedded{"  "}
  //         <a target="_blank" href="http://office.com" rel="noreferrer">
  //           Microsoft Office
  //         </a>{" "}
  //         document, powered by{" "}
  //         <a target="_blank" href="http://office.com/webapps" rel="noreferrer">
  //           Office Online
  //         </a>
  //         .
  //       </iframe>
  //       <iframe
  //         title="msdoc-iframe2"
  //         src="https://view.officeapps.live.com/op/embed.aspx?src=https://plutospace.s3.amazonaws.com/SampleCSVFile_11kb.csv"
  //         width="100%"
  //         height="100%"
  //         frameBorder="0"
  //       >
  //         This is an embedded{" "}
  //         <a target="_blank" href="http://office.com" rel="noreferrer">
  //           Microsoft Office
  //         </a>{" "}
  //         document, powered by{" "}
  //         <a target="_blank" href="http://office.com/webapps" rel="noreferrer">
  //           Office Online
  //         </a>
  //         .
  //       </iframe> */}
  //       {/* <iframe title="msdoc-iframe3" src={file} width="100%" height="100%" frameBorder="0">
  //         This is an embedded{" "}
  //           <a target="_blank" href="http://office.com" rel="noreferrer">
  //             Microsoft Office
  //           </a>{" "}
  //           document, powered by{" "}
  //           <a target="_blank" href="http://office.com/webapps" rel="noreferrer">
  //             Office Online
  //           </a>

  //       </iframe> */}
  //       <Iframe
  //         id="msdoc-iframe"
  //         title="msdoc-iframe"
  //         src="https://plutospace.s3.amazonaws.com/ScreeningFormAnthony_Daniel.pdf"
  //         width="100vw"
  //         height="100vh"
  //         frameBorder="0"
  //       />
  //       <Iframe
  //         id="msdoc-iframe"
  //         title="msdoc-iframe"
  //         src="https://docs.google.com/gview?url=https://plutospace.s3.amazonaws.com/SampleCSVFile_11kb.csv&embedded=true"
  //         width="100%"
  //         height="100%"
  //         frameBorder="0"
  //       />
  //       <Iframe
  //         id="msdoc-iframe"
  //         title="msdoc-iframe"
  //         src="https://docs.google.com/gview?url=https://plutospace.s3.amazonaws.com/file-sample_100kB%20%282%29.doc&embedded=true"
  //         width="100%"
  //         height="100%"
  //         frameBorder="0"
  //       />
  //     </div>
  //     <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />
  //     {/* <>
  //       <MDButton onClick={handleView}>View</MDButton>
  //       {view && (
  //         <FileViewer
  //           fileType={type}
  //           filePath={file}
  //           errorComponent={CustomErrorComponent}
  //           onError={onError}
  //         />
  //       )}
  //     </> */}
  //     <Footer />
  //   </DashboardLayout>
  // );
}

export default Positions;
