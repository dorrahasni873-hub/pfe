interface EntetePageProps {
  title: string;
  description: string;
  icon?: React.ComponentType<{ className?: string }>;
}

const EntetePage = ({ title, description, icon: Icon }: EntetePageProps) => {
  return (
    <div className="relative flex flex-col items-center justify-center mb-8 px-6 py-4 text-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-6 left-1/4 w-40 h-40 rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute -bottom-6 right-1/4 w-40 h-40 rounded-full bg-primary/[0.03] blur-3xl" />
      </div>

      <div className="relative flex flex-col items-center gap-1">
        {Icon && (
          <div className="mb-1 flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 ring-1 ring-primary/20">
            <Icon className="size-5 text-primary" />
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
      </div>

      <p className="mt-2 text-sm text-muted-foreground max-w-md">
        {description}
      </p>

      <div className="mt-4 h-[1px] w-28 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
};

export default EntetePage;
