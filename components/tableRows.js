import { useState } from "react";
import { useRouter } from "next/router";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import Loading from "./loading";

const TableRows = ({ rows }) => {
	const [loadingRequests, setLoadingRequests] = useState({});
	const router = useRouter();

	const getCampaign = async (index, type) => {
		setLoadingRequests({ ...loadingRequests, [index]: type });
		const accounts = await web3.eth.getAccounts();
		const { id } = router.query;
		const campaign = Campaign(id);
		return { campaign, accounts };
	};

	const exit = async (index) => {
		const newLoadingRequests = { ...loadingRequests };
		delete newLoadingRequests[index];
		setLoadingRequests(newLoadingRequests);
		router.replace(router.asPath);
	};

	const approve = async (index) => {
		try {
			const { campaign, accounts } = await getCampaign(index, "approve");
			await campaign.methods.approveRequest(index).send({ from: accounts[0] });
			exit(index);
		} catch (err) {
			exit(index);
			console.log(err);
		}
	};

	const finalise = async (index) => {
		try {
			const { campaign, accounts } = await getCampaign(index, "finalise");
			await campaign.methods.finalizeRequest(index).send({ from: accounts[0] });
			exit(index);
		} catch (err) {
			exit(index);
			console.log(err);
		}
	};

	return (
		<tbody className="bg-white divide-y divide-gray-200">
			{rows.map((items, key) => (
				<tr key={key}>
					{Object.values(items).map((item, key) => (
						<td
							key={key}
							className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
						>
							{item.toString()}
						</td>
					))}
					{loadingRequests[key] === undefined ? (
						<>
							<td className="px-6 py-4 whitespace-nowrap text-sm">
								<a
									onClick={() => approve(key)}
									className="border border-red-200 rounded-md py-2 px-5 flex items-center justify-center font-medium hover:bg-red-700 text-red-700 hover:text-red-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
								>
									Approve
								</a>
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm">
								<a
									onClick={() => finalise(key)}
									className="border border-green-200 rounded-md py-2 px-5 flex items-center justify-center font-medium hover:bg-green-700 text-green-700 hover:text-green-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
								>
									Finalise
								</a>
							</td>
						</>
					) : (
						<>
							<td className="px-6 py-4 col-span-2 whitespace-wrap text-sm">
								{loadingRequests[key] === "approve" && (
									<Loading text="Processing..." />
								)}
							</td>
							<td className="px-6 py-4 col-span-2 whitespace-wrap text-sm">
								{loadingRequests[key] === "finalise" && (
									<Loading text="Processing..." />
								)}
							</td>
						</>
					)}
				</tr>
			))}
		</tbody>
	);
};
export default TableRows;
