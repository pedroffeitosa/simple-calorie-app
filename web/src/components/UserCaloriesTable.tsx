import { UserCaloriesPerDay } from "../types/UserCaloriesPerDay";

interface UserCaloriesTableProps {
  data: UserCaloriesPerDay[];
  userLimit: number | null;
}

export default function UserCaloriesTable({
  data,
  userLimit = 0,
}: UserCaloriesTableProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Calories</h1>
          <p className="mt-2 text-sm text-gray-700">
            Total calories per day
          </p>
        </div>
      </div>
      <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
              >
                Day
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
              >
                Total Calories
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((userCalories) => (
              <tr key={userCalories.day} className="border-b border-gray-200">
                <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                  {userCalories._sum.calories >= userLimit ? (
                    <div className="font-medium text-red-500">
                      {userCalories.day}
                    </div>
                  ) : (
                    <div className="font-medium text-gray-900">
                      {userCalories.day}
                    </div>
                  )}
                </td>
                {userCalories._sum.calories >= userLimit ? (
                  <td className="py-4 pl-3 pr-4 text-right text-sm text-red-500 font-medium sm:pr-6 md:pr-0">
                    {userCalories._sum.calories}
                  </td>
                ) : (
                  <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                    {userCalories._sum.calories}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
