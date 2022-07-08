import { Navigate, useRoutes } from 'react-router-dom';
import Page404 from '../pages/Page404';
import Page500 from '../pages/Page500';
import ChangePassword from '../pages/ChangePassword';
import ForgotPassword from '../pages/ForgotPassword';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Pricing from '../pages/Pricing';
import Notifications from '../pages/Notifications';
import Settings from '../pages/Settings';
import Investigation from '../pages/Investigation';
import TwoStepVerification from '../pages/TwoStepVerification';
import PaymentCancel from '../pages/Pricing/PaymentCancel';
import PaymentSuccess from '../pages/Pricing/PaymentSuccess';
import ForgotPasswordLinkSentSuccessfully from '../pages/ForgotPasswordLinkSentSuccessfully';
import PasswordChangedSuccessfully from '../pages/PasswordChangedSuccessfully';


export default function Router() {
  return useRoutes([
    { path: '/', element: <Landing /> },

    { path: 'dashboard', element: <Dashboard /> },
    { path: 'pricing', element: <Pricing /> },
    { path: 'plan/success', element: <PaymentSuccess /> },
    { path: 'plan/cancel', element: <PaymentCancel /> },
    { path: 'notifications', element: <Notifications /> },
    { path: 'settings', element: <Settings /> },
    { path: 'investigation/:id/:number/:address/:chain', element: <Investigation /> },


    { path: 'login', element: <Login /> },
    { path: '2-step-verification/:email', element: <TwoStepVerification /> },
    { path: 'signup', element: <Signup /> },
    { path: 'forgot-password', element: <ForgotPassword /> },
    { path: 'forgot-password-link-sent-successfully', element: <ForgotPasswordLinkSentSuccessfully /> },

    { path: 'change-password/:resetPasswordToken', element: <ChangePassword /> },
    { path: 'password-changed-successfully', element: <PasswordChangedSuccessfully /> },
    { path: '404', element: <Page404 /> },
    { path: '500', element: <Page500 /> },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}