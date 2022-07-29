// import React, { useState } from "react";

// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import MDButton from "components/MDButton";
// import MDInput from "components/MDInput";

// import { Logger } from "logging-library";
// import FileViewer from "react-file-viewer";
// import { CustomErrorComponent } from "custom-error";

// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
// import Iframe from "react-iframe";
// import test1 from "./test1.jpeg";
// import test2 from "./test2.pdf";
// import test3 from "./test3.png";
// import testExcel from "./test-excel.xlsx";
// import testTxt from "./test-txt.txt";
// import testDocx from "./test-doc.doc";
// import testPpt from "./test-ppt.pptx";

<<<<<<< HEAD
function Positions() {
  console.log("Tight");
  //   const [files, setFiles] = useState();
  //   const docs = [
  //     { uri: test3 },
  //     { uri: test2 },
  //     { uri: test1 },
  //     { uri: "http://ieee802.org/secmail/docIZSEwEqHFr.doc&embedded=true" },
  //     { uri: testExcel },
  //     { uri: testTxt },
  //     { uri: testDocx },
  //     { uri: testPpt },
  //     // // eslint-disable-next-line global-require
  //     // { uri: require("./test1.jpeg") }, // Local File
  //     // // eslint-disable-next-line global-require
  //     // { uri: require("./test3.png") }, // Local File
  //     // // eslint-disable-next-line global-require
  //     // { uri: require("./test2.pdf") }, // Local Fil
  //   ];
  //   // const uuri = "http%3A%2F%2Fieee802%2Eorg%3A80%2Fsecmail%2FdocIZSEwEqHFr%2Edoc";
  //   // // eslint-disable-next-line prefer-template
  //   // console.log("https://view.officeapps.live.com/op/embed.aspx?src=" + uuri);
  //   const [view, setView] = useState(false);
  //   const handleView = () => {
  //     setView(!view);
  //   };
  //   const onError = (e) => {
  //     Logger.logError(e, "error in file-viewer");
  //   };
  //   const file = testExcel;
  //   const type = "pdf";
  //   const changeFiles = (e) => {
  //     const fii = e.target.files;
  //     console.log(fii[0]);
  //     const fileReader = new FileReader();
  //     fileReader.onload = (event) => {
  //       const { result } = event.target;
  //       setFiles(result);
  //     };
  //     fileReader.readAsDataURL(fii[0]);
  //   };
  //   return (
  //     <DashboardLayout>
  //       <DashboardNavbar />
  //       <MDInput type="file" files={files} onChange={(e) => changeFiles(e)} />
  //       <div className="container" id="msdoc-renderer">
  //         <iframe
  //           title="msdoc-iframe2"
  //           src="https://docs.google.com/gview?url=http://ieee802.org/secmail/docIZSEwEqHFr.doc&embedded=true"
  //           width="100%"
  //           height="100%"
  //           frameBorder="0"
  //         >
  //           This is an embedded{" "}
  //           <a target="_blank" href="http://office.com" rel="noreferrer">
  //             Microsoft Office
  //           </a>{" "}
  //           document, powered by{" "}
  //           <a target="_blank" href="http://office.com/webapps" rel="noreferrer">
  //             Office Online
  //           </a>
  //           .
  //         </iframe>
  //         <iframe title="msdoc-iframe3" src={file} width="100%" height="100%" frameBorder="0">
  //           {/* This is an embedded{" "}
  //           <a target="_blank" href="http://office.com" rel="noreferrer">
  //             Microsoft Office
  //           </a>{" "}
  //           document, powered by{" "}
  //           <a target="_blank" href="http://office.com/webapps" rel="noreferrer">
  //             Office Online
  //           </a> */}
  //           .
  //         </iframe>
  //         <Iframe
  //           id="msdoc-iframe"
  //           title="msdoc-iframe"
  //           src="https://view.officeapps.live.com/op/embed.aspx?src=http%3A%2F%2Fieee802%2Eorg%3A80%2Fsecmail%2FdocIZSEwEqHFr%2Edoc"
  //           frameBorder="0"
  //         />
  //         <Iframe
  //           id="msdoc-iframe"
  //           title="msdoc-iframe"
  //           src={`https://view.officeapps.live.com/op/embed.aspx?src=${testDocx}`}
  //           frameBorder="0"
  //         />
  //       </div>
  //       <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />
  //       <>
  //         <MDButton onClick={handleView}>View</MDButton>
  //         {view && (
  //           <FileViewer
  //             fileType={type}
  //             filePath={file}
  //             errorComponent={CustomErrorComponent}
  //             onError={onError}
  //           />
  //         )}
  //       </>
  //       <Footer />
  //     </DashboardLayout>
  //   );
}
=======
// function Positions() {
//   const [files, setFiles] = useState();

