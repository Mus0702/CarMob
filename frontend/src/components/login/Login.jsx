import { useEffect, useState } from "react";
import { sendLoginRequest } from "../../service/auth.js";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoginImage from "../../assets/images/login-image.jpg";
import { useAuth } from "../../hooks/useAuth.jsx";
import { getUserByMail } from "../../service/user.js";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const redirectToChat = localStorage.getItem("redirectToChat");
  const redirectedToRouteDetails = localStorage.getItem(
    "redirectedToRouteDetails",
  );
  const redirectToRating = localStorage.getItem("redirectToRating");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
  });
  useEffect(() => {
    if (redirectToChat) {
      toast.warning("You must be logged in to use Chat.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (redirectToRating) {
      toast.warning("You must be logged in to rate a driver.", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else if (redirectedToRouteDetails) {
      toast.warning("You must be logged in to use the payment system.", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }, [redirectToChat]);
  const onLogin = async () => {
    const credentials = {
      email: email,
      password: password,
    };
    const setLocalStorageItem = (response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("email", response.data.email);
      sessionStorage.setItem("isLoggedIn", "true");
    };
    try {
      const response = await sendLoginRequest(credentials);
      setEmail("");
      setPassword("");
      if (response && response.data) {
        setLocalStorageItem(response);
        setIsLoggedIn(true);

        const userConnected = await getUserByMail(response.data.email);
        console.log({ userConnected });

        sessionStorage.setItem("connectedUserId", userConnected.data.id);
        sessionStorage.setItem(
          "userConnected",
          JSON.stringify(userConnected.data),
        );

        if (redirectToChat) {
          navigate(`/chat/${redirectToChat}/${userConnected.data.id}`);
          localStorage.removeItem("redirectToChat");
        } else if (redirectedToRouteDetails) {
          navigate(`/routeDetails/${redirectedToRouteDetails}`);
          localStorage.removeItem("redirectedToRouteDetails");
        } else if (redirectToRating) {
          navigate(`/rating/${redirectToRating}`);
          localStorage.removeItem("redirectToRating");
        } else {
          navigate("/");
        }
      }
    } catch (e) {
      if (e?.response?.status === 401) {
        setError("Email or password incorrect");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <section className="vh-100">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black rounded">
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      Login
                    </p>

                    <form
                      onSubmit={handleSubmit(onLogin)}
                      className="mx-1 mx-md-4"
                    >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="form3Example3c"
                            className={`form-control ${
                              errors.email && "is-invalid"
                            }`}
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value:
                                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                              },
                            })}
                            aria-invalid={errors.email ? "true" : "false"}
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                          {errors.email && (
                            <div className="invalid-feedback">
                              {errors.email.message}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        {/*<i className="fas fa-lock fa-lg me-3 fa-fw"></i>*/}
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4c"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="form3Example4c"
                            className={`form-control ${
                              errors.password && "is-invalid"
                            }`}
                            {...register("password", {
                              required: "Password is required",
                            })}
                            aria-invalid={errors.password ? "true" : "false"}
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                          />
                          {errors.password && (
                            <div className="invalid-feedback">
                              {errors.password.message}
                            </div>
                          )}
                        </div>
                      </div>

                      {error && (
                        <div className="alert alert-danger">{error}</div>
                      )}

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          disabled={!isValid}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src={LoginImage}
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
