"use server";
import { createPost, deletePost, updatePost } from "@/db/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPostAction(prevState: unknown, formData: FormData) {
	let post;
	try {
		const [fData, errObj] = validateInput(formData);
		if (fData == undefined) return errObj;
		await wait(2000);
		post = await createPost(fData);
	} catch (error) {
		console.error("Error: ", error);
	}
	revalidatePath("posts");
	redirect(`/posts/${post?.id}`);
}
export async function deletePostAction(id: string) {
	try {
		await deletePost(id);
	} catch (error) {
		console.error("Error:", error);
	}
	revalidatePath("/posts");
	revalidatePath("/users");
	revalidatePath(`/users/${id}`);
	redirect("/posts");
}
export async function editPostAction(id: number, formData: FormData) {
	try {
		const [fData, errObj] = validateInput(formData);
		if (fData == undefined) return errObj;
		await updatePost(id, fData);
	} catch (error) {
		console.error("error: ", error);
	}
	revalidatePath("/posts");
	revalidatePath(`/posts/${id}`);
	revalidatePath(`/posts/${id}/edit`);
	redirect("/posts");
}
function wait(duration: number) {
	return new Promise((resolve) => setTimeout(resolve, duration));
}
function validateInput(formData: FormData) {
	let errObj: { title?: string; body?: string; userId?: string } = {};
	const title = formData.get("title") as string;
	const body = formData.get("body") as string;
	const userId = Number(formData.get("userId")) as number;
	let isValid = true;
	if (title == "") {
		errObj.title = "Title is not defined";
		isValid = false;
	}
	if (body == "") {
		errObj.body = "Body is not defined";
		isValid = false;
	}
	if (isNaN(userId)) {
		errObj.userId = "UserId not defined";
		isValid == false;
	}
	return [isValid ? { title, body, userId } : undefined, errObj] as const;
}
