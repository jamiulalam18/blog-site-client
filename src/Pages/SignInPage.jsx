import { Helmet } from "react-helmet";
import SocialLogin from "../Components/UserManagement/SocialLogin";
import SignInForms from "../Components/UserManagement/SignInForms";

const SignInPage = () => {
    return (
        <div className="max-w-screen-xl mx-auto pt-28 flex flex-col items-center justify-center">
            <Helmet>
                <meta charSet="utf-8" />
                <title>BlogVerse: Sign In</title>
            </Helmet>
            <SocialLogin></SocialLogin>
            <SignInForms></SignInForms>
        </div>
    );
};

export default SignInPage;