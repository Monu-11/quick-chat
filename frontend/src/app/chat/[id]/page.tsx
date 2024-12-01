import ChatContainer from "@/components/Chats"

const page = ({params}: {params: {id: string}}) => {
  return (
    <>
    <ChatContainer id={params.id} />
    </>
  )
}

export default page