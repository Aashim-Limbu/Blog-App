import EditForm from "@/components/EditForm";
import { getPost } from "@/db/posts";
import { getUsers } from "@/db/users";
import { notFound } from "next/navigation";

async function page({ params }: { params: { postId: string } }) {
	const { postId } = params;
	const [post, users] = await Promise.all([
		getPost(postId.toString()),
		getUsers(),
	]);
	if (post == null) return notFound();
	return (
		<>
			<EditForm post={post} users={users}/>
		</>
	);
}

export default page;
