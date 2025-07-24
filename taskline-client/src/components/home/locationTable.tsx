"use client";
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
import { error } from "console";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export const LocationsTable = (user: any) => {
  const [locations, setLocations] = useState([] as UserLocation[]);

  useEffect(() => {
    fetchUserLocations(user)
      .then((response) => {
        if (Array.isArray(response)) {
          setLocations(response);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch locations", error);
      });
  }, [user]);

  if (locations.length === 0) {
    return (
      <p>
        No teams found. Wait to be added to a business or{" "}
        <Link className="text-blue-500" href="/home/create-business">
          create your own
        </Link>
        .
      </p>
    );
  } else {
    return (
      <Table>
        <TableCaption>A list of your teams</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Team name</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );
  }
};
