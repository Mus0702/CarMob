import { useState } from "react";
import { registerService } from "../../service/auth.js";
import DatePicker from "react-date-picker";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [birthdate, setBirthdate] = useState(new Date("1986-07-02"));
  const [phoneNumber, setPhoneNumber] = useState("");

  const onRegister = async () => {
    const data = {
      lastname: lastname,
      firstname: firstname,
      email: email,
      password: password,
      birthdate: dayjs(birthdate).format("YYYY-MM-DD"),
      phoneNumber: phoneNumber,
    };
    console.log({ data });
    try {
      const response = await registerService(data);
      console.log({ response });
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
                            Your Lastname
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

                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="form3Example3c">
                          Your Firstname
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
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Your Birthdate
                          </label>
                          <DatePicker
                            showIcon
                            className="date-picker-customer"
                            selected={birthdate}
                            value={birthdate}
                            onChange={(date) => setBirthdate(date)}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <div className="form-outline flex-fill mb-0">
                          <label
                            className="form-label"
                            htmlFor="form3Example3c"
                          >
                            Your Phone number
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
                            className="form-control"
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                          />
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
                            className="form-control"
                            value={confirmPassword}
                            onChange={(event) =>
                              setConfirmPassword(event.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-lg"
                          onClick={onRegister}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
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
