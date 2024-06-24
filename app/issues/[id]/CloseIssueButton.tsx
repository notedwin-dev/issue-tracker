"use client";

import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CloseIssueButton = ({
  issueId,
  userId,
}: {
  issueId: number;
  userId: string;
}) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isClosing, setClosing] = useState(false);

  const deleteIssue = async (userId: string) => {
    try {
      setClosing(true);
      await axios.patch("/api/issues/" + issueId, {
        assignedToUserId: userId || null,
        status: "CLOSED",
      });
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setClosing(false);
      setError(true);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button
            color="yellow"
            disabled={isClosing}
            className="hover:cursor-pointer"
          >
            Close Issue
            {isClosing && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Close Issue Confirmation</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to Close this issue?
          </AlertDialog.Description>
          <Flex mt="4" gap="3" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={() => deleteIssue(userId)}>
                Close
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This issue could not be closed.
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            mt="2"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default CloseIssueButton;
