import { Separator } from '../ui/separator';

const AdminFormLayout = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => {
  return (
    <div className='space-y-8'>
      <div>
        <h1 className='text-2xl font-bold mb-1.5'>{title}</h1>
        <p className='text-muted-foreground text-sm'>{subtitle}</p>
      </div>
      <Separator />

      {children}
    </div>
  );
};

export default AdminFormLayout;
