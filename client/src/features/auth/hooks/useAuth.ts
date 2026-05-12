import { AuthentificationContext } from "@/features/auth/store/authContext"
import { useContext } from "react"

export const useAuthentification = () => {
  const context = useContext(AuthentificationContext)

  if (!context) {
    throw new Error("useAuthentification must be used within an AuthentificationProvider")
  }

  return context
}
