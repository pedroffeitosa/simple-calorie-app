import { useContext } from "react";

import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import UserCaloriesTable from "../components/UserCaloriesTable";
import { AuthContext } from "../contexts/AuthContext";
import { getAPIClient } from "../services/axios";
import { User } from "../types/User";

export default function History({ userCaloriesPerDay, userInfo }) {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Head>
        <title>History</title>
      </Head>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <UserCaloriesTable
            data={userCaloriesPerDay}
            userLimit={user?.dailyThresholdLimitOfCalories}
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
  const userCaloriesResponse = await apiClient.get(
    "/food-entries/user/calories"
  );

  const userData = await apiClient.get<User>("/users/profile");
  if (userData.data.role === "admin") {
    return {
      redirect: {
        destination: "/admin-dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      userCaloriesPerDay: userCaloriesResponse.data,
    },
  };
};
