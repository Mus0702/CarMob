import { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { registerService, isEmailExist } from "../../service/auth.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { subYears } from "date-fns";
import { useForm } from "react-hook-form";
import SignupImage from "../../assets/images/signup-image.jpg";
import { useAuth } from "../../hooks/useAuth.jsx";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const today = new Date();
  const maxDate = subYears(today, 18);
  const minDate = new Date("01/01/1920");
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const onRegister = async () => {
    setEmailExists(false);
    try {
      const data = {
        lastname: lastname,
        firstname: firstname,
        email: email,
        password: password,
        birthdate: dayjs(birthdate).format("YYYY-MM-DD"),
        phoneNumber: phoneNumber,
      };
      console.log({ data });
      const emailResponse = await isEmailExist(email);
      if (emailResponse.status === 200) {
        const registerResponse = await registerService(data);
        localStorage.setItem("token", registerResponse.data.token);
        localStorage.setItem("role", registerResponse.data.role);
        localStorage.setItem("email", registerResponse.data.email);
        sessionStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        navigate("/");
        console.log({ response: registerResponse });
      } else if (emailResponse.status === 409) {
        setEmailExists(true);
      } else {
        console.error("Error checking email existence");
      }
    } catch (e) {
      console.log(e);
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
                      Sign up
                    </p>

                    <form
                      onSubmit={handleSubmit(onRegister)}
                      className="mx-1 mx-md-4"
                    >
                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Lastname
                          </label>
                          <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            className={`form-control ${
                              errors.lastname && "is-invalid"
                            }`}
                            {...register("lastname", {
                              required: "Lastname is required",
                              minLength: {
                                value: 3,
                                message:
                                  "Lastname must be contain at least 3 characters",
                              },
                              maxLength: {
                                value: 50,
                                message:
                                  "Lastname must be contain at least 50 characters",
                              },
                            })}
                            aria-invalid={errors.lastname ? "true" : "false"}
                            value={lastname}
                            onChange={(event) =>
                              setLastname(event.target.value)
                            }
                          />

                          {errors.lastname && (
                            <div className="invalid-feedback">
                              {errors.lastname.message}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-outline flex-fill mb-4">
                        <label className="form-label" htmlFor="form3Example3c">
                          Firstname
                        </label>
                        <input
                          type="text"
                          id="firstname"
                          name="firstname"
                          className={`form-control ${
                            errors.firstname && "is-invalid"
                          }`}
                          {...register("firstname", {
                            required: "Firstname is required",
                            minLength: {
                              value: 3,
                              message:
                                "Firstname must be contain at least 3 characters",
                            },
                            maxLength: {
                              value: 50,
                              message:
                                "Firstname must be contain at least 50 characters",
                            },
                          })}
                          aria-invalid={errors.firstname ? "true" : "false"}
                          value={firstname}
                          onChange={(event) => setFirstname(event.target.value)}
                        />

                        {errors.firstname && (
                          <div className="invalid-feedback">
                            {errors.firstname.message}
                          </div>
                        )}
                      </div>
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
                          {emailExists && (
                            <div className="invalid-feedback">
                              Email already exists
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="birthdate">
                            Birthdate
                          </label>
                          <DatePicker
                            id="birthdate"
                            showIcon
                            className="form-control"
                            clearIcon={null}
                            format="dd/MM/yyyy"
                            maxDate={maxDate}
                            minDate={minDate}
                            placeholder="DD/MM/YYYY"
                            value={birthdate}
                            onChange={(date) => setBirthdate(date)}
                          />
                          {errors.birthdate && (
                            <div className="invalid-feedback">
                              {errors.birthdate.message}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Phone number
                          </label>
                          <input
                            type="text"
                            id="phone-number"
                            className="form-control"
                            value={phoneNumber}
                            onChange={(event) =>
                              setPhoneNumber(event.target.value)
                            }
                          />
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
                              minLength: {
                                value: 8,
                                message:
                                  "Password must be at least 8 characters",
                              },
                              maxLength: {
                                value: 20,
                                message:
                                  "Password must be at most 20 characters",
                              },
                              pattern: {
                                value:
                                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+-]).{8,20}$/,
                                message:
                                  "Password must contain at least one lowercase letter, one uppercase letter, one special character (!@#$%^&*_=+-), and be between 8 and 20 characters",
                              },
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

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example4cd"
                          >
                            Repeat your password
                          </label>

                          <input
                            type="password"
                            id="form3Example4cd"
                            className={`form-control ${
                              errors.confirmPassword && "is-invalid"
                            }`}
                            {...register("confirmPassword", {
                              required: "Confirm Password is required",
                              validate: (value) =>
                                value === password || "Passwords do not match",
                            })}
                            value={confirmPassword}
                            onChange={(event) =>
                              setConfirmPassword(event.target.value)
                            }
                          />

                          {errors.confirmPassword && (
                            <div className="invalid-feedback">
                              {errors.confirmPassword.message}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          disabled={!isValid}
                          onClick={onRegister}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src={SignupImage}
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
};

export default Register;
