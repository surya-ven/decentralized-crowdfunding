import { useEffect } from "react";
import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/outline";
import campaignFactory from "../ethereum/campaignFactory";
import FullWidthCard from "../components/fullWidthCard";
import Button from "../components/button";


const Index = ({ campaigns }) => {
  useEffect(() => {
    console.log(campaigns);
  }, []);

  return (
    <>
      <p className="text-2xl font-bold mb-2 text-gray-800">Open Campaigns</p>
      <div>
        <Link href="/campaigns/new">
          <a>
            <Button styles="mx-auto my-2">
              <PlusCircleIcon className="block h-6 w-6" />
              <p className="ml-2">Create Campaign</p>
            </Button>
          </a>
        </Link>
        {campaigns.map((campaign, key) => (
          <FullWidthCard address={campaign} action={"View campaign"} href={`/campaigns/${campaign}`} key={key} />
        ))}
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const campaigns = await campaignFactory.methods.getDeployedCampaigns().call();

  return {
    props: { campaigns }, // will be passed to the page component as props
  };
}

export default Index;
