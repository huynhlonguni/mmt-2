export default function Card(props) {
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	const product = props.product;
	return (
		<a href={product.url} className="m-2 md:m-4">
			<div className="card card-compact card-bordered w-36 md:w-44 bg-base-200 dark:bg-base-300 shadow-xl">
				<img
					src={product.image_url}
					className="bg-white w-44 h-44 object-contain"
				/>
				<div className="card-body tooltip">
					<div className="card-title text-base text-overflow h-[70px] text-left">
						{product.name}
						<span className="tooltiptext">{product.name}</span>
					</div>
					<div className="text-right">
						<u>{numberWithCommas(product.price)}</u>{" "}
					</div>
					<div className="badge badge-primary py-3 px-2 w-full text-[11px] md:text-sm">
						{product.shop}
					</div>
				</div>
			</div>
		</a>
	);
}
