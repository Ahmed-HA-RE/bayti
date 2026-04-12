import SignUpForm from './sign-up-form';
import { Separator } from '../ui/separator';
import SocialAuthButtons from '../shared/social-auth-buttons';

const SignUp = ({ callbackUrl }: { callbackUrl: string }) => {
  return (
    <div className='flex h-full flex-col items-center justify-center sm:px-5'>
      <div className='flex w-full max-w-lg flex-col gap-6 p-6'>
        <div className='space-y-4 text-center'>
          <h2 className='text-3xl font-semibold lg:text-4xl'>
            Create an Account
          </h2>
          <p className='text-muted-foreground'>
            Join us to explore homes and book visits effortlessly.
          </p>
        </div>
        {/* Social Sign Up */}
        <SocialAuthButtons isLogin={false} callbackUrl={callbackUrl} />

        <div className='flex items-center gap-4'>
          <Separator className='flex-1' />
          <p className='text-muted-foreground'>or continue with</p>
          <Separator className='flex-1' />
        </div>

        {/* Form */}
        <SignUpForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
};

export default SignUp;
