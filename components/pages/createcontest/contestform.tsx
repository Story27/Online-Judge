import { NextPage } from "next";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import * as z from "zod";
import { ContestSchema } from "@/schemas";
import { addContest } from "@/actions/new-contest";
import { FormError } from "../../form-error";
import { FormSuccess } from "../../form-success";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface Problem {
  id: string;
  title: string;
}

const ContestCreate: NextPage = (props) => {
  const { data: session, status } = useSession({ required: true });
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof ContestSchema>>();

  useEffect(() => {
    const fetchProblems = async () => {
      const response = await fetch("/api/problems");
      const data = await response.json();
      setProblems(data);
    };

    fetchProblems();
  }, []);

  const onSubmit = async (values: z.infer<typeof ContestSchema>) => {
    setError("");
    setSuccess("");

    if (status === "loading" || !session?.user) {
      setError("You must be logged in to create a contest");
      return;
    }

    const { id: userId, role: userRole } = session.user;

    if (!userId || !userRole) {
      setError("User information is missing");
      return;
    }

    startTransition(() => {
      const data = {
        ...values,
        problemIds: selectedProblems,
      };
      addContest(data, userId, userRole as UserRole).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const handleProblemSelect = (problemId: string) => {
    setSelectedProblems((prev) =>
      prev.includes(problemId)
        ? prev.filter((id) => id !== problemId)
        : [...prev, problemId]
    );
  };

  const filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto mt-10 p-4 border rounded shadow bg-white h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
      <h2 className="text-2xl font-bold mb-4">Create New Contest</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Contest Name
            </label>
            <input
              disabled={isPending}
              type="text"
              {...register("name", { required: true })}
              className={`block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                Contest name is required
              </span>
            )}
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Start Date and Time
            </label>
            <input
              disabled={isPending}
              type="datetime-local"
              {...register("startTime", { required: true })}
              className={`block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                errors.startTime ? "border-red-500" : ""
              }`}
            />
            {errors.startTime && (
              <span className="text-xs text-red-500">
                Start time is required
              </span>
            )}
          </div>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            End Date and Time
          </label>
          <input
            disabled={isPending}
            type="datetime-local"
            {...register("endTime", { required: true })}
            className={`block w-full px-3 py-1 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.endTime ? "border-red-500" : ""
            }`}
          />
          {errors.endTime && (
            <span className="text-xs text-red-500">End time is required</span>
          )}
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Select Problems
          </label>
          <input
            type="text"
            placeholder="Search problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1 mb-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <div className="max-h-48 overflow-y-auto pr-2">
            {filteredProblems.map((problem) => (
              <div key={problem.id} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  id={problem.id}
                  checked={selectedProblems.includes(problem.id)}
                  onChange={() => handleProblemSelect(problem.id)}
                  className="mr-2"
                />
                <label htmlFor={problem.id} className="text-sm">
                  {problem.title}
                </label>
              </div>
            ))}
          </div>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button
          variant={"default"}
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Contest
        </Button>
      </form>
    </div>
  );
};

export default ContestCreate;
