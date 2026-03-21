import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const CardFormStepsLayout = ({
  step,
  title,
  children,
}: {
  step: number;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Card className='py-4'>
      <CardHeader className='flex items-center gap-2.5 pb-4 border-b'>
        <span className='size-6.5 flex items-center justify-center bg-orange-50 text-accent text-sm rounded-full'>
          {step}
        </span>
        <CardTitle className='text-lg font-semibold'>{title}</CardTitle>
      </CardHeader>
      <CardContent className='pt-4'>{children}</CardContent>
    </Card>
  );
};

export default CardFormStepsLayout;
