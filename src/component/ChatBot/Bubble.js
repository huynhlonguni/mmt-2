import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import SpeakerIcon from "../../icons/SpeakerIcon.js";
import CopyIcon from "../../icons/CopyIcon.js";

export default function Bubble(props) {
	// const removeMd = require("remove-markdown");
	// function onSpeak(message) {
	// 	alert(removeMd(message));
	// }
	function copyCode(code) {
		alert(code);
	}
	var chatClass = "chat";
	var bubbleClass = "chat-bubble whitespace-pre-wrap group-one";
	if (props.type === "user") {
		chatClass += " chat-end";
		bubbleClass += " bg-green-600 text-white";
	} else if (props.type === "assistant" || props.type === "error") {
		chatClass += " chat-start";
		bubbleClass += " w-auto relative";
		if (props.type === "error") {
			bubbleClass += " bg-red-400 dark:bg-red-500 text-white";
		} else if (props.type === "assistant") {
			bubbleClass +=
				" bg-white text-black dark:bg-neutral-800 dark:text-white ";
		}
	}
	return (
		<div className={chatClass}>
			<div className={bubbleClass}>
				{props.type !== "assistant" ? (
					props.message
				) : (
					<ReactMarkdown
						className="w-full"
						children={props.message}
						components={{
							code({ node, inline, className, children, ...props }) {
								const match = /language-(\w+)/.exec(className || "");
								return (
									<div className="relative group-two">
										<SyntaxHighlighter
											children={String(children).replace(/\n$/, "")}
											style={oneDark}
											wrapLines={true}
											language={match ? match[1] : ""}
											codeTagProps={{
												style: {
													display: "inline-block",
													paddingRight: "16px",
												},
											}}
											{...props}
										/>
										<div
											className="dark:bg-zinc-700 transition-opacity ease-in-out bg-white bg-opacity-60 py-1 px-3 rounded-md cursor-pointer -top-2 -right-2 opacity-0 group-two-hover:opacity-100 absolute drop-shadow-lg backdrop-blur-md z-[5]"
											onClick={() => copyCode(children)}
										>
											<CopyIcon className="fill-zinc-600 dark:fill-white h-4 w-4" />
										</div>
									</div>
								);
							},
						}}
					/>
				)}
				{/* {props.message !== '...' && props.type === "assistant" ?
				<div className='dark:bg-zinc-700 transition-opacity ease-in-out bg-white bg-opacity-60 py-1 px-3 rounded-md cursor-pointer -bottom-3 -right-2 opacity-0 group-one-hover:opacity-100 absolute drop-shadow-lg backdrop-blur-md z-[5]'
					onClick={() => onSpeak(props.message)}>
					<SpeakerIcon className="fill-zinc-600 dark:fill-white h-4 w-4"/>
				</div>
				: null
			} */}
			</div>
		</div>
	);
}
