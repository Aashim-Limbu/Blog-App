"use client";
import { FormGroup } from "./FormGroup";
import { Suspense, useTransition } from "react";
import Link from "next/link";
import { SkeletonInput } from "./Skeleton";
import { UserSelectOptions } from "@/app/posts/userSelectOptions";

import { User } from "@prisma/client";
import { createPostAction } from "@/app/actions/posts";
import { useFormState } from "react-dom";

export function PostForm({ users }: { users: User[] }) {
	const [isPending, startTransition] = useTransition();
	const [error, newCreateAction] = useFormState(createPostAction, {});
	return (
		<form
			action={(formData) => {
				startTransition(() => {
					newCreateAction(formData);
				});
			}}
			className="form"
		>
			<div className="form-row">
				<FormGroup errorMessage={error.title}>
					<label htmlFor="title">Title</label>
					<input required type="text" name="title" id="title" />
				</FormGroup>
				<FormGroup errorMessage={error.userId}>
					<label htmlFor="userId">Author</label>
					<select required name="userId" id="userId">
						<Suspense fallback={<option value="">Loading...</option>}>
							<UserSelectOptions users={users} />
						</Suspense>
					</select>
				</FormGroup>
			</div>
			<div className="form-row">
				<FormGroup errorMessage={error.body}>
					<label htmlFor="body">Body</label>
					<textarea required name="body" id="body" />
				</FormGroup>
			</div>
			<div className="form-row form-btn-row">
				<Link className="btn btn-outline" href="/posts">
					Cancel
				</Link>
				<button
					disabled={isPending}
					className={`btn ${isPending && "disabled"}`}
				>
					{isPending ? "Saving..." : "Save"}
				</button>
			</div>
		</form>
	);
}

export function SkeletonPostForm() {
	return (
		<form className="form">
			<div className="form-row">
				<FormGroup>
					<label htmlFor="title">Title</label>
					<SkeletonInput />
				</FormGroup>
				<FormGroup>
					<label htmlFor="userId">Author</label>
					<SkeletonInput />
				</FormGroup>
			</div>
			<div className="form-row">
				<FormGroup>
					<label htmlFor="body">Body</label>
					<SkeletonInput />
				</FormGroup>
			</div>
			<div className="form-row form-btn-row">
				<Link className="btn btn-outline" href="/posts">
					Cancel
				</Link>
				<button disabled className="btn">
					Save
				</button>
			</div>
		</form>
	);
}
