import { useState } from "react"
import { Link } from "react-router-dom"
import AuthPage from "../../UI/AuthPage"
import FormGroup from "../../UI/FormGroup"
import { LoginGridImage, FingerPrint, EyeOffImage } from "../../assets/images"

// Styles
import styles from "./styles/styles.module.css"

const Login = () => {
	const [isChecked, setIsChecked] = useState(false)
	const [isShowPassword, setIsShowPassword] = useState(false)
	const [userDetails, setUserDetails] = useState({
		credentials: "",
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

	const handleLoginForm = e => {
		e.preventDefault()
		console.log("Form submitted : ", userDetails)
	}

	return (
		<AuthPage {...pageData}>
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
								value={userDetails?.credentials}
								placeholder="Enter Email address or Phone Number"
								name="credentials" />
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