import MDBox from "components/MDBox";
import Forbidden403 from "assets/images/Forbidden403.png";
import CoverLayout from "../components/CoverLayout";

function ForbiddenPage() {
  return (
    <CoverLayout image={Forbidden403}>
      <MDBox>
        <div className="forbid1">
          <img src={Forbidden403} alt="Unauthorized Access" />
        </div>
      </MDBox>
    </CoverLayout>
  );
}

export default ForbiddenPage;
