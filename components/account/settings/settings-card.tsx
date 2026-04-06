import { Card, CardContent } from '@/components/ui/card';

const SettingsCard = ({
  title,
  subtitle,
  children,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className='flex flex-col lg:flex-row gap-6'>
      <div className='space-y-1.5 lg:flex-1/3'>
        <h2 className='text-xl font-medium'>{title}</h2>
        <p className='text-xs text-muted-foreground lg:max-w-sm'>{subtitle}</p>
      </div>
      <Card className='shadow-sm border-gray-50 lg:flex-2/3 py-6'>
        <CardContent className='px-6'>{children}</CardContent>
      </Card>
    </div>
  );
};

export default SettingsCard;
