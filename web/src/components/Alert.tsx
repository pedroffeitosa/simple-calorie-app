import { ExclamationCircleIcon, XIcon } from "@heroicons/react/outline";

interface AlertProps {
  message: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Alert({ message, open, setOpen }: AlertProps) {
  return open ? (
    <div className="border-l-4 border-red-400 bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-400"
            aria-hidden="true"
          />{" "}
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-red-700">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
              onClick={() => setOpen(false)}
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
