export async function fetchPosts(
    query: string,
    timelyQuery: string,
    after?: string
) {
    query = query.toLowerCase();
    const isUserQuery = query.startsWith("user");

    const response = await fetch(
        `https://api.reddit.com/${query}/${
            isUserQuery ? "submitted" : "top"
        }?limit=5&t=${timelyQuery}&after=${after}&sort=top`,
        { method: "GET", redirect: "follow" }
    );

    if (response.status !== 200) return [];

    const data = (await response.json())?.data;
    return data?.children?.map((child: any) => child?.data);
}
