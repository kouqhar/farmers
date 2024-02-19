import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

// Dir
import AuthPage from "../../UI/AuthPage"
import FormGroup from "../../UI/FormGroup"
import { LoginGridImage, FingerPrint, EyeOffImage } from "../../assets/images"
import axiosRequest from "../../utils/axiosFunc"

// Styles
import styles from "./styles/styles.module.css"

const Login = () => {
	const [isChecked, setIsChecked] = useState(false)
	const [isShowPassword, setIsShowPassword] = useState(false)
	const [loginResponse, setLoginResponse] = useState({})
	const [toastify, setToastify] = useState(false)
	const [userDetails, setUserDetails] = useState({
		credential: "",
		password: "",
		reminder: "",
	})
	const pageData = {
		image: LoginGridImage,
		alt: "Login Welcome Image",
		isLoginPage: true
	}

	const handleisShowPassword = e => setIsShowPassword(prevState => !prevState)

	const handleInputChange = e => {
		e.preventDefault()
		const [fieldName, fieldValue] = [e.target.name, e.target.value]

		setUserDetails(prevState => ({
			...prevState,
			[fieldName]: fieldValue
		}))
	}

	const handleLoginForm = async (e) => {
		e.preventDefault()
		const userLoginPath = "/users/login"
		const cancelToken = axios.CancelToken.source();
		const reqOptions = {
			path: userLoginPath,
			cancelToken: cancelToken.token,
			method: "POST",
			data: { ...userDetails }
		};

		const response = await axiosRequest(reqOptions);
		if (response) {
			setToastify(true)

			if (response?.status !== 200)
				setLoginResponse({ data: response?.data?.response?.data?.message, status: response?.status })
			else {
				const { firstName, lastName } = response?.data?.data?.user
				const data = `Successfully logged in as ${firstName + " " + lastName}!!!`
				setLoginResponse({ data, status: response?.status })
			}

			const displayToastify = setTimeout(() => {
				setToastify(false)
			}, 7000);

			return () => clearTimeout(displayToastify)
		}

		return () => {
			cancelToken.cancel();
		};
	}

	return (
		<AuthPage {...pageData}>
			{
				toastify && (
					<section className={["Toastify", loginResponse?.status !== 200 ? "info" : "success"].join(" ")}>
						<button
							className="ToastifyBtn"
							onClick={() => setToastify(false)}>x</button>
						<p>
							{loginResponse?.data}
						</p>
					</section>
				)
			}
			<div className={styles.content}>
				<div className={styles.content_welcomeText}>
					<h1>Welcome back!</h1>
					<p>Welcome back! Please enter your details.</p>
				</div>
				<form className={styles.content_form}>
					<FormGroup>
						<label>Email address / Phone Number</label>
						<div className={styles.content_form__emailOrPhone}>
							<input
								onChange={handleInputChange}
								value={userDetails?.credential}
								placeholder="Enter Email address or Phone Number"
								name="credential" />
							<p>Phone number must have country code E.g +234</p>
						</div>
					</FormGroup>
					<FormGroup>
						<label>Password</label>
						<div className={styles.content_form__password}>
							<input
								onChange={handleInputChange}
								value={userDetails?.password}
								placeholder="Enter Password"
								type={isShowPassword ? "text" : "password"}
								name="password" />
							<img className={styles.content_form__password___hideShow} src={EyeOffImage} onClick={handleisShowPassword} alt="Hide/show Password" />
							<img className={styles.content_form__password___fingerprint} src={FingerPrint} alt="Finger Print" />
						</div>
					</FormGroup>
					<FormGroup>
						<div className={styles.content_form__reminder}>
							<div className={styles.content_form__reminder___remind}>
								<input type="checkbox"
									onChange={handleInputChange}
									name="reminder" /> Remember for 30 days
							</div>
							<Link to="/signup">Forgot password</Link>
						</div>
					</FormGroup>

					<button className={["btn_fullGreen"]} type="submit" onClick={handleLoginForm}>Login</button>
				</form>
				<div className={styles.content_accountInfo}>
					<p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
				</div>
				<div className={styles.content_accountInfo}>
					<p>VERIFY PAGE --- <Link to="/verify">Verify</Link></p>
				</div>
			</div>
		</AuthPage>
	)
}

export default Login