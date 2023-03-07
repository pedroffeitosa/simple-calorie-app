import { useMemo } from "react";

import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { getAPIClient } from "../services/axios";
import { getFormattedDate } from "../utils/date";
import NumberOfAddedFoodEntries from "../components/NumberOfAddedFoodEntries";
import { User } from "../types/User";
import UsersAverageCaloriesTable from "../components/UsersAverageCaloriesTable";

interface ReportProps {
  allUsers: User[];
  averageCaloriesPerUser: UserAverageCalories[];
  countLastSevenDays: {
    _count: {
      _all: number;
    };
  };
  countSevenDaysBeforeLastSevenDays: {
    _count: {
      _all: number;
    };
  };
}

export default function Report({
  allUsers,
  averageCaloriesPerUser,
  countLastSevenDays,
  countSevenDaysBeforeLastSevenDays,
}: ReportProps) {
  console.log(allUsers);
  console.log(averageCaloriesPerUser);
  const changeType = useMemo(() => {
    if (
      countLastSevenDays._count._all >=
      countSevenDaysBeforeLastSevenDays._count._all
    ) {
      return "increase";
    } else {
      return "decrease";
    }
  }, [countLastSevenDays, countSevenDaysBeforeLastSevenDays]);

  const changePercentage = useMemo(() => {
    return Math.abs(
      (countLastSevenDays._count._all /
        countSevenDaysBeforeLastSevenDays._count._all) *
        100
    );
  }, [countLastSevenDays, countSevenDaysBeforeLastSevenDays]);

  return (
    <div>
      <Head>
        <title>Report</title>
      </Head>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <NumberOfAddedFoodEntries
            thisWeek={countLastSevenDays._count._all}
            lastWeek={countSevenDaysBeforeLastSevenDays._count._all}
            changeType={changeType}
            changePercentage={changePercentage}
          />
          <UsersAverageCaloriesTable
            allUsers={allUsers}
            averageCaloriesPerUser={averageCaloriesPerUser}
          />
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ["simple-calorie.token"]: token } = parseCookies(ctx);
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const userData = await apiClient.get<User>("/users/profile");
  if (userData.data.role === "user") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  const averageCaloriesPerUserResponse = await apiClient.get(
    "/food-entries/average-calories"
  );

  const allUsers = await apiClient.get("/users");

  const today = getFormattedDate(new Date());

  let startOfTheWeekDate = new Date();
  startOfTheWeekDate.setDate(startOfTheWeekDate.getDate() - 6); // +1 with today
  const startOfTheWeek = getFormattedDate(startOfTheWeekDate);

  let lastWeekDate = new Date();
  lastWeekDate.setDate(lastWeekDate.getDate() - 7);
  const lastWeek = getFormattedDate(lastWeekDate);

  let startOfTheLastWeekDate = new Date();
  startOfTheLastWeekDate.setDate(startOfTheLastWeekDate.getDate() - 13); //
  const startOfTheLastWeek = getFormattedDate(startOfTheLastWeekDate);

  const foodEntriesCountLastSevenDays = await apiClient.get(
    `/food-entries/count/?startDate=${startOfTheWeek}&endDate=${today}`
  );
  const foodEntriesCountSevenDaysBeforeLastSevenDays = await apiClient.get(
    `/food-entries/count/?startDate=${startOfTheLastWeek}&endDate=${lastWeek}`
  );

  return {
    props: {
      averageCaloriesPerUser: averageCaloriesPerUserResponse.data,
      allUsers: allUsers.data,
      countLastSevenDays: foodEntriesCountLastSevenDays.data,
      countSevenDaysBeforeLastSevenDays:
        foodEntriesCountSevenDaysBeforeLastSevenDays.data,
    },
  };
};
