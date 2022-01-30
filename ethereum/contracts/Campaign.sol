// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public {
        deployedCampaigns.push(address(new Campaign(minimum, msg.sender)));
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool isComplete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }
    
    address payable public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;
    Request[] public requests;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    modifier approver() {
        require(approvers[msg.sender]);
        _;
    }

    constructor(uint minimum, address managerAddress) {
        manager = payable(managerAddress);
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string calldata description, uint value, address payable recipient) 
                public restricted {
        // requests.push(Request({
        //     description: description,
        //     value: value,
        //     recipient: recipient,
        //     isComplete: false,
        //     approvalCount: 0
        // }));
        Request storage request = requests.push();
        request.description = description;
        request.value = value;
        request.recipient = recipient;
        request.isComplete = false;
        request.approvalCount = 0;
    }

    function approveRequest(uint index) public approver {
        Request storage request = requests[index];

        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        require(!request.isComplete);
        require(request.approvalCount > (approversCount / 2));

        request.recipient.transfer(request.value);

        request.isComplete = true;
    }

    function getSummary() public view returns (
        uint, uint, uint, uint, address payable
    ) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}