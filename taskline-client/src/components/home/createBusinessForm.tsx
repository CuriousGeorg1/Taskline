"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { createBusinessRequest } from "@/actions/userData";

interface CreateBusinessFormProps {
  onClose: () => void;
}

/**
 *
 * @param param0
 * @returns
 */
export const CreateBusinessForm = ({ onClose }: CreateBusinessFormProps) => {
  const [businessName, setBusinessName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmission");
    e.preventDefault();

    try {
      // Try to create a business, response is status code.
      const response = await createBusinessRequest(businessName);
      if (response.status === 200) {
        console.log("Success!");
      } else {
        console.log("Server failed");
      }
    } catch (e) {
      console.error(e);
      throw new Error("Unexpected error");
    }
  };
  return (
    <Card className="w-full max-w-sm" id="CreateBusinessForm">
      <CardHeader>
        <CardTitle>Create a new business</CardTitle>
        <CardDescription>
          When creating a business your role will change to owner and this
          account can't be added to teams in other businesses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Business name</Label>
              <Input
                id="name"
                type="text"
                placeholder="example OY"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />
            </div>
            <div className="flex-col gap-2">
              <Button type="submit" className="w-full text-black">
                Create business
              </Button>
              <Button
                variant="default"
                className="w-full bg-secondary text-black mt-2"
                onClick={onClose}
                type="button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};
