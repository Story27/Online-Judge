"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteProblem } from "@/actions/delete-problem";
import { deleteContest } from "@/actions/delete-contest"; 

interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  topics: string;
  userId: string;
}

interface Contest {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  userId: string;
  problems: Problem[];
}

const EditPage = () => {
  const { data: session, status } = useSession({ required: true });
  const [problems, setProblems] = useState<Problem[]>([]);
  const [contests, setContests] = useState<Contest[]>([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await fetch("/api/problems", { cache: "no-store" });
        if (response.status === 403) {
          toast.error(
            "Forbidden: You do not have permission to access this resource."
          );
          return;
        }
        const data = await response.json();
        const userProblems = data.filter(
          (problem: Problem) => problem.userId === session?.user?.id
        );
        setProblems(userProblems);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    const fetchContests = async () => {
      try {
        const response = await fetch("/api/contests", { cache: "no-store" });
        if (response.status === 403) {
          toast.error(
            "Forbidden: You do not have permission to access this resource."
          );
          return;
        }
        const data = await response.json();
        const userContests = data.filter(
          (contest: Contest) => contest.userId === session?.user?.id
        );
        setContests(userContests);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    if (status === "authenticated") {
      fetchProblems();
      fetchContests();
    }
  }, [status, session]);

  const handleDeleteProblem = async (problemId: string) => {
    try {
      await deleteProblem(problemId);
      setProblems(problems.filter((problem) => problem.id !== problemId));
      toast.success("Problem deleted successfully");
    } catch (error) {
      console.error("Error deleting problem:", error);
      toast.error("Error deleting problem");
    }
  };

  const handleDeleteContest = async (contestId: string) => {
    try {
      await deleteContest(contestId);
      setContests(contests.filter((contest) => contest.id !== contestId));
      toast.success("Contest deleted successfully");
    } catch (error) {
      console.error("Error deleting contest:", error);
      toast.error("Error deleting contest");
    }
  };

  return (
    <div className="flex space-x-4">
      <Card className="w-[600px]">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">Problem List</p>
        </CardHeader>
        <CardContent className="space-y-4 overflow-auto max-h-[400px]">
          {problems.length === 0 ? (
            <p className="text-center">You have no problems to edit</p>
          ) : (
            <ul>
              {problems.map((problem) => (
                <li
                  key={problem.id}
                  className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md"
                >
                  <p className="text-sm font-medium">{problem.title}</p>
                  <div className="flex space-x-2 ml-4">
                    <Button asChild>
                      <Link href={`/problems/edit/${problem.id}`}>Edit</Link>
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteProblem(problem.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      <Card className="w-[600px]">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">Contest List</p>
        </CardHeader>
        <CardContent className="space-y-4 overflow-auto max-h-[400px]">
          {contests.length === 0 ? (
            <p className="text-center">You have no contests to edit</p>
          ) : (
            <ul>
              {contests.map((contest) => (
                <li
                  key={contest.id}
                  className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md"
                >
                  <p className="text-sm font-medium">{contest.name}</p>
                  <div className="flex space-x-2 ml-4">
                    <Button asChild>
                      <Link href={`/contests/edit/${contest.id}`}>Edit</Link>
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDeleteContest(contest.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
export default EditPage;
