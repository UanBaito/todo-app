import { ReactNode } from "react";
import "./styles/global.module.scss"

export default function App({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
