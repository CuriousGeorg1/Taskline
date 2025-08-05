import { fetchUserLocations } from "@/actions/userData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserLocation } from "@/types";
import { CreateBusinessButton } from "./createBusinessButton";
export const LocationsTable = async () => {
  let locations: UserLocation[] = [];

  try {
    const response = await fetchUserLocations();
    if (Array.isArray(response)) {
      locations = response;
      console.log("Locations fetched");
    }
  } catch (error) {
    console.error("Failed to fetch locations", error);
  }

  if (locations.length === 0) {
    return (
      <p>
        No teams found. Wait to be added to a business or{" "}
        <CreateBusinessButton />.
      </p>
    );
  }

  return (
    <Table>
      <TableCaption>A list of your teams</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Team name</TableHead>
        </TableRow>
      </TableHeader>
      {/* Add TableBody and TableRows for locations data */}
    </Table>
  );
};
