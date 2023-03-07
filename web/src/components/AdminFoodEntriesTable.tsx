import Link from "next/link";
import Router from "next/router";
import { useState } from "react";

import { AdminFoodEntry } from "../types/FoodEntry";

interface AdminFoodEntriesTableProps {
  data: AdminFoodEntry[];
  handleOpenConfirmationModal: (foodEntryId: number) => void;
  handleFilterByDate: (startDate: string, endDate: string) => void;
}

export default function AdminFoodEntriesTable({
  data,
  handleOpenConfirmationModal,
  handleFilterByDate,
}: AdminFoodEntriesTableProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleAddFoodEntry = () => {
    Router.push("/admin-dashboard/add-food-entry");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Users food entries
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all users food entries
          </p>
        </div>
        <div className="flex flex-row">
          <div className="mr-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Start Date
            </label>
            <div className="mt-1">
              <input
                onChange={(e) => {
                  setStartDate(e.target.value);
                  handleFilterByDate(e.target.value, endDate);
                }}
                type="date"
                name="date"
                id="date"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Select date start"
              />
            </div>
          </div>
          <div className="mr-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <div className="mt-1">
              <input
                onChange={(e) => {
                  setEndDate(e.target.value);
                  handleFilterByDate(startDate, e.target.value);
                }}
                type="date"
                name="date"
                id="date"
                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Select date end"
              />
            </div>
          </div>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex align-bottom justify-end">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            onClick={handleAddFoodEntry}
          >
            Add food entry
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      User
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Food Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Calories
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date/Time
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data.map((foodEntry) => (
                    <tr key={foodEntry.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {foodEntry.user.username}
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {foodEntry.name}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                        {foodEntry.calories}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                        {foodEntry.price}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                        {new Date(foodEntry.dateTime).toLocaleDateString("en")}{" "}
                        {new Date(foodEntry.dateTime).toLocaleTimeString("en")}
                      </td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          href={`admin-dashboard/edit-food-entry/${foodEntry.id}`}
                        >
                          <a className="text-indigo-600 hover:text-indigo-900">
                            Edit
                          </a>
                        </Link>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a
                          className="text-red-600 hover:text-red-900 cursor-pointer"
                          onClick={() =>
                            handleOpenConfirmationModal(foodEntry.id)
                          }
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
