import Bubble from "./Bubble";
import { useState, memo, useEffect, useContext } from "react";
import agent from "../../agent";
import SendIcon from "../../icons/SendIcon";
// import DarkToggle from "../DarkToggle";
import CloseIcon from "../../icons/CloseIcon";
import ChevronUpIcon from "../../icons/ChevronUpIcon";

function ChatBot() {
	const [isShowUp, setIsShowUp] = useState(true);

	const [conversation, setConversation] = useState({
		messages: [],
	});
	const [status, setStatus] = useState("idle");
	const [input, setInput] = useState("");
	useEffect(() => {
		let numberOfLineBreaks = (input.match(/\n/g) || []).length;
		document.getElementById("textInput").rows = Math.min(
			numberOfLineBreaks + 1,
			5
		);
	}, [input]);

	const onInputChange = (event) => {
		setInput(event.target.value);
	};

	const onEnterPress = (e) => {
		if (e.keyCode == 13 && e.shiftKey == false) {
			e.preventDefault();
			const newEvent = new Event("submit", { cancelable: true });
			onSubmit(newEvent);
		}
	};

	const onSubmit = async (e) => {
		if (input !== "" && input != undefined && input != {}) {
			try {
				setStatus("loading");

				e.preventDefault();
				let newArr = { ...conversation };
				newArr.messages.push({ role: "user", content: input });
				setConversation(newArr);
				setInput("");
				const response = await agent.ChatBot.sendMessage(conversation.messages);
				newArr.messages.push(response);
				setConversation(newArr);

				setStatus("success");
			} catch (e) {
				console.log(e);
				setStatus("failed");
			}
		}
	};
	useEffect(() => {
		var objDiv = document.getElementById("messages");
		objDiv.scrollTop = objDiv.scrollHeight;
	}, [conversation]);
	return (
		<div
			className={`flex flex-col max-w-[350px] fixed bottom-0 right-3 md:right-16 rounded-t-lg 
			overflow-hidden text-sm shadow-xl bg-slate-200 dark:bg-zinc-950 `}
		>
			<div className="flex justify-between py-2 px-4 bg-green-600">
				<div className="text-white">Trợ lý</div>
				<button
					onClick={() => {
						setIsShowUp(!isShowUp);
					}}
					className="text-white pl-2"
				>
					{isShowUp ? <CloseIcon /> : <ChevronUpIcon />}
				</button>
			</div>
			{isShowUp && (
				<div
					id="messages"
					className={`ml-2 lg:mx-6 max-h-[400px] overflow-y-auto no-scrollbar py-4 ${
						isShowUp && "h-[400px]"
					}`}
				>
					<Bubble
						type="assistant"
						message={
							"Hi! Tôi là tên là GPT, tôi có thể tư vấn các loại Laptop cho bạn"
						}
					/>
					{conversation &&
						conversation.messages.map((message, i) =>
							message.role === "error" ? (
								<Bubble type={message.role} message={"Lỗi"} key={i} />
							) : (
								<Bubble type={message.role} message={message.content} key={i} />
							)
						)}
					{status === "loading" && <Bubble type="assistant" message="..." />}
				</div>
			)}
			{isShowUp && (
				<div className="w-full shadow-[0_0_60px_-15px_rgba(0,0,0,0.3)] ">
					<form onSubmit={onSubmit}>
						<div className=" flex bg-white dark:bg-zinc-750 bg-opacity-80 dark:bg-opacity-60 backdrop-blur-xl drop-shadow-xl">
							<textarea
								id="textInput"
								autoComplete="off"
								className="flex-1 resize-none m-0 w-full p-2 text-base outline-none bg-transparent text-black dark:text-white min-h-[50px]"
								type="text"
								placeholder="Ví dụ: Gợi ý Laptop giá sinh viên IT"
								value={input}
								onChange={onInputChange}
								rows="1"
								onKeyDown={onEnterPress}
							/>
							<button className="" type="submit">
								<div className="h-8 w-8">
									<SendIcon className="fill-zinc-600 dark:fill-white" />
								</div>
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	);
}

export default ChatBot;
