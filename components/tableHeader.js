const TableHeader = ({ keys }) => {
    console.log("keys", keys);

    return (
			<thead className="bg-gray-50">
				<tr>
					{keys.map((header) => (
						<th
							scope="col"
							className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
						>
							{header}
						</th>
					))}
					<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						APPROVE
					</th>
					<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
						FINALISE
					</th>
				</tr>
			</thead>
		);
}

export default TableHeader;
