"use client";

import { SkeletonPostForm } from "@/components/PostForm";

export default function LoadingNewPage() {
	return (
		<>
			<h1 className="page-title">New Post Loading</h1>
			<SkeletonPostForm />
		</>
	);
}
