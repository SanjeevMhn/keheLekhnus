import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const SessionProviderParent = (props: Props) => {
  return <SessionProvider>{props.children}</SessionProvider> 
}

export default SessionProviderParent;
