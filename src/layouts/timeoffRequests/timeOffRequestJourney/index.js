import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import TimeOffRequestJourney from "layouts/timeoffRequests/timeOffRequestJourney/table/timeOffJourneyAdd";
import MDBox from "components/MDBox";
import DataTable from "examples/Tables/DataTable";

function TimeOffRequest() {
  const { columns: pColumns, rows: pRows } = TimeOffRequestJourney();

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3}>
        <DataTable
          table={{ columns: pColumns, rows: pRows }}
          isSorted
          entriesPerPage
          showTotalEntries
          noEndBorder
          canSearch
        />
      </MDBox>
    </DashboardLayout>
  );
}

export default TimeOffRequest;
