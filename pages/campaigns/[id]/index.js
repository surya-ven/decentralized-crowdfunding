import Link from "next/link";
import { useRouter } from "next/router";
import Campaign from "../../../ethereum/campaign";
import Card from "../../../components/card";
import Button from "../../../components/button";
import ContributeForm from "../../../components/contributeForm";

const CampaignDetails = ({
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
}) => {
  const cards = [
    {
      title: "Address of Manager",
      details: manager,
      description: "The manager of the campaign.",
    },
    {
      title: "Minimum Contribution",
      details: `${minimumContribution} Wei`,
      description:
        "The minimum amount you must contribute to a campaign to become an approver.",
    },
    {
      title: "Balance",
      details: `${balance} Wei`,
      description: "The balance of the campaign.",
    },
    {
      title: "Requests",
      details: requestsCount,
      description:
        "The number of requests made to withdraw money by the campaign manager.",
    },
    {
      title: "Contributors",
      details: approversCount,
      description:
        "The number of people who have already donated to the campaign.",
    },
  ];
  const router = useRouter();

  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap my-8 mx-5">
        <div className="max-w-3xl grid gap-4 grid-cols-1 sm:grid-cols-2 justify-center align-center">
          {cards.map((card, key) => (
            <Card
              title={card.title}
              details={card.details}
              description={card.description}
              key={key}
            />
          ))}
          <Link href={`${router.asPath}/requests`}>
            <a>
              <Button text="Requests" styles="m-16" />
            </a>
          </Link>
        </div>
        <div className="my-10 md:my-0 md:ml-10">
          <ContributeForm minimumContribution={minimumContribution} />
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { id: address } = context.query;
  const campaign = Campaign(address);

  const summary = await campaign.methods.getSummary().call();

  return {
    props: {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    },
  };
};

export default CampaignDetails;
