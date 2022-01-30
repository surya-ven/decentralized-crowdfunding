import { useState } from "react";
import { useRouter } from "next/router";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import Loading from "./loading";

const ContributeForm = ({ minimumContribution }) => {
  const [contributionAmount, setContributionAmount] = useState(null);
  const [error, setError] = useState({
    metamaskError: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      resetError();
      if (contributionAmount <= minimumContribution)
        throw new Error("Please enter a value higher than the minimum contribution amount");
      const accounts = await web3.eth.getAccounts();
      setLoading(true);
      const campaign = Campaign(router.query.id);
      await campaign.methods
        .contribute()
        .send({ from: accounts[0], value: contributionAmount });
      setLoading(false);
      setContributionAmount(null);
      router.replace(router.asPath);
    } catch (err) {
      setLoading(false);
      if (err.code === 4001) {
        setError({
          metamaskError: true,
          message: "Transaction was rejected, please try again.",
        });
      } else {
        setError({ ...error, message: err.message });
      }
      console.log("Error here", err);
    }
  };

  const resetError = () => {
    setError({ metamaskError: false, message: "" });
  };

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Contribute
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Enter the amount you want to contribute in Wei and click
                "Contribute".
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            {!loading ? (
              <form onSubmit={onSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-1">
                      <div className="col-span-1">
                        <label
                          htmlFor="contribution"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Contribution Amount
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="number"
                            name="contribution"
                            id="contribution"
                            placeholder={`${minimumContribution}`}
                            value={`${contributionAmount}`}
                            onChange={(e) =>
                              setContributionAmount(parseInt(e.target.value))
                            }
                            className={`focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300 ${
                              !error.metamaskError &&
                              error.message &&
                              "border-red-500"
                            }`}
                          />
                          <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                            Wei
                          </span>
                        </div>
                        {error.message && (
                          <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            {error.message}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Contribute
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

export default ContributeForm;
