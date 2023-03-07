import { useRef } from "react";
import { useForm } from "react-hook-form";
import { getFormattedDateTime } from "../../utils/date";
import { addUserFoodEntry } from "../../services/foodEntry";
import { CreateUserFoodEntryDto } from "../../types/FoodEntry";
import Router from "next/router";

export default function AddFoodEntry({}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddFoodEntry = async (foodEntry: CreateUserFoodEntryDto) => {
    try {
      const dateTime = getFormattedDateTime(foodEntry.date, foodEntry.time);
      const responseData = await addUserFoodEntry({
        name: foodEntry.name,
        calories: Number(foodEntry.calories),
        price: Number(foodEntry.price),
        dateTime,
      });
      if (responseData?.statusCode >= 400) {
        alert({ message: responseData.message });
      } else {
        Router.push("/dashboard");
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    Router.back();
  };

  const cancelButtonRef = useRef(null);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center justify-center">
        <div className="mt-5 md:col-span-2 md:mt-0">
          <form onSubmit={handleSubmit(handleAddFoodEntry)}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Add a new Food Entry
                  </h3>
                  <div className="mt-2">
                    <p className="mt-1 text-sm text-gray-600">
                      Plase add your food entry information here
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-6 sm:mx-auto sm:w-full sm:max-w-md">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    {...register("name", {
                      required: "Name is required",
                    })}
                    type="name"
                    name="name"
                    id="name"
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                  <p className="mt-2 text-sm text-red-600">
                    {errors.name?.message?.toString()}
                  </p>
                </div>
              </div>
              <div className="flex flex-row n">
                <div className="mt-4 mr-4">
                  <label
                    htmlFor="calories"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Calories
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("calories", {
                        required: "Calories is required",
                        min: {
                          value: 1,
                          message: "Calories should be greater than 1",
                        },
                      })}
                      type="number"
                      name="calories"
                      id="calories"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    <p className="mt-2 text-sm text-red-600">
                      {errors.calories?.message?.toString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("price", {
                        required: false,
                        min: {
                          value: 0,
                          message: "Price cannot be negative",
                        },
                      })}
                      type="number"
                      name="price"
                      id="price"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    <p className="mt-2 text-sm text-red-600">
                      {errors.price?.message?.toString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row">
                <div className="mt-4 mr-4">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("date", {
                        required: "Date is required",
                      })}
                      type="date"
                      name="date"
                      id="date"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    <p className="mt-2 text-sm text-red-600">
                      {errors.date?.message?.toString()}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Time
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("time", {
                        required: "Time is required",
                      })}
                      type="time"
                      name="time"
                      id="time"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                    <p className="mt-2 text-sm text-red-600">
                      {errors.time?.message?.toString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">
                Save
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={handleCancel}
                ref={cancelButtonRef}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
