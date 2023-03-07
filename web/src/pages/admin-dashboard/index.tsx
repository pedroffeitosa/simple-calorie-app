import Head from "next/head";
import { GetServerSideProps } from "next";
import { getAPIClient } from "../../services/axios";
import { parseCookies } from "nookies";
import AdminFoodEntriesTable from "../../components/AdminFoodEntriesTable";
import DeleteFoodEntryConfirmationModal from "../../components/DeleteFoodEntryConfirmationModal";
import { useState } from "react";
import { deleteFoodEntry, getAllFoodEntries } from "../../services/foodEntry";
import { User } from "../../types/User";

export default function AdminDashboard({ foodEntries }) {
  const [foodEntriesData, setFoodEntriesData] = useState(foodEntries);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [foodEntryToDeleteId, setFoodEntryToDeleteId] = useState(null);

  const handleFilterByDate = async (startDate, endDate) => {
    const foodEntriesFiltered = await getAllFoodEntries(startDate, endDate);
    setFoodEntriesData(foodEntriesFiltered);
  };

  async function handleDeleteFoodEntry(id: number) {
    await deleteFoodEntry(id);
    setIsDeleteModalOpen(false);
    setFoodEntriesData(
      foodEntriesData.filter((foodEntry) => foodEntry.id !== id)
    );
  }

  function handleOpenConfirmationModal(foodEntryId: number) {
    setFoodEntryToDeleteId(foodEntryId);
    setIsDeleteModalOpen(true);
  }

  return (
    <div>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <AdminFoodEntriesTable
            data={foodEntriesData}
            handleOpenConfirmationModal={handleOpenConfirmationModal}
            handleFilterByDate={handleFilterByDate}
          />
          <DeleteFoodEntryConfirmationModal
            open={isDeleteModalOpen}
            setOpen={setIsDeleteModalOpen}
            handleDelete={handleDeleteFoodEntry}
            foodEntryId={foodEntryToDeleteId}
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
  if (userData.data.role !== "admin") {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  const foodEntriesResponse = await apiClient.get("/food-entries");

  return {
    props: {
      foodEntries: foodEntriesResponse.data,
    },
  };
};
