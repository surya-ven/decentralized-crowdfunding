import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../../../../components/button";
import Campaign from "../../../../ethereum/campaign";
import Table from "../../../../components/table";

const Request = ({ address, requests }) => {
  const headerItems = ["Description", "Value", "Recipient", "Completed", "Approval Count"];
  
  const router = useRouter();
  return (
		<div>
			<h1>Requests for campaign {address}</h1>
			<div className="my-10"></div>
			<Table headerItems={headerItems} items={requests} />
			<div className="my-10"></div>
			<Button styles="mx-auto my-2">
				<Link href={`${router.asPath}/new`}>
					<a>Add request</a>
				</Link>
			</Button>
		</div>
	);
};

export const getServerSideProps = async (context) => {
  const { id: address } = context.query;
  const campaign = Campaign(address);
  const requestsCount = await campaign.methods.getRequestsCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const unserializedRequests = await Promise.all(
    Array(parseInt(requestsCount))
      .fill()
      .map(async (element, index) => {
        const fullRequest = await campaign.methods.requests(index).call();
        const request = {
          description: fullRequest.description,
          value: fullRequest.value,
          recipient: fullRequest.recipient,
          isComplete: fullRequest.isComplete,
          approvalCount: `${fullRequest.approvalCount}/${approversCount}`,
        };
        return request;
      })
  );

  const requests = JSON.parse(JSON.stringify(unserializedRequests));

  console.log(requests);

  return {
    props: { address, requests },
  };
};

export default Request;
