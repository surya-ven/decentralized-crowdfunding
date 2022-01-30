import TableHeader from "./tableHeader";
import TableRows from "./tableRows";

const Table = ({ headerItems, items }) => {
  const hasItems = items && items.length > 0;
  if (hasItems) {
    const columnCount = Object.keys(items[0]).length;
    if (headerItems.length !== columnCount)
      throw new Error(
        "Header items and table items must have the same number of columns"
      );
  }
  
  console.log("headerItems", headerItems);

  return (
		<div className="flex flex-col">
			<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table className="min-w-full divide-y divide-gray-200">
							<TableHeader keys={headerItems} />
							{hasItems ? <TableRows rows={items} /> : <div className="px-5 m-5">No items</div>}
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Table;
