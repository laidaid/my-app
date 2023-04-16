import { emailValidator } from './EmailField';
import { motion, AnimatePresence } from 'framer-motion';
import { passwordValidator } from './PasswordField';
import { useAuth } from '@/components/Firebase';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FullPageLoader from '@/components/FullPageLoader';
import Link from 'next/link';
import PreviewAccounts from './PreviewAccounts';
import SignInForm from './SignInForm';

const SignInApp = (props) => {
  const [data, setData] = useState();
  const [errors, setErrors] = useState();
  const [isReady, setIsReady] = useState(false);
  const { user, isLoading, signInApp } = useAuth();
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
  }, [router]);

  useEffect(() => {
    setIsReady(false);
    if (user) {
      router.push('/');
    } else {
      if (!isLoading) {
        setIsReady(true);
      }
    }
  }, [user]);

  const handleSignIn = async (_, value) => {
    const { email, password } = value;
    const emailMsg = emailValidator(email);
    const passwordMsg = passwordValidator(password);

    if (emailMsg || passwordMsg) {
      setErrors({
        email: emailMsg,
        password: passwordMsg,
      });
      return;
    }

    try {
      await signInApp(value);
    } catch (error) {
      switch (error?.code) {
        case 'auth/wrong-password':
          setErrors({
            password: 'Wrong password!',
          });
          break;

        case 'auth/user-not-found':
          setErrors({
            email: 'Email not found!',
          });
          break;

        default:
          setErrors({
            password: 'Check password again!',
            email: 'Check email again!',
          });
          break;
      }
    }
  };

  return (
    <AnimatePresence>
      {isReady ? (
        <div className="bg-primary-focus">
          <div className="container mx-auto">
            <div className="flex justify-center items-center min-h-[var(--window-height)]">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.5,
                  borderRadius: '100px',
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  borderRadius: 0,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                className="w-full max-w-lg min-h-[var(--window-height)] md:min-h-fit md:shadow-lg md:!rounded-xl bg-white"
              >
                <div className="artboard artboard-horizontal px-6 md:px-12 py-8 space-y-6">
                  <h1 className="text-5xl font-bold flex items-center space-x-3 select-none mt-3">
                    <Link href="/" className="group ">
                      <span className="relative text-primary font-semibold">
                        Hi!
                        <span className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-500 ease-out group-hover:w-0 w-full"></span>
                      </span>{' '}
                      there.
                    </Link>
                    <img
                      src="/logo.png"
                      className="w-10 h-10 pointer-events-none animate-bounce"
                    />{' '}
                  </h1>
                  <PreviewAccounts
                    disabled={isLoading}
                    onClick={(value) => {
                      if (value?.isActive) {
                        setData({
                          email: '',
                          password: '',
                        });
                      } else {
                        setData({
                          email: value.email || '',
                          password: value.password || '',
                        });
                      }
                    }}
                  />
                  <SignInForm
                    initialValues={data}
                    onSubmit={handleSignIn}
                    disabled={isLoading}
                    errors={errors}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        <FullPageLoader />
      )}
    </AnimatePresence>
  );
};

export default SignInApp;
