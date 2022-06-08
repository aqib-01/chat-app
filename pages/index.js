import Head from "next/head";

import ChatRoom from "../components/ChatRoom";
export default function Home() {
  return (
    <>
      <Head>
        <title> Chat Room</title>
      </Head>
      <ChatRoom />
    </>
  );
}
