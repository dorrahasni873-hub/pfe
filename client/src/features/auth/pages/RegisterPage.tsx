import { FormulaireInscription } from "@/features/auth/components/RegisterForm"

const PageInscription = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <FormulaireInscription />
      </div>
    </div>
  )
}

export default PageInscription
