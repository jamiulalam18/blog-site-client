import { Button, Checkbox, Label, TextInput, FileInput } from "flowbite-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import { auth } from "../../Configs/FirebaseConfig";
import { AuthContext } from "../../Provider/AuthProvider";
import { successToast } from "../../Toasts/SuccessToast";
import { errorToast } from "../../Toasts/ErrorToast";
import axios from "axios";
const SIgnUpForm = () => {
  const { createUser } = useContext(AuthContext);
  const [errorText, setErrorText] = useState(<></>);
  const navigate = useNavigate();
  const [errorclass, setErrorClass] = useState(
    "relative w-full min-w-[200px] hidden"
  );

  const setErrorDiv = (passValidation) => {
    const listItems = passValidation.map((item) => `${item}`);
    setErrorText(
      <>
        <h2>Password must:</h2>
        {listItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </>
    );
  };

  function validatePassword(password) {
    const conditions = [];

    // Check for at least one lowercase letter
    if (!/(?=.*[a-z])/.test(password)) {
      conditions.push("Contain at least one lowercase letter");
    }

    // Check for at least one uppercase letter
    if (!/(?=.*[A-Z])/.test(password)) {
      conditions.push("Contain at least one uppercase letter");
    }

    // Check for at least one special character
    if (!/(?=.*[!@#$%^&*])/.test(password)) {
      conditions.push(
        "Contain at least one special character (!,@,#,$,%,^,&,*)"
      );
    }

    // Check for minimum length of 8 characters
    if (password.length < 6) {
      conditions.push("Be at least 6 characters long");
    }

    return conditions.length === 0 ? true : conditions;
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    let photo = "https://i.ibb.co/0mvdF6K/profile-avatar.jpg";
    const imgFile = form.get("imgFile");
    const email = form.get("email");
    const password = form.get("password");

    console.log(imgFile);

    let body = new FormData();
    body.set("key", import.meta.env.VITE_IMGBB_APPID);
    body.append("image", imgFile);

    // const res_imgbb = axios({
    //   method: "post",
    //   url: "https://api.imgbb.com/1/upload",
    //   data: body,
    // });
    // console.log(res_imgbb);
    axios
      .post("https://api.imgbb.com/1/upload", body)
      .then(function (response) {
        photo = response.data.data.url;
        // console.log(response.data.data.url);
        // console.log(response.data.url);
        const passValidation = validatePassword(password);
        if (passValidation !== true) {
          setErrorDiv(passValidation);
          setErrorClass("relative w-full min-w-[200px] block");
          return;
        } else {
          setErrorClass("relative w-full min-w-[200px] hidden");
        }

        const newUser = {
          full_name: name,
          email: email,
          image: photo,
          about_me: "",
          wishlist: [],
          user_posts: [],
        };
        // create user
        createUser(email, password)
          .then((result) => {
            updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: photo,
            })
              .then(() => {
                successToast("Successfully Signed Up!!");
              })
              .catch((error) => {
                console.log(error);
              });

            // send data to the server
            fetch("https://prism-pages-server.vercel.app/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (data.insertedId) {
                  console.log("New user inserted to DB");
                }
              });

            result.user.displayName = name;
            result.user.photoURL = photo;
            navigate(location?.state ? location.state : "/");
          })
          .catch((error) => {
            console.error(error.message);

            fetch(`https://prism-pages-server.vercel.app/usersByEmail/${email}`)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                if (data?.email) {
                  errorToast("User already exists. Please Sign in instead!!!");
                } else {
                  errorToast("Could Not Sign Up!! Please Try Again Later");
                }
              })
              .catch((error) => {
                console.error(error.message);
                errorToast("Could Not Sign Up!! Please Try Again Later");
              });
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="px-1 md:px-6 bg-white dark:bg-myrtle_green-200 rounded-lg mt-2">
      <form
        onSubmit={handleSignUp}
        className="flex max-w-md flex-col gap-4 py-4 mb-2 w-80 sm:w-96 dark:bg-myrtle_green-200 bg-white first-letter:"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name" value="Your name" />
          </div>
          <TextInput
            id="name"
            placeholder="John Doe"
            required
            shadow
            type="text"
            name="name"
          />
        </div>
        <div id="fileUpload" className="max-w-md">
          <div className="block">
            <Label htmlFor="file" value="Profile Picture" />
          </div>
          <FileInput
            id="file"
            name="imgFile"
            accept="image/*"
            helperText="A profile picture is useful to confirm your are logged into your account"
          />
        </div>
        {/* <div>
          <div className="mb-2 block">
            <Label htmlFor="profile_picture" value="Your Profile Image URL" />
          </div>
          <TextInput
            id="profile_picture"
            placeholder="Profile Image URL"
            shadow
            type="text"
            name="profile_picture"
          />
        </div> */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email2" value="Your email" />
          </div>
          <TextInput
            id="email2"
            placeholder="name@flowbite.com"
            required
            shadow
            type="email"
            name="email"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Your password" />
          </div>
          <TextInput
            id="password"
            required
            shadow
            type="password"
            name="password"
          />
        </div>
        <div className={errorclass}>
          <h2 className="text-red-700">{errorText}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="agree" required />
          <Label className="flex" htmlFor="agree">
            <p>I agree with the &nbsp;</p>
            <Link
              className="text-cyan-600 hover:underline dark:text-cyan-500"
              href="/forms"
            >
              <p> terms and conditions</p>
            </Link>
          </Label>
        </div>
        <Button type="submit">Register new account</Button>
        <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed dark:text-gray-200 text-gray-700 antialiased">
          Already have an account? &nbsp;
          <Link
            to={"/signin"}
            className="font-medium text-pink-500 transition-colors hover:text-700"
            href="#"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SIgnUpForm;
