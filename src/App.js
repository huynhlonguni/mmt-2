// import logo from './logo.svg';
import "./App.css";
import React, { useState } from "react";
import ChatBot from "./component/ChatBot/index";
import Spinner from "./component/Spinner";
import { useEffect } from "react";
import agent from "./agent";
import ThinkProCrawler from "./stuff/thinkpro";
import GearVNCrawler from "./stuff/gearvn";
import AnPhatCrawler from "./stuff/anphat";
import HoangHaMobileCrawler from "./stuff/hoanghamobile";
import PhucAnhCrawler from "./stuff/phucanh";
import HacomCrawler from "./stuff/hacom";
import Card from "./component/card";
import SearchIcon from "./icons/SearchIcon";
import { themeChange } from "theme-change";
import FakeData from "./fakedata";
import SortAndFilter from "./component/SortAndFilter";
function App() {
	useEffect(() => {
		themeChange(false);
	}, []);

	const [products, setProducts] = useState([]);
	const [originProducts, setOriginProducts] = useState([]);
	// const crawlerNames = [
	// 	"An Phát",
	// 	"GearVN",
	// 	"HACOM",
	// 	"Hoàng Hà Mobile",
	// 	"Phúc Anh",
	// 	"ThinkPro",
	// ];
	// const crawlers = [
	// 	new AnPhatCrawler(),
	// 	new GearVNCrawler(),
	// 	new HacomCrawler(),
	// 	new HoangHaMobileCrawler(),
	// 	new PhucAnhCrawler(),
	// 	new ThinkProCrawler(),
	// ];

	const [filters, setFilters] = useState([
		{ name: "An Phát", value: true, crawler: new AnPhatCrawler() },
		{ name: "GearVN", value: true, crawler: new GearVNCrawler() },
		{ name: "HACOM", value: true, crawler: new HacomCrawler() },
		{
			name: "Hoàng Hà Mobile",
			value: true,
			crawler: new HoangHaMobileCrawler(),
		},
		{ name: "Phúc Anh", value: true, crawler: new PhucAnhCrawler() },
		{ name: "ThinkPro", value: true, crawler: new ThinkProCrawler() },
	]);
	const [isSearching, setIsSearching] = useState(false);
	const onSubmit = async (e) => {
		setIsSearching(true);
		setProducts([]);
		e.preventDefault();
		let query = document.getElementById("search").value;
		let arr = [];
		for (const item of filters) {
			if (item.value) {
				const res = await item.crawler.search(query);
				arr = [...arr, ...res];
				setOriginProducts(arr);
				setProducts(arr);
			}
		}
		setIsSearching(false);
		// setOriginProducts(FakeData());
		// setProducts(FakeData());
	};

	return (
		<div className="">
			<div className="flex items-center lg:select-none justify-between">
				<div>
					<h1 className="py-5 px-10 text-2xl font-bold bg-gradient-to-r inline-block from-green-500 to-blue-500 bg-clip-text text-transparent">
						3ChangDev
					</h1>
				</div>
				<div className="dropdown mx-5">
					<label tabIndex={0} className="btn m-1">
						Theme
					</label>
					<ul
						tabIndex={0}
						className="dropdown-content menu p-2 shadow bg-base-100 rounded-box"
					>
						<li>
							<button data-set-theme="dark" data-act-class="ACTIVECLASS">
								Tối
							</button>{" "}
						</li>
						<li>
							<button data-set-theme="light" data-act-class="ACTIVECLASS">
								Sáng
							</button>{" "}
						</li>
					</ul>
				</div>
			</div>

			<div className="flex justify-center">
				<form
					onSubmit={(e) => onSubmit(e)}
					className="w-full my-4 mx-10 drop-shadow-lg"
				>
					<div className="form-control">
						<div className="input-group">
							<input
								type="text"
								id="search"
								placeholder="Tìm kiếm..."
								className="input w-full input-bordered"
							/>
							<button className="btn btn-square">
								<SearchIcon className="w-6 h-6" />
							</button>
						</div>
					</div>
				</form>
			</div>
			<div className="flex  md:flex-row flex-col  min-h-screen">
				<SortAndFilter
					products={products}
					originProducts={originProducts}
					setProducts={setProducts}
					filters={filters}
					setFilters={setFilters}
				/>
				<div className="shadow-[0_60px_60px_-15px_rgba(0,0,0,0.3)] flex-1 ">
					<div className="divider flex ">
						{Object.keys(products).length} products
						{isSearching && <Spinner />}
					</div>
					<div className="flex items-center justify-center flex-wrap">
						{products.map((product) => (
							<Card product={product} />
						))}
					</div>
				</div>
			</div>
			<ChatBot />
		</div>
	);
}

export default App;
