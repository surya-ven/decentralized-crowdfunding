import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import Loading from "./loading";

const NewRequestForm = () => {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [error, setError] = useState({
    message: {
      metamask: "",
      description: "",
      value: "",
      recipient: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    resetError("description");
  }, [description]);

  useEffect(() => {
    resetError("recipient");
  }, [recipient]);

  useEffect(() => {
    resetError("value");
  }, [value]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      resetErrors();
      if (!value || value <= 0) throw new Error("Please enter a valid amount");
      if (description.length === 0)
        throw new Error("Please enter a valid description");
      if (!web3.utils.isAddress(recipient))
        throw new Error("Please enter a valid recipient");
      const accounts = await web3.eth.getAccounts();
      setLoading(true);
      const campaign = Campaign(router.query.id);
      const wei = web3.utils.toWei(value.toString(), "ether");
      await campaign.methods
        .createRequest(description, wei, recipient)
        .send({ from: accounts[0] });
      resetForm();
      setLoading(false);
      router.replace(router.asPath);
    } catch (err) {
      setLoading(false);
      if (err.code === 4001) {
        setError({
          ...error,
          message: {
            ...error.message,
            metamask: "Transaction was rejected, please try again.",
          },
        });
      } else if (err.message.includes("valid description")) {
        setError({
          ...error,
          message: {
            ...error.message,
            description: "Please enter a valid description",
          },
        });
      } else if (err.message.includes("valid amount")) {
        setError({
          ...error,
          message: {
            ...error.message,
            value: "Please enter a valid amount",
          },
        });
      } else if (err.message.includes("valid recipient")) {
        setError({
          ...error,
          message: {
            ...error.message,
            recipient: "Please enter a valid recipient",
          },
        });
      }
      console.log("Error here", err);
    }
  };

  const resetErrors = () => {
    setError({
      message: {
        metamask: "",
        description: "",
        value: "",
        recipient: "",
      },
    });
  };

  const resetError = (err) => {
    const errorObj = error;
    errorObj.message[err] = "";
    setError(errorObj);
  };

  const resetForm = () => {
    setDescription("");
    setValue(null);
    setRecipient("");
  };

  return (
    <>
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              {!loading && (
                <div className="mb-3">
                  <a
                    onClick={() => router.back()}
                    className="text-blue-500 px-4 sm:px-0 cursor-pointer"
                  >
                    Back
                  </a>
                </div>
              )}
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Create a request
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Enter the details below and press "Create" to create a new
                request.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            {!loading ? (
              <form onSubmit={onSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="col-span-1">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Description
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Enter a description"
                            value={`${description}`}
                            onChange={(e) => setDescription(e.target.value)}
                            className={`focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 ${
                              error.message.description && "border-red-500"
                            }`}
                          />
                        </div>
                        {error.message.description && (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {error.message.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="col-span-1">
                        <label
                          htmlFor="value"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Value in Ether
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="number"
                            name="value"
                            id="value"
                            placeholder="0"
                            value={`${value || "0"}`}
                            onChange={(e) => setValue(e.target.value)}
                            className={`focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 ${
                              error.message.value && "border-red-500"
                            }`}
                          />
                          <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            Ether
                          </span>
                        </div>
                        {error.message.value && (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {error.message.value}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="col-span-1">
                        <label
                          htmlFor="recipient"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Recipient
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="recipient"
                            id="recipient"
                            placeholder="Enter an address"
                            value={`${recipient}`}
                            onChange={(e) => setRecipient(e.target.value)}
                            className={`focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 ${
                              !error.metamaskError &&
                              error.message.recipient &&
                              "border-red-500"
                            }`}
                          />
                        </div>
                        {error.message.recipient && (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {error.message.recipient}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    {error.message.metamask && (
                      <span className="flex items-center justify-center font-medium tracking-wide text-red-500 text-xs my-1">
                        {error.message.metamask}
                      </span>
                    )}
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <Loading text="Processing..." />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewRequestForm;
