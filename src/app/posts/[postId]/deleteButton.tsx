"use client";

import { deletePostAction } from "@/app/actions/posts";
import { useTransition } from "react";

export default function DeleteButton({ postId }: { postId: string }) {
	const [isPending, startTransition] = useTransition();
	return (
		<button
			onClick={() => {
				startTransition(async () => {
					await deletePostAction(postId);
				});
			}}
			disabled={isPending}
			className="btn btn-outline btn-danger title-btns"
		>
			{isPending ? "Deleting..." : "Delete"}
		</button>
	);
}
