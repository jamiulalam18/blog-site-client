import {Helmet} from "react-helmet";
import Banner from "../Components/Home/Banner";
import RecentPosts from './../Components/Home/RecentPosts';
const Home = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>BlogVerse: Home</title>
            </Helmet>

            <Banner></Banner>
            <RecentPosts></RecentPosts>
        </div>
    );
};

export default Home;