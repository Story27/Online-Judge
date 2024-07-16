// problem-form.tsx

import { NextPage } from "next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import * as z from "zod";
import { ProblemSchema } from "@/schemas";
import { addProblem } from "@/actions/new-problem";
import { FormError } from "../../form-error";
import { FormSuccess } from "../../form-success";

interface TestCase {
  input: string;
  output: string;
  isSample: boolean;
}

const ProblemCreate: NextPage = (props) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof ProblemSchema>>();
  const [testCases, setTestCases] = useState<TestCase[]>([
    { input: "", output: "", isSample: false },
  ]);

  const onSubmit = async (values: z.infer<typeof ProblemSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      // Ensure testCases are added to values before submitting
      const data = { ...values, testCases };
      addProblem(data).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    const newTestCases = [...testCases];
    newTestCases[index] = {
      ...newTestCases[index],
      [name.split(".")[1]]: value,
    };
    setTestCases(newTestCases);
  };

  const handleCheckboxChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = event.target;
    const newTestCases = [...testCases];
    newTestCases[index].isSample = checked;
    setTestCases(newTestCases);
  };

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", output: "", isSample: false }]);
  };

  const handleRemoveTestCase = (index: number) => {
    const newTestCases = [...testCases];
    newTestCases.splice(index, 1);
    setTestCases(newTestCases);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded shadow">
      <h2 className="text-2xl font-bold mb-5">Create New Problem</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            disabled={isPending}
            type="text"
            {...register("title", { required: true })}
            className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <span className="text-sm text-red-500">Title is required</span>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            disabled={isPending}
            {...register("description", { required: true })}
            className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.description ? "border-red-500" : ""
            }`}
          />
          {errors.description && (
            <span className="text-sm text-red-500">
              Description is required
            </span>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Difficulty
          </label>
          <select
            disabled={isPending}
            {...register("difficulty", { required: true })}
            className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.difficulty ? "border-red-500" : ""
            }`}
          >
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
          {errors.difficulty && (
            <span className="text-sm text-red-500">Difficulty is required</span>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Topic
          </label>
          <input
            disabled={isPending}
            type="text"
            {...register("topics", { required: true })}
            className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              errors.topics ? "border-red-500" : ""
            }`}
          />
          {errors.topics && (
            <span className="text-sm text-red-500">Topic is required</span>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Test Cases
          </label>
          {testCases.map((testCase, index) => (
            <div key={index} className="space-y-2">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Input
                </label>
                <input
                  disabled={isPending}
                  type="text"
                  name={`testCases[${index}].input`}
                  value={testCase.input}
                  onChange={(event) => handleInputChange(index, event)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Output
                </label>
                <input
                  disabled={isPending}
                  type="text"
                  name={`testCases[${index}].output`}
                  value={testCase.output}
                  onChange={(event) => handleInputChange(index, event)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Is Sample Test Case
                </label>
                <input
                  disabled={isPending}
                  type="checkbox"
                  name={`testCases[${index}].isSample`}
                  checked={testCase.isSample}
                  onChange={(event) => handleCheckboxChange(index, event)}
                  className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                />
              </div>
              <button
                disabled={isPending}
                type="button"
                onClick={() => handleRemoveTestCase(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove Test Case
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTestCase}
            className="text-blue-500 hover:text-blue-700"
          >
            Add Test Case
          </button>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProblemCreate;
