import React, { useEffect, useState } from "react";

export default function SortAndFilter({
	originProducts,
	products,
	filters,
	setFilters,
	setProducts,
}) {
	const onSortingPriceChange = (e) => {
		let res = [...products];
		switch (e.target.value) {
			case "lowest":
				res.sort((a, b) =>
					a.price !== b.price ? (a.price < b.price ? -1 : 1) : 0
				);
				setProducts(res);
				break;
			case "highest":
				res.sort((a, b) =>
					a.price !== b.price ? (a.price > b.price ? -1 : 1) : 0
				);
				setProducts(res);
				break;
		}
	};
	const handleCheckboxChange = (event, index) => {
		const newFilters = [...filters];
		newFilters[index].value = event.target.checked;
		setFilters(newFilters);
		document.getElementById("orderPrice").value = "None";
	};
	useEffect(() => {
		setProducts(
			originProducts.filter((product) => {
				let check = false;
				filters.every((item) => {
					// console.log(item.value, item.name);
					if (item.value && item.name == product.shop) {
						check = true;
						return false;
					}
					return true;
				});
				return check;
			})
		);
	}, [filters]);

	return (
		<div className="w-[300px] p-7">
			<div>
				<h1>Sắp xếp</h1>
				<select
					className="select select-bordered"
					name="OrderPrice"
					id="orderPrice"
					onChange={onSortingPriceChange}
				>
					<option value="None">None</option>
					<option value="lowest">Giá thấp nhất</option>
					<option value="highest">Giá cao nhất</option>
				</select>
			</div>
			<div>
				<h1>Lọc</h1>
				{filters.map((filter, index) => (
					<label
						className="label cursor-pointer justify-start gap-1"
						key={index}
					>
						<input
							type="checkbox"
							checked={filter.value}
							onChange={(event) => handleCheckboxChange(event, index)}
							className="checkbox"
						/>
						<span className="label-text"> {filter.name}</span>
					</label>
				))}
			</div>
		</div>
	);
}
