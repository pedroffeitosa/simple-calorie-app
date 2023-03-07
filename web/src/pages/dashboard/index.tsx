import { useEffect, useState } from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { getAPIClient } from "../../services/axios";
import FoodEntriesTable from "../../components/FoodEntriesTable";
import Warning from "../../components/Warning";
import { readNotification } from "../../services/notification";
import { getMyFoodEntries } from "../../services/foodEntry";
import { User } from "../../types/User";

export default function Dashboard({ foodEntries, notifications }) {
  const [foodEntriesData, setFoodEntriesData] = useState(foodEntries);
  useEffect(() => {
    notifications.forEach((notification) => {
      readNotification(notification.id);
    });
  }, [notifications]);

  const handleFilterByDate = async (startDate, endDate) => {
    const foodEntriesFiltered = await getMyFoodEntries(startDate, endDate);
    setFoodEntriesData(foodEntriesFiltered);
  };

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {notifications.map((notification) => (
            <div className="px-4 sm:px-6 lg:px-8 mb-2" key={notification.id}>
              <Warning message={notification.message} />
            </div>
          ))}

          <FoodEntriesTable
            data={foodEntriesData}
            handleFilterByDate={handleFilterByDate}
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
  if (userData.data.role === "admin") {
    return {
      redirect: {
        destination: "/admin-dashboard",
        permanent: false,
      },
    };
  }

  const foodEntriesResponse = await apiClient.get("/food-entries/user");
  const notificationsResponse = await apiClient.get("/notifications");
  return {
    props: {
      foodEntries: foodEntriesResponse.data,
      notifications: notificationsResponse.data,
    },
  };
};
