import { ExclamationCircleIcon, XIcon } from "@heroicons/react/outline";
import { useState } from "react";

export default function Warning({ message }) {
  const [close, setClose] = useState(false);
  return close ? null : (
    <div className="border-l-4 border-yellow-400 bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationCircleIcon
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />{" "}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-yellow-700">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex rounded-md bg-yellow-50 p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
              onClick={() => setClose(true)}
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
