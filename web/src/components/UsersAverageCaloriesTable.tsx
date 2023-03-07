import { useCallback } from "react";
import { User } from "../types/User";

interface UsersAverageCaloriesTableProps {
  allUsers: User[];
  averageCaloriesPerUser: UserAverageCalories[];
}

export default function UsersAverageCaloriesTable({
  allUsers,
  averageCaloriesPerUser,
}: UsersAverageCaloriesTableProps) {
  const getUserAverageCalories = useCallback(
    (userId: number) => {
      const userAverageCalories = averageCaloriesPerUser.find(
        (averageCalories) => averageCalories.userId === userId
      );
      return userAverageCalories ? userAverageCalories._avg.calories : 0;
    },
    [averageCaloriesPerUser]
  );
  return (
    <div className="mt-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Average number of calories
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            The average number of calories added per user for the last 7 days
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
                User
              </th>
              <th
                scope="col"
                className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
              >
                Average Calories
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-200">
                <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                  <div className="font-medium text-gray-900">
                    {user.username}
                  </div>
                </td>

                <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                  {getUserAverageCalories(user.id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
