import MDBox from "components/MDBox";

function ForbiddenPage() {
  return (
    <MDBox>
      <div className="forbid1">
        <img src="forbiddenPage/Forbidden403.png" alt="Unauthorized Access..." />
      </div>
      <div id="root">
        <div className="loading">
          <img src="loader1.gif" alt="Loading..." />
        </div>
      </div>
    </MDBox>
  );
}

export default ForbiddenPage;
