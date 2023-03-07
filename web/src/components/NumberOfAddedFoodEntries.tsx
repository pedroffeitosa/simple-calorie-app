import {
  ArrowDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/outline";

interface NumberOfAddedFoodEntriesProps {
  thisWeek: number;
  lastWeek: number;
  changeType: "increase" | "decrease";
  changePercentage: number;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NumberOfAddedFoodEntries({
  thisWeek,
  lastWeek,
  changeType,
  changePercentage,
}: NumberOfAddedFoodEntriesProps) {
  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900">
        Last 7 days
      </h3>
      <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-y-0 md:divide-x">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">
            Number of added food entries
          </dt>
          <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
            <div className="flex items-baseline text-2xl font-semibold text-indigo-600">
              {thisWeek}
              <span className="ml-2 text-sm font-medium text-gray-500">
                from {lastWeek}
              </span>
            </div>

            <div
              className={classNames(
                changeType === "increase"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800",
                "inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0"
              )}
            >
              {changeType === "increase" ? (
                <ArrowUpIcon
                  className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                  aria-hidden="true"
                />
              ) : (
                <ArrowDownIcon
                  className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                  aria-hidden="true"
                />
              )}
              <span className="sr-only">
                {" "}
                {changeType === "increase" ? "Increased" : "Decreased"} by{" "}
              </span>
              {changePercentage}%
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
}
