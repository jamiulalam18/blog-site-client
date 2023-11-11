import { Helmet } from "react-helmet";
import SIgnUpForm from "../Components/UserManagement/SIgnUpForm";
import SocialLogin from "../Components/UserManagement/SocialLogin";

const SignUpPage = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>BlogVerse: Sign Up</title>
            </Helmet>
            <div className="max-w-screen-xl mx-auto pt-28 flex flex-col items-center justify-center">
                <SocialLogin></SocialLogin>
                <SIgnUpForm></SIgnUpForm>
            </div>
        </div>
    );
};

export default SignUpPage;