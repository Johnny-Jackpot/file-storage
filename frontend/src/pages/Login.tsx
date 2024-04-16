import {
  Form,
  LoaderFunctionArgs,
  RouteObject,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";
import {authProvider} from "../auth.ts";
import {router} from "../router.tsx";

const REDIRECT_TO = 'redirectTo';
const USERNAME = 'username';

async function loader() {
  return authProvider.getUserName() ? router.navigate('/', {replace: true}) : null;
}

async function action({request}: LoaderFunctionArgs) {
  const formData = await request.formData();
  const username = formData.get(USERNAME) as string | null;
  if (!username) {
    return {
      error: "Provide username",
    }
  }

  try {
    await authProvider.signin(username);
  } catch (e) {
    return {
      error: "Invalid login attempt",
    }
  }

  const redirectUrl = formData.get(REDIRECT_TO) as string | null;
  return router.navigate(redirectUrl || '/', {replace: true});
}

function Login() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get('from') || '/';

  const navigation = useNavigation();
  const isLoggingIn = navigation.formData?.get(USERNAME) != null;
  const actionData = useActionData() as {error: string} | undefined;

  return (
    <Form method='post' replace>
      <input type='hidden' name={REDIRECT_TO} value={from}/>
      <input name={USERNAME} placeholder='Username'/>
      <button type='submit' disabled={isLoggingIn}>Login</button>
      {actionData?.error ? (<p className='error'>{actionData.error}</p>) : null}
    </Form>
  );
}

export const LOGIN_URL = '/login';

export const loginRoute: RouteObject = {
  path: LOGIN_URL,
  loader,
  action,
  Component: Login,
};