//   const docs = [
//     { uri: test3 },
//     { uri: test2 },
//     { uri: test1 },
//     { uri: "http://ieee802.org/secmail/docIZSEwEqHFr.doc&embedded=true" },
//     { uri: testExcel },
//     { uri: testTxt },
//     { uri: testDocx },
//     { uri: testPpt },
//     // // eslint-disable-next-line global-require
//     // { uri: require("./test1.jpeg") }, // Local File
//     // // eslint-disable-next-line global-require
//     // { uri: require("./test3.png") }, // Local File
//     // // eslint-disable-next-line global-require
//     // { uri: require("./test2.pdf") }, // Local Fil
//   ];
//   // const uuri = "http%3A%2F%2Fieee802%2Eorg%3A80%2Fsecmail%2FdocIZSEwEqHFr%2Edoc";
//   // // eslint-disable-next-line prefer-template
//   // console.log("https://view.officeapps.live.com/op/embed.aspx?src=" + uuri);

//   const [view, setView] = useState(false);

//   const handleView = () => {
//     setView(!view);
//   };

//   const onError = (e) => {
//     Logger.logError(e, "error in file-viewer");
//   };

//   const file = testExcel;
//   const type = "pdf";

//   const changeFiles = (e) => {
//     const fii = e.target.files;
//     console.log(fii[0]);

//     const fileReader = new FileReader();
//     fileReader.onload = (event) => {
//       const { result } = event.target;

//       setFiles(result);
//     };
//     fileReader.readAsDataURL(fii[0]);
//   };

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />

//       <MDInput type="file" files={files} onChange={(e) => changeFiles(e)} />
//       <div className="container" id="msdoc-renderer">
//         <iframe
//           title="msdoc-iframe2"
//           src="https://docs.google.com/gview?url=http://ieee802.org/secmail/docIZSEwEqHFr.doc&embedded=true"
//           width="100%"
//           height="100%"
//           frameBorder="0"
//         >
//           This is an embedded{" "}
//           <a target="_blank" href="http://office.com" rel="noreferrer">
//             Microsoft Office
//           </a>{" "}
//           document, powered by{" "}
//           <a target="_blank" href="http://office.com/webapps" rel="noreferrer">
//             Office Online
//           </a>
//           .
//         </iframe>
//         <iframe title="msdoc-iframe3" src={file} width="100%" height="100%" frameBorder="0">
//           {/* This is an embedded{" "}
//           <a target="_blank" href="http://office.com" rel="noreferrer">
//             Microsoft Office
//           </a>{" "}
//           document, powered by{" "}
//           <a target="_blank" href="http://office.com/webapps" rel="noreferrer">
//             Office Online
//           </a> */}
//           .
//         </iframe>
//         <Iframe
//           id="msdoc-iframe"
//           title="msdoc-iframe"
//           src="https://view.officeapps.live.com/op/embed.aspx?src=http%3A%2F%2Fieee802%2Eorg%3A80%2Fsecmail%2FdocIZSEwEqHFr%2Edoc"
//           frameBorder="0"
//         />
//         <Iframe
//           id="msdoc-iframe"
//           title="msdoc-iframe"
//           src={`https://view.officeapps.live.com/op/embed.aspx?src=${testDocx}`}
//           frameBorder="0"
//         />
//       </div>

//       <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />

//       <>
//         <MDButton onClick={handleView}>View</MDButton>
//         {view && (
//           <FileViewer
//             fileType={type}
//             filePath={file}
//             errorComponent={CustomErrorComponent}
//             onError={onError}
//           />
//         )}
//       </>
//       <Footer />
//     </DashboardLayout>
//   );
// }
>>>>>>> ab82012b74759161553ebb25a232af508c6f8265

// export default Positions;
