const AccountHeaderLayout = ({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className='space-y-6 container'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-semibold'>{title}</h1>
        <p className='text-muted-foreground font-medium text-sm'>{subtitle}</p>
      </div>
      {children}
    </div>
  );
};

export default AccountHeaderLayout;
