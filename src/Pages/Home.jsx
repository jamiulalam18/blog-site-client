import {Helmet} from "react-helmet";
import Banner from "../Components/Home/Banner";
import RecentPosts from './../Components/Home/RecentPosts';
import TopContributor from './../Components/Home/TopContributor';
import NewsLetter from "../Components/Home/NewsLetter";
import LastMonth from "../Components/Home/LastMonth";
const Home = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>BlogVerse: Home</title>
            </Helmet>

            <Banner></Banner>
            <RecentPosts></RecentPosts>
            <TopContributor></TopContributor>
            <LastMonth></LastMonth>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;