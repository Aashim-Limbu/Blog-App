import React, { Suspense } from "react";
import { FormGroup } from "./FormGroup";
import { UserSelectOptions } from "@/app/posts/userSelectOptions";
import Link from "next/link";
import { Post, User } from "@prisma/client";
import { editPostAction } from "@/app/actions/posts";


function EditForm({ post, users }: { post: Post; users: User[] }) {
	const { userId, title, body, id } = post;
	const editPostwithId = editPostAction.bind(null, id);
	return (
		<form action={editPostwithId} className="form">
			<div className="form-row">
				<FormGroup>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						required
						id="title"
						defaultValue={title}
					/>
				</FormGroup>
				<FormGroup>
					<label htmlFor="userId">Author</label>
					<select name="userId" id="userId" required defaultValue={userId}>
						<Suspense fallback={<option value="">Loading...</option>}>
							<UserSelectOptions users={users} />
						</Suspense>
					</select>
				</FormGroup>
			</div>
			<div className="form-row">
				<FormGroup>
					<label htmlFor="body">Body</label>
					<textarea name="body" required defaultValue={body} id="body" />
				</FormGroup>
			</div>
			<div className="form-row form-btn-row">
				<Link
					className="btn btn-outline"
					href={post ? `/posts/${post.id}` : "/posts"}
				>
					Cancel
				</Link>
				<button className="btn">Save</button>
			</div>
		</form>
	);
}

export default EditForm;
