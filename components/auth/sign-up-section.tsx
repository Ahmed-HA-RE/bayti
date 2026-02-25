import SignUpForm from './sign-up-form';

const SignUp = () => {
  return (
    <div className='flex h-full flex-col items-center justify-center sm:px-5'>
      <div className='flex w-full max-w-lg flex-col gap-6 p-6'>
        <div className='space-y-4 text-center'>
          <h2 className='text-2xl font-semibold md:text-3xl lg:text-4xl'>
            Create an Account
          </h2>
          <p className='text-muted-foreground'>
            Join us to explore homes and book visits effortlessly.
          </p>
        </div>

        {/* Form */}
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
