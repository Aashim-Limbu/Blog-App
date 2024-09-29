import { getUsers } from "@/db/users";
export async function UserSelectOptions({
	users,
	withAnyOption = false,
}: {
	users?: Awaited<ReturnType<typeof getUsers>>;
	withAnyOption?: boolean;
}) {
	if (users == null) users = await getUsers();

	return (
		<>
			{withAnyOption && <option value="">Any</option>}
			{users.map((user) => (
				<option key={user.id} value={user.id}>
					{user.name}
				</option>
			))}
		</>
	);
}
