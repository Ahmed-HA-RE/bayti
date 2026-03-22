import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const CardFormStepsLayout = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Card className='py-4'>
      <CardHeader className='flex items-center gap-2.5 pb-4 border-b'>
        <span className='size-8.5 flex items-center justify-center bg-orange-50 text-accent text-sm rounded-full'>
          {icon}
        </span>
        <CardTitle className='text-lg font-semibold'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='pt-4 space-y-4'>{children}</CardContent>
    </Card>
  );
};

export default CardFormStepsLayout;
