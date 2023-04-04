import { getSession, useSession } from "next-auth/react";

function Blog({ data }) {
  const { data: session } = useSession();

  console.log(session);
  return <h1>Blog page - {data}</h1>;
}
export default Blog;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin?callbackUrl=http://localhost:3000/blog",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      data: session ? "List of 100 personalized blogs" : "List of free blogs",
    },
  };
}
